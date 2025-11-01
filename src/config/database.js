const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://user:user@namastenode.ntme3zj.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
