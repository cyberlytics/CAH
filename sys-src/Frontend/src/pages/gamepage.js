import React from 'react';
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

return (
    <UserContext.Consumer>
    {(context) => {
        const { userName, userRoom } = context;

props.Socket.on("push_gameobject", (gameObject) =>{
    console.log(gameObject);
    setBlackCard(gameObject.currBlackCard);

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
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
            </Row>

          <Row className ="playerHand">
                <Col>
                    <Button className ="BTN color: black !important" variant ="outline-dark"
                    onClick={() => { 
                        props.Socket.emit("choose Card", userName,playerHand[0].Inhalt)
                        console.log(playerHand[0].Inhalt)}}>
                        <WhiteCard Cards={playerHand[0]}/>
                    </Button>
                </Col>
                <Col>
                    <Button className ="BTN color: black !important" variant ="outline-dark" 
                    onClick={() => { 
                        props.Socket.emit("choose Card", userName,playerHand[1].Inhalt)
                        console.log(playerHand[1].Inhalt)}}>
                        <WhiteCard Cards={playerHand[1]}/>
                    </Button>
                </Col>
                <Col>
                    <Button className ="BTN color: black !important" variant="outline-dark"
                    onClick={() => { 
                        props.Socket.emit("choose Card", userName,playerHand[2].Inhalt)
                        console.log(playerHand[2].Inhalt)}}>
                        <WhiteCard Cards={playerHand[2]}/>
                    </Button>
                    
                </Col>
                <Col>
                    <Button className ="BTN color: black !important" variant="outline-dark"
                    onClick={() => { 
                        props.Socket.emit("choose Card", userName,playerHand[3].Inhalt)
                        console.log(playerHand[3].Inhalt)}}>
                        <WhiteCard Cards={playerHand[3]}/>
                    </Button>
                   
                    </Col>
                    
                <Col>
                    <Button className="BTN color: black !important" variant="outline-dark"
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