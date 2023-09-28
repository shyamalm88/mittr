const express = require("express");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const next = require("next");
const path = require("path");
const url = require("url");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const mongoose = require("mongoose");
const routes = require("./server/routes/Routers");
const morgan = require("morgan");

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 3000;

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({
  extended: false,
});

mongoose
  .connect("mongodb://localhost:27017/mittr", {
    useNewUrlParser: true,
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
        server.use(urlencodedParser);
        // server.use(morgan("combined"));
        server.use(jsonParser);
        server.use(favicon(path.join(__dirname, "public", "favicon.png")));

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
            res.redirect("https://" + req.headers.host + req.url);
          });
        }

        // Static files
        // https://github.com/zeit/next.js/tree/4.2.3#user-content-static-file-serving-eg-images
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

        // Example server-side routing
        server.get("/home", (req, res) => {
          return nextApp.render(req, res, "/createPoll", req.query);
        });

        // Example server-side routing
        server.get("/", (req, res) => {
          return nextApp.render(req, res, "/createPoll", req.query);
        });

        // Default catch-all renders Next app
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
    console.log("error reason", err.reason);
  });
