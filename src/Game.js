import { useState } from 'react';
import Board from './Board';

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
    [0, 4, 8], [2, 4, 6],            // diagonals
  ];
  for (let [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

export default function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), location: null }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [ascending, setAscending] = useState(true);

  const current = history[stepNumber];
  const result = calculateWinner(current.squares);
  const winner = result?.winner;
  const winningLine = result?.line;

  const handleClick = (i) => {
    const historyUpToStep = history.slice(0, stepNumber + 1);
    const currentSquares = [...current.squares];
    if (winner || currentSquares[i]) return;

    currentSquares[i] = xIsNext ? 'X' : 'O';
    const row = Math.floor(i / 3);
    const col = i % 3;
    setHistory([...historyUpToStep, { squares: currentSquares, location: [row, col] }]);
    setStepNumber(historyUpToStep.length);
    setXIsNext(!xIsNext);
  };

  const moves = history.map((step, move) => {
    const desc = move === stepNumber
      ? `You are at move #${move}`
      : move
        ? `Go to move #${move} (${step.location})`
        : 'Go to game start';
    return (
      <li key={move}>
        {move === stepNumber ? <span>{desc}</span> : <button onClick={() => setStepNumber(move)}>{desc}</button>}
      </li>
    );
  });

  if (!ascending) moves.reverse();

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (stepNumber === 9) {
    status = 'Draw!';
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={handleClick} winningLine={winningLine} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <button onClick={() => setAscending(!ascending)}>
          Sort {ascending ? 'Descending' : 'Ascending'}
        </button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
