import React from 'react';
import io, { Socket } from 'socket.io-client';
import {useNavigate, useParams} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {Col, Row, Container} from 'react-bootstrap'
import {useState} from 'react'


////////////////////////////////////////////
// Kurzbeschreibung: Erzeugt eine gerade weiße Karte, auf der eine beliebige anzahl an Buttons angezeigt werden kann.
// letzte Änderung: 02.06.2022 - 15:00
///////////////////////////////////////////
function WhiteCard(props){
    let navigate = useNavigate();

    const [playerList, setPlayerList] = useState([]);

    const onAddBtnClick = event => setPlayerList(playerList.concat(<p>Test</p>));

    if(props.Buttons != null){                  
    //Nimmt die Buttons JSON und mapd' diese. Dann wird pro JSON Argument ein Button mit den jeweiligen Werten erstellt  
        var buttons = props.Buttons.map((button) =>  
        <Button 
            key={button.Content.toString()} 
            onClick={() => 
                {
                    var task = button.Function.toString();
                    if(task == "navigate")
                    {
                        navigate(button.Content);
                    }
                    if(task == "add")
                    {
                        onAddBtnClick();
                    }
                }
            } 
            className="createbutton text-black text-bold">{button.Text}
         </Button>);
        
    }
     


    return (

            <div className="justify-content-center flex-column d-flex whitecard h-100">
                <div className= "justify-content-center flex-column d-flex">{buttons}</div>
                <div className="justify-content-center flex-column d-flex">{playerList}</div>
            </div>
            

    )
}

export default WhiteCard;