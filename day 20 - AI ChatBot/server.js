const app = require("./src/app");
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

io.on("connection", (socket) => {
  console.log("A User Is Connected :)");
  socket.on("disconnect", () => {
    console.log("User is Disconnected");
  });
  socket.on("message", (data) => {
    console.log(data);

    console.log("Message Event Created!");
  });
});

httpServer.listen(3000, () => {
  console.log("Server is running on port 3000");
});
