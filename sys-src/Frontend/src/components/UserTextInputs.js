import React from "react";
import io, { Socket } from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Col, Row, Container, Form } from "react-bootstrap";
import { useState } from "react";
import NavigateButton from '../components/NavigateButton';
import { UserContext } from "../contexts/UserContext";

////////////////////////////////////////////
// Kurzbeschreibung: Erzeugt eine gerade weiße Karte, auf der eine beliebige anzahl an Buttons angezeigt werden kann.
// letzte Änderung: 07.06.2022 - 17:30
///////////////////////////////////////////
function UserTextInputs(props) {
  let navigate = useNavigate();



  return (
    <UserContext.Consumer>
      {(context) => {
      const { userName, userRoom, changeUserName, changeUserRoom } = context;

      return (
        <Form.Group className="mx-auto mb-5 inputform">
          <Form.Label>
              {props.Title}
          </Form.Label>
          <Form.Control type="text" placeholder={props.Text} onChange={(event) => {
            var task = props.Function.toString();
            if(task == "user"){
              changeUserName(event.target.value);
            }
            if(task == "room"){
              changeUserRoom(event.target.value);
             }
            }}    
          />
          <Form.Text className="text-muted">

          </Form.Text>
        </Form.Group>
      );
    }}
    </UserContext.Consumer>
  );
}

export default UserTextInputs;
