var express = require("express");
var app = express();
const passport = require("passport");

app.use(passport.initialize());
app.use(passport.session());
const sesi = require("../middleware/sesi_user");
app.use(sesi);

app.get("/", function (req, res) {
  // render to views/index.ejs template file
  res.render("user/edit", {
    layout: "layouts/layout",
    title: "Greentech Maliki",
    page: "edit",
  });
});

module.exports = app;
