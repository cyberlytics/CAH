const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");

// Contetion für MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://WAEGruen:1WAEGruppeGruen!@karten.u6mqw.mongodb.net/Data', {
    useUnifiedTopology : true,
    useNewUrlParser : true,
}).then(console.log('Connected to Mongo DB'))

app.use(express.urlencoded({extended: true}));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
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

server.listen(3001 , () => {
    console.log("server running")
});