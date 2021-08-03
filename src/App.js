import React from 'react';
import './App.css';
import Board from './Board.js'

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        //Create empty game board
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
    };
  }

  handleClick(i) {
      const history = this.state.history;
      const current = history[history.length - 1];
      const squares = current.squares.slice(); //create an updated copy of the array
      if(calculateWinner(squares) || squares[i])
      //checks if someone has one the game
      //or if a square has been filled
      {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        //concatenate new history entries onto history
        //concat() method doesn't mutate the original array
        history: history.concat([{
          squares: squares
        }]),
        xIsNext: !this.state.xIsNext,
      });
    }
  render() {
    const history = this.state.history;
    const current = history[history.length - 1];
    const winner = calculateWinner(current.squares);
    const moves = history.map((step, move) => {
      const desc = move ?
      'Got to move#' + move :
      'Got to game start';
      return (
        <li>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if(winner) {
      status = 'Winner: ' + winner;
    }
    else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board 
          squares={current.squares}
          onClick={(i) =>
          this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
  ];
  for(let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
          return squares[a];
      }
  }
  return null;
}

export default Game;