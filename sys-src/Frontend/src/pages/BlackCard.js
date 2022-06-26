import React from "react";
import * as items from "react-bootstrap/ElementChildren";
//import { ButtonGroup, Button } from "shards-react";


export default function blackCard(props){
const item = props.item;

let itemList =[];
items.forEach((item, index)=>{
    itemList.push( <li key={index}>{item}</li>)
  })
}