var express = require("express");
var app = express();
const passport = require("passport");

app.use(passport.initialize());
app.use(passport.session());
const sesi = require("../middleware/sesi_user");
app.use(sesi);

var multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./submissions");
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});
var upload = multer({ storage: storage }).single("file");

app.get("/", function (req, res) {
  // render to views/index.ejs template file
  req.getConnection(function (error, conn) {
    conn.query("SELECT * FROM topic", function (err, rows, fields) {
      res.render("user/submission", {
        data: rows,
        layout: "layouts/layout",
        title: "Greentech Maliki",
        page: "submission",
      });
    });
  });
});

app.post("/post_submission", function (req, res) {
  upload(req, res, function (err) {
    if (err) {
      return res.end("Error uploading file.");
    }
    var abs_submission = {
      topic: req.sanitize("topic").escape().trim(),
      judul: req.sanitize("judul").escape().trim(),
      abstrak: req.sanitize("abstrak").escape().trim(),
      filename: req.file.filename,
      id_status_abs: 1,
      id_user: req.session.user.id_user,
    };

    console.log(abs_submission);

    req.getConnection(function (error, conn) {
      conn.query(
        "INSERT INTO `icgt`.`submission_abstrak` (`topic`,`judul`, `abstrak`, `file_abs`, `submitted_at`, `id_status_abs`, `id_user`) VALUES ('" +
          abs_submission.topic +
          "', '" +
          abs_submission.judul +
          "', '" +
          abs_submission.abstrak +
          "', '" +
          abs_submission.filename +
          "', NOW(), 1, '" +
          abs_submission.id_user +
          "');",
        function (err, result) {
          //if(err) throw err
          if (err) {
            req.flash("error", err);

            // render to views/alternatif/add.ejs
            res.end("Error adding data");
          } else {
            req.flash("Success", "Data added successfully!");

            // render to views/alternatif/add.ejs
            res.end("File is uploaded successfully!");
          }
        }
      );
    });
  });
});

module.exports = app;
