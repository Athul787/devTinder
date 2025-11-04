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

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new UserModel(req.body);

  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error occured" + err.message);
  }
});
