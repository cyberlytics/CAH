import React, { useEffect } from "react";
import io, { Socket } from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Col, Row, Container } from "react-bootstrap";
import BlackCard from "../components/BlackCard.js";
import WhiteCard from "../components/WhiteCard.js";
import { useState } from "react";
import UserContextProvider from "../contexts/UserContext.js";

function Lobby(props) {
  const [roomsize, setRoomsize] = useState(0);
  const [spieler, setSpieler] = useState([]);
  const [spielerJoinObject, setSpielerJoinObject] = useState([]);
  const [spielerLeaveObject, setSpielerLeaveObject] = useState([]);

  props.Socket.on("userLeavesLobby", (gameobject, size) => {
    setRoomsize(size);
    setSpielerLeaveObject(gameobject.players);

    //update nachdem ein user den raum verlasesn hat
    console.debug(`Die User ${spieler} treffen ein und die Raumbelegung ${roomsize} von 5`);
  });


  props.Socket.on("userJoinsLobby", (gameobject, size) => {
    setRoomsize(size);
    setSpielerJoinObject(gameobject.players);

    // hier werden dem aktuellen client alle spieler und die raumkapazität gegeben
    console.debug(`Die User ${spieler} treffen ein und die Raumbelegung ${roomsize} von 5`);
  });

  // fügt neuen Spieler in Liste hinzu
  useEffect(() => {
    console.log("useEffect: ", spielerJoinObject);

    for(let i = 0; i < spielerJoinObject.length; i++){
      if (!spieler.includes(spielerJoinObject[i].player)) {
        setSpieler((spieler) => [...spieler, spielerJoinObject[i].player]);
      }
    }
  }, [spielerJoinObject]);

  // löscht Spieler aus Liste
  useEffect(() => {
    console.log("useEffect: ", spielerLeaveObject);

    for(let i = 0; i < spieler.length; i++){
      if (!spielerLeaveObject.includes(spieler[i])) {
        const index = spieler.indexOf(spielerLeaveObject[i].player);
        setSpieler(spieler.splice(index, 1));
      }
    }
  }, [spielerLeaveObject]);

  return (
    <Container fluid className=" vh-100">
      <Row className="vh-100">
        <Col>
          <BlackCard />
        </Col>
        <Col>
          <UserContextProvider>
            <WhiteCard Socket={props.Socket} TextFields={spieler} />
          </UserContextProvider>
        </Col>
        <Col>
          <UserContextProvider>
            <WhiteCard />
          </UserContextProvider>
        </Col>
        <Col>
          <UserContextProvider>
            <WhiteCard />
          </UserContextProvider>
        </Col>
      </Row>
    </Container>
  );
}

export default Lobby;
