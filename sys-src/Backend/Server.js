const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");

app.use(express.urlencoded({extended: true}));

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
    },
});

let clientNo = 0;

//socket logik
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    clientNo++;

    console.log(`User Anzahl: ${clientNo}`);
    socket.on("join_room", (data, name) => {
        
        if(io.sockets.adapter.rooms.get(data) == null){
            console.log("du kannst diesem raum nicht beitreten, er existiert nicht")
            socket.emit("lobby_null");
        }
        else{
            if(io.sockets.adapter.rooms.get(data).size < 5){
                socket.join(data);
                console.log(`lobbysize ${io.sockets.adapter.rooms.get(data).size}`)
                console.log(`User with ID: ${socket.id} joined room: ${data}`)
                socket.emit("joined")
                //schickt allen clients im selben raum die nachricht
                io.to(data).emit("userJoinsLobby", name, io.sockets.adapter.rooms.get(data).size)
            }
            else{
                console.log('Cant join a full lobby')
                socket.emit("lobby_voll")
            }
        }      
    })
    socket.on("create_room", (data, name) =>{
        if(io.sockets.adapter.rooms.get(data) == null){
            console.log(`raum ${data} wurde erstellt`)
            socket.join(data);
            socket.emit('joined')
        }
        else{
            console.log("er existiert bereits")
            socket.emit('roomalreadyexists')
        }
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