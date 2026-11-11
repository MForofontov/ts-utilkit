import { asyncTimeout } from '../src/asyncTimeout';

/**
 * Unit tests for the asyncTimeout function.
 */
describe('asyncTimeout', () => {
  // Test case 1: Normal/happy path - promise resolves before timeout
  it('1. should return result when promise resolves before timeout', async () => {
    // Arrange
    const promise = new Promise<string>((resolve) => {
      setTimeout(() => resolve('success'), 50);
    });

    // Act
    const result = await asyncTimeout(promise, 100);

    // Assert
    expect(result).toBe('success');
  });

  // Test case 2: Performance test
  it('2. should timeout at approximately the right time', async () => {
    // Arrange
    const promise = new Promise<string>((resolve) => {
      setTimeout(() => resolve('too late'), 200);
    });
    const timeoutMs = 100;

    // Act
    const start = Date.now();
    try {
      await asyncTimeout(promise, timeoutMs);
    } catch (error) {
      const elapsed = Date.now() - start;

      // Assert
      expect(elapsed).toBeGreaterThan(timeoutMs - 10); // Allow 10ms margin
      expect(elapsed).toBeLessThan(timeoutMs + 50); // Allow 50ms margin
      expect(error).toBeInstanceOf(Error);
    }
  });

  // Test case 3: Promise times out
  it('3. should throw timeout error when promise takes too long', async () => {
    // Arrange
    const promise = new Promise<string>((resolve) => {
      setTimeout(() => resolve('too late'), 100);
    });

    // Act & Assert
    await expect(asyncTimeout(promise, 50)).rejects.toThrow(
      'Operation timed out',
    );
  });

  // Test case 4: Custom timeout message
  it('4. should use custom timeout message', async () => {
    // Arrange
    const promise = new Promise<string>((resolve) => {
      setTimeout(() => resolve('too late'), 100);
    });
    const customMessage = 'Custom timeout error';

    // Act & Assert
    await expect(asyncTimeout(promise, 50, customMessage)).rejects.toThrow(
      customMessage,
    );
  });

  // Test case 5: Promise rejects before timeout
  it('5. should propagate promise rejection', async () => {
    // Arrange
    const promise = Promise.reject(new Error('Promise failed'));

    // Act & Assert
    await expect(asyncTimeout(promise, 100)).rejects.toThrow('Promise failed');
  });

  // Test case 8: Error for negative timeout
  it('8. should throw Error for negative timeout', () => {
    // Arrange
    const validPromise = Promise.resolve('test');

    // Act & Assert
    expect(() => asyncTimeout(validPromise, -100)).toThrow(Error);
    expect(() => asyncTimeout(validPromise, -100)).toThrow(
      'timeoutMs must be non-negative, got -100',
    );
  });

  // Test case 10: Zero timeout
  it('10. should handle zero timeout correctly', async () => {
    // Arrange
    const promise = new Promise<string>((resolve) => {
      setTimeout(() => resolve('too late'), 10);
    });

    // Act & Assert
    await expect(asyncTimeout(promise, 0)).rejects.toThrow(
      'Operation timed out',
    );
  });
});

describe('deterministic timeout boundaries', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });
  it('rejects NaN before scheduling a timer', () => {
    expect(() => {
      void asyncTimeout(Promise.resolve(1), NaN).catch(() => undefined);
    }).toThrow('timeoutMs');
    expect(jest.getTimerCount()).toBe(0);
  });
  it('treats Infinity as an unbounded wait without scheduling a timer', async () => {
    const pending = asyncTimeout(Promise.resolve(42), Infinity);
    expect(jest.getTimerCount()).toBe(0);
    await expect(pending).resolves.toBe(42);
  });
  it('does not expire a duration above the native timer limit early', async () => {
    let settled = false;
    const pending = asyncTimeout(
      new Promise<never>(() => undefined),
      2147483657,
      'deadline',
    );
    const assertion = expect(pending).rejects.toThrow('deadline');
    void pending.catch(() => {
      settled = true;
    });
    await jest.advanceTimersByTimeAsync(2147483647);
    expect(settled).toBe(false);
    expect(jest.getTimerCount()).toBe(1);
    await jest.advanceTimersByTimeAsync(9);
    expect(settled).toBe(false);
    await jest.advanceTimersByTimeAsync(1);
    await assertion;
    expect(jest.getTimerCount()).toBe(0);
  });
  it('does not expire a fractional duration before its deadline', async () => {
    let settled = false;
    const pending = asyncTimeout(new Promise<never>(() => undefined), 2.5);
    const assertion = expect(pending).rejects.toThrow('Operation timed out');
    void pending.catch(() => {
      settled = true;
    });
    await jest.advanceTimersByTimeAsync(2);
    expect(settled).toBe(false);
    await jest.advanceTimersByTimeAsync(1);
    await assertion;
    expect(jest.getTimerCount()).toBe(0);
  });
});

describe('timeout cleanup and monotonic clock', () => {
  beforeEach(() => {
    jest.useFakeTimers({ now: 1000 });
  });
  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });
  it.each([true, false])(
    'cleans up an intermediate long-wait chunk on settlement (resolve=%s)',
    async (succeeds) => {
      let resolve!: (value: number) => void;
      let reject!: (reason: unknown) => void;
      const original = new Promise<number>((yes, no) => {
        resolve = yes;
        reject = no;
      });
      const pending = asyncTimeout(original, 2147483657);
      const reason = { message: 'arbitrary reason' };
      const assertion = succeeds
        ? expect(pending).resolves.toBe(42)
        : expect(pending).rejects.toBe(reason);
      await jest.advanceTimersByTimeAsync(2147483647);
      expect(jest.getTimerCount()).toBe(1);
      if (succeeds) resolve(42);
      else reject(reason);
      await assertion;
      expect(jest.getTimerCount()).toBe(0);
    },
  );
  it('uses elapsed monotonic time when the wall clock jumps', async () => {
    const pending = asyncTimeout(new Promise<never>(() => undefined), 10);
    const assertion = expect(pending).rejects.toThrow('Operation timed out');
    jest.setSystemTime(-100000);
    await jest.advanceTimersByTimeAsync(10);
    await assertion;
    expect(jest.getTimerCount()).toBe(0);
  });
  it('cleans up zero timeout when the original promise is already fulfilled', async () => {
    await expect(asyncTimeout(Promise.resolve(42), 0)).resolves.toBe(42);
    expect(jest.getTimerCount()).toBe(0);
  });
  it('preserves an unbounded rejection without creating a timer', async () => {
    // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors -- Verify preservation of non-Error rejection reasons
    await expect(asyncTimeout(Promise.reject('reason'), Infinity)).rejects.toBe(
      'reason',
    );
    expect(jest.getTimerCount()).toBe(0);
  });
  it('handles a late original settlement after timeout without creating more timers', async () => {
    let finish!: (value: number) => void;
    const original = new Promise<number>((resolve) => {
      finish = resolve;
    });
    const pending = asyncTimeout(original, 1);
    const assertion = expect(pending).rejects.toThrow('Operation timed out');
    await jest.advanceTimersByTimeAsync(1);
    await assertion;
    finish(42);
    await Promise.resolve();
    expect(jest.getTimerCount()).toBe(0);
  });
  it('validates a custom message before scheduling a timer', () => {
    expect(() =>
      asyncTimeout(Promise.resolve(42), 10, 1 as unknown as string),
    ).toThrow('timeoutMessage');
    expect(jest.getTimerCount()).toBe(0);
  });
});
