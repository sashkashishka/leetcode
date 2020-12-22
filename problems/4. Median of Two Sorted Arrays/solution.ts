// function removeDuplicates(arr: number[]): number[] {
//   const newArr: number[] = [];
//
//   for (let i = 0; i < arr.length; i++) {
//     if (newArr[newArr.length - 1] === arr[i]) continue;
//
//     newArr.push(arr[i]);
//   }
//
//   return newArr;
// }

function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  const overalLength = nums1.length + nums2.length;
  let j = 0;
  let k = 0;
  const mergedArray: Array<number> = [];

  for (let i = 0; i < overalLength; i++) {
    const n1 = nums1[j];
    const n2 = nums2[k];

    if (typeof n1 === 'number' && typeof n2 === 'number') {
      if (n1 < n2) {
        mergedArray.push(n1);
        j++;
      } else {
        mergedArray.push(n2);
        k++;
      }
    } else {
      if (n1 === undefined && n2 === undefined) {
        continue;
      }

      if (n1 === undefined) {
        mergedArray.push(n2);
        k++;
      }

      if (n2 === undefined) {
        mergedArray.push(n1);
        j++;
      }
    }
  }

  let median = 0;
  const medianIndex = Math.floor(mergedArray.length / 2);

  if (mergedArray.length % 2 === 0) {
    const x1 = mergedArray[medianIndex];
    const x2 = mergedArray[medianIndex - 1];
    median = (x1 + x2) / 2;
  } else {
    median = mergedArray[medianIndex];
  }

  return median;
}

export {
  // removeDuplicates,
  findMedianSortedArrays,
};
