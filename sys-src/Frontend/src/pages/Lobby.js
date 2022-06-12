import React from 'react';
import io, { Socket } from 'socket.io-client';
import {useNavigate, useParams} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {Col, Row, Container} from 'react-bootstrap'
import BlackCard from '../components/BlackCard.js';
import WhiteCard from '../components/WhiteCard.js';
import { useState } from "react";
import UserContextProvider from '../contexts/UserContext.js';



function Lobby(props){

    let roomsize;
    const [spieler, setSpieler] = useState([]);
    
      props.Socket.on("userLeavesLobby", (gameobject, size)=>{
        roomsize = size;
        //console.log(gameobject)
        setSpieler(gameobject.players);
        console.log(spieler);

        //update nachdem ein user den raum verlasesn hat
        console.debug(`Die User ${spieler} treffen ein und die Raumbelegung ${roomsize} von 5`);
      })
    
      props.Socket.on("userJoinsLobby", (gameobject, size) =>{
        roomsize = size;
        gameobject.players.forEach(element => {
          if(!spieler.includes(element.player)){
            setSpieler( spieler => [...spieler, element.player]);
          }
          //spieler.push(element.player);
        });

        // hier werden dem aktuellen client alle spieler und die raumkapazität gegeben
        console.debug(`Die User ${spieler} treffen ein und die Raumbelegung ${roomsize} von 5`);
      });

    

    return(
        <Container fluid className=" vh-100">
            <Row className="vh-100">
            <Col>
                <BlackCard/>
            </Col>
            <Col>
                <UserContextProvider>
                    <WhiteCard Socket={props.Socket} TextFields={spieler}/>
                </UserContextProvider>
            </Col>
            <Col>
            <UserContextProvider>
                    <WhiteCard/>
                </UserContextProvider>
            </Col>
            <Col>
            <UserContextProvider>
                    <WhiteCard/>
                </UserContextProvider>
            </Col>
            
            </Row>
        </Container>
    )
}

export default Lobby;
