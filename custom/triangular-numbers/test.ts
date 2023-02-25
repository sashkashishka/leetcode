import { makeTriangle } from './solution';

describe("triangular numbers", () => {
  it("It should works for basic tests", () => {
    expect(makeTriangle(1, 12)).toBe("");
    expect(makeTriangle(1, 100)).toBe("");

    var result =
      `   1
  9 2
 8 0 3
7 6 5 4`
    expect(makeTriangle(1, 10)).toBe(result);

    var result2 =
      ` 1
3 2`
    expect(makeTriangle(1, 3)).toBe(result2);

    var result3 =
      `    6
   7 7
  6 8 8
 5 0 9 9
4 3 2 1 0`
    expect(makeTriangle(6, 20)).toBe(result3);

  });
});
