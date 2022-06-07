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
function TextFields(props) {
  let navigate = useNavigate();



  return (
    <p className="mx-auto">{props.socket}</p>
  );
}

export default TextFields;
