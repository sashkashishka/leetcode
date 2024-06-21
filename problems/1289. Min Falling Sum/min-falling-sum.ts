
function min(grid: number[][], x: number, exclude?: number) {
  const row = grid[x];
  const size = row?.length;
  let min = Infinity;
  let index = -1;

  for (let i = 0; i < size; i++) {
    if (i === exclude) continue;

    const n = row[i];

    if (min > n) {
      min = n;
      index = i;
    }
  }

  return index;
}

function minsum(grid: number[][], x: number, y?: number) {
  const size = grid.length;

  let x1 = x;
  let x2 = x + 1;
  let y1 = NaN;
  let y2 = NaN;
  let minN = Infinity;
  let sum = Infinity;

  for (let i = 0; i < size; i++) {
    if (i === y) continue;

    const j = min(grid, x2, i);
    const n = grid[x1][i];
    const m = grid[x2][j]

    const s = n + m;

    if (sum > s) {
      sum = s;
      y1 = i;
      y2 = j;
    }

    if (sum === s && minN > n) {
      minN = n;
      y1 = i;
      y2 = j;
    }
  }

  return {
    x1,
    y1,
    x2,
    y2,
  }
}


interface Solving {
  x: number;
  y: number;
  n: number;
}

function minFallingPathSum(grid: number[][]): number {
  if (grid.length === 1) return grid[0][0];

  const size = grid.length;
  const solvings: Array<[Solving, Solving]> = [];

  let i = 0;
  let prevY = NaN;

  while (i < size - 1) {
    const { x1, y1, x2, y2 } = minsum(grid, i, prevY);

    const a = solvings[i - 1];

    if (a?.[0].y === y1) {
      prevY = a[0].y;
      continue;
    }

    solvings.push([
      { x: x1, y: y1, n: grid[x1][y1] },
      { x: x2, y: y2, n: grid[x2][y2] },
    ]);
    prevY = NaN;
    i++;
  }

  let sum = NaN;
  let j = -1;

  while (j < solvings.length - 1) {
    j++;

    const a = solvings[j];
    const b = solvings[j + 1];

    if (Number.isNaN(sum)) {
      sum = a[0].n;
    }

    if (b === undefined) {
      sum += a[1].n;
      break;
    }


    const prev = a[1];
    const curr = b?.[0];

    const s = a[1].n;

    if (prev.x === curr?.x && prev.y === curr?.y) {
      sum += s;
      continue;
    }

    const prev0 = a[0];

    if (curr !== undefined && prev0.y !== curr?.y) {
      sum += curr.n;
    }
  }

  return sum;
};

// bottom to top
function minFallingPathSumBTT(grid: number[][]) {
  let row = grid[0].slice();
  let size = grid.length;

  for (let x = 1; x < size; x++) {
    const newRow = Array.from<number>({ length: size }).fill(0);

    let min1 = Infinity;
    let min2 = Infinity;
    let idx = NaN;

    // look for min1 and min2
    for (let y = 0; y < size; y++) {
      if (row[y] < min1) {
        min2 = min1;
        min1 = row[y];
        idx = y;
      } else if (row[y] < min2) {
        min2 = row[y];
      }
    }

    // add to row min1 and min2
    for (let y = 0; y < size; y++) {
      if (idx === y) {
        newRow[y] = min2 + grid[x][y];
      } else {
        newRow[y] = min1 + grid[x][y];
      }
    }

    row = newRow;
  }

  return Math.min(...row);
}

export { minFallingPathSum, minFallingPathSumBTT };



