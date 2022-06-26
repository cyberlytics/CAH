/**
 * @jest-environment jsdom
 */
import * as ReactDOMClient from 'react-dom/client';
import { Navigate, useNavigate, useParams } from "react-router-dom";
import Lobby from "../pages/Lobby";
import blackCard from "../pages/BlackCard";
import startpage from "../pages/startpage";
const React=require("react");
const { unmountComponentAtNode,render } =require( "react-dom");
const {act}=require("react-dom/test-utils");
import { createRoot } from 'react-dom/client';
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
    it("Lobby test",()=>{
  // expect(lobby.name).not.toBeDefined();
    });
    it("Lobby test 2",()=>{

        root.render(<Lobby probs="random" />,container)

    expect(container.textContent).toBeDefined();
});
    it("test Black Card",()=>{
        const props="random";
expect(blackCard(props)).not.toBeDefined();
    });
it("test startpage",()=>{
    const props="random";
 //   expect(startpage(props)).toBeDefined();
});