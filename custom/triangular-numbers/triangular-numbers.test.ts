import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { makeTriangle } from './triangular-numbers.js';

describe("triangular numbers", () => {
  test("It should works for basic tests", () => {
    assert.equal(makeTriangle(1, 12), "");
    assert.equal(makeTriangle(1, 100), "");

    var result =
      `   1
  9 2
 8 0 3
7 6 5 4`
    assert.equal(makeTriangle(1, 10), result);

    var result2 =
      ` 1
3 2`
    assert.equal(makeTriangle(1, 3), result2);

    var result3 =
      `    6
   7 7
  6 8 8
 5 0 9 9
4 3 2 1 0`
    assert.equal(makeTriangle(6, 20), result3);

  });
});
