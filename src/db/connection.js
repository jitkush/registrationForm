const mongoose = require("mongoose");
require("dotenv").config({ path: `${__dirname}/../../config.env` });

const DATABASE = process.env.DATABASE;

mongoose
  .connect(DATABASE)
  .then(() => console.log("DB connection established"))
  .catch((e) => console.log(`connection failed+\n +\n ${e}`));
