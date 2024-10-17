export function benny(str: string, consecutives: number) {
  const alphabetLength = 32;
  const length = str.length;

  let alphabet = 0b0;

  outer: for (let i = 0; i < length - consecutives; i++) {
    for (let j = i; j < i + consecutives; j++) {
      const charCode = str.charCodeAt(j);

      const shifted = 1 << charCode % alphabetLength;

      if (alphabet & shifted) {
        alphabet = 0b0;
        continue outer;
      }

      if (j + 1 === i + consecutives) {
        return str.slice(i, i + consecutives);
      }

      alphabet = alphabet | shifted;
    }
  }

  return '';
}

