/////////////////////////////////////////////
// FileName: UserContext.js
// Autor: Fabian Kraus - c4e1
// Erstellt am: 06.06.2022 - 21:00
// letzte Änderung: 07.06.2022 - 17:30
// Beschreibung: Übergibt den Usernamen und den Raum, in welchem sich der User befindet, unter Geschwister-Komponenten.
//               Allgemein werden hier variablen gesetzt, die mithilfe des ContextProviders an components weitergegeben werden können.
//               In diesen components muss dann n ur wieder der Context gesetzt werden, um die Variablen/Funktionen aufzurufen.
/////////////////////////////////////////////


import React, { createContext, Component } from 'react';

export const UserContext = createContext();

class UserContextProvider extends Component {

    state = {
        userName: "",
        userRoom: "",
        navPossible: false,
    }
    changeUserName = (data) => {
        console.log("ich war im Context");
        return this.setState({
            userName: data
        })
    }
    changeUserRoom = (data) => {
        console.log("ich war im Raum Context");
        return this.setState({
            userRoom: data
        })
    }

    render() {
        return(
            <UserContext.Provider value={{...this.state, changeUserName: this.changeUserName, changeUserRoom: this.changeUserRoom}}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}

export default UserContextProvider;