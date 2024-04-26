export function wordPattern(pattern: string, str: string): boolean {
  const p = pattern.split('');
  const s = str.split(' ');

  if (p.length !== s.length) return false;

  const map = {};
  const wordMap = {};

  for (var i = 0; i < s.length; i++) {
    const code = p[i];
    const word = s[i];

    if (!map[code]) {
      map[code] = word;
    }

    if (!wordMap[word]) {
      wordMap[word] = code;
    }

    if (wordMap[word] !== code) return false;

    if (map[code] !== word) return false;
  }

  return true;
}
