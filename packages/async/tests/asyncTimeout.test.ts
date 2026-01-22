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

  // Test case 6: TypeError for invalid promise
  it('6. should throw TypeError for invalid promise', () => {
    // Arrange
    const invalidPromises = [123, null, undefined, {}, true, 'string', []];

    // Act & Assert
    invalidPromises.forEach((promise) => {
      expect(() =>
        asyncTimeout(promise as unknown as Promise<unknown>, 100),
      ).toThrow(TypeError);
      expect(() =>
        asyncTimeout(promise as unknown as Promise<unknown>, 100),
      ).toThrow('promise must be a Promise, got');
    });
  });

  // Test case 7: TypeError for invalid timeout
  it('7. should throw TypeError for invalid timeout value', () => {
    // Arrange
    const validPromise = Promise.resolve('test');
    const invalidTimeouts = [null, undefined, {}, true, 'string', [], NaN];

    // Act & Assert
    invalidTimeouts.forEach((timeout) => {
      expect(() =>
        asyncTimeout(validPromise, timeout as unknown as number),
      ).toThrow(TypeError);
      expect(() =>
        asyncTimeout(validPromise, timeout as unknown as number),
      ).toThrow('timeoutMs must be a number, got');
    });
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

  // Test case 9: Error for invalid timeout message
  it('9. should throw Error for invalid timeout message', () => {
    // Arrange
    const validPromise = Promise.resolve('test');
    // Note: undefined is excluded as it's a valid value (optional parameter)
    const invalidMessages = [123, null, {}, true, []];

    // Act & Assert
    invalidMessages.forEach((message) => {
      expect(() =>
        asyncTimeout(validPromise, 100, message as unknown as string),
      ).toThrow(Error);
      expect(() =>
        asyncTimeout(validPromise, 100, message as unknown as string),
      ).toThrow('timeoutMessage must be a string, got');
    });
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
