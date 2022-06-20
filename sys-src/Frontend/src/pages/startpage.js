import React from 'react';
import io, { Socket } from 'socket.io-client';
import {useNavigate, useParams} from 'react-router-dom';

////////////////////////////////////////////
// Kurzbeschreibung: Startseite mit Blackcard und einem WhitecardStack, auf dem Navigations-Buttons und UserInputs gelegt sind.
///////////////////////////////////////////
function Startpage(props){
    const [show, setShow] = useState(false);
    const [alertType, setAlertType] = useState("");


    props.Socket.on("lobby_null", ()=>{
        setAlertType("The Lobby you tried to join does not exist!");
        setShow(true);
      })
    
      props.Socket.on("lobby_voll", ()=> {
        setAlertType("The Lobby you tried to join is already full!");
        setShow(true);
      })
    
      props.Socket.on("roomalreadyexists", () =>{
        setAlertType("The Lobby you tried to create already exists!");        
        setShow(true);
      })
    
      
    
    // JSON object. Das Nav ergibt dabei die Seite, zu der navigiert wird, und der Text wird auf dem Button, der die Navigation ausführt angezeigt
    // {"function": "---Hier einfügen, was die function des Buttons sein soll---", "Content": "---Hier die benötigten Variablen der Funktion einfügen---", "Text": "---Hier den Text, der auf dem Button anzeigt werden soll einfügen---"}
    let navbuttons = [
            {"Function": "joinRoom", "Text": "Join"},
            {"Function": "createRoom", "Text": "Create Game"}
        
    ]

    let inputs = [
        {"Title": "Name", "Text": "Name", "Function": "user"},
        {"Title": "Room", "Text": "Room", "Function": "room"}
    ]

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

  