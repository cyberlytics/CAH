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
  const [spielerObject, setSpielerObject] = useState([]);



  props.Socket.on("updateLobby", (gameobject, size) => {
    console.log("userJoinsLobby got called");
    setRoomsize(size);
    setSpielerObject(gameobject.players);
    console.log("userJoinsLobby: ", gameobject.players);
    console.log("userJoinsLobbyObject: ", spielerObject);

    // hier werden dem aktuellen client alle spieler und die raumkapazität gegeben
    console.debug(`Die User ${spieler} treffen ein und die Raumbelegung ${roomsize} von 5`);
  });

  // updated die Spielerliste
  useEffect(() => {
    console.log("useEffect: ", spielerObject);
    setSpieler([]);

    for(let i = 0; i < spielerObject.length; i++){
      if (!spieler.includes(spielerObject[i].player)) {
        setSpieler((spieler) => [...spieler, spielerObject[i].player]);
      }
    }
  }, [spielerObject]);


  return (
    <Container fluid className=" vh-100">
      <Row className="vh-100">
        <Col>
          <BlackCard />
        </Col>
        <Col>
            <WhiteCard Socket={props.Socket} TextFields={spieler} />
        </Col>
        <Col>
            <WhiteCard />
        </Col>
        <Col>
            <WhiteCard />
        </Col>
      </Row>
    </Container>
  );
}

export default Lobby;
