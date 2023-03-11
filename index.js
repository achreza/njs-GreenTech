const express = require("express");
const app = express();
const session = require("express-session");
const authRoutes = require("./routes/auth");

app.set("view engine", "ejs");

app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: "SECRET",
  })
);

app.use("/auth", authRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("App listening on port " + port));

/*  PASSPORT SETUP  */
