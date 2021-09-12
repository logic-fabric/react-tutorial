import React from "react";

import { Board } from "../Board/Board";

import "./Game.css";

export class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <h1>tic tac toe</h1>

        <Board />

        <div className="game-infos">
          <div>{/* status */}</div>
          <ol>{/* TO DO */}</ol>
        </div>
      </div>
    );
  }
}
