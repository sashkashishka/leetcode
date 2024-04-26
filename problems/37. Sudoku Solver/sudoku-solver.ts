type tBoard = string[][];

function uniqueInRow(board: tBoard, v: string, r: number) {
  const row = board[r];

  return row.every(n => n !== v);
}

function uniqueInColumn(board: tBoard, v: string, c: number) {
  return board.every(row => row[c] !== v);
}

export function uniqueInCell(board: tBoard, v: string, r: number, c: number) {
  const rowStart = Math.floor(r / 3);
  const colStart = Math.floor(c / 3);
  const smallBoard: tBoard = [];

  for (let i = 0; i < 3; i++) {
    smallBoard[i] = board[(rowStart * 3) + i].slice((colStart * 3), (colStart * 3) + 3);
  }

  for (let i = 0; i < 3; i++) {
    if (!uniqueInRow(smallBoard, v, i)) return false;

    if (!uniqueInColumn(smallBoard, v, i)) return false;
  }

  return true;
}

function preparePossibleValues(board: tBoard): (Record<string, boolean> | string)[][] {
  const copyBoard = JSON.parse(JSON.stringify(board));

  for (let i = 0; i < 81; i++) {
    const r = Math.floor(i / 9);
    const c = i % 9;

    if (copyBoard[r][c] !== '.') continue;

    copyBoard[r][c] = {};

    for (let n = 1; n <= 9; n++) {
      if (uniqueInRow(board, String(n), r)) {
        copyBoard[r][c][n] = true;
      }
    }

    for (let k in copyBoard[r][c]) {
      if (uniqueInColumn(board, String(k), c)) continue;

      delete copyBoard[r][c][k];
    }
  }

  return copyBoard;
}

function backtrack(board: tBoard, possibleBoard: any, n = 0) {
  for (let i = n; i < 81; i++) {
    const r = Math.floor(i / 9);
    const c = i % 9;
    const possibleValues = possibleBoard[r][c];

    if (typeof possibleValues === 'string') continue;
    if (board[r][c] !== '.') continue;

    let result = false;

    for (let v in possibleValues) {
      if (
        !uniqueInRow(board, v, r)
        || !uniqueInColumn(board, v, c)
        || !uniqueInCell(board, v, r, c)
      ) {
        continue;
      }

      board[r][c] = v;

      result = backtrack(board, possibleBoard, i + 1);

      if (result) return true;
    }

    board[r][c] = '.';
    return false;
  }

  return true;
}

export function solveSudoku(board: tBoard): void {
  const possibleBoard = preparePossibleValues(board);

  backtrack(board, possibleBoard);
}
