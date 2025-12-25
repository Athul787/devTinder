const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const UserModel = require("../models/user.js");
const { validateSignUpData } = require("../utils/validation.js");

authRouter.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);
    const {
      firstName,
      lastName,
      emailId,
      password,
      skills,
      gender,
      about,
      photoUrl,
    } = new UserModel(req.body);
    const passwordHash = await bcrypt.hash(password, 10);
    const user = new UserModel({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      skills,
      gender,
      about,
      photoUrl,
    });
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error occured: " + err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await UserModel.findOne({ emailId: emailId });
    if (user) {
      const isPassword = await user.validatePassword(password);
      if (!isPassword) {
        throw new Error("Invalid Credentials");
      } else {
        const token = await user.getJWT();
        res.cookie("token", token);
        res.send("Authentication successfull");
      }
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Error occured: " + err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send("logout successfull");
});

module.exports = authRouter;
