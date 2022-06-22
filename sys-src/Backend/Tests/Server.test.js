/////////////////////////////////////////////
// FileName: Server.test.js
// Autor: Sophie Spies - ea6e
// Erstellt am: 02-06-2022 - 10:00
// letzte Änderung: 15.06.2022 - 19:30
// Beschreibung: Tests für die Serverlogik
/////////////////////////////////////////////
const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");
const game =require ("../game/gamefunctions");
const lobby =require("../game/lobbyfunctions");
const {joinGame} = require("../game/lobbyfunctions");

//const Room =require("sys-src/Frontend/src/pages/Room.js");

describe("Cards Against, Server logic", () => {
    let io, serverSocket, clientSocket,clientSocket2,clientSocket3,clientSocket4,clientSocket5,clientSocket6;
    jest.setTimeout(5000);
//vor allen tests wird eine Verbindung aufgebaut
    //Server und client werden mit serverSocket und ClientSocket dargestellt
    beforeAll((done) => {

        const httpServer = createServer();
        io = new Server(httpServer);
        httpServer.listen(() => {

            const port = 3001;
            clientSocket = new Client(`http://localhost:${port}`);

            clientSocket.on("connect", done);
        });

    });
//nach allen Tests wird die verbindung geschlossen
    afterAll(() => {
        io.close();
        //clientSocket.emit("disconnect");
        clientSocket.close();

    });



    //testTest um zu teststen ob alles richtig installiert ist, sollte immer funktionieren
    test('first Try',()=>{
        expect(1).toBe(1);
    })


    test('testing join_room',()=>{
        const room=1;
        const user='whatever1';
        const user2='whatever2';
        clientSocket2 = new Client(`http://localhost:3001`);

        clientSocket.emit("create_room",room,user);
        clientSocket2.emit("join_room",room,user2);
        clientSocket2.on("joined",(arg)=>{
            expect(arg).toBeDefined();
            expect(arg).toBe(joinGame(room,user2,clientSocket2.id));
        });
        //testen ob der user dem raum beigetreten
        expect(io.sockets.adapter.rooms.get(room)).not.toBeNull();
        clientSocket2.close();
    })


    test('testing join_room_does_not_exist',()=>{
        const room=2;
        const user='whatever2';

        clientSocket.emit("join_room",room,user);
        clientSocket.on("lobby_null",()=>{
            expect(io.socket.rooms).toBeNull();
        })
        //testen ob der user dem raum beigetreten ist

    })

    test('test join_room_voll',()=>{
        const room=1;
        const user='whatever1';
        const user2='whatever2';
        const user3='whatever3';
        const user4='whatever4';
        const user5='whatever5';
        const user6='whatever6';
        clientSocket2 = new Client(`http://localhost:3001`);
        clientSocket3 = new Client(`http://localhost:3001`);
        clientSocket4 = new Client(`http://localhost:3001`);
        clientSocket5 = new Client(`http://localhost:3001`);
        clientSocket6 = new Client(`http://localhost:3001`);
        clientSocket.emit("create_room",room,user);
        clientSocket2.emit("join_room",room,user2);
        clientSocket3.emit("join_room",room,user3);
        clientSocket4.emit("join_room",room,user4);
        clientSocket5.emit("join_room",room,user5);
        clientSocket6.emit("join_room",room,user6);
        clientSocket6.on("lobby_full",()=>{
            expect(io.socket.rooms).toBeNull();
        });
        clientSocket2.close();
        clientSocket2.close();
        clientSocket3.close();
        clientSocket4.close();
        clientSocket5.close();
        clientSocket6.close();
    })

    test('test create_room',()=>{
        const room=4;
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

    test ('test create_room_existiert',()=>{
        const room=5;
        const user='whatever1';
        const user2='whatever2';

        clientSocket.emit("create_room",room,user);
        clientSocket.emit("create_room",room,user2);

        //testen ob der user dem raum beigetreten

        expect(io.sockets.adapter.rooms.get(room)).not.toBeNull();

    })
    test('test send white card',()=>{

    })
    test('test send black card',()=>{

    })

    //tests der Datei gamefunctions
    test("black Card",()=>{

        expect(game.giveBlackCard(5)).not.toBeNull();
    })
    test("white Card",()=>{

        expect(game.giveWitheCard(3)).not.toBeNull();
    })
    test("start Card",()=>{

        expect(game.giveWhitheCardStart(9)).not.toBeNull();
    })
//Tests de Datei lobbyfunctions
    //auf welche komponenten von game kann ich testen
    test("test join Game",()=>{
        lobby.addGame('random',3,1);
        expect(lobby.joinGame(1,'random',3)).toBeDefined();
    })
    test("test leave Game",()=>{
        const socketId=3;
        lobby.addGame('random',socketId,1);
        //gameid=raumid
        lobby.joinGame(1,'random',socketId);
        expect(lobby.leaveGame(socketId)).not.toBeDefined();
    })
    test("test Add Game",()=>{
        expect(lobby.addGame('random',3,1)).toBeDefined();
    })
});


