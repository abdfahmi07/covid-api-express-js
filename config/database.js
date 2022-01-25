const mysql = require("mysql2");
require("dotenv").config();

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

const db = mysql.createConnection({
  host: DB_HOST || "localhost",
  user: DB_USERNAME || "root",
  password: DB_PASSWORD || "",
  database: DB_DATABASE || "covid_api_express_v2",
});

db.connect((err) => {
  if (err) {
    console.log(`DB connection is failed, error ${err.stack}`);
  } else {
    console.log("DB connection is success");
    return;
  }
});

module.exports = db;
