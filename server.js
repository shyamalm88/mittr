const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const favicon = require("serve-favicon");
const next = require("next");
const path = require("path");
const url = require("url");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const mongoose = require("mongoose");
const routes = require("./server/routes/Routers");
const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;
const {
  isNotAuthenticated,
  isAuthenticated,
} = require("./server/routes/AuthRouter");

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({
  extended: false,
});
mongoose
  .connect(`${process.env.MONGO_URL}`, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    // Multi-process to utilize all CPU cores.
    if (!dev && cluster.isMaster) {
      console.log(`Node cluster master ${process.pid} is running`);

      // Fork workers.
      for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
      }

      cluster.on("exit", (worker, code, signal) => {
        console.error(
          `Node cluster worker ${worker.process.pid} exited: code ${code}, signal ${signal}`
        );
      });
    } else {
      const nextApp = next({ dir: ".", dev });

      const nextHandler = nextApp.getRequestHandler();

      nextApp.prepare().then(() => {
        const server = express();
        server.use(
          cors({
            origin: "*",
            methods: "GET,POST,PUT,DELETE",
            credentials: true,
          })
        );
        server.use(urlencodedParser);
        server.use(jsonParser);
        server.use(favicon(path.join(__dirname, "public", "favicon.png")));
        server.use(
          session({
            secret: process.env.SECRET,
            resave: false,
            saveUninitialized: true,
          })
        );
        server.use(cookieParser());

        server.use(passport.initialize());
        server.use(passport.session());
        server.use(passport.authenticate("session"));

        if (!dev) {
          // Enforce SSL & HSTS in production
          server.use(function (req, res, next) {
            var proto = req.headers["x-forwarded-proto"];
            if (proto === "https") {
              res.set({
                "Strict-Transport-Security": "max-age=31557600", // one-year
              });
              return next();
            }
            res.redirect("http://" + req.headers.host + req.url);
          });
        }

        server.use(
          "/uploads",
          express.static(path.join(__dirname, "uploads"), {
            maxAge: dev ? "0" : "365d",
          })
        );

        server.get("/status", (request, response) => {
          const status = {
            Status: "Running",
          };
          response.send(status);
        });

        server.use("/api", routes);

        server.get("/", (req, res) => {
          return nextApp.render(req, res, "/dashboard", req.query);
        });
        server.get("/dashboard", isAuthenticated, (req, res) => {
          return nextApp.render(req, res, "/dashboard", req.query);
        });
        server.get("/create", isAuthenticated, (req, res) => {
          return nextApp.render(req, res, "/create", req.query);
        });

        server.get("/profile", isAuthenticated, (req, res) => {
          return nextApp.render(req, res, "/profile", req.query);
        });

        server.get("/auth", isNotAuthenticated, (req, res) => {
          return nextApp.render(req, res, "/auth", req.query);
        });

        server.get("*", (req, res) => {
          //   res.set({
          //     'Cache-Control': 'public, max-age=3600'
          //   });
          const parsedUrl = url.parse(req.url, true);
          nextHandler(req, res, parsedUrl);
        });

        server.listen(port, (err) => {
          if (err) throw err;
          console.log(`Listening on http://localhost:${port}`);
        });
      });
    }
  })
  .catch((err) => {
    console.log("error reason", err);
  });

process.on("uncaughtException", function (err) {
  console.error(err);
});
