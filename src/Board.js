import Square from './Square';

export default function Board({ squares, onClick, winningLine }) {
  const renderCell = (i) => {
    const highlight = winningLine?.includes(i);
    return (
      <td key={i}>
        <Square
          value={squares[i]}
          onClick={() => onClick(i)}
          highlight={highlight}
        />
      </td>
    );
  };

  const rows = [];
  for (let r = 0; r < 3; r++) {
    const cells = [];
    for (let c = 0; c < 3; c++) {
      cells.push(renderCell(r * 3 + c));
    }
    rows.push(<tr key={r}>{cells}</tr>);
  }

  return (
    <div className="board-wrap">
      <table className="board-table">
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
