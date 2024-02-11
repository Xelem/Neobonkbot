const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config({ path: "./config.env" });
const { chatFn, startFn, helpFn, homeFn } = require("./controllers/lib");

chatFn;
startFn;
helpFn;
homeFn;

app.get("*", (req, res) => {
  res.send("Telegram bot running");
});

const port = process.env.PORT || 3000;
const server = app.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`Server running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});
