import logo from './logo.svg';
import './App.css';
import React from 'react'
import Room from './pages/Room';
import Startpage from './pages/startpage';
import Lobby from './pages/Lobby';
import GamePage from './pages/gamepage';
import {Link, BrowserRouter as Router, Route, Routes} from "react-router-dom";


function App() {
  return (
  <Router>
    <Routes>
    
      <Route path ="/" element={<Startpage Socket={socket}/>}/>
      <Route path="/Lobby" element={<Lobby Socket={socket}/>}/>
      <Route path ="*" element={<Startpage Socket={socket}/>}/>
      <Route path= "/Game" element={<GamePage Socket={socket}/>}/>
    </Routes>
  </Router>
  
  );
}

export default App;
