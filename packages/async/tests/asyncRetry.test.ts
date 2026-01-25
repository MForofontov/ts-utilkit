import { asyncRetry } from '../src/asyncRetry';

/**
 * Unit tests for the asyncRetry function.
 */
describe('asyncRetry', () => {
  // Test case 1: Normal/happy path
  it('1. should return result on first successful attempt', async () => {
    // Arrange
    const expectedResult = 'success';
    const mockFn = jest.fn().mockResolvedValue(expectedResult);

    // Act
    const result = await asyncRetry(mockFn);

    // Assert
    expect(result).toBe(expectedResult);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  // Test case 2: Retry behavior with eventual success
  it('2. should retry and eventually succeed', async () => {
    // Arrange
    const expectedResult = 'success';
    const mockFn = jest
      .fn()
      .mockRejectedValueOnce(new Error('Attempt 1 failed'))
      .mockRejectedValueOnce(new Error('Attempt 2 failed'))
      .mockResolvedValue(expectedResult);

    // Act
    const result = await asyncRetry(mockFn, { maxAttempts: 3, delay: 10 });

    // Assert
    expect(result).toBe(expectedResult);
    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  // Test case 3: Backoff strategies
  it('3. should implement different backoff strategies correctly', async () => {
    // Arrange
    const delays: number[] = [];
    const originalSetTimeout = global.setTimeout;
    global.setTimeout = jest.fn((callback: () => void, delay: number) => {
      delays.push(delay);
      return originalSetTimeout(callback, 0); // Execute immediately for testing
    }) as unknown as typeof global.setTimeout;

    const mockFn = jest
      .fn()
      .mockRejectedValueOnce(new Error('Fail 1'))
      .mockRejectedValueOnce(new Error('Fail 2'))
      .mockRejectedValue(new Error('Fail 3'));

    try {
      // Test exponential backoff
      await asyncRetry(mockFn, {
        maxAttempts: 3,
        delay: 100,
        backoff: 'exponential',
      });
    } catch {
      // Expected to fail
    }

    // Assert exponential backoff delays: 100, 200
    expect(delays.slice(0, 2)).toEqual([100, 200]);

    // Reset
    delays.length = 0;
    mockFn.mockClear();
    mockFn
      .mockRejectedValueOnce(new Error('Fail 1'))
      .mockRejectedValueOnce(new Error('Fail 2'))
      .mockRejectedValue(new Error('Fail 3'));

    try {
      // Test linear backoff
      await asyncRetry(mockFn, {
        maxAttempts: 3,
        delay: 100,
        backoff: 'linear',
      });
    } catch {
      // Expected to fail
    }

    // Assert linear backoff delays: 100, 200
    expect(delays.slice(0, 2)).toEqual([100, 200]);

    // Restore setTimeout
    global.setTimeout = originalSetTimeout;
  });

  // Test case 4: onRetry callback
  it('4. should call onRetry callback on each retry', async () => {
    // Arrange
    const onRetryMock = jest.fn();
    const mockFn = jest
      .fn()
      .mockRejectedValueOnce(new Error('Attempt 1 failed'))
      .mockRejectedValueOnce(new Error('Attempt 2 failed'))
      .mockResolvedValue('success');

    // Act
    await asyncRetry(mockFn, {
      maxAttempts: 3,
      delay: 10,
      onRetry: onRetryMock,
    });

    // Assert
    expect(onRetryMock).toHaveBeenCalledTimes(2);
    expect(onRetryMock).toHaveBeenNthCalledWith(1, 1, expect.any(Error));
    expect(onRetryMock).toHaveBeenNthCalledWith(2, 2, expect.any(Error));
  });

  // Test case 5: Performance test with large input
  it('5. should handle reasonable number of retries efficiently', async () => {
    // Arrange
    const mockFn = jest.fn().mockResolvedValue('success');

    // Act
    const startTime = performance.now();
    const result = await asyncRetry(mockFn, { maxAttempts: 100 });
    const endTime = performance.now();

    // Assert
    expect(result).toBe('success');
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(endTime - startTime).toBeLessThan(50); // Should complete quickly on first success
  });

  // Test case 6: All attempts fail
  it('6. should throw last error when all attempts fail', async () => {
    // Arrange
    const expectedError = new Error('Final attempt failed');
    const mockFn = jest
      .fn()
      .mockRejectedValueOnce(new Error('Attempt 1 failed'))
      .mockRejectedValueOnce(new Error('Attempt 2 failed'))
      .mockRejectedValue(expectedError);

    // Act & Assert
    await expect(
      asyncRetry(mockFn, { maxAttempts: 3, delay: 10 }),
    ).rejects.toThrow('Final attempt failed');
    expect(mockFn).toHaveBeenCalledTimes(3);
  });

  // Test case 7: TypeError for invalid input types
  it('7. should throw TypeError for invalid input types', () => {
    // Arrange
    const invalidInputs = [123, null, undefined, [], {}, true, 'string'];

    // Act & Assert
    invalidInputs.forEach((input) => {
      expect(() =>
        asyncRetry(input as unknown as () => Promise<unknown>),
      ).toThrow(TypeError);
      expect(() =>
        asyncRetry(input as unknown as () => Promise<unknown>),
      ).toThrow('fn must be a function, got');
    });
  });

  // Test case 8: Error for invalid options
  it('8. should throw Error for invalid options', () => {
    // Arrange
    const mockFn = jest.fn().mockResolvedValue('success');

    // Act & Assert
    expect(() => asyncRetry(mockFn, { maxAttempts: 0 })).toThrow(
      'maxAttempts must be a positive number',
    );

    expect(() => asyncRetry(mockFn, { maxAttempts: -1 })).toThrow(
      'maxAttempts must be a positive number',
    );

    expect(() => asyncRetry(mockFn, { delay: -100 })).toThrow(
      'delay must be a non-negative number',
    );

    expect(() =>
      asyncRetry(mockFn, {
        backoff: 'invalid' as 'fixed' | 'linear' | 'exponential',
      }),
    ).toThrow("backoff must be 'fixed', 'linear', or 'exponential'");

    expect(() =>
      asyncRetry(mockFn, {
        onRetry: 'not a function' as unknown as (
          attempt: number,
          error: Error,
        ) => void,
      }),
    ).toThrow('onRetry must be a function');
  });
});
