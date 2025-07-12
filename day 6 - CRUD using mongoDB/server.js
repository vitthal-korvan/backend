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

app.get("/notes", async (req, res) => {
  const notes = await noteModel.find();


  res.json({
    message: "Note Created Successfully",
    notes
  });
});


app.delete("/notes/:id", async (req, res) => {
  const noteId = req.params.id;
  await noteModel.findByIdAndDelete({
    _id: noteId,
  });

  res.json({
    message: "Note Deleted Successfully",
  });
});


app.patch("/notes/:id", async (req, res) => {
  const noteId = req.params.id;
  const { title } = req.body;

  await noteModel.findByIdAndUpdate(
    { _id: noteId },
    { title:title })
  res.json({
    message: "Note Updated Successfully", 
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
