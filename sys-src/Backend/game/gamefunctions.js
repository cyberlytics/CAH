var B_Card = 0;
var W_Card = 0;
var S_Card = 0;



exports.giveBlackCard = function(blackCards, listBlack){

    Card = blackCards[B_Card];
    B_Card = B_Card + 1;

    while(listBlack.includes(Card)){
        Card = blackCards[B_Card];
        B_Card = B_Card + 1;
        if(B_Card > blackCards.length){
            B_Card = 0;
        }
    }

    listBlack.push(Card);

    return Card, listBlack;
}


exports.giveWitheCard = function(whiteCards, listWhite){

    Card = blackCards[B_Card];
    W_Card = W_Card + 1;

    while(listWhite.includes(Card)){
        Card = whiteCards[W_Card];
        W_Card = W_Card + 1;
        if(W_Card > whiteCards.length){
            W_Card = 0;
        }
    }

    listWhite.push(Card);

    return Card, listWhite;
}


exports.giveWhitheCardStart = function(whiteCards){

    Start_Cards = []

    for (S_Card; S_Card < 10; S_Card++) {
        const element = whiteCards[S_Card];

        Start_Cards.push(element)

        if(S_Card > whiteCards.length){
            S_Card = 0;
        }
        
    }

    return Start_Cards;
    
}