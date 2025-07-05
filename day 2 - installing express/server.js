const express = require("express")

const app = express()//server is created

app.get('/home',(req,res)=>{
      /*
      it contains request from the client
      req.body
      req.query
      req.params


      req.headers & req.cookies

      */

      res.send("Welcome to home")
})

app.get("/about", (req, res) => {
  res.send("Welcome to about");
});

//starting the server
app.listen(3000,()=>{
      console.log("server is running on port 3000");
})