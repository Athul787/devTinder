const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { isLowercase } = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
});

userSchema.methods.getJWT = async function () {
  const user = this;
  const token = await jwt.sign({ _id: user.id }, "DevTinder@790", {
    expiresIn: "1d",
  });
  return token;
};

userSchema.methods.validatePassword = async function (password) {
  const user = this;
  const isPassword = await bcrypt.compare(password, user.password);
  return isPassword;
};

module.exports = mongoose.model("User", userSchema);
