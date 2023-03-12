const express = require("express");
const app = express();
const session = require("express-session");
var expressLayout = require("express-ejs-layouts");
// user
const authRoutes = require("./routes/auth");
const home = require("./routes/home");
const userDashboard = require("./routes/users/dashboard");
const userProfile = require("./routes/users/profile");
const userSubmission = require("./routes/users/submission");
const userDetail = require("./routes/users/detail");
const userEdit = require("./routes/users/edit");
// admin
const adminDashboard = require("./routes/admin/dashboard");
const abstractList = require("./routes/admin/list");
const abstractStatus = require("./routes/admin/abstractStatus");
const systemStatus = require("./routes/admin/systemStatus");
const userList = require("./routes/admin/userList");
const userRole = require("./routes/admin/userRole");
const topic = require("./routes/admin/topic");
// reviewer
const revDashboard = require("./routes/reviewer/dashboard");
const revAbstractList = require("./routes/reviewer/abstractList");
const revDetail = require("./routes/reviewer/detail");
const myConnection = require("express-myconnection");
const flash = require("express-flash");
const cookieParser = require("cookie-parser");
const mysql = require("mysql");

app.set("view engine", "ejs");
app.use(expressLayout);

var expressValidator = require("express-validator");
app.use(expressValidator());

var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var methodOverride = require("method-override");

app.use(
  methodOverride(function (req, res) {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

var config = require("./config/config");
var dbOptions = {
  host: config.database.host,
  user: config.database.user,
  password: config.database.password,
  port: config.database.port,
  database: config.database.db,
};

app.use(myConnection(mysql, dbOptions, "pool"));

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);
app.use(flash());

app.use();

app.use("/auth", authRoutes);
// User
app.use("/", home);
app.use("/dashboard", userDashboard);
app.use("/profile", userProfile);
app.use("/submission", userSubmission);
app.use("/detail", userDetail);
app.use("/edit", userEdit);
// Admin
app.use("/admin/dashboard", adminDashboard);
app.use("/admin/list", abstractList);
app.use("/admin/abstract-status", abstractStatus);
app.use("/admin/system-status", systemStatus);
app.use("/admin/user-list", userList);
app.use("/admin/user-role", userRole);
app.use("/admin/topic", topic);
// reviewer
app.use("/reviewer/dashboard", revDashboard);
app.use("/reviewer/abstract-list", revAbstractList);
app.use("/reviewer/detail", revDetail);

// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log("App listening on port " + port));
app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));

app.listen(3000, function () {
  console.log("Server running at port 3000: http://127.0.0.1:3000");
});
