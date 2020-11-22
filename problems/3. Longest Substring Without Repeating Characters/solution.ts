interface UniqueLettersSet {
  [key: string]: number;
}

const convertToInt = (o: UniqueLettersSet): number => {
  return Object.keys(o).length;
}

export function lengthOfLongestSubstring(s: string): number {
  let i = 0;
  let substrIdx = 0;
  let substrings: UniqueLettersSet[] = [Object.create(null)];

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

export function lengthOfLongestSubstring2(s: string): number {
  let i = 0;
  let j = 0;
  const letterSet: UniqueLettersSet = Object.create(null);
  let lengthOfSubstring = 0;

  while (j < s.length) {
    if (s[j] in letterSet) {
      i = Math.max(letterSet[s[j]] + 1, i);
    }

    letterSet[s[j]] = j;
    lengthOfSubstring = Math.max(lengthOfSubstring, j - i + 1);
    j++;
  }

  return lengthOfSubstring;
}
