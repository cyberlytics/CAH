

let games = []

exports.addGame = function (username, socketID, roomname) {
    let game = {
        id: roomname,
        players: [{
            player: username,
            socket: socketID,
        }],
    }
    games.push(game);
    return game;
};

exports.joinGame = function joinGame(gameID, username, socketID) {
    let player = {
        player: username,
        socket: socketID,
    }
    games.find(element => element.id == gameID).players.push(player);
    return games.find(element => element.id == gameID);
}

exports.leaveGame = function leaveGame(socketID) {
    let copyelement;
    let index2;
    if (games.length == 0) {
        return undefined;
    }

    for (let element of games) {
        if (element.players != undefined) {
            for (let element2 of element.players) {
                if (element2.socket.includes(socketID)) {
                    const index = element.players.indexOf(element2);
                    if (index == 0) {
                        console.log("creator verlässt raum")
                        copyelement = structuredClone(element);
                        games.splice(games.indexOf(element), 1)
                        // game wird aus dem komplettem array gelöscht wenn creator den raum verlässt
                        return copyelement;
                    }
                    else {
                        // ansonsten wird nur der player aus dem array players gelöscht
                        console.log("anderer spieler verlässt raum")
                        element.players.splice(index, 1)
                        return element;
                    }
                }
            };
        }

    };
    console.log("spieler ist in keiner der räume")
    return undefined;
}