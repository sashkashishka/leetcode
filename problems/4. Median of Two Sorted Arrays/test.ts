import { findMedianSortedArrays } from './solution';

// describe('removeDuplicates', () => {
//   const inputs = [
//     // [[1, 2, 3], [2], 2],
//     // [[1, 2, 3], [1, 2, 3], 2],
//     // [[1, 2], [3, 4], 2.5],
//     // [[0, 0], [0, 0], 0],
//     // [[], [1], 1],
//     // [[2], [], 2],
//     [
//       [1,1,1,1,1,1,1,1,1,1,4,4],
//       [1,4],
//     ],
//     [
//       [1,3,4,4,4,4,4,4,4,4,4],
//       [1,3,4],
//     ]
//   ];
//
//   test.each(inputs)('%j', (arr, result) => {
//     const output = removeDuplicates(arr);
//
//     expect(output).toEqual(result);
//   });
// });


describe('findMedianSortedArrays', () => {
  const inputs = [
    [[1, 2, 3], [2], 2],
    [[1, 2, 3], [1, 2, 3], 2],
    [[1, 2], [3, 4], 2.5],
    [[0, 0], [0, 0], 0],
    [[], [1], 1],
    [[2], [], 2],
    [
      [1,1,1,1,1,1,1,1,1,1,4,4],
      [1,3,4,4,4,4,4,4,4,4,4],
      3,
    ],
    [[1, 1], [1, 2], 1],
  ];

  test.each(inputs)('%j', (n1, n2, result) => {
    const output = findMedianSortedArrays(n1, n2);

    expect(output).toBe(result);
  });
});

