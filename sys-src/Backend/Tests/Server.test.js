/////////////////////////////////////////////
// FileName: Server.test.js
// Autor: Sophie Spies - ea6e
// Erstellt am: 02-06-2022 - 10:00
// letzte Änderung: TT.MM.JJJJ - hh:mm
// Beschreibung: Tests für die Serverlogik
/////////////////////////////////////////////
const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");

//const Room =require("sys-src/Frontend/src/pages/Room.js");

describe("Cards Against, Server logic", () => {
    let io, serverSocket, clientSocket;
//vor allen tests wird eine Verbindung aufgebaut
    //Server und client werden mit serverSocket und ClientSocket dargestellt
    beforeEach((done) => {
        const httpServer = createServer();
        io = new Server(httpServer);
        httpServer.listen(() => {
            //wie muss ich den Port anlegen?
            const port = 3001;
            clientSocket = new Client(`http://localhost:${port}`);
            io.on("connection", (socket) => {
                serverSocket = socket;
            });
            clientSocket.on("connect", done);
        });
    });
//nach allen Tests wird die verbindung geschlossen
    afterEach(() => {
        io.close();
        clientSocket.close();
    });



    //testTest um zu teststen ob alles richtig installiert ist, sollte immer funktionieren
    test('first Try',()=>{
        expect(1).toBe(1);
    })
    ////////////////////////////////////////////
// Kurzbeschreibung:Test für die funktion join_room
// letzte Änderung: 08.06.2022 - 11:22
///////////////////////////////////////////

    test('testing join_room',()=>{
        const room='random1';
        const user='whatever1';
        const user2='whatever2';

        clientSocket.emit("create_room",room,user);
        //clientSocket.emit("join_room",room,user2);
        //testen ob der user dem raum beigetreten
        expect(io.sockets.adapter.rooms.get(room)).not.toBeNull();

    })
    ////////////////////////////////////////////
// Kurzbeschreibung:Test für die funktion join_room,ohne existierenden Raum
// letzte Änderung: 08.06.2022 - 11:23
///////////////////////////////////////////

    test('testing join_room_does_not_exist',()=>{
        const room='random2';
        const user='whatever2';

        clientSocket.emit("join_room",room,user);
        //testen ob der user dem raum beigetreten ist

        expect(io.sockets.adapter.rooms.get(room)).toBeNull();
    })
    ////////////////////////////////////////////
// Kurzbeschreibung:Test für die funktion join_room, wenn dieser voll ist
// letzte Änderung: 04.06.2022 - 10:36
///////////////////////////////////////////
    test('test join_room_voll',()=>{

    })
    ////////////////////////////////////////////
// Kurzbeschreibung:Test für die funktion create_room
// letzte Änderung: 04.06.2022 - hh:mm
///////////////////////////////////////////
    test('test create_room',()=>{
        const room='random4';
        const user='whatever4';


        clientSocket.emit("create_room",room,user);
        //   expect(clientSocket.on()).toBe('joined')
        clientSocket.on('joined',()=>{
            expect(io.socket.username).toBe(user);
            expect(io.socket.rooms).toBe(room);
        })
        // expect(serverSocket.io.sockets.adapter.rooms.get(room).size).toBe(1);

        expect(io.sockets.adapter.rooms.get(room)).not.toBeNull();

    })
    ////////////////////////////////////////////
// Kurzbeschreibung:Test für die funktion create_room, wenn dieser bereits existiert
// letzte Änderung: 02.06.2022 - hh:mm
///////////////////////////////////////////
    test ('test create_room_existiert',()=>{
        const room='random5';
        const user='whatever1';
        const user2='whatever2';

        clientSocket.emit("create_room",room,user);
        clientSocket.emit("create_room",room,user2);

        //testen ob der user dem raum beigetreten

        expect(io.sockets.adapter.rooms.get(room)).not.toBeNull();

    })
});



