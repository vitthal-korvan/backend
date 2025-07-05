const express = require("express");

const app = express(); //server is created

app.post("/notes",(req,res)=>{
  res.send("where are you?")
})

//starting the server
app.listen(3000, () => {
  console.log("server is running on port 3000");
});
