const express = require("express");
const app = express();

const port = 3001;
const hostname = "localhost";

app.use((req, res, next) => {
  res.append("Access-Control-Allow-Origin", "*");
  res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.append("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.get("/api/feature-flags", (req, res) => {
  res.send({ isTelegramShareEnabled: true });
});

app.listen(port, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
