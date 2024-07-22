import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { canFinish } from './207';

describe('canFinish', () => {
  const inputs: Array<[number[][], number, boolean]> = [
    [[], 1, true],
    [[[1, 0]], 2, true],
    [
      [
        [1, 0],
        [0, 1],
      ], 2, false
    ],
    [
      [[0, 10], [3, 18], [5, 5], [6, 11], [11, 14], [13, 1], [15, 1], [17, 4]],
      20,
      false
    ],
    [
      [[1, 4], [2, 4], [3, 1], [3, 2]],
      5,
      true
    ],
    [
      [[1, 0], [0, 2], [2, 1]],
      3,
      false
    ],
    [
      [[1, 0], [2, 6], [1, 7], [6, 4], [7, 0], [0, 5]],
      8,
      true
    ]
  ];

  test('207', () => {
    inputs.forEach(([prerequisites, numCourses, result]) => {
      const output = canFinish(numCourses, prerequisites);

      assert.equal(output, result, `prerequisites: ${JSON.stringify(prerequisites)}`);
    })
  });
});

