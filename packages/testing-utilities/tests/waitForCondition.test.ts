import { waitForCondition } from '../src/waitForCondition';

/**
 * Unit tests for the waitForCondition function.
 */
describe('waitForCondition', () => {
  // Use fake timers for all tests
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  // Test case 1: Condition becomes true immediately
  it('1. should resolve immediately when condition is already true', async () => {
    // Arrange
    const condition = () => true;

    // Act
    const promise = waitForCondition(condition, 100, 1000);
    jest.runAllTimers();
    await promise;

    // Assert - Promise resolves successfully (no throw)
    expect(true).toBe(true);
  });

  // Test case 2: Condition becomes true after delay
  it('2. should resolve when condition becomes true', async () => {
    // Arrange
    let counter = 0;
    const condition = () => ++counter >= 3;

    // Act
    const promise = waitForCondition(condition, 1000, 100);
    jest.advanceTimersByTime(300);
    await promise;

    // Assert - Promise resolves and counter was incremented
    expect(counter).toBe(3);
  });

  // Test case 3: Timeout when condition never becomes true
  it('3. should reject after timeout', async () => {
    // Arrange
    const condition = () => false;

    // Act
    const promise = waitForCondition(condition, 500, 100);

    // Assert
    jest.advanceTimersByTime(600);
    await expect(promise).rejects.toThrow('Condition not met within');
  });

  // Test case 4: Custom interval
  it('4. should check condition at specified interval', async () => {
    // Arrange
    let checkCount = 0;
    const condition = () => {
      checkCount++;
      return checkCount >= 5;
    };

    // Act
    const promise = waitForCondition(condition, 2000, 200);
    jest.advanceTimersByTime(1000);
    await promise;

    // Assert
    expect(checkCount).toBe(5);
  });

  // Test case 5: Default interval
  it('5. should use default 100ms interval', async () => {
    // Arrange
    let checkCount = 0;
    const condition = () => {
      checkCount++;
      return checkCount >= 3;
    };

    // Act
    const promise = waitForCondition(condition);
    jest.advanceTimersByTime(300);
    await promise;

    // Assert
    expect(checkCount).toBe(3);
  });

  // Test case 6: Default timeout
  it('6. should use default 5000ms timeout', async () => {
    // Arrange
    const condition = () => false;

    // Act
    const promise = waitForCondition(condition);

    // Assert
    jest.advanceTimersByTime(5100);
    await expect(promise).rejects.toThrow();
  });

  // Test case 7: Error - invalid condition type
  it('7. should throw TypeError when condition is not a function', async () => {
    // Arrange
    const invalidCondition = 'not a function' as unknown as () => boolean;

    // Act & Assert
    await expect(waitForCondition(invalidCondition)).rejects.toThrow(TypeError);
    await expect(waitForCondition(invalidCondition)).rejects.toThrow(
      'condition must be a function',
    );
  });

  // Test case 8: Error - invalid interval type
  it('8. should throw Error when interval is not a number', async () => {
    // Arrange
    const condition = () => true;
    const invalidInterval = 'hundred' as unknown as number;

    // Act & Assert
    await expect(
      waitForCondition(condition, 1000, invalidInterval),
    ).rejects.toThrow(Error);
    await expect(
      waitForCondition(condition, 1000, invalidInterval),
    ).rejects.toThrow('interval must be a positive number');
  });

  // Test case 9: Error - invalid timeout type
  it('9. should throw Error when timeout is not a number', async () => {
    // Arrange
    const condition = () => true;
    const invalidTimeout = 'thousand' as unknown as number;

    // Act & Assert - interval is checked after timeout fails
    await expect(
      waitForCondition(condition, 100, invalidTimeout),
    ).rejects.toThrow(Error);
    await expect(
      waitForCondition(condition, 100, invalidTimeout),
    ).rejects.toThrow('interval must be a positive number');
  });

  // Test case 10: Error - interval less than 1
  it('10. should throw Error when interval is less than or equal to 0', async () => {
    // Arrange
    const condition = () => true;

    // Act & Assert
    await expect(waitForCondition(condition, 1000, 0)).rejects.toThrow(Error);
    await expect(waitForCondition(condition, 1000, 0)).rejects.toThrow(
      'interval must be a positive number',
    );
  });

  // Test case 11: Error - timeout less than or equal to 0
  it('11. should throw Error when timeout is less than or equal to 0', async () => {
    // Arrange
    const condition = () => true;

    // Act & Assert
    await expect(waitForCondition(condition, 0, 100)).rejects.toThrow(Error);
    await expect(waitForCondition(condition, 0, 100)).rejects.toThrow(
      'timeout must be a positive number',
    );
  });
});
