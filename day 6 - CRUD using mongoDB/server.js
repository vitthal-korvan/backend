//Server.js
const express = require("express");
const connectToDB = require("./src/db/db");
const noteModel = require("./src/models/note.model");

connectToDB();

const app = express();

app.use(express.json());

app.post("/notes", async(req, res) => {
  const { title, content } = req.body;
  console.log(title, content);

  await noteModel.create({
    title,
    content,
  });

  res.json({
      message:"Note Created Successfully"
  })
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
