import React, { useEffect, useLayoutEffect } from 'react';
import { useState, setTime } from "react";
import io from 'socket.io-client';
import {useNavigate, useParams} from 'react-router-dom';

function Room(props) {

  props.Socket.on("lobby_null", ()=>{
    //dieser raum exisitiert nicht, erstelle einen raum oder such nach einem existentem raum. 
  })

  props.Socket.on("lobby_voll", ()=> {
    //dieser raum ist voll!
  })

  props.Socket.on("roomalreadyexists", () =>{
    //dieser raum existiert bereits
  })

  let roomsize;
  let spieler = [];

  props.Socket.on("userLeavesLobby", (gameobject, size)=>{
    roomsize = size;
    console.log(gameobject)
    spieler.forEach(element => {
      if(!gameobject.players.includes(element.player)){
        const index = spieler.indexOf(element.player)
        spieler.splice(index, 1);
      }
    });
    //update nachdem ein user den raum verlasesn hat
    console.debug(`Die User ${spieler} treffen ein und die Raumbelegung ${roomsize} von 5`)
  })

  //komplizierter muss noch richtig gelöst werden
  props.Socket.on("userJoinsLobby", (gameobject, size) =>{
    roomsize = size;
   
    gameobject.players.forEach(element => {
      if(!spieler.includes(element.player))
      spieler.push(element.player);
    });
    // hier werden dem aktuellen client alle spieler und die raumkapazität gegeben
    console.debug(`Die User ${spieler} treffen ein und die Raumbelegung ${roomsize} von 5`)
 })

  let navigate = useNavigate();

    // problem mit react router, springt auf die seite zig mal, funktioniert aber trotzdem. feature?
  props.Socket.on("joined", (gameobject)=>{
    console.log(gameobject);
      navigate("/Lobby");
  })

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    
    if (username !== "" && room !== "") {
      props.Socket.emit("join_room", room, username);
    }
  }
  const createRoom = () => {
    
    if (username !== "" && room !== "") {
      props.Socket.emit("create_room", room, username);
    }
  }

  return (

    <div className="App">
      <input type="text" placeholder="Name..." onChange={(event) => {
        setUsername(event.target.value);
      }}
      />
      <input type="text" placeholder='Room ID' onChange={(event) => {
        setRoom(event.target.value);
      }} />

      <button onClick={ (joinRoom) }>Join a Room
      </button>
      <button onClick={ (createRoom) }>Create a Room
      </button>


    </div>
  )
}

export default Room;