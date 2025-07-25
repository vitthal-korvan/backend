//db.js

const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(
     process.env.MONGODB_URL || "mongodb://localhost:27017/MoodyPlayer",
    )
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.error("Error connecting to DB:", err);
    });
}

module.exports = connectToDB;
