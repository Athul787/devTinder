const express = require("express");
const app = express();

app.get("/test/:something", (req, res) => {
  console.log(req.params);
  res.send("Get call");
});

app.post("/test", (req, res) => {
  //   console.log(req.body);
  res.send("Post call");
});

app.listen(3000, () => {
  console.log("Server successfully listening on port 3000");
});
