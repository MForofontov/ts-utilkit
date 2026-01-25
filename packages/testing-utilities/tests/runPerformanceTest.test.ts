import { runPerformanceTest } from '../src/runPerformanceTest';

/**
 * Unit tests for the runPerformanceTest function.
 */
describe('runPerformanceTest', () => {
  // Test case 1: Basic performance measurement
  it('1. should measure performance of a simple function', () => {
    // Arrange
    const testFn = () => {
      let sum = 0;
      for (let i = 0; i < 100; i++) {
        sum += i;
      }
      return sum;
    };

    // Act
    const result = runPerformanceTest(testFn, 100);

    // Assert
    expect(result.duration).toBeGreaterThan(0);
    expect(result.averageTime).toBeGreaterThan(0);
    expect(result.operations).toBe(100);
    expect(result.result).toBe(4950);
  });

  // Test case 2: Default iterations
  it('2. should use default 1000 iterations when not specified', () => {
    // Arrange
    const testFn = () => 42;

    // Act
    const result = runPerformanceTest(testFn);

    // Assert
    expect(result.operations).toBe(1000);
  });

  // Test case 3: Single iteration
  it('3. should handle single iteration', () => {
    // Arrange
    const testFn = () => 'test';

    // Act
    const result = runPerformanceTest(testFn, 1);

    // Assert
    expect(result.operations).toBe(1);
    expect(result.result).toBe('test');
  });

  // Test case 4: Average time calculation
  it('4. should calculate average time correctly', () => {
    // Arrange
    const testFn = () => 123;

    // Act
    const result = runPerformanceTest(testFn, 100);

    // Assert
    expect(result.averageTime).toBe(result.duration / result.operations);
  });

  // Test case 5: Function with return value
  it('5. should capture last return value', () => {
    // Arrange
    let counter = 0;
    const testFn = () => ++counter;

    // Act
    const result = runPerformanceTest(testFn, 10);

    // Assert
    expect(result.result).toBe(10);
    expect(result.operations).toBe(10);
  });

  // Test case 6: Complex return value
  it('6. should work with functions returning objects', () => {
    // Arrange
    const testFn = () => ({ data: 'test', value: 42 });

    // Act
    const result = runPerformanceTest(testFn, 5);

    // Assert
    expect(result.result).toEqual({ data: 'test', value: 42 });
  });

  // Test case 7: Error - invalid function type
  it('7. should throw TypeError when fn is not a function', () => {
    // Arrange
    const invalidFn = 'not a function' as unknown as () => void;

    // Act & Assert
    expect(() => runPerformanceTest(invalidFn, 10)).toThrow(TypeError);
    expect(() => runPerformanceTest(invalidFn, 10)).toThrow(
      'fn must be a function',
    );
  });

  // Test case 8: Error - invalid iterations (zero)
  it('8. should throw Error when iterations is zero', () => {
    // Arrange
    const testFn = () => 42;

    // Act & Assert
    expect(() => runPerformanceTest(testFn, 0)).toThrow(Error);
    expect(() => runPerformanceTest(testFn, 0)).toThrow(
      'iterations must be a positive number',
    );
  });

  // Test case 9: Error - negative iterations
  it('9. should throw Error when iterations is negative', () => {
    // Arrange
    const testFn = () => 42;

    // Act & Assert
    expect(() => runPerformanceTest(testFn, -5)).toThrow(Error);
    expect(() => runPerformanceTest(testFn, -5)).toThrow(
      'iterations must be a positive number',
    );
  });
});
