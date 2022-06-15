

let games = [{}]

exports.addGame = function (username, socketID, roomname, isCreator) {
    let game = {
        id: roomname,
        players: [{
            player: username,
            socket: socketID,
            creator: isCreator,
        }],
    }
    games[game.id] = game
    return game;
};

exports.joinGame = function joinGame(gameID, username, socketID, isCreator) {
    let player = {
        player: username,
        socket: socketID,
        creator: isCreator,
    }
    games[gameID].players.push(player);
    return games[gameID];
}

exports.leaveGame = function leaveGame(socketID) {
    let check = false;
    let index2;
    if(games.length == 0){
        return undefined;
    }
        games.forEach(element => {
            if(element.players != undefined){             
                element.players.forEach(element2 => {
                    if(element2.socket.includes(socketID)){
                        const index = element.players.indexOf(element2);
                        element.players.splice(index, 1)
                        index2 = games.indexOf(element)
                        check = true;
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

exports.getGame = function getGame(gameID){
    return games[gameID];
}