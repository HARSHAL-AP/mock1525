const mongoose = require("mongoose");
const express = require("express");
const { Usermodel } = require("../models/user.model");
const cors = require("cors");
const bcrypt = require("bcrypt");
const userRoute = express.Router();
var jwt = require('jsonwebtoken');
require("dotenv").config();

userRoute.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    bcrypt.hash(password, 5, async (err, hashpass) => {
      if (err) {
        res.send("Bcrypt Error");
      } else {
        const user = new Usermodel({
          email,
          password: hashpass,
        });
        await user.save();
        res.send("New User Registerd....");
      }
    });
  } catch (error) {
    res.send("Error");
  }
});

userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Usermodel.find({ email });
    const hashpass = user[0].password;
    if (user.length > 0) {
      bcrypt.compare(password, hashpass, (err, result) => {
        if (err) {
          res.send("Incorect Password  or Login Creantials...");
        } else {
          const token = jwt.sign({ userid: user[0]._id }, process.env.key);
          res.send({ token: token });
        }
      });
    } else {
      res.send("User Not Found");
    }
  } catch (error) {
    res.send("Error");
  }
});

module.exports = {
  userRoute,
};
