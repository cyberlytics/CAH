import logo from './logo.svg';
import './App.css';
import React from 'react'
import Startpage from './pages/startpage';
import Lobby from './pages/Lobby';
import {Link, BrowserRouter as Router, Route, Routes} from "react-router-dom";
import io, { Socket } from 'socket.io-client';
import {useNavigate, useParams} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {Col, Row, Container} from 'react-bootstrap';
import UserContextProvider from './contexts/UserContext.js';



const socket = io('http://localhost:3001')    
    socket.on('connect', ()=>console.log(socket.id))
    socket.on('connect_error', ()=>{
      setTimeout(()=>socket.connect(),5000)
    })   
    socket.on('time', (data)=>setTime(data))
   socket.on('disconnect',()=>setTime('server disconnected'))


function App() {
  return (
  <UserContextProvider>
  <Router>
    <Routes>
    
      <Route path ="/" element={<Startpage Socket={socket}/>}/>
      <Route path="/Lobby" element={<Lobby Socket={socket}/>}/>
      <Route path ="*" element={<Startpage Socket={socket}/>}/>
    </Routes>
  </Router>
  </UserContextProvider>
  
  );
}

export default App;
