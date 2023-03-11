var express = require("express");
var app = express();

app.get("/", function (req, res) {
    // render to views/index.ejs template file
    res.render("user/profile", {
        layout: 'layouts/layout',
        title: "Greentech Maliki",
        page: "profile"
    });
});

module.exports = app;
