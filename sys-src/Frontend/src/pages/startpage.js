import React from 'react';
import io, { Socket } from 'socket.io-client';
import {useNavigate, useParams} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {Col, Row, Container} from 'react-bootstrap';
import BlackCard from '../components/BlackCard.js';
import WhiteCardStack from '../components/WhiteCardStack.js';
import WhiteCard from '../components/WhiteCard';




function Startpage(){

    // JSON object. Das Nav ergibt dabei die Seite, zu der navigiert wird, und der Text wird auf dem Button, der die Navigation ausführt angezeigt
    let buttons = [
            {"function": "/Room", "Text": "Join"},
            {"function": "/Lobby", "Text": "Create Game"}
        
    ]

    return (
        <Container fluid className="mainContainer vh-100">
            <Row className="vh-100">
                <BlackCard title='Cards &#32; Against &#32; Humanity'/>
                <WhiteCardStack Buttons={buttons}/>
            </Row>
        </Container>
    )

   
}

export default Startpage;

  