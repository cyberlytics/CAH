import React from 'react';
import io, { Socket } from 'socket.io-client';
import {useNavigate, useParams} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {Col, Row, Container} from 'react-bootstrap'


////////////////////////////////////////////
// Kurzbeschreibung: Erzeugt eine gerade weiße Karte, auf der eine beliebige anzahl an Buttons angezeigt werden kann.
// letzte Änderung: 02.06.2022 - 15:00
///////////////////////////////////////////
function WhiteCard(props){
    let navigate = useNavigate();
    var buttonsnum = props.Buttons;
    var buttons = buttonsnum.map((button) =>
    <Button key={button.function.toString()} onClick={() => {navigate(button.function);}} className="createbutton text-black text-bold">{button.Text}</Button>
    );

    return (

            <Col className="justify-content-center flex-column d-flex whitecard h-100">
                {buttons}
            </Col>


    )
}

export default WhiteCard;