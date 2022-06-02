import React from 'react';
import io, { Socket } from 'socket.io-client';
import {useNavigate, useParams} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {Col, Row, Container} from 'react-bootstrap'
function Lobby(){
    return(
        <Container fluid className="lobbyContainer vh-100">
            <h1>Lobby Seite</h1>
        </Container>
    )
}

export default Lobby;
