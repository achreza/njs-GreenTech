var express = require("express");
var app = express();
const session = require("express-session");

const passport = require("passport");
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.get("/", function (req, res, next) {
  res.render("pages/auth", { layout: "layouts/layout", title: "GreenTech", page: "auth" });
});
app.get("/success", (req, res) => res.render("pages/success", { layout: "layouts/layout", title: "GreenTech", page: "success", user: userProfile }));
app.get("/error", (req, res) => res.send("error logging in"));
app.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/google/callback", passport.authenticate("google", { failureRedirect: "/auth/error" }), function (req, res) {
  // Successful authentication, redirect success.
  res.redirect("/auth/success");
});

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

/*  Google AUTH  */

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GOOGLE_CLIENT_ID = "929483345945-tf903r99ga52e41rv1scuc7qpg9f8790.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);

module.exports = app;
