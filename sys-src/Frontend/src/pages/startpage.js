import React from 'react';
import io, { Socket } from 'socket.io-client';
import {useNavigate, useParams} from 'react-router-dom';
import {Col, Row, Container, Alert} from 'react-bootstrap';
import BlackCard from '../components/BlackCard.js';
import WhiteCardStack from '../components/WhiteCardStack.js';
import UserContextProvider from '../contexts/UserContext.js';
import { useState } from "react";




////////////////////////////////////////////
// Kurzbeschreibung: Startseite mit Blackcard und einem WhitecardStack, auf dem Navigations-Buttons und UserInputs gelegt sind.
///////////////////////////////////////////
function Startpage(props){
    const [show, setShow] = useState(false);
    const [alertType, setAlertType] = useState("");


    props.Socket.on("lobby_null", ()=>{
        setAlertType("The Lobby you tried to join does not exist!");
        setShow(true);
      })
    
      props.Socket.on("lobby_voll", ()=> {
        setAlertType("The Lobby you tried to join is already full!");
        setShow(true);
      })
    
      props.Socket.on("roomalreadyexists", () =>{
        setAlertType("The Lobby you tried to create already exists!");        
        setShow(true);
      })
    
      
    
    // JSON object. Das Nav ergibt dabei die Seite, zu der navigiert wird, und der Text wird auf dem Button, der die Navigation ausführt angezeigt
    // {"function": "---Hier einfügen, was die function des Buttons sein soll---", "Content": "---Hier die benötigten Variablen der Funktion einfügen---", "Text": "---Hier den Text, der auf dem Button anzeigt werden soll einfügen---"}
    let navbuttons = [
            {"Function": "joinRoom", "Text": "Join"},
            {"Function": "createRoom", "Text": "Create Game"}
        
    ]

    let inputs = [
        {"Title": "Name", "Text": "Name", "Function": "user"},
        {"Title": "Room", "Text": "Room", "Function": "room"}
    ]

    return (
        <Container fluid className="mainContainer vh-100">
            <div className="alterdiv">
            {show
                ? <Alert className="joinalert" variant="danger" onClose={() => setShow(false)} dismissible>
                <Alert.Heading>
                    Error!
                </Alert.Heading>
                <p>
                  {alertType}
                </p>
              </Alert>
                :<div></div>
            }
            </div>
            <Row className="vh-100">
                <Col>
                    <BlackCard className="coverblackcard" title='Cards &#32; Against &#32; Humanity'/>
                </Col>
                <Col>
                        <WhiteCardStack Socket={props.Socket} NavigateButtons={navbuttons} Inputs={inputs}/>
                </Col>
            </Row>
        </Container>
    )

   
}

function AlertDismissibleExample() {
    const [show, setShow] = useState(true);
  
    if (show) {
      return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>
            Change this and that and try again. Duis mollis, est non commodo
            luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
            Cras mattis consectetur purus sit amet fermentum.
          </p>
        </Alert>
      );
    }
    return <Button onClick={() => setShow(true)}>Show Alert</Button>;
  }

export default Startpage;

  