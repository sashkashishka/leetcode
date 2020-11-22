import { lengthOfLongestSubstring, lengthOfLongestSubstring2 } from './solution';

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
    
  test.each(inputs)('longest substring %p', (v, result) => {
    const output = lengthOfLongestSubstring(v);

    expect(output).toBe(result);
  });

  test.each(inputs)('longest substring 2 %p', (v, result) => {
    const output = lengthOfLongestSubstring2(v);

    expect(output).toBe(result);
  });
});

