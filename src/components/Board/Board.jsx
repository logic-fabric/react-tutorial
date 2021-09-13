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
      emptySquares: 9,
      xIsNextPlayer: true,
      winner: null,
    };
  }

  clearState() {
    const newState = {
      squares: Array(9).fill(null),
      emptySquares: 9,
      xIsNextPlayer: true,
      winner: null,
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

      let newState = {
        squares: newSquaresState,
        emptySquares: this.state.emptySquares - 1,
        xIsNextPlayer: !this.state.xIsNextPlayer,
        winner: this.getWinner(newSquaresState),
      };

      this.setState(newState);
    }
  }

  renderSquare(squareIndex) {
    return (
      <BoardSquare
        value={this.state.squares[squareIndex]}
        onClick={() => {
          this.handleClick(squareIndex);
        }}
      />
    );
  }

  render() {
    const nextPlayer = this.state.xIsNextPlayer ? "X" : "O";

    console.log("state =", this.state);

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

        {this.state.winner || this.state.emptySquares === 0 ? (
          <div className="board__modal-bg">
            <div className="board__modal">
              {this.state.winner ? (
                <div>
                  <span
                    className={`${this.state.winner === "X" ? X_ICON : O_ICON}`}
                  ></span>
                  <span> gagne la partie !</span>
                </div>
              ) : (
                <div>Match nul !</div>
              )}

              <button onClick={() => this.clearState()}>Rejouer</button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
