var express = require("express");
var app = express();

const passport = require("passport");

app.use(passport.initialize());
app.use(passport.session());
const sesi = require("../middleware/sesi_admin");
app.use(sesi);

app.get("/", function (req, res) {
  // render to views/index.ejs template file
  res.render("admin/systemStatus", {
    layout: "layouts/layout",
    title: "Greentech Maliki",
    page: "systemStatus",
  });
});

module.exports = app;
