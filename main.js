const express = require("express");
const path = require("path");
const cors = require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const session = require("express-session");
var crawler = require("crawler");

const user = require("./routes/user");
const config = require("./config/database");
const Crawler = require("crawler");
// const bn = require("./routes/bn");

mongoose.connect(config.database);

mongoose.connection.on("connected", () => {
  console.log("Connected to Database " + config.database);
});

mongoose.connection.on("error", (err) => {
  console.log("Database error: " + err);
});

const app = express();

const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({secret: "secret"}));

app.use(passport.initialize());
app.use(passport.session());
require("./config/passport")(passport);
app.use("/user", user);
// app.use("/bn", bn);

app.listen(process.env.PORT || port, () => {
  console.log(`Server started on http://localhost:${port}`);
});

var gaka = new Crawler(
  {
    callback: function (err, res, done) {
      if(err) console.log(err);
      else{
        var $ = res.$;
        console.log($("table.infobox").text());
      }
      
    done();
    }
  });
gaka.queue('https://ko.wikipedia.org/wiki/%EC%88%98%EC%84%B1');