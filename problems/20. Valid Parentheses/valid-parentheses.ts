export const isValid = (str = "") => {
  const s = (str.match(/\(|\)|\[|\]|\{|\}/g) || []).join("");

  if (s.length % 2 !== 0) return false;

  const table = {
    "[": "]",
    "{": "}",
    "(": ")"
  };
  let stack: string[] = [];

  for (let k = 0; k < s.length; k++) {
    stack.push(s[k]);
    const last = stack[stack.length - 1];
    const preLast = stack[stack.length - 2];

    if (stack.length >= 2 && last === table[preLast]) {
      stack = stack.slice(0, -2);
    }
  }

  return !stack.length;
};