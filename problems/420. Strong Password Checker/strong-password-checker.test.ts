import { describe, test } from "node:test";
import assert from "node:assert/strict";

import { strongPasswordChecker } from "./strong-password-checker";

describe('strongPasswordChecker', () => {
  const inputs = [
    ['a', 5],
    ['aA1', 3],
    ['aaaB1', 1],
    ['1337C0d3', 0],
    ['aaa123', 1],
    ['aaa111', 2],
    ['ABABABABABABABABABAB1', 2],
    ['bbaaaaaaaaaaaaaaacccccc', 8],
    ['aaaaAAAAAA000000123456', 5],
    ['aaaaabbbbbcccccaaaaabbbbbccccc', 13],
    ['A1234567890aaabbbbccccc', 4],
    ['FFFFFFFFFFFFFFF11111111111111111111AAA', 23],
    ['aaaaaaaAAAAAA6666bbbbaaaaaaABBC', 13],
  ] as const;

  test('1', () => {
    inputs.forEach(([p, r]) => {
      assert.equal(strongPasswordChecker(p), r);
    });
  })
})
