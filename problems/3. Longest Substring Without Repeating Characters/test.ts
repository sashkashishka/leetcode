import { lengthOfLongestSubstring } from './solution';

describe('lengthOfLongestSubstring', () => {
  const inputs = [
    ['abcabcbb', 3],
    ['bbbbb', 1],
    ['pwwkew', 3],
    ['', 0],
    [' ', 1],
    ['ckilbkd', 5],
    ['dvdf', 3],
    ['anviaj', 5],
  ];
    
  test.each(inputs)('longest substring %p', (v, result) => {
    const output = lengthOfLongestSubstring(v);

    expect(output).toBe(result);
  });
});

