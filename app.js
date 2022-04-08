const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);


const port = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", (socket) => {
  const total = io.engine.clientsCount;

  io.emit("user total", total);

  socket.join("room1");

  socket.on("chat message", (nombre, msg) => {
    socket.broadcast.emit("chat message", nombre, msg);
  });
});

server.listen(port, () => {
  console.log("Server is running on port 3000");
});
