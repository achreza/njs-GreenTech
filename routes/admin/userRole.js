var express = require("express");
var app = express();

// app.get("/", function (req, res) {
//     res.render("admin/userRole", {
//         layout: 'layouts/layout',
//         title: "Greentech Maliki",
//         page: "userRole",

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
                    data: rows
                });
                console.log(rows);
            }
        });
    });
});
app.post('/add', function (req, res) {

    var role = req.sanitize("role").escape().trim();
    console.log(role)
    req.getConnection(function (error, conn) {
        conn.query("insert into role_user values(null,'" + role + "')", function (err, rows) {
            if (err) {
                res.end()
            } else {
                res.redirect("/admin/user-role")
            }
        });
    });
})

// DELETE Record
app.get('/remove/(:id)', function (req, res, next) {
    var user = { id: req.params.id }
    req.getConnection(function (error, conn) {
        conn.query('DELETE FROM role_user WHERE id_role_user = ' + req.params.id, function (err) {
            if (err) {
                req.flash('error', err)
                res.redirect('/admin/user-role')
            } else {
                req.flash('success', 'Data removed :' + req.params.id)
                res.redirect('/admin/user-role')
            }
        });
    });
})
module.exports = app;
