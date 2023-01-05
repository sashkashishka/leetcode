import { detectCapitalUse } from './solution';

describe('detectCapitalUse', () => {
  const inputs = [
    ['USA', true],
    ['FlaG', false],
    ['Flag', true],
    ['flag', true],
    ['fLag', false],
  ];

  test.each(inputs)('%j', (input, result) => {
    const output = detectCapitalUse(input);

    expect(output).toBe(result);
  });
});


