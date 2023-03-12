var express = require("express");
var app = express();

app.get("/", function (req, res) {
  // render to views/index.ejs template file
  res.render("landing/landing", {
    layout: "layouts/layout",
    title: "GreenTech",
    page: "home",
  });
});

module.exports = app;
