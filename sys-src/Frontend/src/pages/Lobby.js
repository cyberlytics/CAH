import React from 'react';
import io, { Socket } from 'socket.io-client';
import {useNavigate, useParams} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {Col, Row, Container} from 'react-bootstrap'
import BlackCard from '../components/BlackCard.js';
import WhiteCard from '../components/WhiteCard.js';


function Lobby(){

    let buttons = [      
        {"Title": "add", "Content": "Hello", "Function": "Invite Player"}
]

    return(
        <Container fluid className=" vh-100">
            <Row className="vh-100">
            <Col>
                <BlackCard/>
            </Col>
            <Col>
                <WhiteCard Buttons={buttons}/>
            </Col>
            <Col>
                <WhiteCard/>
            </Col>
            <Col>
                <WhiteCard/>
            </Col>
            
            </Row>
        </Container>
    )
}

export default Lobby;
