const mongoose = require("mongoose");

const mongoDbConnection = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("Connection to mongodb was a success!!!");
  } catch (error) {
    console.log("\x1b[31m%s\x1b[0m", `Connection to mongodb was not a success`);
    process.exit(1);
  }
};

module.exports = mongoDbConnection;
