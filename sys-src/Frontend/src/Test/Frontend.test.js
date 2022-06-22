const { createServer } = require("http");
//const { Server } = require("socket.io");
const Client = require("socket.io-client");


describe("Cards Against, Server logic", () => {
    let io, serverSocket, clientSocket, clientSocket2, clientSocket3, clientSocket4, clientSocket5, clientSocket6;
    jest.setTimeout(5000);
//vor allen tests wird eine Verbindung aufgebaut
    //Server und client werden mit serverSocket und ClientSocket dargestellt
    beforeAll((done) => {

        const httpServer = createServer();
        //io = new Server(httpServer);
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

    test("testing",()=>{
        expect(1).toBe(1);
    })
})