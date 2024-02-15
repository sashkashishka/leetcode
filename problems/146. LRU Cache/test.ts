import { LRUCache } from './solution';
import { LRUCache as LRUCacheLinkedList } from './solution2'

describe('LRUCache', () => {
  test('LRUCache', () => {
    const action = ["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"] as const;
    const args = [[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]] as const;
    const expectation = [null, null, null, 1, null, -1, null, -1, 3, 4];

    let lfu: LRUCache;

    action.map((a, i) => {
      switch (a) {
        case 'LRUCache':
          lfu = new LRUCache(...args[i]);
          break;

        case 'put':
          lfu.put(...args[i]);
          break;

        case 'get':
          expect(lfu.get(...args[i])).toBe(expectation[i]);
          break;
      }
    });
  });

  test('LRUCache 2', () => {
    const action = ["LRUCache", "put", "get", "put", "get", "get"] as const;
    const args = [[1], [2, 1], [2], [3, 2], [2], [3]] as const;
    const expectation = [null, null, 1, null, -1, 2];

    let lfu: LRUCache;

    action.map((a, i) => {
      switch (a) {
        case 'LRUCache':
          lfu = new LRUCache(...args[i]);
          break;

        case 'put':
          lfu.put(...args[i]);
          break;

        case 'get':
          expect(lfu.get(...args[i])).toBe(expectation[i]);
          break;
      }
    });
  });

  test('LRUCache 3', () => {
    const action = ["LRUCache", "get", "put", "get", "put", "put", "get", "get"] as const;
    const args = [[2], [2], [2, 6], [1], [1, 5], [1, 2], [1], [2]] as const;
    const expectation = [null, -1, null, -1, null, null, 2, 6];

    let lfu: LRUCache;

    action.map((a, i) => {
      switch (a) {
        case 'LRUCache':
          lfu = new LRUCache(...args[i]);
          break;

        case 'put':
          lfu.put(...args[i]);
          break;

        case 'get':
          expect(lfu.get(...args[i])).toBe(expectation[i]);
          break;
      }
    });
  });
});

describe('LRUCacheLinkedList', () => {
  test.each([
    [
      [[1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]] as const,
      [null, null, 1, null, -1, null, -1, 3, 4],
      2,
    ],
    [[[2, 1], [2], [3, 2], [2], [3]] as const, [null, 1, null, -1, 2], 1],
    [
      [[2], [2, 6], [1], [1, 5], [1, 2], [1], [2]] as const,
      [-1, null, -1, null, null, 2, 6],
      2,
    ],
    [
      [[2, 1], [1, 1], [2, 3], [4, 1], [1], [2]] as const,
      [null, null, null, null, -1, 3],
      2,
    ],
  ])('%j', (args, expectation, size) => {
    const lru = new LRUCacheLinkedList(size);

    args.map((a, i) => {
      switch (a.length) {
        case 2: {
          const [key, val] = a;
          lru.put(key, val);
          break;
        }

        case 1: {
          const [key] = a;
          expect(lru.get(key)).toBe(expectation[i]);
          break;
        }
      }
    });
  });

})
