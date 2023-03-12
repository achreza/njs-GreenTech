var express = require("express");
var app = express();

app.get("/", function (req, res) {
    // render to views/index.ejs template file
    res.render("admin/userRole", {
        layout: 'layouts/layout',
        title: "Greentech Maliki",
        page: "userRole"
    });
});

module.exports = app;
