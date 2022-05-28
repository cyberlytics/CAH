import React from 'react';
import io, { Socket } from 'socket.io-client';
import {useNavigate, useParams} from 'react-router-dom';



function Startpage(){
    let navigate = useNavigate();
    //let useParams = useParams();

    return (
        <div className="main-container">
            <div className="blackside"> 
                <div className="Header">
                    <h1 className="gametitle">Cards<br/> Against<br/> Humanity</h1>
                </div>
            </div>
            <div className="whiteside"> 
                <button className="navbutton" onClick={ () =>  { navigate("/Room")}}> Join </button>
                <button className="navbutton" onClick={ () =>  { navigate("/Room")}}> Create Game </button>

            </div>
        </div>
    )
}

export default Startpage;

  