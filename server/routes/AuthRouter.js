const express = require("express");
const passport = require("passport");
const session = require("express-session");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;

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
  if (user === null) {
    return done(null, false, { message: "No User With That Email" });
  }
  try {
    if (await bcrypt.compare(password, user.password)) {
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

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/login/success",
    failureRedirect: "/login/failure",
  })
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
    res.locals.reqUrl = req.session.reqUrl; // all the magic
    return next();
  },

  passport.authenticate("local", {
    failureRedirect: "/auth",
  }),
  function (req, res) {
    var redirectTo = "/dashboard";
    if (res.locals.reqUrl) {
      redirectTo = res.locals.reqUrl; // small change here
      req.session.reqUrl = res.locals.reqUrl; // you can reassign the value to req.session.reqUrl to be accessible in other routes
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
  console.log(user);
  process.nextTick(function () {
    return cb(null, user);
  });
});

module.exports = {
  authRouter,
  isNotAuthenticated: checkNotAuthenticated,
  isAuthenticated: checkAuthenticated,
};
