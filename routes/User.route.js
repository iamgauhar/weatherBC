const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const { UserModel } = require("../models/User.model");

const UserRouter = express.Router();

UserRouter.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await UserModel.findOne({ email: email });
  if (newUser) {
    res.status(400).send({ msg: "Allready Exist" });
  } else {
    try {
      bcrypt.hash(password, 7, async (err, hashed) => {
        if (err) {
          return res.status(500).send({ msg: "Try again" });
        }

        const userInfo = new UserModel({
          name: name,
          email: email,
          password: hashed,
        });

        await userInfo.save();
        res.status(201).send({ msg: "User added" });
      });
    } catch (err) {
      return res.status(400).send({ msg: "Try again" });
      console.log(err);
    }
  }
});

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userfind = await UserModel.findOne({ email });
  if (userfind) {
    bcrypt.compare(password, userfind.password, (err, result) => {
      if (result) {
        const token = jwt.sign(
          { email, username: userfind.name },
          process.env.JWT_KEY,
          { expiresIn: "2 days" }
        );

        res.status(200).send({ msg: "Login Success", token: token });
      } else {
        res.status(400).send({ msg: "Invalid Credential" });
      }
    });
  } else {
    res.status(400).send({ msg: "Invalid Credential" });
  }
});

module.exports = { UserRouter };
