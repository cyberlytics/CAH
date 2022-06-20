import React from 'react';
import io, { Socket } from 'socket.io-client';
import {useNavigate, useParams} from 'react-router-dom';



function Startpage(){
    let navigate = useNavigate();
    //let useParams = useParams();

    return (
        <div>
            <div>
           <h1>Startseite ------ Wilkommen</h1> 
           
           </div>
           <div>
               <button
                   onClick={() => {
                       navigate("/Room");
                   }}
                   >
                       Zur Lobby
               </button>
           </div>
        </div>

    )
}

export default Startpage;

  