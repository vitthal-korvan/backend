const express = require("express");

const app = express(); //server is created

//this is a middleware
app.use(express.json());

let notes = []

app.post("/notes", (req, res) => {
  console.log(req.body);
  notes.push(req.body)
  res.json({
    message:"notes added successfully",
    notes:notes
  })
});


//starting the server
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
