import { measureMemoryUsage } from '../src/measureMemoryUsage';

/**
 * Unit tests for the measureMemoryUsage function.
 */
describe('measureMemoryUsage', () => {
  // Test case 1: Measure memory for simple function
  it('1. should measure memory usage of a function', () => {
    // Arrange
    const testFn = () => {
      const arr = new Array(1000).fill(0);
      return arr.length;
    };

    // Act
    const result = measureMemoryUsage(testFn);

    // Assert
    expect(result.heapUsedBefore).toBeGreaterThanOrEqual(0);
    expect(result.heapUsedAfter).toBeGreaterThanOrEqual(0);
    expect(result.heapUsedDelta).toBeDefined();
    expect(result.result).toBe(1000);
  });

  // Test case 2: Measure memory for function with return value
  it('2. should capture function return value', () => {
    // Arrange
    const testFn = () => ({ data: 'test', value: 42 });

    // Act
    const result = measureMemoryUsage(testFn);

    // Assert
    expect(result.result).toEqual({ data: 'test', value: 42 });
  });

  // Test case 3: Measure memory delta
  it('3. should calculate memory delta', () => {
    // Arrange
    const testFn = () => {
      const data = new Array(10000).fill({ value: Math.random() });
      return data.length;
    };

    // Act
    const result = measureMemoryUsage(testFn);

    // Assert
    expect(typeof result.heapUsedDelta).toBe('number');
    expect(result.heapUsedDelta).toBe(
      result.heapUsedAfter - result.heapUsedBefore,
    );
  });

  // Test case 4: Function without return value
  it('4. should handle functions without return value', () => {
    // Arrange
    const testFn = () => {
      const temp = new Array(100).fill(0);
      temp.forEach((_, i) => i * 2);
    };

    // Act
    const result = measureMemoryUsage(testFn);

    // Assert
    expect(result.result).toBeUndefined();
    expect(result.heapUsedBefore).toBeGreaterThanOrEqual(0);
  });

  // Test case 5: Memory values are positive
  it('5. should have positive memory values', () => {
    // Arrange
    const testFn = () => 42;

    // Act
    const result = measureMemoryUsage(testFn);

    // Assert
    expect(result.heapUsedBefore).toBeGreaterThan(0);
    expect(result.heapUsedAfter).toBeGreaterThan(0);
  });

  // Test case 6: Result has all required properties
  it('6. should return object with all required properties', () => {
    // Arrange
    const testFn = () => 'test';

    // Act
    const result = measureMemoryUsage(testFn);

    // Assert
    expect(result).toHaveProperty('heapUsedBefore');
    expect(result).toHaveProperty('heapUsedAfter');
    expect(result).toHaveProperty('heapUsedDelta');
    expect(result).toHaveProperty('result');
  });

  // Test case 7: Function that creates objects
  it('7. should measure memory for object creation', () => {
    // Arrange
    const testFn = () => {
      const objects = [];
      for (let i = 0; i < 1000; i++) {
        objects.push({ id: i, data: `item${i}` });
      }
      return objects.length;
    };

    // Act
    const result = measureMemoryUsage(testFn);

    // Assert
    expect(result.result).toBe(1000);
    expect(typeof result.heapUsedDelta).toBe('number');
  });

  // Test case 8: Error - invalid function type
  it('8. should throw TypeError when fn is not a function', () => {
    // Arrange
    const invalidFn = 'not a function' as unknown as () => void;

    // Act & Assert
    expect(() => measureMemoryUsage(invalidFn)).toThrow(TypeError);
    expect(() => measureMemoryUsage(invalidFn)).toThrow(
      'fn must be a function',
    );
  });
});
