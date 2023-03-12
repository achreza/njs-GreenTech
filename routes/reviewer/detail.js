var express = require("express");
var app = express();

app.get("/", function (req, res) {
    // render to views/index.ejs template file
    res.render("reviewer/detail", {
        layout: 'layouts/layout',
        title: "Greentech Maliki",
        page: "detail"
    });
});

module.exports = app;
