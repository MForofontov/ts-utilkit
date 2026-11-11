import { asyncMemoize } from '../src/asyncMemoize';
import { asyncDeduplication } from '../src/asyncDeduplication';

describe('async cache key isolation', () => {
  it('1. memoizes special values independently', async () => {
    const fn = jest.fn((value: unknown) => Promise.resolve(value));
    const cached = asyncMemoize(fn);
    const values = [
      undefined,
      null,
      NaN,
      Infinity,
      -Infinity,
      0,
      -0,
      '\u0000NaN',
      { __memoize: 'NaN' },
    ];
    for (const value of values) expect(await cached(value)).toBe(value);
    for (const value of values) expect(await cached(value)).toBe(value);
    expect(fn).toHaveBeenCalledTimes(values.length);
  });

  it('2. shares only matching in-flight arguments and cleans up after rejection', async () => {
    const fn = jest.fn((value: unknown) => Promise.resolve(value));
    const deduplicated = asyncDeduplication(fn);
    const a = deduplicated(undefined);
    const b = deduplicated(null);
    expect(deduplicated(undefined)).toBe(a);
    expect(await a).toBeUndefined();
    expect(await b).toBeNull();
    expect(fn).toHaveBeenCalledTimes(2);
    const error = new Error('failed');
    const failing = jest.fn(() => Promise.reject(error));
    const retry = asyncDeduplication(failing);
    const first = retry();
    expect(retry()).toBe(first);
    await expect(first).rejects.toBe(error);
    await expect(retry()).rejects.toBe(error);
    expect(failing).toHaveBeenCalledTimes(2);
  });
});
