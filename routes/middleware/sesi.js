var express = require("express");
var app = express();

const passport = require("passport");

app.use(passport.initialize());
app.use(passport.session());
app.use("/", function (req, res, next) {
  console.log(req.session.user);
  if (typeof req.session.user === "undefined") {
    res.end("Belum Login");
  }else{
    if (req.session.user.id_role_user == ) {
      
    }
  }
  next();
});

module.exports = app;
