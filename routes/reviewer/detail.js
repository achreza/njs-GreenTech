var express = require("express");
var app = express();
const passport = require("passport");

app.use(passport.initialize());
app.use(passport.session());
const sesi = require("../middleware/sesi_reviewer");
app.use(sesi);

const { dirname } = require("path");
const appDir = dirname(require.main.filename);

app.get("/(:id)/", function (req, res) {
  // render to views/index.ejs template file
  req.getConnection(function (error, conn) {
    conn.query(
      "SELECT * FROM submission_abstrak join topic on submission_abstrak.topic = topic.id_topic join m_status_abs on m_status_abs.id_status_abs = submission_abstrak.id_status_abs where id_abs_submission = " +
        req.params.id +
        "",
      function (err, rows, fields) {
        namaFile = rows[0].file;
        res.render("reviewer/detail", {
          data: rows[0],
          user: req.session.user,
          layout: "layouts/layout",
          title: "Greentech Maliki",
          page: "detail",
        });
      }
    );
  });
});

app.get("/download/(:nama_file)/", function (req, res) {
  const file = `${appDir}/submissions/${req.params.nama_file}`;
  res.download(file); // Set disposition and send it.
});

app.post("/make_decision/(:id)/", function (req, res) {
  var data = {
    id: req.params.id,
    comment: req.sanitize("comment").escape().trim(),
    status: req.sanitize("status").escape().trim(),
    decision_by: req.session.user.id_user,
  };
  req.getConnection(function (error, conn) {
    conn.query(
      "UPDATE `icgt`.`submission_abstrak` SET `comment`='" +
        data.comment +
        "', `decission_by`=" +
        data.decision_by +
        ", `decission_at`= NOW(), `id_status_abs`= " +
        data.status +
        " WHERE  `id_abs_submission`=" +
        data.id +
        ";",
      function (err, rows, fields) {
        if (err) {
          req.flash("error", err);
          res.render("/reviewer/detail/" + req.params.id, {
            user: req.session.user,
            layout: "layouts/layout",
            title: "Greentech Maliki",
            page: "detail",
          });
        } else {
          req.flash("success", "Data updated successfully!");
          res.redirect("/reviewer/dashboard/");
        }
      }
    );
  });
});

module.exports = app;
