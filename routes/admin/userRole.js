var express = require("express");
var app = express();

// app.get("/", function (req, res) {
//     res.render("admin/userRole", {
//         layout: 'layouts/layout',
//         title: "Greentech Maliki",
//         page: "userRole",
//         data: rows
//     });
// });

app.get("/", function (req, res, next) {
    req.getConnection(function (error, conn) {
        conn.query("SELECT * FROM role_user", function (err, rows) {
            if (err) {
                res.end();
            } else {
                res.render("admin/userRole", {
                    layout: 'layouts/layout',
                    title: "Greentech Maliki",
                    page: "userRole",
                    data: JSON.stringify(rows)
                });
                console.log(rows);
            }
        });
    });
});
app.post('/add', function (req, res) {

    var role = req.sanitize("role").escape().trim();
    req.getConnection(function (error, conn) {
        conn.query("insert into role_user values(null,'" + role + "')", function (err) {
            if (err) {
                res.render("admin/userRole", {
                    layout: 'layouts/layout',
                    title: "Greentech Maliki",
                    page: "userRole",
                    message: 'Error'
                });
            } else {
                res.render("admin/userRole", {
                    layout: 'layouts/layout',
                    title: "Greentech Maliki",
                    page: "userRole",
                    data: JSON.stringify(rows),
                    message: "success"
                });
                console.log(rows);
            }
        });
    });
})
module.exports = app;
