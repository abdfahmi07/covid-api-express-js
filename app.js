const fs = require("fs");
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const app = express();
require("dotenv").config();
require("./config/database");

const router = require("./routes/api");
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  morgan(
    '[:date[web]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms ":user-agent"',
    { stream: accessLogStream }
  )
);
app.use(router);

const { APP_HOST, APP_PORT } = process.env;

app.listen(APP_PORT, () => {
  console.log(`Listening port at http://${APP_HOST}:${APP_PORT}`);
});
