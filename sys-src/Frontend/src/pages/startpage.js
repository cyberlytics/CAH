import React from 'react';
import io, { Socket } from 'socket.io-client';
import {useNavigate, useParams} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {Col, Row, Container} from 'react-bootstrap';
import BlackCard from '../components/BlackCard.js';
import WhiteCardStack from '../components/WhiteCardStack.js';
import WhiteCard from '../components/WhiteCard';


const socket = io('http://localhost:3001')    
    socket.on('connect', ()=>console.log(socket.id))
    socket.on('connect_error', ()=>{
      setTimeout(()=>socket.connect(),5000)
    })   
    socket.on('time', (data)=>setTime(data))
   socket.on('disconnect',()=>setTime('server disconnected'))


function Startpage(){
    
    // JSON object. Das Nav ergibt dabei die Seite, zu der navigiert wird, und der Text wird auf dem Button, der die Navigation ausführt angezeigt
    // {"function": "---Hier einfügen, was die function des Buttons sein soll---", "Content": "--- Hier die benötigten Variablen der Funktion einfügen---", "Text": "--- Hier den Text, der auf dem Button anzeigt werden soll einfügen---"}
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
                <WhiteCardStack Socket={socket} NavigateButtons={navbuttons} Inputs={inputs}/>
                </Col>
            </Row>
        </Container>
    )

   
}

export default Startpage;

  