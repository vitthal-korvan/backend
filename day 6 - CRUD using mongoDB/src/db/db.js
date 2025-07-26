const mongoose = require("mongoose");

function connectToDB() {
  mongoose
    .connect(
      "mongodb+srv://korvanvitthal:mBqlyhnl9xJYbAvP@cluster0.mqurdww.mongodb.net/crudNotes"
    )
    .then(() => {
      console.log("Connected to DB");
    });
}

module.exports = connectToDB;
