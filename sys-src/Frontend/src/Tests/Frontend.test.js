/////////////////////////////////////////////
// FileName: Frontend.test.js
// Autor: Sophie Spies - ea6e
// Erstellt am: 16-06-2022 - 9:00
// letzte Änderung: TT.MM.JJJJ - hh:mm
// Beschreibung: Tests für die Serverlogik
/////////////////////////////////////////////
const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");
const lobby =require("../pages/Lobby");

describe("Cards Against, Server logic", () => {

    let io, serverSocket, clientSocket;

    beforeAll((done) => {
        const httpServer = createServer();
        io = new Server(httpServer);
        httpServer.listen(() => {
            const port = httpServer.address().port;
            clientSocket = new Client(`http://localhost:${port}`);
            io.on("connection", (socket) => {
                serverSocket = socket;
            });
            clientSocket.on("connect", done);
        });
    });

    afterAll(() => {
        io.close();
        clientSocket.close();
    });
    test("test",()=>{
        expect(1).toBe(1);
    })
})