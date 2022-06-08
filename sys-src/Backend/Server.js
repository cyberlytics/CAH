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
    var db= client.db('Kartenliste');
    if (err) throw err;
    else console.log("DB Contion vorhanden");
      // find documents to 'customers' collection using find
    db.collection("KartenWeiss").find( { } ).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        KartenArrayWeiss = result;  
  });
    db.collection("KartenSchwarz").find( { } ).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        KartenArraySchwarz = result;
        client.close();  
});
});



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
