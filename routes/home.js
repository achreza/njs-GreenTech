var express = require("express");
var app = express();

app.get("/", function (req, res) {
    // render to views/index.ejs template file
    res.render("index", {
        layout: 'layouts/layout',
        title: "SPK-KB",
        page: "home"
    });
});

module.exports = app;
