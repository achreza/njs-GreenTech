var express = require("express");
var app = express();

app.get("/", function (req, res) {
    // render to views/index.ejs template file
    res.render("admin/abstractStatus", {
        layout: 'layouts/layout',
        title: "Greentech Maliki",
        page: "abstractStatus"
    });
});
app.post('/add', function (req, res) {

    var status = req.sanitize("status").escape().trim();
    console.log(status)
    req.getConnection(function (error, conn) {
        conn.query("insert into m_status_abs values(null,'" + status + "')", function (err, rows) {
            if (err) {
                res.end()
            } else {
                res.redirect("/admin/abstract-status")
            }
        });
    });
})
module.exports = app;
