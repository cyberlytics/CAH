import React from "react";
import io, { Socket } from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Col, Row, Container, Form } from "react-bootstrap";
import { useState } from "react";
import { UserContext } from "../contexts/UserContext";

////////////////////////////////////////////
// Kurzbeschreibung: Erzeugt einen Button mit dem man auf eine neue Seite weitergeleitet wird
// letzte Änderung: 06.06.2022 - 18:00
///////////////////////////////////////////
function NavigateButton(props) {
  let navigate = useNavigate();

  props.Socket.on("joined", () => {
    navigate("/Lobby");
  });

  return (
    <UserContext.Consumer>
      {(context) => {
        const { userName, userRoom } = context;

        return (
          <div className="justify-content-center flex-column d-flex whitecard h-100">
            <div className="justify-content-center flex-column d-flex">
              <Button
                disabled={userName === "" && userRoom === ""}
                key={props.Function.toString()}
                onClick={() => {
                  var task = props.Function.toString();
                  if (task == "joinRoom") {
                    props.Socket.emit("join_room", userRoom, userName);
                  }
                  if (task == "createRoom") {
                    props.Socket.emit("create_room", userRoom, userName);
                  }
                }}
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
