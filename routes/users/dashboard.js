var express = require("express");
var app = express();
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

app.get("/", function (req, res) {
  // render to views/index.ejs template file
  req.getConnection(function (error, conn) {
    conn.query("SELECT * FROM submission_abstrak where id_user = " + req.session.user.id_user + "", function (err, rows, fields) {
      var all = 0,
        acc = 0,
        reject = 0;
      for (var i = 0; i < rows.length; i++) {
        all++;
        if (rows[i].id_status_abs == 2) {
          acc++;
        } else if (rows[i].id_status_abs == 3) {
          reject++;
        }
      }

      var dto = {
        all: all,
        acc: acc,
        reject: reject,
      };
      res.render("user/dashboard", {
        datas: dto,
        layout: "layouts/layout",
        title: "Greentech Maliki",
        page: "dashboard",
        user: req.session.user,
      });
    });
  });
});

module.exports = app;
