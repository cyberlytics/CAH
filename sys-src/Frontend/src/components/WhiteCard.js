import React from "react";
import io, { Socket } from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Col, Row, Container, Form } from "react-bootstrap";
import { useState } from "react";
import NavigateButton from '../components/NavigateButton';
import UserTextInputs from '../components/UserTextInputs';



////////////////////////////////////////////
// Kurzbeschreibung: Erzeugt eine gerade weiße Karte, auf der eine beliebige anzahl an Buttons angezeigt werden kann.
// letzte Änderung: 02.06.2022 - 15:00
///////////////////////////////////////////
function WhiteCard(props) {
  let navigate = useNavigate();


  const [playerList, setPlayerList] = useState([]);

  const onAddBtnClick = (event) => {
    if (playerList.length < 5) {
      setPlayerList(playerList.concat(<p className="text-center">Test</p>));
    }
  };

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  if (props.NavigateButtons != null) {
    //Nimmt die Buttons JSON und mapd' diese. Dann wird pro JSON Argument ein Button mit den jeweiligen Werten erstellt
    var navbuttons = props.NavigateButtons.map((navbutton) => (
      <NavigateButton Socket={props.Socket} Function={navbutton.Function} Text={navbutton.Text}>
      </NavigateButton>
    ));
  }

  if (props.Inputs != null) {
    {var inputs = props.Inputs.map((input) => (
        <UserTextInputs Socket={props.Socket} Text={input.Text} Function={input.Function} Title={input.Title}>
        </UserTextInputs>
    ));}
  }


  return (
    <div className="justify-content-center flex-column d-flex whitecard h-100">
        <Form>
            <div className="justify-content-center mb-5">
                {inputs}
            </div>
            <div className="justify-content-center flex-column d-flex">
                {navbuttons}
            </div>
            <div className="justify-content-center flex-column d-flex">
                {playerList}
            </div>
        </Form>
    </div>
  );
}

export default WhiteCard;
