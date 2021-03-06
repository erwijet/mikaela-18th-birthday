const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

dotenv.config(); // enable .env

express()
  .use(morgan("common")) // logging
  .use(cookieParser()) // COOKIES!! (store api data in cookie so it isnt public)
  .use(bodyParser.urlencoded({ extended: true })) // read POST requests
  .use(express.static("public")) // serve css & js publicly

  .set("view engine", "pug") // render with pug (aka jade)

  .get("/dev", (req, res) => {
    res.render("index");

    // dev route to test index page w/o cookie auth
  })

  .get("/", (req, res) => {
    if (req.cookies.auth != process.env.API) {
      res.redirect("/auth");
      return;
    }

    res.render("index");
  })

  .get("/auth", (req, res) => {
    if (req.cookies.auth == process.env.API) {
      res.redirect("/");
      return;
    }

    if (req.query.guess == process.env.PASS) {
      res.cookie("auth", process.env.API);
      res.redirect("/auth");
    }

    res.render("auth");
  })

  .get("/logout", (req, res) => {
    res.clearCookie("auth"); // revoke cookie
    res.redirect("/auth");
  })

  .listen(process.env.PORT || 1010, "0.0.0.0", () => {
    console.log("server listening on port " + (process.env.PORT || 1010));
  });
