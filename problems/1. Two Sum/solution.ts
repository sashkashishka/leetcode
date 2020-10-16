// brute force
// initial answer :(
export function twoSumBF(nums: number[], target: number): number[] {

  return nums.reduce((result, n, i, arr) => {
    if (result.length === 2) return result;

    let j = i + 1;

    while (j < arr.length) {
      if (n + arr[j] === target) {
        result.push(i);
        result.push(j);
        break;
      }

      j += 1;
    }

    return result;
  }, [] as number[]);
}

// 2 pass hash table
export function twoSum2PHT(nums: number[], target: number): number[] {
  type HashTable = {
    [key: number]: number;
  }

  const hashTable: HashTable = nums.reduce((t, n, i) => {
    t[n] = i;
    return t;
  }, {});

  return nums.reduce((result, n, i) => {
    if (result.length === 2) return result;

    const complement = target - n;

    if (complement in hashTable && i !== hashTable[complement]) {
      result.push (i);
      result.push(hashTable[complement]);
    }

    return result;
  }, [] as number[]);
}

// 1 pass hash table
export function twoSum1PHT(nums: number[], target: number): number[] {
  type HashTable = {
    [key: number]: number;
  }

  const hashTable: HashTable = {};

  return nums.reduce((result, n, i) => {

    if (result.length === 2) return result;

    const complement = target - n;

    if (complement in hashTable) {
      result.push (i);
      result.push(hashTable[complement]);
    }

    hashTable[n] = i;

    return result;
  }, [] as number[]);
}