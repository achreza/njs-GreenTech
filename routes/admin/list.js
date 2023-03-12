var express = require("express");
var app = express();

app.get("/", function (req, res) {
    // render to views/index.ejs template file
    res.render("admin/list", {
        layout: 'layouts/layout',
        title: "Greentech Maliki",
        page: "list"
    });
});

module.exports = app;
