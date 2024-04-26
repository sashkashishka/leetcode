export function detectCapitalUse(word: string): boolean {
  const l = word.toLowerCase();
  const u = word.toUpperCase();

  if (word === l || word === u) return true;

  for (let i = 0; i < word.length; i++) {
    const letter = word[i];

    if (i === 0 && letter !== u[i]) return false;

    if (i !== 0 && letter !== l[i]) return false;
  }

  return true;
}
