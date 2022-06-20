import React from "react";
import io, { Socket } from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Col, Row, Container, Form } from "react-bootstrap";
import { useState } from "react";
import { UserContext } from "../contexts/UserContext";

////////////////////////////////////////////
// Kurzbeschreibung: Erzeugt einen Button mit dem man auf eine neue Seite weitergeleitet wird. Abhängig der Function, kann eine andere Funktion beim OkClick angewendet werden.
// letzte Änderung: 06.06.2022 - 18:00
///////////////////////////////////////////
function NavigateButton(props) {
  let navigate = useNavigate();

  function navLobby(){
    navigate('/Lobby');
  }

  return (
    <UserContext.Consumer>
      {(context) => {
        const { userName, userRoom } = context;

        return (
          <div className="justify-content-center flex-column d-flex whitecard h-100">
            <div className="justify-content-center flex-column d-flex">
              <Button
                //disabled={userName === "" && userRoom === ""}
                key={props.Function.toString()}
                onClick={() => {
                  var task = props.Function.toString();
                  if (task == "joinRoom") {
                    if(userName !== "" && userRoom !== "")
                    {
                      props.Socket.emit("join_room", userRoom, userName);
                      props.Socket.on("joined", () => {
                        navLobby();
                      })
                      
                    }
                  }
                  if (task == "createRoom") {
                    if(userName !== "" && userRoom !== "")
                    {
                      props.Socket.emit("create_room", userRoom, userName);
                      props.Socket.on("joined", () => {
                        navLobby();
                      })
                    }
                    }
                  if (task == "startGame") {
                    props.Socket.emit("start_game", userRoom, userName);
                    // props.Socket.emit('send_black_card', userRoom);
                    // props.Socket.emit('send_white_card', userRoom);
                    props.Socket.emit("new_round", userRoom);
                  }
                  }
                }
                className="createbutton text-black text-bold"
              >
                {props.Text}
              </Button>
            </div>
          </div>
        );
      }}
    </UserContext.Consumer>
  );
}

export default NavigateButton;
