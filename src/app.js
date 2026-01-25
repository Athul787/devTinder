const express = require("express");
const app = express();
const connectDB = require("./config/database.js");
const UserModel = require("./models/user.js");
const { connections } = require("mongoose");
const cookieParser = require("cookie-parser");
const { userAuth } = require("./middlewares/auth.js");
var cors = require("cors");

var corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");
const userRouter = require("./routes/user.js");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

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
