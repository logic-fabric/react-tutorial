import React from "react";

import "./Board.css";

const X_ICON = "fas fa-times-circle";
const O_ICON = "fas fa-dot-circle";

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

function BoardSquare(props) {
  return (
    <button className="board-square" onClick={props.onClick}>
      <div className="board-square__content">
        <span
          className={`${
            props.value ? (props.value === "X" ? X_ICON : O_ICON) : ""
          }`}
        ></span>
      </div>
    </button>
  );
}

export class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      squares: Array(9).fill(null),
      xIsNextPlayer: true,
    };
  }

  getWinner() {
    for (let config of WINNING_CONFIGURATIONS) {
      const [index1, index2, index3] = config;

      if (
        this.state.squares[index1] &&
        this.state.squares[index1] === this.state.squares[index2] &&
        this.state.squares[index1] === this.state.squares[index3]
      ) {
        return this.state.squares[index1];
      }
    }

    return null;
  }

  handleClick(squareIndex) {
    if (!this.state.squares[squareIndex]) {
      const newSquaresState = [...this.state.squares];
      newSquaresState[squareIndex] = this.state.xIsNextPlayer ? "X" : "O";

      this.setState({
        squares: newSquaresState,
        xIsNextPlayer: !this.state.xIsNextPlayer,
      });
    }
  }

  renderSquare(squareIndex) {
    console.log("Gagnant:", this.getWinner());

    return (
      <BoardSquare
        value={this.state.squares[squareIndex]}
        onClick={() => this.handleClick(squareIndex)}
      />
    );
  }

  render() {
    const nextPlayer = this.state.xIsNextPlayer ? "X" : "O";

    return (
      <div className="board">
        <div className="board__row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>

        <div className="board__row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>

        <div className="board__row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>

        <p className="board__next-player">
          <span>Prochain joueur : </span>
          <span className={`${nextPlayer === "X" ? X_ICON : O_ICON}`}></span>
        </p>
      </div>
    );
  }
}
