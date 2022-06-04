const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");

app.use(express.urlencoded({extended: true}));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "https://admin.socket.io"],
    },
});

let clientNo = 0;

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    clientNo++;

    //socket.join(Math.round(clientNo/2));
    //socket.emit('serverMsg', roomNo);

    console.log(`User Anzahl: ${clientNo}`);
    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`)
    })
    socket.on("disconnect", () => {
        clientNo--;
        console.log(`User Anzahl: ${clientNo}`);
        console.log("User Disconnected", socket.id);
    })
});

instrument(io, {
    auth: {
        type: "basic",
        username: "admin",
        password: "$2b$10$2aKz57DRlsYyayKQQGyT7.zooNka5ZgPb4FejYn9tBLC3IXy7mnAK" // encrypted with bcrypt
      },
  });

server.listen(3001 , () => {
    console.log("server running")
});