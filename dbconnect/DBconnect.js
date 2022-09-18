const mongoose = require("mongoose");

const DBConnect = async (callback) => {
  try {
    const client = await mongoose.connect("mongodb://localhost:27017/sms");
    if (!client) {
      return callback(err);
    }
    return callback();
  } catch (err) {
    return callback(err);
  }
};
/* async function DBConnect() {
  await mongoose.connect("mongodb://localhost:27017/sms");
} */

module.exports = DBConnect;
