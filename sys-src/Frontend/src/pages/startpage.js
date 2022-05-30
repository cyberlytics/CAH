import React from 'react';
import io, { Socket } from 'socket.io-client';
import {useNavigate, useParams} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {Col, Row, Container} from 'react-bootstrap'



function Startpage(){
    let navigate = useNavigate();
    //let useParams = useParams();

    return (
        <Container>
        <Row className="vh-100">
            <Col className="">
                <div className="jumbotron d-flex h-100">
                    <div className="text-white d-flex titlediv">
                            <p className="gametitle">Cards<br/> Against<br/> Humanity</p>
                    </div>
                </div>
            </Col>
            <Col>
                <div className="h-100 jumbotron2 d-flex">
                    <div className=""> 
                        <Row>
                            <Button className="" variant="dark" onClick={ () =>  { navigate("/Room")}}> Join </Button>
                        </Row>
                        <Row>
                            <Button className="mt-5" variant="dark" onClick={ () =>  { navigate("/Room")}}> Create Game </Button>
                        </Row>
                    </div>
                </div>
            </Col>
        </Row>
        </Container>
    )
}

export default Startpage;

  