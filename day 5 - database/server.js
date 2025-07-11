const express = require("express");
const connectToDB = require("./src/db/db")


connectToDB()

const app = express();

const notes = [];

app.use(express.json());

app.get("/notes", (req, res) => {
  res.json(notes)
});

app.post("/notes", (req, res) => {
  const {title,content} = req.body 
  console.log(title, content);
  
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
