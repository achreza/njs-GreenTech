var express = require("express");
var app = express();
const session = require("express-session");

const passport = require("passport");
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.get("/", function (req, res, next) {
  res.render("pages/auth", { layout: "layouts/layout", title: "GreenTech", page: "auth" });
});
app.get("/success", (req, res) => {
  var emailUser = req.email;
  req.session.user = {
    email: userProfile.emails[0].value,
  };
  req.getConnection(function (error, conn) {
    conn.query("SELECT * FROM m_user where email = '" + userProfile.emails[0].value + "'", function (err, rows, fields) {
      if (rows.length == 0) {
        res.render("pages/success", { layout: "layouts/layout", title: "GreenTech", page: "success", user: userProfile });
      } else {
        req.session.user = {
          email: rows[0].email,
          id_role_user: rows[0].id_role_user,
          id_user: rows[0].id_user,
          nama: rows[0].nama,
          institusi: rows[0].institusi,
        };
        if (rows[0].id_role_user == 1) {
          res.redirect("/admin/dashboard");
        }
        if (rows[0].id_role_user == 2) {
          res.redirect("/dashboard");
        }
        if (rows[0].id_role_user == 3) {
          res.redirect("/dashboard");
        }
        if (rows[0].id_role_user == 4) {
          res.redirect("/reviewer/dashboard");
        }
      }
    });
  });
});
app.get("/error", (req, res) => res.send("error logging in"));
app.get("/errorSQL", (req, res) => res.send("error in SQL Query"));
app.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get("/google/callback", passport.authenticate("google", { failureRedirect: "/auth/error" }), function (req, res) {
  // Successful authentication, redirect success.
  res.redirect("/auth/success");
});

app.post("/register", function (req, res) {
  // req.assert("email", "email is required").notEmpty(); //Validate email
  // req.assert("fullname", "fullname is required").notEmpty(); //Validate fullname
  // req.assert("phone_number", "phone_number is required").notEmpty(); //Validate phone_number
  // req.assert("institution", "institution is required").notEmpty(); //Validate institution

  // var errors = req.validationErrors();

  // if (!errors) {
  //No errors were found.  Passed Validation!

  /********************************************
		 * Express-validator module
		 
		req.body.comment = 'a <span>comment</span>';
		req.body.bobotid_kriteria = '   a bobot    ';

		req.sanitize('comment').escape(); // returns 'a &lt;span&gt;comment&lt;/span&gt;'
		req.sanitize('bobotid_kriteria').trim(); // returns 'a bobot'
		********************************************/
  var user = {
    email: req.sanitize("email").escape().trim(),
    nama: req.sanitize("fullname").escape().trim(),
    no_telp: req.sanitize("phone_number").escape().trim(),
    institusi: req.sanitize("institution").escape().trim(),
    negara: req.sanitize("country").escape().trim(),
    jenis_kelamin: req.sanitize("gender").escape().trim(),
    id_role_user: req.sanitize("category").escape().trim(),
  };
  console.log(user);

  req.getConnection(function (error, conn) {
    conn.query(
      "INSERT INTO `icgt`.`m_user` (`email`, `nama`, `no_telp`, `institusi`, `negara`, `jenis_kelamin`, `id_role_user`) VALUES ('" +
        user.email +
        "', '" +
        user.nama +
        "', '" +
        user.no_telp +
        "', '" +
        user.institusi +
        "', '" +
        user.negara +
        "', '" +
        user.jenis_kelamin +
        "', " +
        user.id_role_user +
        ");",
      function (err, result) {
        //if(err) throw err
        if (err) {
          req.flash("error", err);

          res.redirect("/auth/errorSQL");
        } else {
          req.flash("success", "Data added successfully!");
          //redirect ke dashboard user
          res.render("auth/", { layout: "layouts/layout", title: "GreenTech", page: "auth" });
        }
      }
    );
  });
  // } else {
  //   var error_msg = "";
  //   errors.forEach(function (error) {
  //     error_msg += error.msg + "<br>";
  //   });
  //   req.flash("error", error_msg);

  //   /**
  //    * Using req.body.id_kriteria
  //    * because req.param('id_kriteria') is deprecated
  //    */
  //   res.redirect("/auth/error");
  // }
});

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});

/*  Google AUTH  */

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const GOOGLE_CLIENT_ID = "929483345945-tf903r99ga52e41rv1scuc7qpg9f8790.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      userProfile = profile;
      return done(null, userProfile);
    }
  )
);

module.exports = app;
