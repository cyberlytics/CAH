

let games = [{}]

exports.addGame = function (username, socketID, roomname) {
    let game = {
        id: roomname,
        players: [{
            player: username,
            socket: socketID,
        }],
    }
    games[game.id] = game
    return game;
};

exports.joinGame = function joinGame(gameID, username, socketID) {
    let player = {
        player: username,
        socket: socketID,
    }
    games[gameID].players.push(player);
    return games[gameID];
}

exports.leaveGame = function leaveGame(socketID) {
    let check = false;
    let index2;
    if(games.length == 0){
        return undefined;
        console.log("leer");
    }
console.log("games: ", games);
        games.forEach(element => {
            console.log(element);
            console.log(games[0]);
            console.log(games[1]);
            if(element.players != undefined){   
                console.log(element.players);            
                element.players.forEach(element2 => {
                    if(element2.socket.includes(socketID)){
                        const index = element.players.indexOf(element2);
                        element.players.splice(index, 1)
                        index2 = games.indexOf(element)
                        check = true;
                        console.log("gefunden");
                        return games[index2];
                    }
                });
                
            }
            
        });
    if(!check){
        return undefined;
    }
    return games[index2];
}