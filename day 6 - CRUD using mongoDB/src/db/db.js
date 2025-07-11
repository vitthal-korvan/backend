const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(
      "mongodb+srv://korvanvitthal:xoG9G4QSkoZNjuix@cluster0.mqurdww.mongodb.net/Backend Learning"
    )
    .then(() => {
      console.log("Connected to DB");
    });
}

module.exports = connectToDB;
