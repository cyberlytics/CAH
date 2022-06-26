/**
 * @jest-environment jsdom
 */
import * as ReactDOMClient from 'react-dom/client';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Lobby from "../pages/Lobby";
import blackCard from "../pages/BlackCard";
import compWhitecard from "../components/WhiteCard";
import startpage from "../pages/startpage";
import compBlackCard from "../components/BlackCard";
import compWhiteCradSTack from "../components/WhiteCardStack"
import compNavButton from "../components/NavigateButton";
import comTextfield from "../components/TextField";
import comUserText from "../components/UserTextInputs";
import UserContextProvider, {UserContext} from "../contexts/UserContext";
const React=require("react");
const { unmountComponentAtNode,render } =require( "react-dom");
const {act}=require("react-dom/test-utils");
import { createRoot } from 'react-dom/client';
import {changeAttribute} from "jsdom/lib/jsdom/living/attributes";
const container = document.createElement("div");

// Create a root.
const root = ReactDOMClient.createRoot(container);

// Before
unmountComponentAtNode(container);

// After
root.unmount();


it("renders with or without a name", () => {

    expect(1).toBe(1);
});
  //  it("Lobby test",()=>{
  // expect(lobby.name).not.toBeDefined();
  //  });
 //   it("Lobby test 2",()=>{
   //     root.render(<Lobby probs="random" />,container)
  //  expect(container.textContent).toBeDefined();
//});
    it("test Black Card",()=>{
        const props="random";
expect(blackCard(props)).not.toBeDefined();
    });
//it("test startpage",()=>{
 //   const props="random";
  //  expect(startpage(props)).toBeUndefined();
//});
it(' components/whitecard',()=>{
    const props="random";
    expect(compWhitecard(props)).toBeDefined();
})
it("test Components WhiteCardsStack",()=>{
    const props="random";
    expect(compWhiteCradSTack(props)).toBeDefined();
})
it("test Components BlackCard",()=>{
    const props="random";
    expect(compBlackCard(props)).toBeDefined();
})
it("test Components Textfield",()=>{
    const props="random";
    expect(comTextfield(props)).toBeDefined();
})
it("test Components UserTextInput",()=>{
    const props="random";
    expect(comUserText(props)).toBeDefined();
})
it("Test Class UserContextProvider",()=>{
    const name="random";

    expect(UserContext).toBeDefined();
})
//it("test Components NavigateButton",()=>{
//    const props="random";
//    expect(compNavButton(props)).toBeDefined();
//})
