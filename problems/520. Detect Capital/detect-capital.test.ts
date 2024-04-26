import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { detectCapitalUse } from './detect-capital';

describe('detectCapitalUse', () => {
  const inputs = [
    ['USA', true],
    ['FlaG', false],
    ['Flag', true],
    ['flag', true],
    ['fLag', false],
  ];

  test('detect capital', () => {
    inputs.forEach(([input, result]) => {
      const output = detectCapitalUse(input);

      assert.equal(output, result);
    })
  });
});
