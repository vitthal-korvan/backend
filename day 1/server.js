// http -> it is a module. didn't require to install
//express -> it is a package. reuired to install 

const http = require('http')

const server = http.createServer((req,res)=>{
      res.end("Hello! Code Subtle") //printing message to server
}) //for creating the server


//for starting the server
server.listen(3000,()=>{
      console.log("server is running");
})