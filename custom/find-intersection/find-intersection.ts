// first solution
// export const intersection = (arr1, arr2) => {
//   if (!Array.isArray(arr1) || !Array.isArray(arr2)) return [];

//   const find = (a, b, deep = 0) => {
//     if (a.length === 0 || b.length === 0) return [];

//     let length = Math.max(a.length, b.length);
//     let i = 0;
//     let result = [];

//     while (i < length) {
//       const aValue = a[i];
//       let value;

//       if (Array.isArray(aValue)) {
//         value = find(
//           a.filter((v) => Array.isArray(v)).flat(),
//           b.filter((v) => Array.isArray(v)).flat(),
//           deep + 1
//         );
//       } else {
//         value = b.find((v) => v === aValue);
//       }

//       if (value) {
//         result.push(value);
//       }

//       i += 1;
//     }

//     if (deep !== 0) {
//       result = result.flat().reduce((acc, curr) => {
//         acc.push([curr]);

//         return acc;
//       }, []);
//     }

//     return result;
//   };

//   const r = find(arr1, arr2);

//   return r.flat();
// };

/**
 * @param {Array} a
 * @param {Array} b
 * @returns {Array}
 */
export function intersection(a = [], b = []) {
  // Write your code here
  if (!Array.isArray(a) || !Array.isArray(b)) return [];

  function toFlat(arr, d = 0) {
    return arr.reduce((acc, c) => Array.isArray(c)
      ? acc.concat(toFlat(c, d+1))
      : acc.concat([[c, d]]), []);
  }

  function fromFlat(arr) {
    return arr.reduce((acc, [el, depth]) => depth > 0
      ? acc.concat([fromFlat([[el, depth - 1]])])
      : acc.concat(el), []);
  }

  return fromFlat(toFlat(a).filter(([aEl, aDepth]) => toFlat(b).find(([bEl, bDepth]) => aEl === bEl && aDepth === bDepth)));
}