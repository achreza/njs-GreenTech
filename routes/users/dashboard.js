var express = require("express");
var app = express();

app.get("/", function (req, res) {
    // render to views/index.ejs template file
    res.render("user/dashboard", {
        layout: 'layouts/layout',
        title: "Greentech Maliki",
        page: "dashboard"
    });
});

module.exports = app;
