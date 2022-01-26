const { Sequelize } = require("sequelize");
require("dotenv").config();

const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env;

const db = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
});

const checkConnect = async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

checkConnect();

// const db = mysql.createConnection({
//   host: DB_HOST || "localhost",
//   user: DB_USERNAME || "root",
//   password: DB_PASSWORD || "",
//   database: DB_DATABASE || "covid_api_express_v2",
// });

// db.connect((err) => {
//   if (err) {
//     console.log(`DB connection is failed, error ${err.stack}`);
//   } else {
//     console.log("DB connection is success");
//     return;
//   }
// });

module.exports = db;
