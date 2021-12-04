const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const config = require("../config/database");
const Card = require("../models/card");

router.post("/register", (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  });

  User.getUserByUsername(newUser.username, (err, user) => {
    if (err) throw err;
    if (user) {
      return res.json({
        success: false,
        msg: "That ID already exists!",
      });
    } else {
      User.addUser(newUser, (err, user) => {
        if (err) {
          res.json({ success: false, msg: "Fail to SignUP" });
        } else {
          res.json({ success: true, msg: "SignUP Complete!" });
        }
      });
    }
  });
});

router.post("/authenticate", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: "NONE!" });
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        let tokenUser = {
          _id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
        };
        const token = jwt.sign({ data: tokenUser }, config.secret, {
          expiresIn: 864000,
        });
        res.json({
          success: true,
          token: token,
          userNoPW: tokenUser,
        });
      } else {
        return res.json({
          success: false,
          msg: "ERROR PASSWORD!",
        });
      }
    });
  });
});

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.json({
      user: {
        name: req.user.name,
        usernmae: req.user.username,
        email: req.user.email,
        no: 0
      },
    });
  }
);

router.get("/board",
  passport.authenticate("jwt", { session: false }), (req, res, next) => {
    User.getAll((err, users) => {
      if (err) throw err;
      else { res.json(users) };
    });
  });

router.post("/cardboard", (req, res, next) => {
  let username = req.body.username;
  let update = {
    name: req.body.name,
    board: req.body.board,
  };

  Card.getCardByUsername(username, (err, card) => {
    if (err) throw err;
    if (card) {
      Card.revCard(username, update, (err, card) => {
        return res.json({ success: false, msg: "Updated!" });
      });
    } else {
      update.username = req.body.username;
      let newCard = new Card(update);
      Card.addCard(newCard, (err, card) => {
        if (err) throw err;
        if (card) {
          return res.json({ success: true, msg: "생성됨!" });
        } else {
          return res.json({ success: false, msg: "실패됨!" });
        }
      });
    }
  });

});

router.post("/myCard", (req, res, next) => {
  Card.getCardByUsername(req.body.username, (err, card) => {
    if (err) throw err;
    if (card) { return res.json({ success: true, card: JSON.stringify(card), }); }
    else { res.json({ success: false, msg: "명함정보가 없습니다" }); }
  });
});

module.exports = router;