import React from "react";
import WhiteCard from "./WhiteCard.js";

////////////////////////////////////////////
// Kurzbeschreibung: Erzeugt einen Kartenstapel aus weißen Karten mit einer geraden weißen Karte darauf,
// auf der Buttons angezeigt werden.
// letzte Änderung: 06.06.2022 - 18:00
///////////////////////////////////////////
function WhiteCardStack(props) {
  return (
    <div className="justify-content-center flex-column d-flex heightchanger whitediv">
      <WhiteCard
        Socket={props.Socket}
        NavigateButtons={props.NavigateButtons}
        Inputs={props.Inputs}
      />
    </div>
  );
}

export default WhiteCardStack;
