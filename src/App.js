// allows us to "remember" actions (state) for usage in the program
import { useState } from "react";

// defines a square component
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// this acts as the main method!!
function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    // checks if the square a user is trying to click already has a value (X or O) and
    // checks if the winning requirements have been met
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    //returns a copy of the squares array
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  //functionality for determining winner & what to display on the page
  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  //constructs the layout of the board including the square components
  return (
    <>
      <div className="status"> {status} </div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() {
  /* creates an array with 1 element & that item 
                                        contains an array with 9 elements. Each element 
                                        holds the value of null initially */
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    // created a new array with all of the elements of history starting from the beginning
    // and up to the current move. Then it appends the contents of 'nextSquares' to the end of the array
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    //Spread Syntax (...history): enumerate all the items in history
    // creates a new array that contains all the items in history followed by
    // nextSquares
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// Purpose: based on the state of the "squares" array we determine the winner of the tic-tac-toe game
// @Return: returns the player value (X or O) of the player who won the game OR null if there is no current winner
function calculateWinner(squares) {
  // these are the 3-in-a-row ways a player can win
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

  // loops through the different configurations that allow a player to win
  for (let i = 0; i < lines.length; i++) {
    // creates a variable that will go through the winning lines to identify if a, b and c
    // are holding like values (X or O)
    const [a, b, c] = lines[i];
    // checks if the values of a, b and c are all containing the same X or O values
    // (checking for 3-in-a-row).
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  // indicates no current winner of the game (game still inprogress)
  return null;
}
