require("dotenv").config();
const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");
const generateResponse = require("./src/service/ai.service");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

io.on("connection", (socket) => {
  console.log("A User Is Connected :)");
  socket.on("disconnect", () => {
    console.log("User is Disconnected");
  });

  socket.on("ai-message", async (data) => {

    console.log("Recieved AI Message:", data.prompt);
    const response = await generateResponse(data.prompt);
    console.log("AI Response", response);
    socket.emit("ai-message-response", {response})
    
  });
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
