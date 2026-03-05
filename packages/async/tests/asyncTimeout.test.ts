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
