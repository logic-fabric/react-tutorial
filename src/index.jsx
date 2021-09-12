import React from "react";
import ReactDOM from "react-dom";

import { Game } from "./components/Game/Game";

import "./index.css";

ReactDOM.render(
  <div className="content-wrapper">
    <Game />
  </div>,
  document.getElementById("root")
);
