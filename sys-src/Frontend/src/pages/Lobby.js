import React from "react";
import io, { Socket } from "socket.io-client";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Col, Row, Container } from "react-bootstrap";
import BlackCard from "../components/BlackCard.js";
import WhiteCard from "../components/WhiteCard.js";
import { useState, useEffect } from "react";
import UserContextProvider from "../contexts/UserContext.js";

function Lobby(props) {
  const [roomsize, setRoomsize] = useState(0);
  const [playerObject, setPlayerObject] = useState([]);
  const [iscreator, creator] = useState(false);
  const [gamestarted, started] = useState(false);
  const [counter, setCounter] = useState(5);

  let navigate = useNavigate();
  let navbuttons = [{ Function: "startGame", Text: "Start Game" }];

  // Checkt, ob der gamestarted true ist und löst dann einen counter aus, der bei null den view zu game wechselt
  useEffect(() => {
    if (gamestarted) {
      const timer =
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }
    if (counter === 0) {
      navigate("/Game");
    }
  }, [counter, gamestarted]);


  props.Socket.on("updateLobby", (gameobject, size) => {
    setRoomsize(size);
    setPlayerObject(gameobject.players);
    
    // setzt für den Ersteller true. Ist dazu da, den start-Button dem User anzuzeigen
    var creatorplayer = gameobject.players[0];
    if (creatorplayer.socket == props.Socket.id) {
      creator(true);
    }

    // hier werden dem aktuellen client alle spieler und die raumkapazität gegeben
    console.debug(
      `Die User ${playerObject} treffen ein und die Raumbelegung ${roomsize} von 5`
    );
  });

  // setzt started true, und startet damit den timer, der dann den view zum game wechselt
  props.Socket.on("creatorStartsGame", () => {
    started(true);
  });

  props.Socket.on("LobbyWurdeEntfernt", () => {
    navigate("/");
  });

  return (
    <Container fluid className=" vh-100">
      {gamestarted && (
        <div className="text-center startcounter position-absolute">
          {counter}
        </div>
      )}
      <Row className="vh-100">
        <Col>
          <BlackCard />
        </Col>
        <Col>
          <WhiteCard Socket={props.Socket} TextFields={playerObject} />
        </Col>
        <Col>
          <WhiteCard />
        </Col>
        {iscreator && (
          <Col>
            <WhiteCard Socket={props.Socket} NavigateButtons={navbuttons} />
          </Col>
        )}
      </Row>
    </Container>
  );
}

export default Lobby;
