import React from "react";

import { Board, O_ICON, X_ICON } from "../Board/Board";

import "./Game.css";

const WINNING_CONFIGURATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2],
];

export class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      squares: Array(9).fill(null),
      emptySquares: 9,
      winner: null,
      xIsNextPlayer: true,
      boardHistory: Array(9).fill(null),
    };
  }

  clearState() {
    const newState = {
      squares: Array(9).fill(null),
      emptySquares: 9,
      winner: null,
      xIsNextPlayer: true,
      boardHistory: Array(9).fill(null),
    };

    this.setState(newState);
  }

  getWinner(squares) {
    for (let config of WINNING_CONFIGURATIONS) {
      const [index1, index2, index3] = config;

      if (
        squares[index1] &&
        squares[index1] === squares[index2] &&
        squares[index1] === squares[index3]
      ) {
        return squares[index1];
      }
    }

    return null;
  }

  handleClick(squareIndex) {
    if (!this.state.winner && !this.state.squares[squareIndex]) {
      const newSquaresState = [...this.state.squares];
      newSquaresState[squareIndex] = this.state.xIsNextPlayer ? "X" : "O";

      const newBoardHistory = [...this.state.boardHistory];
      newBoardHistory.push(newSquaresState);

      let newState = {
        squares: newSquaresState,
        emptySquares: this.state.emptySquares - 1,
        winner: this.getWinner(newSquaresState),
        xIsNextPlayer: !this.state.xIsNextPlayer,
        boardHistory: newBoardHistory,
      };

      this.setState(newState);
    }
  }

  render() {
    const nextPlayer = this.state.xIsNextPlayer ? "X" : "O";

    return (
      <div className="main">
        <h1>tic tac toe</h1>

        <div className="game">
          <Board
            squares={this.state.squares}
            emptySquares={this.state.emptySquares}
            winner={this.state.winner}
            xIsNextPlayer={this.state.xIsNextPlayer}
            handleClick={(squareIndex) => this.handleClick(squareIndex)}
            clearState={() => this.clearState()}
          />

          <div className="game-infos">
            <p className="game-infos__next-player">
              <span>Prochain joueur : </span>
              <span
                className={`${nextPlayer === "X" ? X_ICON : O_ICON}`}
              ></span>
            </p>

            <ol>{/* TO DO */}</ol>
          </div>
        </div>
      </div>
    );
  }
}
