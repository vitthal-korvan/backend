const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(
      "mongodb+srv://korvanvitthal:xoG9G4QSkoZNjuix@cluster0.mqurdww.mongodb.net/backendNotes"
    )
    .then(() => {
      console.log("Connected to DB");
    });
}

module.exports = connectToDB;
