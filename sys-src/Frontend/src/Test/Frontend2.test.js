/**
 * @jest-environment jsdom
 */

import React from "react";
import { createRoot } from 'react-dom/client'
import { act } from "react-dom/test-utils";
import Lobby from "../pages/Lobby";
import {create} from "react-test-renderer";
const container = document.getElementById('app');
const root = createRoot(container);

let container = null;
beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});
afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});
it("Lobby test ",()=>{
    act(()=> {
        render(<Lobby props="random"/>, container)
        expect(container.textContent).toBeDefined();
    });
});