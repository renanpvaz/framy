const Square = props => (
  button({ className: 'square', onclick: () => props.onClick()},
    props.value
  )
);

const Board = props => Component({
  id: props.id,
  state: {
    squares: Array(9).fill(''),
    xIsNext: true,
  },

  handleClick(i) {
    const squares = this.state.squares.slice();

    if (calculateWinner(squares) || squares[i]) return;

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  },

  renderSquare(i) {
    return Square({
      id: i,
      value: this.state.squares[i],
      onClick: () => this.handleClick(i)
    });
  },

  render() {
    const winner = calculateWinner(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      div(
        div({ className: 'status'}, status),
        div({ className: 'board-row' },
          this.renderSquare(0),
          this.renderSquare(1),
          this.renderSquare(2)
        ),
        div({ className: 'board-row' },
          this.renderSquare(3),
          this.renderSquare(4),
          this.renderSquare(5)
        ),
        div({ className: 'board-row' },
          this.renderSquare(6),
          this.renderSquare(7),
          this.renderSquare(8)
        )
      )
    );
  }
});

const Game = props => Component({
  id: props.id,

  render() {
    return (
      div({ className: 'game' },
        div({ className: 'game-board' },
          Board({ id: 'board' })
        ),
        div({ className: 'game-info' },
          div(),
          ol()
        )
      )
    );
  }
});

// ========================================

document.body.appendChild(
  Game({ id: 'tic-tac-toe' })
);

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
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
