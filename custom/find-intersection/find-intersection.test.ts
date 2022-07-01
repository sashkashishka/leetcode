import { intersection } from "./find-intersection";

describe("intersection", () => {
  test("empty", () => {
    expect(intersection()).toEqual([]);
  });

  test("invalid types", () => {
    expect(intersection(null)).toEqual([]);
    expect(intersection("string1", "string2")).toEqual([]);
    expect(intersection(2, 3)).toEqual([]);
    expect(intersection({}, {})).toEqual([]);
  });

  test("single dimension", () => {
    expect(intersection([1, 2, 3, 4], [])).toEqual([]);
    expect(intersection([1, 2, 3, 4], [4, 3, 2, 1])).toEqual([1, 2, 3, 4]);
    expect(intersection([1, 2, 3, 4], [3])).toEqual([3]);
    expect(intersection(["string"], ["a", "b", "string", "d"])).toEqual([
      "string"
    ]);
  });

  test("multidimensional (separate each element)", () => {
    expect(intersection([1, [2, 3]], [[2]])).toEqual([[2]]);
    expect(intersection([1, 2, [3, [4]]], [1, [[4]]])).toEqual([1, [[4]]]);
    expect(intersection([[[1, 2, 3]]], [1, 2, 3, [[2, 3]]])).toEqual([
      [[2]],
      [[3]]
    ]);
    expect(intersection([[1, [2, [[3]]]]], [[1, [[2, [3]]]]])).toEqual([
      [1],
      [[[[3]]]]
    ]);
  });
});