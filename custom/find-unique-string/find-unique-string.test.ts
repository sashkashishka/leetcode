import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { benny } from './find-unique-string';

describe('benny', () => {
  const inputs = [
    ['abcdefga', 5, 'abcde'],
    ['abbcdefga', 5, 'bcdef'],
    ['abbcdefga', 4, 'bcde'],
    ['abbcdbefga', 4, 'cdbe'],
  ] as const;

  test('run', () => {
    inputs.forEach(([str, consecutive, result]) => {
      const output = benny(str, consecutive);

      assert.equal(output, result, JSON.stringify({ str, consecutive, result }));
    })
  });
});

