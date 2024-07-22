import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { bstToGst, bstToGst2, TN } from './1038';

function buildBinaryTree(arr: (number | null)[], level = 0, i = 0) {
  const v = arr[i];

  if (v === undefined || v === null) return null;

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

describe("bstToGst", () => {
  function doTest(bst: (number | null)[], gst: number[]) {
    const actual = bstToGst(buildBinaryTree(bst));
    const actual2 = bstToGst2(buildBinaryTree(bst));

    assert.deepEqual(treeToArr(actual!), gst.sort((a, b) => a - b), `for tree:\n${String(bst)}\n`);
    assert.deepEqual(treeToArr(actual2!), gst.sort((a, b) => a - b), `for tree:\n${String(bst)}\n`);
  }

  const cases: Array<[(number | null)[], number[]]> = [
    [
      [4, 1, 6, 0, 2, 5, 7, null, null, null, 3, null, null, null, 8],
      [30, 36, 21, 36, 35, 26, 15, 33, 8]
    ],
    [
      [0, null, 1],
      [1, 1]
    ],
    [
      [3, 2, 4, 1],
      [10, 9, 7, 4]
    ]
  ];

  test('1038', () => {
    cases.forEach(([bst, gst]) => doTest(bst, gst))
  })
});

