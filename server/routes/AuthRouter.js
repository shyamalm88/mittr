const express = require("express");
const passport = require("passport");
const session = require("express-session");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20");
const FacebookStrategy = require("passport-facebook");
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
    return done(null, false, {
      message: "User Might Have signed Up with Social Links",
    });
  } else if (user === null) {
    return done(null, false, { message: "No User With That Email" });
  }
  try {
    if (user.password && (await bcrypt.compare(password, user.password))) {
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
      const newUser = {
        googleId: profile.id,
        email: profile.emails[0].value,
        fullName: profile._json.name,
        profileImgUrl: profile.photos[0].value,
      };
      try {
        let user = await User.findOne({ email: newUser.email }).select(
          "-password"
        );

        if (user) {
          if (!user.profileImgUrl && !user.googleId) {
            const updatedUser = await User.findOneAndUpdate(
              { email: newUser.email },
              { profileImgUrl: profile.photos[0].value, googleId: profile.id },
              { new: true }
            ).select("-password");
            cb(null, updatedUser);
          } else if (!user.profileImgUrl) {
            const updatedUser = await User.findOneAndUpdate(
              { email: newUser.email },
              { profileImgUrl: profile.photos[0].value },
              { new: true }
            ).select("-password");
            cb(null, updatedUser);
          } else if (!user.googleId) {
            const updatedUser = await User.findOneAndUpdate(
              { email: newUser.email },
              { googleId: profile.id },
              { new: true }
            ).select("-password");
            cb(null, updatedUser);
          } else {
            cb(null, user);
          }
        } else {
          user = await User.create(newUser);
          cb(null, user);
        }
      } catch (err) {
        // console.log(err);
        cb(err);
      }
    }
  )
);
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:3000/auth/facebook/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
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
        // console.log(err);
        cb(err);
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
  passport.authenticate("google", {}),
  function (req, res) {
    res.redirect("/dashboard");
  }
);

authRouter.get("/facebook", passport.authenticate("facebook"));

authRouter.get(
  "/facebook/callback",
  (req, res, next) => {
    res.locals.reqUrl = req.session.reqUrl;
    return next();
  },
  passport.authenticate("facebook", {}),
  function (req, res) {
    res.redirect("/dashboard");
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
    const signedUpUserRes = await User.findOne({ _id: signUpRes._id }).select(
      "-password"
    );
    res.send(signedUpUserRes);
  } catch (err) {
    res.status(500).json(error);
  }
});

authRouter.get("/request-user", function (req, res) {
  res.send(req.user);
});

authRouter.post("/signin", async (req, res, next) => {
  passport.authenticate("local", async (error, user, info) => {
    try {
      if (error) {
        return res.status(500).json({
          message: "Something is wrong",
          error: error || "internal server errror",
        });
      }

      //req.login is provided by passport to serilize user id
      req.login(user, async (error) => {
        if (error) {
          res.status(500).json({
            message: "Somthing is wrong",
            error: error || "internal server errror",
          });
        }

        return res.send({ user, info });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

authRouter.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    return res.send("logout");
  });
});

passport.serializeUser(function (user, cb) {
  //   // console.log(user);
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
