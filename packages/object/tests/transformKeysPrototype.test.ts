import { transformKeys } from '../src/transformKeys';

describe('transformKeys prototype boundaries', () => {
  it('keeps transformed __proto__ keys as own data without changing the prototype', () => {
    const value = { injected: true };
    const result = transformKeys({ source: value }, () => '__proto__');
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect(Object.hasOwn(result, '__proto__')).toBe(true);
    expect(result.__proto__).toBe(value);
    expect(result.injected).toBeUndefined();
  });

  it('retains last-write-wins and source value references for special keys', () => {
    const source = { first: { id: 1 }, second: { id: 2 } };
    for (const key of ['__proto__', 'constructor', 'toString']) {
      const result = transformKeys(source, () => key);
      expect(Object.keys(result)).toEqual([key]);
      expect(result[key]).toBe(source.second);
    }
    expect(source.first).toEqual({ id: 1 });
  });
});
