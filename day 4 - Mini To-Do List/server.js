let express = require("express");
//starting the server
let app = express();

//home
app.get("/home", (req, res) => {
  res.send("Hello from home");
});

//creating an empty array for storing notes
let notes = [];

//middleware for coverting json to string
app.use(express.json());

//updating notes values to the server
app.post("/notes", (req, res) => {
  console.log(req.body);
  //adding the notes values to the notes array
  notes.push(req.body);
  //printing the message to post when new req created
  res.json({
    message: "notes created successfully",
  });
  res.send("Inside Notes");
});

//delete -> is used for deleting an element from server
//delete from index  -> DELETE/notes/:index
app.delete("/notes/:index", (req, res) => {
  const index = req.params.index;
  delete notes[index];
  res.json({
    message: "note deleted Successfully",
  });
});

//PATCH => /Notes/:index => {title}
app.patch("/notes/:index",(req,res)=>{
      const index = req.params.index
      const {title} = req.body

      notes[index].title = title
      res.json({
            message:"notes updated successfully"
      })
})


//taking values of notes from server to frontend
app.get("/notes", (req, res) => {
  res.json(notes);
});

//starting the port
app.listen(3000, () => {
  console.log("port running on server");
});
