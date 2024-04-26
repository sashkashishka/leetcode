import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { isValid } from './valid-parentheses';

describe('valid-parentheses', () => {
  test('empty', () => {
    assert.equal(isValid(''), true);
    assert.equal(isValid(), true);
    assert.equal(isValid('empty'), true);
  });

  test("simple", () => {
    assert.equal(isValid('()'), true);
    assert.equal(isValid('[]'), true);
    assert.equal(isValid('{}'), true);
    assert.equal(isValid('('), false);
    assert.equal(isValid(']'), false);
    assert.equal(isValid('}'), false);
    assert.equal(isValid('()[]{}'), true);
  });

  test('nested', () => {
    assert.equal(isValid('([{}])'), true);
    assert.equal(isValid('[[[]]]'), true);
    assert.equal(isValid('{[{}]}'), true);
    assert.equal(isValid('[[[]]'), false);
    assert.equal(isValid('{[()}'), false);
    assert.equal(isValid('{(['), false);
    assert.equal(isValid('([{}))'), false);
    assert.equal(isValid('([{}]]'), false);
  });

  test('medium', () => {
    assert.equal(isValid('({text})'), true);
    assert.equal(isValid('{t(ex{}t)}'), true);
    assert.equal(isValid('text(){}]'), false);
    assert.equal(isValid('[text]te}xt({})'), false);
    assert.equal(isValid('arg => arg.reduce((acc, c)=>({...acc,[c]:[0]}})'),
      false
    );
    assert.equal(isValid('arg => arg.reduce((acc, c)=>({...acc,[c]:[0]}))'),
      true
    );
  });

  test('hard', () => {
    assert.equal(
      isValid(`const pipe = (...fns) => x => fns.reduce((y, f) => f(y), x);`)
      , true);
    assert.equal(
      isValid(
        `export function resolveLazyComponentTag(Component: Function): WorkTag { if (typeof Component === 'function') { return shouldConstruct(Component) ? ClassComponent : FunctionComponent; } else if (Component !== undefined && Component !== null) { const $$typeof = Component.$$typeof; if ($$typeof === REACT_FORWARD_REF_TYPE) { return ForwardRef; } if ($$typeof === REACT_MEMO_TYPE) { return MemoComponent; } } return IndeterminateComponent; }`
      )
      , true);
    assert.equal(
      isValid(
        `const map = {93: 91, 125: 123, 41: 40}; if (!s) return true; return [...s].reduce((a, c) => [91, 123, 40].includes(c.charCodeAt(0)) ? a.concat(c) : map[c.charCodeAt(0)] ? (String.fromCharCode(map[c.charCodeAt(0)]) === a[a.length - 1]) ? a.slice(0, -1) : a.concat(0) : a, []) .length === 0;`
      )
      , true);
  });

})
