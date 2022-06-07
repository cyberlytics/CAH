import React from "react";
import io, { Socket } from "socket.io-client";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Col, Row, Container, Form } from "react-bootstrap";
import { useState } from "react";




////////////////////////////////////////////
// Kurzbeschreibung: Erzeugt eine gerade weiße Karte, auf der eine beliebige anzahl an Buttons angezeigt werden kann.
// letzte Änderung: 02.06.2022 - 15:00
///////////////////////////////////////////
function NavigateButton(props) {
  let navigate = useNavigate();

  props.Socket.on("lobby_null", ()=>{
    //dieser raum exisitiert nicht, erstelle einen raum oder such nach einem existentem raum. 
  })

  props.Socket.on("lobby_voll", ()=> {
    //dieser raum ist voll!
  })

  props.Socket.on("roomalreadyexists", () =>{
    //dieser raum existiert bereits
  })

 

    // problem mit react router, springt auf die seite zig mal, funktioniert aber trotzdem. feature?
  props.Socket.on("joined", (gameobject)=>{
    console.log(gameobject);
      navigate("/Lobby");
  })

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  props.Socket.on("backendusernamechanged", (data) => {
      setUsername(data);
  })

  props.Socket.on("backendroomnamechanged", (data) => {
    setRoom(data);
})

  return (
    <div className="justify-content-center flex-column d-flex whitecard h-100">
            <div className="justify-content-center flex-column d-flex">
                <Button
                    
                    key={props.Function.toString()}
                    onClick={() => {
                        var task = props.Function.toString();
                        if(task == "joinRoom"){
                            props.Socket.emit("join_room", room, username);
                        }
                        if(task == "createRoom"){
                            props.Socket.emit("create_room", room, username);
                        }
                    }
                    }
                    className="createbutton text-black text-bold"
                >
                    {props.Text}
                </Button>
            </div>
    </div>
  );
}

export default NavigateButton;
