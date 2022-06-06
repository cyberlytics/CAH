import React from "react";
import io, { Socket } from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Col, Row, Container, Form } from "react-bootstrap";
import { useState } from "react";
import NavigateButton from '../components/NavigateButton';

////////////////////////////////////////////
// Kurzbeschreibung: Erzeugt eine gerade weiße Karte, auf der eine beliebige anzahl an Buttons angezeigt werden kann.
// letzte Änderung: 02.06.2022 - 15:00
///////////////////////////////////////////
function WhiteCard(props) {
  let navigate = useNavigate();



  return (
    <Form.Group className="mx-auto mb-5 inputform">
            <Form.Label>
                {props.Title}
            </Form.Label>
            <Form.Control type="text" placeholder={props.Text} onChange={(event) => {
                    var task = props.Function.toString();
                    if(task == "user"){
                        props.Socket.emit("frontendusernamechanged", event.target.value);
                    }
                    if(task == "room"){
                        props.Socket.emit("frontendroomnamechanged", event.target.value);
                    }
                }}    
            />
            <Form.Text className="text-muted">
                
            </Form.Text>
    </Form.Group>
  );
}

export default WhiteCard;
