const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");
const { validateEditData } = require("../utils/validation.js");
const validator = require("validator");
const bcrypt = require("bcrypt");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    if (!user) {
      throw new Error("Invalid User");
    }
    res.send(user);
  } catch (err) {
    res.status(400).send("Error occured: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditData(req)) {
      throw new Error("Edit not possible");
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    await loggedInUser.save();
    res.json({
      message: `${loggedInUser.firstName}, your profile was updated successfully`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

profileRouter.patch("/profile/changePassword", userAuth, async (req, res) => {
  try {
    const { existingPassword, newPassword } = req.body;
    const loggedInUser = req.user;
    const isPassword = await loggedInUser.validatePassword(existingPassword);
    if (!isPassword) {
      throw new Error("Invalid existing Password");
    }
    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("Enter a strong password");
    }
    const passwordHash = await bcrypt.hash(newPassword, 10);
    loggedInUser.password = passwordHash;
    loggedInUser.save();
    res.send("Password Changed Successfully");
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

module.exports = profileRouter;
