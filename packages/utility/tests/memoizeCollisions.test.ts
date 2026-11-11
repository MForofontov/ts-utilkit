import { memoize } from '../src/memoize';

describe('memoize cache key collisions', () => {
  it('1. distinguishes numeric special values and marker-shaped user objects', () => {
    const fn = jest.fn((value: unknown) => value);
    const cached = memoize(fn);
    const values: unknown[] = [
      undefined,
      { __memoize: 'undefined' },
      NaN,
      { __memoize: 'NaN' },
      null,
      Infinity,
      -Infinity,
      0,
      -0,
      '\u0000NaN',
      '\u0000string:\u0000NaN',
    ];
    for (const value of values) expect(cached(value)).toBe(value);
    for (const value of values) expect(cached(value)).toBe(value);
    expect(fn).toHaveBeenCalledTimes(values.length);
  });

  it('2. distinguishes nested markers from special values', () => {
    const fn = jest.fn((value: unknown) => value);
    const cached = memoize(fn);
    const a = { nested: [undefined, NaN] };
    const b = { nested: [{ __memoize: 'undefined' }, { __memoize: 'NaN' }] };
    expect(cached(a)).toBe(a);
    expect(cached(b)).toBe(b);
    expect(cached({ nested: [undefined, NaN] })).toBe(a);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
