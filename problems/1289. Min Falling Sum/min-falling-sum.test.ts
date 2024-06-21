import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { minFallingPathSum, minFallingPathSumBTT } from './min-falling-sum';

describe('1289', () => {
  const cases: Array<[number[][], number]> = [
    [
      [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ],
      13,
    ],
    [
      [[7]],
      7
    ],
    [
      [
        [-37, 51, -36, 34, -22],   // -37
        [82, 4, 30, 14, 38],     // 4
        [-68, -52, -92, 65, -85],  // -92  -85
        [-49, -3, -77, 8, -19],    // -49  -77
        [-60, -71, -21, -62, -73], // -73
      ],
      -268
    ],
    [
      [
        [-2, -18, 31, -10, -71, 82, 47, 56, -14, 42],
        [-95, 3, 65, -7, 64, 75, -51, 97, -66, -28],
        [36, 3, -62, 38, 15, 51, -58, -90, -23, -63],
        [58, -26, -42, -66, 21, 99, -94, -95, -90, 89],
        [83, -66, -42, -45, 43, 85, 51, -86, 65, -39],
        [56, 9, 9, 95, -56, -77, -2, 20, 78, 17],
        [78, -13, -55, 55, -7, 43, -98, -89, 38, 90],
        [32, 44, -47, 81, -1, -55, -5, 16, -81, 17],
        [-87, 82, 2, 86, -88, -58, -91, -79, 44, -9],
        [-96, -14, -52, -8, 12, 38, 84, 77, -51, 52],
      ],
      -879
    ],
    [
      [
        [99, 1, 60, 4, 3],
        [49, 1, 10, 42, 56],
        [87, 28, 78, 60, 5],
        [23, 12, 53, 69, 6],
        [3, 5, 15, 6, 7],
      ],
      24
    ],
    [
      [
        [2, 2, 1, 2, 2],
        [2, 2, 1, 2, 2],
        [2, 2, 1, 2, 2],
        [2, 2, 1, 2, 2],
        [2, 2, 1, 2, 2],
      ],
      7
    ],
    [
      [
        [50, -18, -38, 39, -20, -37, -61, 72, 22, 79],
        [82, 26, 30, -96, -1, 28, 87, 94, 34, -89],
        [55, -50, 20, 76, -50, 59, -58, 85, 83, -83],
        [39, 65, -68, 89, -62, -53, 74, 2, -70, -90],
        [1, 57, -70, 83, -91, -32, -13, 49, -11, 58],
        [-55, 83, 60, -12, -90, -37, -36, -27, -19, -6],
        [76, -53, 78, 90, 70, 62, -81, -94, -32, -57],
        [-32, -85, 81, 25, 80, 90, -24, 10, 27, -55],
        [39, 54, 39, 34, -45, 17, -2, -61, -81, 85],
        [-77, 65, 76, 92, 21, 68, 78, -13, 39, 22],
      ],
      -807
    ]
  ];

  test('minFallingSum', () => {
    cases.forEach(([matrix, sum]) => {
      assert.equal(minFallingPathSum(matrix), sum)
    })
  })

  test('minFallingSumBTT', () => {
    cases.forEach(([matrix, sum]) => {
      assert.equal(minFallingPathSumBTT(matrix), sum)
    })
  })
})
