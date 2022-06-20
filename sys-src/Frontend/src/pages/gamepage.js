import React from 'react';
import io, { Socket } from 'socket.io-client';
import {useNavigate, useParams} from 'react-router-dom';
import {Col, Row, Container} from 'react-bootstrap';
import BlackCard from '../components/BlackCard.js';
import WhiteCardStack from '../components/WhiteCardStack.js';
import UserContextProvider from '../contexts/UserContext.js';
import WhiteCard from '../components/WhiteCard.js';
import { propTypes } from 'react-bootstrap/esm/Image.js'; 
import {useState} from "react";

function GamePage(props){

const [blackCard, setBlackCard] = useState([]);
const [playerHand, setPlayerHand] = useState([]);

props.Socket.on("push_new_round", (gameObject) =>{
    setBlackCard(gameObject.currBlackCard);
    console.log(blackCard);
    console.log(gameObject);
    console.log(gameObject.players[0].socket);
    console.log(props.Socket.id);
    gameObject.players.forEach(element=>{
        if(element.socket == props.Socket.id) {
            setPlayerHand(element.hand);
            console.log("ich war hier");
        }
    });
    console.log(playerHand);
});


    return (
        <Container fluid className="vh-100">
            <Row className='centerField'>
                <Col><BlackCard title = {blackCard.Inhalt}/></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
            </Row>

          <Row className ="playerHand">
                <Col><WhiteCard Cards={playerHand[0]}/></Col>
                <Col><WhiteCard Cards={playerHand[1]}/></Col>
                <Col><WhiteCard Cards={playerHand[2]}/></Col>
                <Col><WhiteCard Cards={playerHand[3]}/></Col>
                <Col><WhiteCard Cards={playerHand[4]}/></Col>
          </Row>
          
        </Container>
       
    )
}

export default GamePage;