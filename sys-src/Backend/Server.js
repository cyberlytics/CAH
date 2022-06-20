const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");


//to import mongodb 
var MongoClient = require("mongodb").MongoClient;

var KartenArrayWeiss = [];
var KartenArraySchwarz = [];


//connect url
var url = 'mongodb+srv://WAEGruen:1WAEGruppeGruen!@karten.u6mqw.mongodb.net/Kartenliste';
//connect url
MongoClient.connect(url, function (err, client) {
    var db = client.db('Kartenliste');
    if (err) throw err;
    else console.log("DB Contion vorhanden");
    // find documents to 'customers' collection using find
    db.collection("KartenWeiss").find({}).toArray(function (err, result) {
        if (err) throw err;
        console.log("Weiße Karten geholt");
        KartenArrayWeiss = result;
        //console.log(KartenArrayWeiss[1]);
    });
    db.collection("KartenSchwarz").find({}).toArray(function (err, result) {
        if (err) throw err;
        console.log("Scharzw Karten geholt");
        KartenArraySchwarz = result;
        //console.log(KartenArraySchwarz[1]);
        client.close();
    });
});


app.use(express.urlencoded({ extended: true }));

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
    socket.on("join_room", (data, name) => {

        if (io.sockets.adapter.rooms.get(data) == null) {
            console.log("du kannst diesem raum nicht beitreten, er existiert nicht")
            socket.emit("lobby_null");
        }
        else {
            if (io.sockets.adapter.rooms.get(data).size < 5) {
                socket.join(data);
                console.log(`lobbysize ${io.sockets.adapter.rooms.get(data).size}`)
                console.log(`User with ID: ${socket.id} joined room: ${data}`)
                let gamejoinobject = lobbyfunctions.joinGame(data, name, socket.id, false)
                socket.emit("joined", gamejoinobject)
                // console.log(gamejoinobject)
                //schickt allen clients im selben raum die nachricht, alle clients die nach einem gejoint werden beim vorherig gejointen client angezeigt
                io.in(data).emit("updateLobby", gamejoinobject, io.sockets.adapter.rooms.get(data).size)            
            }
            else {
                console.log('Cant join a full lobby')
                socket.emit("lobby_voll")
            }
        }
    })
    socket.on("create_room", (data, name) => {
        if (io.sockets.adapter.rooms.get(data) == null) {
            console.log(`raum ${data} wurde erstellt`)
            socket.join(data);
            let gameobject = lobbyfunctions.addGame(name, socket.id, data, KartenArraySchwarz, KartenArrayWeiss);
            socket.emit('joined', gameobject)
            // console.log(gameobject)
            // io.in(data).emit("creatorJoinsLobby", gameobject, io.sockets.adapter.rooms.get(data).size)
            io.in(data).emit("updateLobby", gameobject, io.sockets.adapter.rooms.get(data).size)
        }
        else {
            console.log("er existiert bereits")
            socket.emit('roomalreadyexists')
        }
    })

    socket.on('new_round', (room) =>{

        temp = lobbyfunctions.newRound(room);

        socket.emit('push_new_round', temp);

    })

    socket.on("send_black_card", (room) => {

        temp = lobbyfunctions.blackCard(room);
        socket.emit('push_black_card', temp);

    })

    socket.on("send_white_card", (room) => {


        temp = lobbyfunctions.whiteCard(room);

        socket.emit('push_white_card', temp);


    })


    socket.on("disconnect", () => {
        clientNo--;
        console.log(`User Anzahl: ${clientNo}`);
        console.log("User Disconnected", socket.id);
    })
});


server.listen(3001, () => {
    console.log("server running")
});