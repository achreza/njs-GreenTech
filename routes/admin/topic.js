var express = require("express");
var app = express();

app.get("/", function (req, res) {
    // render to views/index.ejs template file
    res.render("admin/topic", {
        layout: 'layouts/layout',
        title: "Greentech Maliki",
        page: "topic"
    });
});

app.post('/add', function (req, res) {

    var topic = req.sanitize("topic").escape().trim();
    console.log(topic)
    req.getConnection(function (error, conn) {
        conn.query("insert into topic values(null,'" + topic + "')", function (err, rows) {
            if (err) {
                res.end()
            } else {
                res.redirect("/admin/topic")
            }
        });
    });
})

module.exports = app;
