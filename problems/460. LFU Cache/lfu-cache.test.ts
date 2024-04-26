import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { LFUCache } from './lfu-cache';

describe('LFUCache', () => {
  const inputs = [
    [
      [[1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]] as const,
      [null, null, 1, null, -1, 3, null, -1, 3, 4],
      2,
    ],
  ];

  test('lfu', () => {
    inputs.forEach(([args, expectation, size]) => {
      const lfu = new LFUCache(size);

      args.map((a, i) => {
        switch (a.length) {
          case 2: {
            const [key, val] = a;
            lfu.put(key, val);
            break;
          }

          case 1: {
            const [key] = a;
            assert.equal(lfu.get(key), expectation[i]);
            break;
          }
        }
      });

    })
  });

})

