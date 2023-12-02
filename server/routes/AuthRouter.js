const express = require("express");
const passport = require("passport");
const session = require("express-session");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20");
const { error } = require("console");
const authRouter = express.Router();

const getUserByEmail = async (email, omitPassword = false) => {
  let res = null;
  if (omitPassword) {
    res = await User.findOne({ email: email }).select("-password");
  } else {
    res = await User.findOne({ email: email });
  }

  return res;
};

const getUserById = async (id) => {
  const res = await User.findOne({ _id: id }).select("-password");
  return res;
};

const checkAuthenticated = (req, res, next) => {
  console.log(req);
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/auth");
};

const checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    var redirectTo = "/dashboard";
    if (res.locals.reqUrl) {
      redirectTo = res.locals.reqUrl; // small change here
      req.session.reqUrl = res.locals.reqUrl; // you can reassign the value to req.session.reqUrl to be accessible in other routes
    }

    res.redirect(redirectTo);
  } else {
    next();
  }
};

const authenticateUser = async (email, password, done) => {
  const user = await getUserByEmail(email);

  if (user && user.password === undefined) {
    console.log("=======", user);
    return done(null, false, {
      message: "User Might Have signed Up with Social Links",
    });
  } else if (user === null) {
    console.log("***********", user);
    return done(null, false, { message: "No User With That Email" });
  }
  try {
    if (user.password && (await bcrypt.compare(password, user.password))) {
      console.log("((((((((((((((((((((((()))))))))))))))))))))))", user);
      const updatedUserWithoutPassword = await getUserByEmail(email, true);
      return done(null, updatedUserWithoutPassword);
    } else {
      return done(null, false, { message: "password did not match" });
    }
  } catch (err) {
    return done(err);
  }
};

passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      // console.log(profile);
      const newUser = {
        googleId: profile.id,
        email: profile.emails[0].value,
        fullName: profile._json.name,
        profileImgUrl: profile.photos[0].value,
      };
      try {
        let user = await User.findOne({ email: newUser.email });

        if (user) {
          cb(null, user);
        } else {
          user = await User.create(newUser);
          cb(null, user);
        }
      } catch (err) {
        console.log(err);
      }
    }
  )
);

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  (req, res, next) => {
    res.locals.reqUrl = req.session.reqUrl;
    return next();
  },
  passport.authenticate("google", {
    failureRedirect: "/auth",
  }),
  function (req, res) {
    // Successful authentication, redirect to secret page.
    res.redirect("http://localhost:3000/dashboard"); //redirect back to the frontend secret page
  }
);

authRouter.get("/users", async (req, res, next) => {
  try {
    const allUserRes = await User.find({}).select("-password");
    res.send(allUserRes);
  } catch (err) {
    res.status(500).json(error);
  }
});

authRouter.post("/check-email-exists", async (req, res, next) => {
  try {
    const ifUserExistRes = await User.findOne({ email: req.body.email }).select(
      "-password"
    );
    if (ifUserExistRes) {
      res.send({ userExist: true });
    } else {
      res.send({ userExist: false });
    }
  } catch (err) {
    res.status(500).json(error);
  }
});

authRouter.post("/signup", async (req, res, next) => {
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = new User({
    fullName: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });
  try {
    let alreadySocialLoggedInUser = await User.findOne({ email: user.email });
    if (alreadySocialLoggedInUser) {
      return res.status(409).json({ message: "User Already Exist." });
    }
    const signUpRes = await user.save();
    const signedUpUserRes = await User.find({ _id: signUpRes._id }).select(
      "-password"
    );
    res.send(signedUpUserRes);
  } catch (err) {
    res.status(500).json(error);
  }
});

authRouter.post(
  "/signin",
  (req, res, next) => {
    res.locals.reqUrl = req.session.reqUrl;
    return next();
  },
  passport.authenticate("local"),
  function (req, res) {
    var redirectTo = "/dashboard";
    if (res.locals.reqUrl) {
      redirectTo = res.locals.reqUrl;
      req.session.reqUrl = res.locals.reqUrl;
    }

    res.redirect(redirectTo);
  }
);

authRouter.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

passport.serializeUser(function (user, cb) {
  //   console.log(user);
  process.nextTick(function () {
    cb(null, { id: user.id, user });
  });
});

passport.deserializeUser(function (user, cb) {
  process.nextTick(function () {
    return cb(null, user);
  });
});

module.exports = {
  authRouter,
  isNotAuthenticated: checkNotAuthenticated,
  isAuthenticated: checkAuthenticated,
};
