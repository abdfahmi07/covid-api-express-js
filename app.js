const express = require("express");
const app = express();

require("dotenv").config();

const router = require("./routes/api");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

const { APP_HOST, APP_PORT } = process.env;

app.listen(APP_PORT, () => {
  console.log(`Listening port at http://${APP_HOST}:${APP_PORT}`);
});
