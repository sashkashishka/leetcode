function getSize(qty) {
  let minSize = 3;
  let bottomSize = 2;

  while (minSize <= qty) {
    if (minSize === qty) return bottomSize;

    minSize += bottomSize + 1;
    bottomSize += 1;
  }

  return -1;
}

function createMatrix(size) {
  const matrix = Array.from({ length: size })
    .map(() => Array.from({ length: size + size - 1 }).fill(' '));

  return matrix;
}

function setLastNumber(x) {
  return `${x}`.slice(-1);
}

export function makeTriangle(m, n) {
  const qty = n - m + 1;
  const bottomSize = getSize(qty);

  if (bottomSize === -1) return '';

  const matrix = createMatrix(bottomSize);
  let M = m + 1;
  const N = n;

  const squareLength = bottomSize * 2 + 1;
  let direction = 'bottom';
  let x = ((squareLength - 1) / 2) - 1;
  let y = 0;

  matrix[y][x] = setLastNumber(m);

  while (M <= N) {
    let tmpX;
    let tmpY;
    let tmpDirection;

    if (direction === 'bottom') {
      tmpX = x + 1;
      tmpY = y + 1;
      tmpDirection = 'left';
    }

    if (direction === 'left') {
      tmpX = x - 2;
      tmpY = y;
      tmpDirection = 'top';
    }

    if (direction === 'top') {
      tmpX = x + 1;
      tmpY = y - 1;
      tmpDirection = 'bottom';
    }

    const cell = matrix?.[tmpY]?.[tmpX];

    if (cell === ' ') {
      y = tmpY;
      x = tmpX;

      matrix[y][x] = setLastNumber(M);

      M++;
    } else {
      direction = tmpDirection;
    }
  }

  return matrix.map(m => m.join('').trimEnd()).join('\n');
}
