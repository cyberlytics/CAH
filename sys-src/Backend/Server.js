const express = require('express');
const router = express.Router();
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const Karte = require('/Datenbank/Kartenliste.js');

// Contetion für MongoDB
const mongoose = require('mongoose');
const { assert } = require('console');
mongoose.connect('mongodb+srv://WAEGruen:***REMOVED***@karten.u6mqw.mongodb.net/Kartenliste', {
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


/////////////////
/*
* Funktion für das holen Weißer Karten
* Erstellt von: Johannes Sporrer
* Letzte Änderung: 06.06.2022 
*/
/////////////////////
app.get('/all-Kards', (req, res) => {
    Karte.find()
    .then((result) =>{
        res.send(result);
        console.log(result)
    })
    .catch((err) =>{
        console.log(err)
    })
});
