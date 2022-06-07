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

//gamearray
let lobbyfunctions = require('./game/lobbyfunctions.js')

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
                let gamejoinobject = lobbyfunctions.joinGame(data, name, socket.id)
                socket.emit("joined", gamejoinobject)
                console.log(gamejoinobject)
                 //schickt allen clients im selben raum die nachricht, alle clients die nach einem gejoint werden beim vorherig gejointen client angezeigt
                io.in(data).emit("userJoinsLobby", gamejoinobject, io.sockets.adapter.rooms.get(data).size)            
            }
            else{
                console.log('Cant join a full lobby')
                socket.emit("lobby_voll")
            }
        }      
    })
    socket.on("create_room", (data, name) =>{
        if(io.sockets.adapter.rooms.get(data) == null){
            console.log(`UserName is: ${name}`)
            console.log(`raum ${data} wurde erstellt`)
            socket.join(data);
            let gameobject = lobbyfunctions.addGame(name, socket.id, data);
            socket.emit('joined', gameobject)
            console.log(gameobject)
            io.in(data).emit("userJoinsLobby", gameobject, io.sockets.adapter.rooms.get(data).size)
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
        let gameleaveobject = lobbyfunctions.leaveGame(socket.id);
        console.log(gameleaveobject)
        if(gameleaveobject != undefined){
            if(io.sockets.adapter.rooms.get(gameleaveobject.id)){
                io.in(gameleaveobject.id).emit("userLeavesLobby", gameleaveobject, io.sockets.adapter.rooms.get(gameleaveobject.id).size) 
            }
            else{
                console.log("er war der letzte der gegangen ist, keiner muss benachrichtigt werden")
            }
        }
        else{
            console.log(gameleaveobject)
            console.log("er war in keinem raum")
        }

    })
});

server.listen(3001 , () => {
    console.log("server running")
});