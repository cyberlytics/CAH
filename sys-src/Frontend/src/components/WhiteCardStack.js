import React from 'react';
import io, { Socket } from 'socket.io-client';
import {useNavigate, useParams} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {Col, Row, Container} from 'react-bootstrap'
import WhiteCard from './WhiteCard.js';


////////////////////////////////////////////
// Kurzbeschreibung: Erzeugt einen Kartenstapel aus weißen Karten mit einer geraden weißen Karte darauf,
// auf der Buttons angezeigt werden.
// letzte Änderung: 02.06.2022 - 15:00
///////////////////////////////////////////
function WhiteCardStack(props){
    let navigate = useNavigate();
    return (

    <Col sm={6} className="justify-content-center flex-column d-flex heightchanger whitediv">
                        <WhiteCard Buttons={props.Buttons}/>

    </Col>
    )
}

export default WhiteCardStack;