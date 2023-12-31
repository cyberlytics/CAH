import React from 'react';
import io, { Socket } from 'socket.io-client';
import {useNavigate, useParams} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {Col, Row, Container} from 'react-bootstrap'


function BlackCard(props){

    return (
        <div className={`  justify-content-center flex-column d-flex heightchanger blackdiv h-100`}>
                    <p className={`${props.className} gametitle text-white`}>{props.title}</p>
        </div>
    )
}

export default BlackCard;