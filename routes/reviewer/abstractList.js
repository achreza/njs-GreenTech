var express = require("express");
var app = express();

app.get("/", function (req, res) {
    // render to views/index.ejs template file
    res.render("reviewer/abstractList", {
        layout: 'layouts/layout',
        title: "Greentech Maliki",
        page: "abstractList"
    });
});

module.exports = app;
