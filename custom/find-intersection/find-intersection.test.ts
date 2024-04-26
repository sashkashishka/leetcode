import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { intersection } from "./find-intersection.js";

describe("intersection", () => {
  test("empty", () => {
    assert.deepEqual(intersection(), [])
  });

  test("invalid types", () => {
    assert.deepEqual(intersection(null), []);
    assert.deepEqual(intersection("string1", "string2"), []);
    assert.deepEqual(intersection(2, 3), []);
    assert.deepEqual(intersection({}, {}), []);
  });

  test("single dimension", () => {
    assert.deepEqual(intersection([1, 2, 3, 4], []), []);
    assert.deepEqual(intersection([1, 2, 3, 4], [4, 3, 2, 1]), [1, 2, 3, 4]);
    assert.deepEqual(intersection([1, 2, 3, 4], [3]), [3]);
    assert.deepEqual(intersection(["string"], ["a", "b", "string", "d"]), [
      "string"
    ]);
  });

  test("multidimensional (separate each element)", () => {
    assert.deepEqual(intersection([1, [2, 3]], [[2]]), [[2]]);
    assert.deepEqual(intersection([1, 2, [3, [4]]], [1, [[4]]]), [1, [[4]]]);
    assert.deepEqual(intersection([[[1, 2, 3]]], [1, 2, 3, [[2, 3]]]), [
      [[2]],
      [[3]]
    ]);
    assert.deepEqual(intersection([[1, [2, [[3]]]]], [[1, [[2, [3]]]]]), [
      [1],
      [[[[3]]]]
    ]);
  });
});
