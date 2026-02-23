import { asyncPoll } from '../src/asyncPoll';

describe('asyncPoll', () => {
  // Test case 1: Condition met immediately on first poll
  it('1. should resolve immediately when condition is met on the first attempt', async () => {
    // Arrange
    const fn = jest.fn().mockResolvedValue(42);
    const condition = (n: number) => n === 42;

    // Act
    const result = await asyncPoll(fn, condition, {
      intervalMs: 10,
      timeoutMs: 1000,
    });

    // Assert
    expect(result).toBe(42);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  // Test case 2: Polls multiple times before condition is met
  it('2. should poll multiple times until condition is met', async () => {
    // Arrange
    let attempt = 0;
    const fn = jest.fn().mockImplementation(async () => ++attempt);
    const condition = (n: number) => n === 3;

    // Act
    const result = await asyncPoll(fn, condition, {
      intervalMs: 10,
      timeoutMs: 1000,
    });

    // Assert
    expect(result).toBe(3);
    expect(fn).toHaveBeenCalledTimes(3);
  });

  // Test case 3: onPoll callback is invoked with result and attempt number
  it('3. should call onPoll with the result and 1-based attempt number', async () => {
    // Arrange
    let counter = 0;
    const fn = jest.fn().mockImplementation(async () => ++counter);
    const polled: Array<{ result: number; attempt: number }> = [];
    const onPoll = jest.fn((result: number, attempt: number) => {
      polled.push({ result, attempt });
    });

    // Act
    await asyncPoll(fn, (n) => n >= 2, {
      intervalMs: 10,
      timeoutMs: 1000,
      onPoll,
    });

    // Assert
    expect(polled).toEqual([
      { result: 1, attempt: 1 },
      { result: 2, attempt: 2 },
    ]);
  });

  // Test case 4: Uses default options (no explicit options object needed)
  it('4. should work with a condition that is met quickly using defaults', async () => {
    // Arrange
    const fn = jest.fn().mockResolvedValue('ready');

    // Act
    const result = await asyncPoll(fn, (s) => s === 'ready');

    // Assert
    expect(result).toBe('ready');
  });

  // Test case 5: Throws timeout error when condition is never met
  it('5. should throw a timeout error when the condition is never met', async () => {
    // Arrange
    const fn = jest.fn().mockResolvedValue('pending');

    // Act & Assert
    await expect(
      asyncPoll(fn, (s) => s === 'done', {
        intervalMs: 10,
        timeoutMs: 50,
      }),
    ).rejects.toThrow('asyncPoll timed out after 50ms');
  });

  // Test case 6: Propagates fn rejection
  it('6. should propagate an error thrown inside fn', async () => {
    // Arrange
    const fn = jest.fn().mockRejectedValue(new Error('poll error'));

    // Act & Assert
    await expect(
      asyncPoll(fn, () => true, { intervalMs: 10, timeoutMs: 500 }),
    ).rejects.toThrow('poll error');
  });

  // Test case 7: Works with object results
  it('7. should correctly evaluate condition against object results', async () => {
    // Arrange
    let call = 0;
    const fn = jest
      .fn<Promise<{ status: string }>, []>()
      .mockImplementation(async () => ({ status: call++ < 2 ? 'pending' : 'complete' }));

    // Act
    const result = await asyncPoll(fn, (r) => r.status === 'complete', {
      intervalMs: 10,
      timeoutMs: 1000,
    });

    // Assert
    expect(result.status).toBe('complete');
  });

  // Test case 8: Reports correct attempt count in timeout message
  it('8. should include attempt count in the timeout error message', async () => {
    // Arrange
    const fn = jest.fn().mockResolvedValue(0);

    // Act & Assert
    await expect(
      asyncPoll(fn, () => false, { intervalMs: 10, timeoutMs: 35 }),
    ).rejects.toThrow(/\d+ attempts/);
  });

  // Error cases
  // Test case 9: Throws TypeError when fn is not a function
  it('9. should throw TypeError when fn is not a function', () => {
    expect(() =>
      asyncPoll('not a fn' as unknown as () => Promise<number>, () => true),
    ).toThrow(TypeError);
    expect(() =>
      asyncPoll('not a fn' as unknown as () => Promise<number>, () => true),
    ).toThrow('fn must be a function, got string');
  });

  // Test case 10: Throws TypeError when condition is not a function
  it('10. should throw TypeError when condition is not a function', () => {
    expect(() =>
      asyncPoll(async () => 1, 42 as unknown as () => boolean),
    ).toThrow(TypeError);
    expect(() =>
      asyncPoll(async () => 1, 42 as unknown as () => boolean),
    ).toThrow('condition must be a function, got number');
  });

  // Test case 11: Throws TypeError when intervalMs is not a number
  it('11. should throw TypeError when intervalMs is not a number', () => {
    expect(() =>
      asyncPoll(async () => 1, () => true, {
        intervalMs: 'fast' as unknown as number,
      }),
    ).toThrow(TypeError);
    expect(() =>
      asyncPoll(async () => 1, () => true, {
        intervalMs: 'fast' as unknown as number,
      }),
    ).toThrow('intervalMs must be a number, got string');
  });

  // Test case 12: Throws Error when intervalMs is not positive
  it('12. should throw Error when intervalMs is not positive', () => {
    expect(() =>
      asyncPoll(async () => 1, () => true, { intervalMs: 0 }),
    ).toThrow('intervalMs must be a positive number, got 0');

    expect(() =>
      asyncPoll(async () => 1, () => true, { intervalMs: -10 }),
    ).toThrow('intervalMs must be a positive number, got -10');
  });

  // Test case 13: Throws TypeError when timeoutMs is not a number
  it('13. should throw TypeError when timeoutMs is not a number', () => {
    expect(() =>
      asyncPoll(async () => 1, () => true, {
        timeoutMs: 'long' as unknown as number,
      }),
    ).toThrow(TypeError);
    expect(() =>
      asyncPoll(async () => 1, () => true, {
        timeoutMs: 'long' as unknown as number,
      }),
    ).toThrow('timeoutMs must be a number, got string');
  });

  // Test case 14: Throws Error when timeoutMs is not positive
  it('14. should throw Error when timeoutMs is not positive', () => {
    expect(() =>
      asyncPoll(async () => 1, () => true, { timeoutMs: 0 }),
    ).toThrow('timeoutMs must be a positive number, got 0');
  });

  // Test case 15: Throws TypeError when onPoll is not a function
  it('15. should throw TypeError when onPoll is not a function', () => {
    expect(() =>
      asyncPoll(async () => 1, () => true, {
        onPoll: 'log' as unknown as () => void,
      }),
    ).toThrow(TypeError);
    expect(() =>
      asyncPoll(async () => 1, () => true, {
        onPoll: 'log' as unknown as () => void,
      }),
    ).toThrow('onPoll must be a function, got string');
  });
});
