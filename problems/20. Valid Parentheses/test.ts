import { isValid } from './solution';

test('empty', () => {
  expect(isValid('')).toBe(true);
  expect(isValid()).toBe(true);
  expect(isValid('empty')).toBe(true);
});

test("simple", () => {
  expect(isValid('()')).toBe(true);
  expect(isValid('[]')).toBe(true);
  expect(isValid('{}')).toBe(true);
  expect(isValid('(')).toBe(false);
  expect(isValid(']')).toBe(false);
  expect(isValid('}')).toBe(false);
  expect(isValid('()[]{}')).toBe(true);
});

test('nested', () => {
  expect(isValid('([{}])')).toBe(true);
  expect(isValid('[[[]]]')).toBe(true);
  expect(isValid('{[{}]}')).toBe(true);
  expect(isValid('[[[]]')).toBe(false);
  expect(isValid('{[()}')).toBe(false);
  expect(isValid('{([')).toBe(false);
  expect(isValid('([{}))')).toBe(false);
  expect(isValid('([{}]]')).toBe(false);
});

test('medium', () => {
  expect(isValid('({text})')).toBe(true);
  expect(isValid('{t(ex{}t)}')).toBe(true);
  expect(isValid('text(){}]')).toBe(false);
  expect(isValid('[text]te}xt({})')).toBe(false);
  expect(isValid('arg => arg.reduce((acc, c)=>({...acc,[c]:[0]}})')).toBe(
    false
  );
  expect(isValid('arg => arg.reduce((acc, c)=>({...acc,[c]:[0]}))')).toBe(
    true
  );
});

test('hard', () => {
  expect(
    isValid(`const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);`)
  ).toBe(true);
  expect(
    isValid(
      `export function resolveLazyComponentTag(Component: Function): WorkTag { if (typeof Component === 'function') { return shouldConstruct(Component) ? ClassComponent : FunctionComponent; } else if (Component !== undefined && Component !== null) { const $$typeof = Component.$$typeof; if ($$typeof === REACT_FORWARD_REF_TYPE) { return ForwardRef; } if ($$typeof === REACT_MEMO_TYPE) { return MemoComponent; } } return IndeterminateComponent; }`
    )
  ).toBe(true);
  expect(
    isValid(
      `const map = {93: 91, 125: 123, 41: 40}; if (!s) return true; return [...s].reduce((a, c) => [91, 123, 40].includes(c.charCodeAt(0)) ? a.concat(c) : map[c.charCodeAt(0)] ? (String.fromCharCode(map[c.charCodeAt(0)]) === a[a.length - 1]) ? a.slice(0, -1) : a.concat(0) : a, []) .length === 0;`
    )
  ).toBe(true);
});