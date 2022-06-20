import React from 'react';
import { useState, setTime } from "react";
import io from 'socket.io-client';
import {useNavigate, useParams} from 'react-router-dom';




    const socket = io('http://localhost:3001')    
    socket.on('connect', ()=>console.log(socket.id))
    socket.on('connect_error', ()=>{
      setTimeout(()=>socket.connect(),5000)
    })   
    socket.on('time', (data)=>setTime(data))
   socket.on('disconnect',()=>setTime('server disconnected'))
  


let clientRoom;

socket.on('serverMsg', (data) => {
  console.log(`I should be in room No. ${data}`);
  clientRoom = data;
})


function Room() {
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () => {
    
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      navigate("/Lobby");
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

    </div>
  )
}

export default Room;