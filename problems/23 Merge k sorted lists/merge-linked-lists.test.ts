import { describe, test } from "node:test";
import assert from "node:assert/strict";

import { fromArr, mergeKLists, toArr } from "./merge-linked-lists";

describe('merge linked lists', () => {
  const inputs = [
    [
      [
        [1, 4, 5], [1, 3, 4], [2, 6]
      ],
      [1, 1, 2, 3, 4, 4, 5, 6]
    ],
    [[], []],
    [[[]], []],
    [
      [[], [-1, 5, 11], [], [6, 10]],
      [-1, 5, 6, 10, 11]
    ]
  ] as const;

  test('1', () => {
    inputs.forEach(([lists, result]) => {
      assert.deepEqual(toArr(mergeKLists(lists.map(v => fromArr(v)))), result);
    })
  })
})
