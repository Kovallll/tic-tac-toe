import React from 'react';
import './Game.css';

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  // square(squares) {
  //   let countRows = 3
  //   for(let i = 0; i < squares.length / countRows; i++) {
  //     for(let j = 0; j < countRows; j++) {
  //       return (
          
  //       )
  //     } 
  //   }
  // }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    let isWin = false;
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => {
            isWinSquares(isWin)
            this.jumpTo(move)
          }}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      isWin = true;
      status = "Winner: " + winner;
    }else if(detectDraw(current.squares)) {
      status = "Draw!"
    }else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div className='status'>{status}</div>
          <ol className='btn'>{moves}</ol>
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
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    const rows = document.querySelectorAll(".square");
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      lines[i].forEach(i => rows[i].setAttribute('id', "winBtn"))
      return (
        squares[a]
      );
    }
  }
  return null;
}



function isWinSquares(bool) {
  if(bool) {
    const rows = document.querySelectorAll(".square");
    console.log(rows)
    rows.forEach(i => i.removeAttribute("id"))
  }
}

function detectDraw(squares) {
  for(let i = 0; i < squares.length; i++) {
    if(squares[i] == null) return false
  }
  return true
}

export default Game;
