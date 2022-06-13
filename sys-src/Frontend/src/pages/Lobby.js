import React from 'react';
import io, { Socket } from 'socket.io-client';
import {useNavigate, useParams} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {Col, Row, Container} from 'react-bootstrap'
import BlackCard from '../components/BlackCard.js';
import WhiteCard from '../components/WhiteCard.js';
import { useState, useEffect } from "react";
import UserContextProvider from '../contexts/UserContext.js';



function Lobby(props){

    
    let navigate = useNavigate();
    const [gamestarted, started] = useState(false);
    const [iscreator, creator] = useState(false);
    const [counter, setCounter] = useState(5);
    const [tcounter, settCounter] = useState("");


    let roomsize;
    let spieler = [];
    let navbuttons = [
      {"Function": "startGame", "Text": "Start Game"},
    ]

    // Checkt, ob der Spielstarte button gedrückt wurde und löst dann einen counter aus, der bei null den view zu game wechselt
    useEffect(() => {
      if(gamestarted){
      const timer =
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
      }
      if(counter === 0){
        navigate("/Game");
      }
    }, [counter, gamestarted]);


    
      props.Socket.on("userLeavesLobby", (gameobject, size)=>{
        roomsize = size;
        //console.log(gameobject)
        spieler.forEach(element => {
          if(!gameobject.players.includes(element.player)){
            const index = spieler.indexOf(element.player)
            spieler.splice(index, 1);
          }
        });
        //update nachdem ein user den raum verlasesn hat
        console.debug(`Die User ${spieler} treffen ein und die Raumbelegung ${roomsize} von 5`)
      })

      props.Socket.on("creatorJoinsLobby", (gameobject, size) =>{
        roomsize = size;
        gameobject.players.forEach(element => {
          if(!spieler.includes(element.player)){
            spieler.push(element.player);
          }
        });
        // hier werden dem aktuellen client alle spieler und die raumkapazität gegeben
        console.debug(`Die User ${spieler} treffen ein und die Raumbelegung ${roomsize} von 5`)
      });

    
      //komplizierter muss noch richtig gelöst werden
      props.Socket.on("userJoinsLobby", (gameobject, size) =>{
        roomsize = size;
       
        gameobject.players.forEach(element => {
          if(!spieler.includes(element.player)){
            spieler.push(element.player);
          }
        });
        // hier werden dem aktuellen client alle spieler und die raumkapazität gegeben
        console.debug(`Die User ${spieler} treffen ein und die Raumbelegung ${roomsize} von 5`)
      });

      
      props.Socket.on("creatorStartsGame", () => {
        started(true);
    })

    

    return(
        <Container fluid className=" vh-100">
            { gamestarted && (<div className="text-center startcounter position-absolute">
                            {counter}
                           </div>
                           )
            }
            <Row className="vh-100">
            <Col>
                <BlackCard/>
            </Col>
            <Col>
                    <WhiteCard Socket={props.Socket} TextFields={spieler}/>
            </Col>
            <Col>
                    <WhiteCard/>
            </Col>
            <Col>
                    <WhiteCard Socket={props.Socket} NavigateButtons={navbuttons}/>
                    
                
            </Col>
            
            
            </Row>
        </Container>
    )
}

export default Lobby;
