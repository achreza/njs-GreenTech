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

app.set("view engine", "ejs");
app.use(expressLayout);

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);

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
app.use("/reviewer/dashboard",revDashboard);
app.use("/reviewer/abstract-list",revAbstractList);
app.use("/reviewer/detail",revDetail);


// const port = process.env.PORT || 3000;
// app.listen(port, () => console.log("App listening on port " + port));
app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));

app.listen(3000, function () {
  console.log("Server running at port 3000: http://127.0.0.1:3000");
});

