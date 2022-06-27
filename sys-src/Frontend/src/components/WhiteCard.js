import React from "react";
import io, { Socket } from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Col, Row, Container, Form } from "react-bootstrap";
import { useState } from "react";
import NavigateButton from "../components/NavigateButton";
import UserTextInputs from "../components/UserTextInputs";
import TextField from "./TextField";
import { UserContext } from "../contexts/UserContext";

////////////////////////////////////////////
// Kurzbeschreibung: Erzeugt eine gerade weiße Karte, auf der eine beliebige anzahl an Componenten angezeigt werden kann.
///////////////////////////////////////////
function WhiteCard(props) {
  if (props.NavigateButtons != null) {
    //Nimmt die Buttons JSON und mapd' diese. Dann wird pro JSON Argument ein Button mit den jeweiligen Werten erstellt
    var navbuttons = props.NavigateButtons.map((navbutton) => (
      <NavigateButton
        Socket={props.Socket}
        Function={navbutton.Function}
        Text={navbutton.Text}
      ></NavigateButton>
    ));
  }

  if (props.Inputs != null) {
    {
      var inputs = props.Inputs.map((input) => (
        <UserTextInputs
          Socket={props.Socket}
          Text={input.Text}
          Function={input.Function}
          Title={input.Title}
        ></UserTextInputs>
      ));
    }
  }

  if (props.TextFields != null) {
    {
      var textFields = props.TextFields.map((textField) => (
        <TextField Text={textField.player} Socket={props.Socket}></TextField>
      ));
    }
  }

  if (props.Cards != null){
    {
      var card = (
        <TextField Text={props.Cards.Inhalt} Socket={props.Socket}></TextField>
      )
    }
  }

  if (props.reCards != null){
    {
      var recards= (
        <TextField Text={props.reCards} Socket = {props.Socket}></TextField>
      )
    }
  }

  return (
    <div className={`justify-content-center ${props.className} flex-column d-flex whitecard h-100`}>
      <Form>
        <div className="justify-content-center text-center fs-1 flex-column d-flex">
          {props.title}
        </div>
        <div className="justify-content-center mb-5">{inputs}</div>
        <div className="justify-content-center flex-column d-flex">
          {navbuttons}
        </div>
        <div className="justify-content-center flex-column d-flex">
          {textFields}
        </div>
        <div className="justify-content-center flex-column d-flex">
          {card}
        </div>
        <div className ="justify-content-center flex-column d-flex">
          {recards}
        </div>
      </Form>
    </div>
  );
}

export default WhiteCard;
