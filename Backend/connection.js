const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.ATLAS, {})
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

module.exports = mongoose.connection;
