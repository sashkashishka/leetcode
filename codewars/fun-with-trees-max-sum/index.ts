export interface Tree {
  value: number;
  left: Tree | null;
  right: Tree | null;
}

function maxSum(root: Tree | null, sum = 0) {
  if (root === null) return 0;

  if (root.left === null && root.right === null) return sum + root.value;

  let sumLeft = -Infinity;

  if (root.left) {
    sumLeft = maxSum(root.left, sum + root.value);
  }

  let sumRight = -Infinity;

  if (root.right) {
    sumRight = maxSum(root.right, sum + root.value)
  }

  return Math.max(sumLeft, sumRight);
}

export { maxSum }
