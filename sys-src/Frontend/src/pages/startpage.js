import React from 'react';
import io, { Socket } from 'socket.io-client';
import {useNavigate, useParams} from 'react-router-dom';
import {Col, Row, Container} from 'react-bootstrap';
import BlackCard from '../components/BlackCard.js';
import WhiteCardStack from '../components/WhiteCardStack.js';
import UserContextProvider from '../contexts/UserContext.js';





function Startpage(props){
    let navigate = useNavigate();

    props.Socket.on("lobby_null", ()=>{
        //dieser raum exisitiert nicht, erstelle einen raum oder such nach einem existentem raum. 
      })
    
      props.Socket.on("lobby_voll", ()=> {
        //dieser raum ist voll!
      })
    
      props.Socket.on("roomalreadyexists", () =>{
        //dieser raum existiert bereits
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
            <Row className="vh-100">
                <Col>
                    <BlackCard title='Cards &#32; Against &#32; Humanity'/>
                </Col>
                <Col>
                    <UserContextProvider>
                        <WhiteCardStack Socket={props.Socket} NavigateButtons={navbuttons} Inputs={inputs}/>
                    </UserContextProvider>
                </Col>
            </Row>
        </Container>
    )

   
}

export default Startpage;

  