import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { lengthOfLongestSubstring, lengthOfLongestSubstring2 } from './longest-substr';

describe('lengthOfLongestSubstring', () => {
  const inputs = [
    ['abcabcbb', 3],
    ['bbbbb', 1],
    ['pwwkew', 3],
    ['', 0],
    [' ', 1],
    ['c', 1],
    ['ac', 2],
    ['acv', 3],
    ['ckilbkd', 5],
    ['dvdf', 3],
    ['anviaj', 5],
    ['abba', 2],
  ];

  test('longest substring', () => {
    inputs.forEach(([v, result]) => {
      const output = lengthOfLongestSubstring(v);
      assert.equal(output, result);
    })
  });

  test('longest substring 2', () => {
    inputs.forEach(([v, result]) => {
      const output = lengthOfLongestSubstring2(v);
      assert.equal(output, result);
    })
  });
});

