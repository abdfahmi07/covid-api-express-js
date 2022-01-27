const mongoose = require("mongoose");
require("dotenv").config();

const main = async () => {
  await mongoose.connect(process.env.MONGODB_HOST);
};

main()
  .then(() => console.log("DB connection is successfully"))
  .catch((err) => console.log(`DB connection is failed: ${err}`));
