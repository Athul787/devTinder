const express = require("express");
const app = express();
const { authChecker } = require("./middlewares/auth");
const connectDB = require("./config/database.js");
const UserModel = require("./models/user.js");

connectDB()
  .then(() => {
    console.log("database connected");
    app.listen(3000, () => {
      console.log("Server successfully listening on port 3000");
    });
  })
  .catch((err) => {
    console.error("database can not be connected");
  });

app.post("/signup", async (req, res) => {
  const user = new UserModel({
    firstName: "Athul",
    lastName: "Krishna B",
    emailId: "ath@gmail.com",
    password: "Athul@123",
  });

  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error occured" + err.message);
  }
});
