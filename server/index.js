const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

// Init Express
const app = express();

// Use Middlewares
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH"],
  },
});

const port = process.env.PORT || 5110;

server.listen(port, () => {
  console.log(`Server Live on http://localhost:${port}/`);
});

io.on("connection", (socket) => {
  socket.emit("me", socket.id);

  socket.on("disconnect", () => {
    socket.broadcast.emit("call ended");
  });

  socket.on("call_user", ({ userToCall, signalData, from, name }) => {
    io.to(userToCall).emit("call_user", { signal: signalData, from, name });
  });

  socket.on("anser_call", (data) => {
    io.to(data.to).emit("call_accepted", data.signal);
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Hello from Video Chat server" });
});
