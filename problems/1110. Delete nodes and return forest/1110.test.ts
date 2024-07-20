import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { delNodes, TN } from "./1110.js";

function buildBinaryTree(arr: (number | null)[], level = 0, i = 0) {
  const v = arr[i];

  if (!v) return null;

  const gap = Array.from({ length: level }).reduce<number>((acc, curr, j) => acc + Math.pow(2, j), 0);
  const lqty = Math.pow(2, level);
  const lsi = gap;
  const nlsi = gap + lqty;

  const sn = i - lsi;
  const nsn = sn * 2;

  const left = nlsi + nsn;
  const right = left + 1;

  return new TN(v,
    buildBinaryTree(arr, level + 1, left),
    buildBinaryTree(arr, level + 1, right),
  )
}

function treeToArr(tree: TN) {
  let arr: number[] = [];

  arr.push(tree?.val);

  if (tree?.right) {
    arr = arr.concat(treeToArr(tree.right));
  }

  if (tree?.left) {
    arr = arr.concat(treeToArr(tree.left));
  }

  return arr.sort((a, b) => a - b);
}

describe("delNodes", () => {
  function doTest(root: (number | null)[], del: number[], forest: (number | null)[][]) {
    const tree = buildBinaryTree(root);

    const actual = delNodes(tree, del);

    assert.deepEqual(actual.map(treeToArr), forest, `for tree:\n${String(root)}\n`);
  }

  const cases: Array<[(number | null)[], number[], Array<(number | null)[]>]> = [
    [
      [1, 2, 3, 4, 5, 6, 7],
      [3, 5],
      [[1, 2, 4], [6], [7]],
    ],
    [
      [1, 2, 4, 3],
      [3],
      [[1, 2, 4]]
    ],
    [
      [1, 2, null, 4, 3],
      [2, 3],
      [[1], [4]],
    ],
    [
      [1, 2, 3, null, null, null, 4],
      [2, 1],
      [[3, 4]]
    ]
  ];

  test('1110', () => {
    cases.forEach(([root, del, forest]) => doTest(root, del, forest))
  })
});
