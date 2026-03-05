import { asyncDeduplication } from '../src/asyncDeduplication';

describe('asyncDeduplication', () => {
  // Test case 1: Concurrent calls with the same args share one in-flight promise
  it('1. should return the same promise for concurrent calls with identical arguments', async () => {
    // Arrange
    let callCount = 0;
    const fn = jest.fn().mockImplementation(async (id: number) => {
      callCount++;
      await new Promise((resolve) => setTimeout(resolve, 20));
      return `user-${id}`;
    });
    const deduplicated = asyncDeduplication(fn);

    // Act — launch 3 concurrent calls with the same arg
    const [a, b, c] = await Promise.all([
      deduplicated(1),
      deduplicated(1),
      deduplicated(1),
    ]);

    // Assert — only one actual fn execution
    expect(a).toBe('user-1');
    expect(b).toBe('user-1');
    expect(c).toBe('user-1');
    expect(callCount).toBe(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  // Test case 2: Calls with different args launch separate executions
  it('2. should launch separate executions for calls with different arguments', async () => {
    // Arrange
    const fn = jest.fn().mockImplementation(async (id: number) => `item-${id}`);
    const deduplicated = asyncDeduplication(fn);

    // Act
    const [a, b] = await Promise.all([deduplicated(1), deduplicated(2)]);

    // Assert
    expect(a).toBe('item-1');
    expect(b).toBe('item-2');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  // Test case 3: After settlement, the next call starts a fresh execution
  it('3. should start a fresh execution after the in-flight promise has settled', async () => {
    // Arrange
    let count = 0;
    const fn = jest.fn().mockImplementation(async () => ++count);
    const deduplicated = asyncDeduplication(fn);

    // Act
    const first = await deduplicated('key'); // in-flight + settles
    const second = await deduplicated('key'); // fresh call after settlement

    // Assert
    expect(first).toBe(1);
    expect(second).toBe(2);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  // Test case 4: All concurrent callers share a rejection
  it('4. should propagate rejection to all concurrent callers', async () => {
    // Arrange
    const fn = jest.fn().mockImplementation(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
      throw new Error('shared error');
    });
    const deduplicated = asyncDeduplication(fn);

    // Act — launch 3 concurrent calls
    const results = await Promise.allSettled([
      deduplicated('x'),
      deduplicated('x'),
      deduplicated('x'),
    ]);

    // Assert — all three rejected with the same message
    expect(fn).toHaveBeenCalledTimes(1);
    for (const r of results) {
      expect(r.status).toBe('rejected');
      if (r.status === 'rejected') {
        expect((r.reason as Error).message).toBe('shared error');
      }
    }
  });

  // Test case 5: A fresh call after a rejection succeeds independently
  it('5. should allow a retry after a rejected in-flight call clears the cache', async () => {
    // Arrange
    const fn = jest
      .fn()
      .mockRejectedValueOnce(new Error('fail'))
      .mockResolvedValue('ok');
    const deduplicated = asyncDeduplication(fn);

    // Act
    await expect(deduplicated('k')).rejects.toThrow('fail');
    const retry = await deduplicated('k');

    // Assert
    expect(retry).toBe('ok');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  // Test case 6: Custom keyFn groups calls by derived key
  it('6. should deduplicate based on the custom keyFn result', async () => {
    // Arrange
    const fn = jest.fn().mockImplementation(async (a: number, _b: number) => a);
    const deduplicated = asyncDeduplication(fn, (a, b) => `${a}:${b}`);

    // Act
    const [r1, r2, r3] = await Promise.all([
      deduplicated(1, 2), // key '1:2'
      deduplicated(1, 2), // same key → deduplicated
      deduplicated(1, 3), // key '1:3' → separate call
    ]);

    // Assert
    expect(r1).toBe(1);
    expect(r2).toBe(1);
    expect(r3).toBe(1);
    expect(fn).toHaveBeenCalledTimes(2);
  });

  // Test case 7: Works with no-argument functions
  it('7. should correctly deduplicate calls to no-argument functions', async () => {
    // Arrange
    let count = 0;
    const fn = jest.fn().mockImplementation(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
      return ++count;
    });
    const deduplicated = asyncDeduplication(fn);

    // Act
    const [a, b] = await Promise.all([deduplicated(), deduplicated()]);

    // Assert
    expect(a).toBe(1);
    expect(b).toBe(1);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
