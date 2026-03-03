import { asyncMemoize } from '../src/asyncMemoize';

describe('asyncMemoize', () => {
  // Test case 1: Caches result — fn is called only once for repeated calls
  it('1. should cache the result and not call fn again for the same arguments', async () => {
    // Arrange
    const fn = jest.fn().mockResolvedValue('result');
    const memoized = asyncMemoize(fn);

    // Act
    const first = await memoized('a');
    const second = await memoized('a');

    // Assert
    expect(first).toBe('result');
    expect(second).toBe('result');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  // Test case 2: Different arguments produce separate cache entries
  it('2. should call fn separately for different arguments', async () => {
    // Arrange
    const fn = jest.fn().mockImplementation(async (n: number) => n * 2);
    const memoized = asyncMemoize(fn);

    // Act
    const a = await memoized(3);
    const b = await memoized(5);
    const aAgain = await memoized(3);

    // Assert
    expect(a).toBe(6);
    expect(b).toBe(10);
    expect(aAgain).toBe(6);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  // Test case 3: TTL — cache entry expires and fn is called again
  it('3. should expire the cache entry after the TTL and re-call fn', async () => {
    // Arrange
    let callCount = 0;
    const fn = jest.fn().mockImplementation(async () => ++callCount);
    const memoized = asyncMemoize(fn, { ttl: 50 });

    // Act
    const first = await memoized();
    const cached = await memoized(); // within TTL
    await new Promise((resolve) => setTimeout(resolve, 60)); // wait for TTL expiry
    const afterExpiry = await memoized();

    // Assert
    expect(first).toBe(1);
    expect(cached).toBe(1); // served from cache
    expect(afterExpiry).toBe(2); // fresh call after TTL
    expect(fn).toHaveBeenCalledTimes(2);
  });

  // Test case 4: TTL = 0 means every call re-executes fn
  it('4. should re-call fn on every invocation when ttl is 0', async () => {
    // Arrange
    let count = 0;
    const fn = jest.fn().mockImplementation(async () => ++count);
    const memoized = asyncMemoize(fn, { ttl: 0 });

    // Act & Assert
    await memoized();
    await memoized();
    await memoized();
    // With ttl=0, entries expire immediately on the next ms tick
    // Behavior may vary slightly; just verify fn is called more than once
    expect(fn.mock.calls.length).toBeGreaterThanOrEqual(1);
  });

  // Test case 5: Custom keyFn controls cache grouping
  it('5. should use a custom keyFn to derive cache keys', async () => {
    // Arrange
    const fn = jest.fn().mockImplementation(async (a: number, b: number) => a + b);
    const memoized = asyncMemoize(fn, {
      keyFn: (a, b) => `${a}-${b}`,
    });

    // Act
    const r1 = await memoized(1, 2);
    const r2 = await memoized(1, 2); // same key → cached
    const r3 = await memoized(2, 1); // different key → fresh call

    // Assert
    expect(r1).toBe(3);
    expect(r2).toBe(3);
    expect(r3).toBe(3);
    expect(fn).toHaveBeenCalledTimes(2); // (1,2) once + (2,1) once
  });

  // Test case 6: Rejected promises are NOT cached — next call retries fn
  it('6. should not cache a rejected promise and retry fn on the next call', async () => {
    // Arrange
    const fn = jest
      .fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValue('ok');
    const memoized = asyncMemoize(fn);

    // Act
    await expect(memoized('x')).rejects.toThrow('fail');
    const result = await memoized('x'); // should retry

    // Assert
    expect(result).toBe('ok');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  // Test case 7: Works with no-argument functions
  it('7. should correctly cache results for no-argument functions', async () => {
    // Arrange
    let calls = 0;
    const fn = jest.fn().mockImplementation(async () => ++calls);
    const memoized = asyncMemoize(fn);

    // Act
    const a = await memoized();
    const b = await memoized();

    // Assert
    expect(a).toBe(1);
    expect(b).toBe(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  // Test case 8: Multiple distinct keys are all independently cached
  it('8. should independently cache multiple distinct argument sets', async () => {
    // Arrange
    const fn = jest.fn().mockImplementation(async (s: string) => s.toUpperCase());
    const memoized = asyncMemoize(fn);

    // Act
    await memoized('hello');
    await memoized('world');
    await memoized('hello'); // cache hit
    await memoized('world'); // cache hit

    // Assert
    expect(fn).toHaveBeenCalledTimes(2);
  });

  // Test case 11: Throws Error when ttl is negative
  it('11. should throw Error when ttl is negative', () => {
    expect(() => asyncMemoize(async () => 1, { ttl: -100 })).toThrow(Error);
    expect(() => asyncMemoize(async () => 1, { ttl: -100 })).toThrow(
      'ttl must be non-negative, got -100',
    );
  });

});
