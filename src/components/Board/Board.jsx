import React from "react";

import "./Board.css";

function BoardSquare(props) {
  return (
    <button className="board-square" onClick={props.onClick}>
      <div className="board-square__content">{props.value}</div>
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

  handleClick(squareIndex) {
    const newSquaresState = [...this.state.squares];
    newSquaresState[squareIndex] = this.state.xIsNextPlayer ? "X" : "O";

    this.setState({
      squares: newSquaresState,
      xIsNextPlayer: !this.state.xIsNextPlayer,
    });
  }

  renderSquare(squareIndex) {
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

        <p className="board__next-player">Prochain joueur : {nextPlayer}</p>
      </div>
    );
  }
}
