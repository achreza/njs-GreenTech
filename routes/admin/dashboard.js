var express = require("express");
var app = express();

const passport = require("passport");

app.use(passport.initialize());
app.use(passport.session());
const sesi = require("../middleware/sesi_admin");
app.use(sesi);
app.use("/", function (req, res, next) {
  console.log(req.session.user);
  if (typeof req.session.user === "undefined") {
    res.end("Belum Login");
  }
  next();
});

app.get("/", function (req, res) {
  // render to views/index.ejs template file
  res.render("admin/dashboard", {
    layout: "layouts/layout",
    title: "Greentech Maliki",
    page: "dashboard",
  });
});

module.exports = app;
