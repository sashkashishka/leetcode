import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { findOrder } from './210';

describe('findOrder', () => {
  const inputs: Array<[number[][], number, number[]]> = [
    [[], 1, [0]],
    [[], 2, [0, 1]],
    [[[1, 0]], 2, [0, 1]],
    [[[1, 0]], 3, [2, 0, 1]],
    [
      [[0, 1], [1, 0], [2, 0]],
      3,
      []
    ],
    [
      [[0, 1], [1, 0]],
      2,
      []
    ],
    [
      [[1, 0], [2, 0], [3, 1], [3, 2]],
      4,
      [0, 2, 1, 3]
    ],
    [
      [[1, 0], [2, 0]],
      2,
      [0, 1, 2]
    ],
    [
      [[1, 0], [0, 3], [0, 2], [3, 2], [2, 5], [4, 5], [5, 6], [2, 4]],
      7,
      [6, 5, 4, 2, 3, 0, 1]
    ],
    [
      [[1, 0], [0, 2], [0, 3], [3, 2], [2, 5], [4, 5], [5, 6], [2, 4]],
      7,
      [6, 5, 4, 2, 3, 0, 1]
    ],
    [
      [[1, 0], [0, 3], [0, 2], [3, 2], [2, 5], [4, 5], [5, 6]],
      7,
      [6, 5, 2, 3, 0, 1, 4]
    ],
  ];

  test('210', () => {
    inputs.forEach(([prerequisites, numCourses, result]) => {
      const output = findOrder(numCourses, prerequisites);

      assert.deepEqual(output, result, `prerequisites: ${JSON.stringify(prerequisites)}`);
    })
  });
});


