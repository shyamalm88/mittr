const passport = require("passport");
const User = require("../models/User");
const GoogleStrategy = require("passport-google-oauth20");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://www.example.com/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      console.log(profile);
      // User.findOrCreate({ googleId: profile.id }, function (err, user) {
      //   return cb(err, user);
      // });
    }
  )
);

passport.serializeUser(function (user, cb) {
  console.log(user);
  process.nextTick(function () {
    cb(null, { id: user.id, username: user.email });
  });
});

passport.deserializeUser(function (user, cb) {
  console.log(user);
  process.nextTick(function () {
    return cb(null, user);
  });
});
