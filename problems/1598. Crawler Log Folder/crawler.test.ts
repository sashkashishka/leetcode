import { describe, test } from 'node:test';
import assert from 'node:assert/strict';

import { minOperations } from './crawler';

describe('minOperations', () => {
  const cases = [
    [
      ["d1/", "d2/", "../", "d21/", "./"],
      2,
    ],
    [
      ["d1/", "d2/", "./", "d3/", "../", "d31/"],
      3
    ],
    [
      ["d1/", "../", "../", "../"],
      0
    ],
  ];

  test('1598', () => {
    cases.forEach(([logs, result]) => {
      assert.equal(minOperations(logs as string[]), result)
    })
  });
})
