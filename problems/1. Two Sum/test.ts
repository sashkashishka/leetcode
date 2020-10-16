import { twoSumBF, twoSum2PHT, twoSum1PHT } from './solution';

describe('twoSum', () => {
  const inputs = [
    [[2, 7, 11, 15], 9, [0, 1]],
    [[3, 2, 4], 6, [1, 2]],
    [[3, 3], 6, [0, 1]],
    [[-1, 10], 9, [1, 0]],
  ];
    
  test.each(inputs)('BF %p', (v, t, result) => {
    const output = twoSumBF(v, t);

    expect(output.length).toBe(2);
    expect(output).toEqual(expect.arrayContaining(result));
  });

  test.each(inputs)('2PHT %p', (v, t, result) => {
    const output = twoSum2PHT(v, t);

    expect(output.length).toBe(2);
    expect(output).toEqual(expect.arrayContaining(result));
  });

  test.each(inputs)('1PHT %p', (v, t, result) => {
    const output = twoSum1PHT(v, t);

    expect(output.length).toBe(2);
    expect(output).toEqual(expect.arrayContaining(result));
  });
});
