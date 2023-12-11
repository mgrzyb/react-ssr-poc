import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App"

ReactDOM.hydrate(React.createElement(App, window["initialState"]), document.getElementById("app"))