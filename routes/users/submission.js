var express = require("express");
var app = express();

app.get("/", function (req, res) {
    // render to views/index.ejs template file
    res.render("user/submission", {
        layout: 'layouts/layout',
        title: "Greentech Maliki",
        page: "submission"
    });
});

module.exports = app;
