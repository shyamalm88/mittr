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
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect("/auth");
};

const checkNotAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return res.redirect("/profile");
  }
  next();
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

authRouter.post("/signin", async (req, res, next) => {
  passport.authenticate("local", (err, user, options) => {
    if (err) {
      res.status(500).send({ message: err });
    } else if (options) {
      if (options.message === "No User With That Email") {
        res.status(401).send({ message: options.message });
      }
      if (options.message === "password did not match") {
        res.status(401).send({ message: options.message });
      }
    } else if (user) {
      res.status(200).send(user);
    }
  })(req, res);
});

authRouter.delete("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  done(null, getUserById(id));
});

module.exports = authRouter;

module.exports = {
  authRouter,
  isNotAuthenticated: checkNotAuthenticated,
  isAuthenticated: checkAuthenticated,
};
