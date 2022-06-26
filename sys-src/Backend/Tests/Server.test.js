/////////////////////////////////////////////
// FileName: Server.test.js
// Autor: Sophie Spies - ea6e
// Erstellt am: 02-06-2022 - 10:00
// letzte Änderung: 22.06.2022 - 19:30
// Beschreibung: Tests für die Serverlogik
/////////////////////////////////////////////
const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");

const lobby =require("../game/lobbyfunctions");
const {joinGame} = require("../game/lobbyfunctions");


describe("Cards Against, Server logic", () => {
    let io, clientSocket,clientSocket2,clientSocket3,clientSocket4,clientSocket5,clientSocket6,RoomId,user;
    jest.setTimeout(5000);
//vor allen tests wird eine Verbindung aufgebaut
    //Server und client werden mit serverSocket und ClientSocket dargestellt
    beforeAll((done) => {
        const RoomId=2;
        const user='whatever';
        const httpServer = createServer();
        io = new Server(httpServer);
        httpServer.listen(() => {

            const port = 3001;
            clientSocket = new Client(`http://localhost:${port}`);

            clientSocket.on("connect", done);
            clientSocket.emit("create_room",RoomId,user);
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

        const user2='whatever2';
        clientSocket2 = new Client(`http://localhost:3001`);

        //clientSocket.emit("create_room",RoomId,user);
        clientSocket2.emit("join_room",RoomId,user2);
        clientSocket2.on("joined",(arg)=>{
            expect(arg).toBeDefined();
            expect(arg).toBe(joinGame(RoomId,user2,clientSocket2.id));
        });
        //testen ob der user dem raum beigetreten
        expect(io.sockets.adapter.rooms.get(RoomId)).not.toBeNull();
        clientSocket2.close();
    })


    test('testing join_room_does_not_exist',()=>{

        //clientSocket.emit("join_room",RoomId,user);
        clientSocket.on("lobby_null",()=>{
            expect(io.socket.rooms).toBeNull();
        })
        //testen ob der user dem raum beigetreten ist

    })

    test('test join_room_voll',()=>{

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
        //clientSocket.emit("create_room",RoomId,user);
        clientSocket2.emit("join_room",RoomId,user2);
        clientSocket3.emit("join_room",RoomId,user3);
        clientSocket4.emit("join_room",RoomId,user4);
        clientSocket5.emit("join_room",RoomId,user5);
        clientSocket6.emit("join_room",RoomId,user6);
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
        const RoomId2=5;

        clientSocket.emit("create_room",RoomId2,user);
        //   expect(clientSocket.on()).toBe('joined')
        clientSocket.on('joined',()=>{
            expect(io.socket.username).toBe(user);
            expect(io.socket.rooms).toBe(RoomId2);
        })
        // expect(serverSocket.io.sockets.adapter.rooms.get(room).size).toBe(1);

        expect(io.sockets.adapter.rooms.get(RoomId)).not.toBeNull();

    })

    test ('test create_room_existiert',()=>{

        const user2='whatever2';

        clientSocket.emit("create_room",RoomId,user2,()=>{
        expect(clientSocket.on('roomalreadyexists')).toBeCalled();
        });
    })
test("test start game",()=>{
    clientSocket.emit("start_game",RoomId,user);
    io.on("creatorStartsGame",()=>{
       expect(lobby.gamestartobject).toBeDefined();
    });
})

test("test send white card",()=>{
    clientSocket.emit("send_white_card",RoomId);
    clientSocket.on('push_white_card',(arg)=>{
        expect(arg).toBeDefined();
    })
})
    test("test send black card",()=>{
        clientSocket.emit("send_black_card",RoomId);
        clientSocket.on('push_black_card',(arg)=>{
            expect(arg).toBeDefined();
        })
    })
    test("lobby black cards",()=>{
const ArrayBlack=new Array('eins','zwei');
        const ArrayWhite=new Array('eins','zwei');
        lobby.addGame(user,3,RoomId,ArrayBlack,ArrayWhite);
        expect(lobby.blackCard(RoomId)).toBeDefined();
    })
    test("lobby white cards",()=>{
        const ArrayBlack=new Array('eins','zwei');
        const ArrayWhite=new Array('eins','zwei');
        lobby.addGame(user,3,RoomId,ArrayBlack,ArrayWhite);
        expect(lobby.whiteCard(RoomId)).toBeDefined();
    })
    test("test server new round",()=>{
        clientSocket.emit("new_round",RoomId);
        clientSocket.on('push_new_round',(arg)=>{
            expect(arg).toBeDefined();
        })
    })
  test("lobby new round",()=>{
      expect(lobby.newRound(RoomId)).toBeDefined();
  })

    test("test black Card",()=>{
//parameter ist die Roomid
        const socketId=3;

        lobby.addGame('random',socketId,RoomId);
        //gameid=raumid
        lobby.joinGame(RoomId,'random',socketId);
        clientSocket.emit("send_black_card",RoomId);
        clientSocket.on('push_black_card',(arg)=>{
            expect(arg).toBeDefined();
            expect(lobby.blackCard(RoomId)).not.toBeNull();
        })
    })


    test("test white Card",()=>{
        const socketId=3;
        //clientSocket.emit("create_room",RoomId,user);
        lobby.addGame('random',socketId,RoomId);
        //gameid=raumid
        lobby.joinGame(RoomId,'random',socketId);
        clientSocket.emit("send_white_card",RoomId);
        clientSocket.on('push_white_card',(arg)=>{
            expect(arg).toBeDefined();
            expect(lobby.whiteCard(RoomId)).not.toBeNull();
        })
    })

    test("test new Round",()=>{
        const socketId=3;
        //clientSocket.emit("create_room",RoomId,user);
        lobby.addGame('random',socketId,RoomId);
        //gameid=raumid
        lobby.joinGame(RoomId,'random',socketId);
        //clientSocket.emit("create_room",RoomId,user);
        clientSocket.emit("start_game",RoomId,user);
        //expects müssen ion start game stehen
        io.on("creatorStartsGame",()=>{
        expect(lobby.newRound(RoomId)).not.toBeNull();
        expect(lobby.newRound(RoomId)).not.toBeNull();
        });
    })


    test("test join Game",()=>{
        lobby.addGame('random',3,RoomId);
        expect(lobby.joinGame(RoomId,'random',3)).toBeDefined();
    })
    //not working,start game?
    test("test leave Game",()=>{
        const socketId=3;
        clientSocket.emit("create_room",RoomId,user);
        lobby.addGame(user,socketId,RoomId);
        //gameid=raumid
        lobby.joinGame(RoomId,user,socketId);
       // clientSocket.emit("start_game",RoomId,user);
        expect(lobby.leaveGame(socketId)).toBeDefined();
    })
test("test leave game 2",()=>{
    expect(lobby.leaveGame(5)).toBeUndefined();
})

    test("test Add Game",()=>{
        const socketId=3;
        expect(lobby.addGame(user,socketId,RoomId)).toBeDefined();

    })



    test("leave empty game",()=>{
        expect(lobby.leaveGame(10)).toBeUndefined();
    })
    //testen ob jeder Spieler karten bekommt
    //leve game wenn keiner im spiel war
    //testen wenn wer anderes als creator das spiel verlässt
});


