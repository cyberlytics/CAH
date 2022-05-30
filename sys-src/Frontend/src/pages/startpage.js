import React from 'react';
import io, { Socket } from 'socket.io-client';
import {useNavigate, useParams} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {Col, Row, Container} from 'react-bootstrap'



function Startpage(){
    let navigate = useNavigate();
    //let useParams = useParams();

    return (
        <Container fluid className="vh-100">
            <Row className="vh-100" xs={2}>
                <Col className="justify-content-center flex-column d-flex h-100 blackdiv">
                    <p className="text-center h1 text-white">Cards <br/> Against <br/> Humanity</p>
                </Col>


                <Col className="justify-content-center flex-column d-flex h-100 whitediv">
                    <Col className="justify-content-center flex-column d-flex whitecard h-100">
                        <Row className="justify-content-center">
                            <Button className="w-auto">
                                Join
                            </Button>
                        </Row>
                        <Row className="justify-content-center">
                            <Button className="w-auto mt-5">
                                Create Game
                            </Button>
                        </Row>
                    </Col>

                </Col>
            </Row>
        </Container>
    )
}

export default Startpage;

  