var express = require("express");
var app = express();
const passport = require("passport");

app.use(passport.initialize());
app.use(passport.session());
const sesi = require("../middleware/sesi_reviewer");
app.use(sesi);

app.get("/", function (req, res) {
  // render to views/index.ejs template file
  res.render("reviewer/detail", {
    layout: "layouts/layout",
    title: "Greentech Maliki",
    page: "detail",
  });
});

module.exports = app;
