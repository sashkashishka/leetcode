interface UniqueLetters {
  [key: string]: number;
}

const convertToInt = (o: UniqueLetters): number => {
  return Object.keys(o).length;
}

// TODO use window sliding
export function lengthOfLongestSubstring(s: string): number {
  let i = 0;
  let substrIdx = 0;
  let substrings: UniqueLetters[] = [Object.create(null)];

  while (i < s.length) {
    const subS = substrings[substrIdx];
    const currLetter = s[i];
    const nextLetter = s[i + 1];

    if (typeof subS[currLetter] !== 'number') {
      subS[currLetter] = i;
      substrings[substrIdx] = subS;
    } else {
      substrings.push(Object.create(null));
      substrIdx++;
    }

    i++;

    if (nextLetter !== undefined && typeof subS[nextLetter] === 'number') {
      i = subS[nextLetter] + 1;
      substrings.push(Object.create(null));
      substrIdx++;
    }
  }

  return substrings
    .map(convertToInt)
    .reduce((acc, curr) => {
      acc = Math.max(acc, curr);
      return acc;
    }, 0);
}
