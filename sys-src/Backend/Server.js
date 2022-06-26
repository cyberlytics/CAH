const express = require('express');
const router = express.Router();
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const { assert } = require('console');


//to import mongodb 
var MongoClient = require("mongodb").MongoClient;

var KartenArrayWeiss = [];
var KartenArraySchwarz = [];


//connect url
var url = 'mongodb+srv://WAEGruen:***REMOVED***@karten.u6mqw.mongodb.net/Kartenliste';
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

//gamearray
let lobbyfunctions = require('./game/lobbyfunctions.js')



//socket logik
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);
    clientNo++;

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
            let gameobject = lobbyfunctions.addGame(name, socket.id, data, KartenArraySchwarz.slice(), KartenArrayWeiss.slice());
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

    socket.on('getGameobject', (room) =>{
        socket.emit('push_gameobject', lobbyfunctions.getGame(room));
    })



    socket.on("disconnect", () => {
        clientNo--;
        console.log(`User Anzahl: ${clientNo}`);
        console.log("User Disconnected", socket.id);
        let gameleaveobject = lobbyfunctions.leaveGame(socket.id);
        console.log(gameleaveobject)
        if (gameleaveobject != undefined) {
            // der raum wird gelöscht und alle spieler darin entfernt wenn creater verlässt
            if (gameleaveobject.players[0].socket == socket.id) {
                console.log("der creator ist raus")
                io.in(gameleaveobject.id).emit("LobbyWurdeEntfernt")
                io.in(gameleaveobject.id).socketsLeave(gameleaveobject.id);
            }
            // gameobject wird ans frontend weiter gereicht wenn spieler 2 den raum verlässt
            else {
                console.log("ein Spieler hat die lobby verlassen")
                io.in(gameleaveobject.id).emit("userLeavesLobby", gameleaveobject, io.sockets.adapter.rooms.get(gameleaveobject.id).size)
            }
        }
        else {
            console.log(gameleaveobject)
            console.log("er war in keinem raum")
        }

    })

    
    socket.on("start_game", (data) =>{
        let gamestartobject = lobbyfunctions.getGame(data)
        // checkt ob der spieler, der auf den Knopf gedrückt hat, auch wirklich der Lobby-ersteller ist und sendet an jeden in der Lobby den creatorStartsGame befehl
        // auch wenn der check nicht soo notwendig ist, da ja eh nur der ersteller den knopf sieht
        if(socket.id == gamestartobject.players[0].socket){
            lobbyfunctions.newRound(data);
            io.in(data).emit("creatorStartsGame")
        }
    })

    socket.on("choose Card", (name, card) => {
        let placedcardsobject = lobbyfunctions.AddPlacedWhiteCard(card, name, socket.id)
        // sobald einer eine karte anklickt
        //io.in(placedcardsobject.id).emit("UpdateDisplayedWhiteCards", placedcardsobject.placedwhiteCards)
        console.log(placedcardsobject.players.length)
        console.log(placedcardsobject.placedwhiteCards.length)
        // oder erst wenn alle spieler eine wahl getroffen haben
        if(((placedcardsobject.players.length -1) == (placedcardsobject.placedwhiteCards.length -1 )) && (placedcardsobject.placedwhiteCards.length >1) ){
            io.in(placedcardsobject.id).emit("UpdateDisplayedWhiteCards", placedcardsobject.placedwhiteCards)
            console.log(placedcardsobject.players.length)
            console.log(placedcardsobject.placedwhiteCards)
        }
    })
});


server.listen(3001, () => {
    console.log("server running")
});
