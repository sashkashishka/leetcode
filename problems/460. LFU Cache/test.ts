import { LFUCache } from './solution';

describe('LFUCache', () => {
  test.each([
    [
      [[1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]] as const,
      [null, null, 1, null, -1, 3, null, -1, 3, 4],
      2,
    ],
  ])('%j', (args, expectation, size) => {
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
          expect(lfu.get(key)).toBe(expectation[i]);
          break;
        }
      }
    });
  });

})

