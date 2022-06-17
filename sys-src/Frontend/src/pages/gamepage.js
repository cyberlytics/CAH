import React from 'react';
import io, { Socket } from 'socket.io-client';
import {useNavigate, useParams} from 'react-router-dom';
import {Col, Row, Container} from 'react-bootstrap';
import BlackCard from '../components/BlackCard.js';
import WhiteCardStack from '../components/WhiteCardStack.js';
import UserContextProvider from '../contexts/UserContext.js';
import WhiteCard from '../components/WhiteCard.js';

function GamePage(){

    return (
        <Container fluid className="vh-100">
            <Row className='centerField'>
                <Col><BlackCard/></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
            </Row>

          <Row className ="playerHand">
                <Col><WhiteCard/></Col>
                <Col><WhiteCard/></Col>
                <Col><WhiteCard/></Col>
                <Col><WhiteCard/></Col>
                <Col><WhiteCard/></Col>
          </Row>
          
        </Container>
       
    )
}

export default GamePage;