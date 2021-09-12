import React from "react";

import "./Board.css";

class BoardSquare extends React.Component {
  render() {
    return (
      <button className="board-square" onClick={() => this.props.onClick()}>
        <div className="board-square__content">{this.props.value}</div>
      </button>
    );
  }
}

export class Board extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      squares: Array(9).fill(null),
    };
  }

  handleClick(squareIndex) {
    const newSquaresState = [...this.state.squares];
    newSquaresState[squareIndex] = "X";

    this.setState({ squares: newSquaresState });
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
      </div>
    );
  }
}
