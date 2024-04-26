import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { twoSumBF, twoSum2PHT, twoSum1PHT } from './two-sum.js';

describe('twoSum', () => {
  const inputs = [
    [[2, 7, 11, 15], 9, [0, 1]],
    [[3, 2, 4], 6, [1, 2]],
    [[3, 3], 6, [0, 1]],
    [[-1, 10], 9, [1, 0]],
  ];

  test('BF', () => {
    inputs.forEach(([v, t, result]) => {
      const output = twoSumBF(v, t);

      assert.equal(output.length, 2);
      assert.deepEqual(output.sort(), result.sort())
    })
  });

  test('2PHT', () => {
    inputs.forEach(([v, t, result]) => {
      const output = twoSum2PHT(v, t);

      assert.equal(output.length, 2);
      assert.deepEqual(output.sort(), result.sort())
    })
  });

  test('1PHT', () => {
    inputs.forEach(([v, t, result]) => {
      const output = twoSum1PHT(v, t);

      assert.equal(output.length, 2);
      assert.deepEqual(output.sort(), result.sort())
    })
  });
});
