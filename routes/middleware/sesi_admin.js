var express = require("express");
var app = express();

const passport = require("passport");

app.use(passport.initialize());
app.use(passport.session());

let alert = require("alert");

app.use("/", function (req, res, next) {
  console.log(req.url);
  if (typeof req.session.user === "undefined") {
    alert("Anda Belum Login");
    res.redirect("/auth");
  } else {
    if (req.session.user.id_role_user == 1) {
      next();
    } else {
      alert("Anda Bukan Admin");
      res.end("Illegal Access Detected");
    }
  }
});

module.exports = app;
