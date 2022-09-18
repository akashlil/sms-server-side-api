const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
require("dotenv").config();
const mongoose = require("mongoose");
const DBConnect = require("./dbconnect/DBconnect");

/* router path link */
const adminRoute = require("./routes/v1/admin.route");

/* connect to mongoose  */
DBConnect((err) => {
  if (!err) {
    app.listen(5000, () => {
      console.log("server is connect");
    });
  } else {
    console.log("server is not connect");
  }
});

/* router link */

app.use("/api/v1/admin", adminRoute);
