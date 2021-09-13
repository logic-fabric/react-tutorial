import React from "react";

import "./Board.css";

export const X_ICON = "fas fa-times-circle";
export const O_ICON = "fas fa-dot-circle";

function BoardSquare(props) {
  return (
    <button
      className={`board-square${
        props.winningConfig.includes(props.squareIndex)
          ? props.value === "X"
            ? " x-bg"
            : " o-bg"
          : ""
      }`}
      onClick={props.onClick}
      disabled={props.value}
    >
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
  renderSquare(squareIndex, winningConfig) {
    return (
      <BoardSquare
        key={`square-${squareIndex}`}
        squareIndex={squareIndex}
        value={this.props.squares[squareIndex]}
        winningConfig={winningConfig}
        onClick={() => {
          this.props.handleClick(squareIndex);
        }}
      />
    );
  }

  render() {
    return (
      <div className="board">
        {[0, 1, 2].map((row) => (
          <div className="board__row" key={`row-${row}`}>
            {[0, 1, 2].map((col) =>
              this.renderSquare(3 * row + col, this.props.winningConfig)
            )}
          </div>
        ))}

        {this.props.winner || this.props.emptySquares === 0 ? (
          <div className="board__modal-bg">
            <div className="board__modal">
              {this.props.winner ? (
                <div>
                  <span
                    className={`${this.props.winner === "X" ? X_ICON : O_ICON}`}
                  ></span>
                  <span> gagne la partie !</span>
                </div>
              ) : (
                <div>Match nul !</div>
              )}

              <button onClick={() => this.props.clearState()}>Rejouer</button>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}
