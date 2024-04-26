import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { wordPattern } from './word-pattern';

describe('wordPattern', () => {
  test('wordPattern', () => {
    assert.equal(wordPattern('abba', 'dog cat cat dog'), true);
    assert.equal(wordPattern('abba', 'dog cat cat fish'), false);
    assert.equal(wordPattern('aaaa', 'dog cat cat dog'), false);
    assert.equal(wordPattern('abba', 'dog dog dog dog'), false);
    assert.equal(wordPattern('abc', 'dog cat dog'), false);
  });
});
