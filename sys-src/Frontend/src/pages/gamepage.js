import React, { useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import {useNavigate, useParams} from 'react-router-dom';
import {Col, Row, Container, Button} from 'react-bootstrap';
import BlackCard from '../components/BlackCard.js';
import WhiteCardStack from '../components/WhiteCardStack.js';
import UserContextProvider from '../contexts/UserContext.js';
import WhiteCard from '../components/WhiteCard.js';
import { propTypes } from 'react-bootstrap/esm/Image.js'; 
import {useState} from "react";
import {UserContext} from "../contexts/UserContext";

function GamePage(props){

const [blackCard, setBlackCard] = useState([]);
const [playerHand, setPlayerHand] = useState([]);
const [roundIsPlayed, setRoundIsPlayed] = useState(false); 
const [playedRound, updatePlayedRound] = useState([]);
const [playerCount, setPlayerCount] = useState();
const [cardZar, setCardZar] = useState(false);

return (
    <UserContext.Consumer>
    {(context) => {
        const { userName, userRoom } = context;

props.Socket.on("UpdateDisplayedWhiteCards", (chosenCards) => {
    console.log(chosenCards[0].currWhiteCard);
    setRoundIsPlayed(true);
    updatePlayedRound(chosenCards);


});

props.Socket.on("push_gameobject", (gameObject) =>{
    console.log(gameObject);
    if(gameObject.players[0].socket == props.Socket.id){
        setCardZar(true);
    }
    setBlackCard(gameObject.currBlackCard);
    setPlayerCount(gameObject.players.length)
    
    gameObject.players.forEach(element=>{
        if(element.socket == props.Socket.id) {
            setPlayerHand(element.hand);
        }
    });
    console.log(playerHand);
});








    return (
        <Container fluid className="vh-100">
            <Row className='centerField'>
                <Col><BlackCard title = {blackCard.Inhalt}/></Col>
                <Col>
                    {roundIsPlayed && (playerCount >=2 ) && (
                     <Button disabled={!cardZar} className ="BTN color: black !important" variant ="outline-dark"
                     onClick={()=>{
                            props.Socket.emit("pick winner", playedRound[1].player);
                            console.log("wurde gecklickt");
                     }}>
                    <WhiteCard reCards={playedRound[1].currWhiteCard}></WhiteCard>
                    </Button>
                    )}
                </Col>

                <Col>
                    {roundIsPlayed && (playerCount  >= 3) && (
                    <Button disabled={!cardZar} className ="BTN color: black !important" variant ="outline-dark"
                          onClick={()=>{
                            props.Socket.emit("pick winner", playedRound[2].player);
                            console.log("wurde gecklickt");
                     }}>
                    <WhiteCard reCards={playedRound[2].currWhiteCard}></WhiteCard>
                     </Button>
                    )}
                </Col>
            
                <Col>
                    {roundIsPlayed && (playerCount >= 4) && (
                    <Button disabled={!cardZar} className ="BTN color: black !important" variant ="outline-dark"
                    onClick={()=>{
                        props.Socket.emit("pick winner", playedRound[3].player);
                        console.log("wurde gecklickt");
                 }}>
                    <WhiteCard reCards={playedRound[3].currWhiteCard}></WhiteCard>
                    </Button>
                    )}
                </Col>
                <Col>
                    {roundIsPlayed && (playerCount >= 5) && (
                    <Button disabled={!cardZar} className ="BTN color: black !important" variant ="outline-dark"
                    onClick={()=>{
                        props.Socket.emit("pick winner", playedRound[4].player);
                        console.log("wurde gecklickt");
                 }}>
                    <WhiteCard reCards={playedRound[4].currWhiteCard}></WhiteCard>
                    </Button>
                    )}
                </Col>
            </Row>

          <Row className ="playerHand">
                <Col>
                    <Button disabled={cardZar} className ="BTN color: black !important" variant ="outline-dark"
                    onClick={() => { 
                        props.Socket.emit("choose Card", userName,playerHand[0].Inhalt)
                        console.log(playerHand[0].Inhalt)}}>
                        <WhiteCard Cards={playerHand[0]}/>
                    </Button>
                </Col>
                <Col>
                    <Button disabled={cardZar} className ="BTN color: black !important" variant ="outline-dark" 
                    onClick={() => { 
                        props.Socket.emit("choose Card", userName,playerHand[1].Inhalt)
                        console.log(playerHand[1].Inhalt)}}>
                        <WhiteCard Cards={playerHand[1]}/>
                    </Button>
                </Col>
                <Col>
                    <Button disabled= {cardZar} className ="BTN color: black !important" variant="outline-dark"
                    onClick={() => { 
                        props.Socket.emit("choose Card", userName,playerHand[2].Inhalt)
                        console.log(playerHand[2].Inhalt)}}>
                        <WhiteCard Cards={playerHand[2]}/>
                    </Button>
                    
                </Col>
                <Col>
                    <Button disabled={cardZar} className ="BTN color: black !important" variant="outline-dark"
                    onClick={() => { 
                        props.Socket.emit("choose Card", userName,playerHand[3].Inhalt)
                        console.log(playerHand[3].Inhalt)}}>
                        <WhiteCard Cards={playerHand[3]}/>
                    </Button>
                   
                    </Col>
                    
                <Col>
                    <Button disabled={cardZar} className="BTN color: black !important" variant="outline-dark"
                    onClick={() => { 
                        props.Socket.emit("choose Card", userName,playerHand[4].Inhalt)
                        console.log(playerHand[4].Inhalt)}}>
                        <WhiteCard Cards={playerHand[4]}/>
                    </Button>
                </Col>
          </Row>
          
        </Container>
       
    );
}}
</UserContext.Consumer>
);
}

export default GamePage;