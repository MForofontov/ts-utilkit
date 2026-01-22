import { getBoundaryValues } from '../src/getBoundaryValues';

/**
 * Unit tests for the getBoundaryValues function.
 */
describe('getBoundaryValues', () => {
  // Test case 1: Default boundary values
  it('1. should return all boundary values', () => {
    // Act
    const result = getBoundaryValues();

    // Assert
    expect(result).toHaveProperty('zero', 0);
    expect(result).toHaveProperty('positiveOne', 1);
    expect(result).toHaveProperty('negativeOne', -1);
    expect(result).toHaveProperty('maxSafeInteger', Number.MAX_SAFE_INTEGER);
    expect(result).toHaveProperty('minSafeInteger', Number.MIN_SAFE_INTEGER);
    expect(result).toHaveProperty('maxValue', Number.MAX_VALUE);
    expect(result).toHaveProperty('minValue', Number.MIN_VALUE);
    expect(result).toHaveProperty('epsilon', Number.EPSILON);
    expect(result).toHaveProperty('positiveInfinity', Number.POSITIVE_INFINITY);
    expect(result).toHaveProperty('negativeInfinity', Number.NEGATIVE_INFINITY);
    expect(result).toHaveProperty('nan');
    expect(Number.isNaN(result.nan)).toBe(true);
  });

  // Test case 2: Verify MAX_SAFE_INTEGER
  it('2. should have correct MAX_SAFE_INTEGER value', () => {
    // Act
    const result = getBoundaryValues();

    // Assert
    expect(result.maxSafeInteger).toBe(9007199254740991);
    expect(Number.isSafeInteger(result.maxSafeInteger)).toBe(true);
  });

  // Test case 3: Verify MIN_SAFE_INTEGER
  it('3. should have correct MIN_SAFE_INTEGER value', () => {
    // Act
    const result = getBoundaryValues();

    // Assert
    expect(result.minSafeInteger).toBe(-9007199254740991);
    expect(Number.isSafeInteger(result.minSafeInteger)).toBe(true);
  });

  // Test case 4: Verify infinity values
  it('4. should have correct infinity values', () => {
    // Act
    const result = getBoundaryValues();

    // Assert
    expect(result.positiveInfinity).toBe(Infinity);
    expect(result.negativeInfinity).toBe(-Infinity);
    expect(Number.isFinite(result.positiveInfinity)).toBe(false);
    expect(Number.isFinite(result.negativeInfinity)).toBe(false);
  });

  // Test case 5: Verify zero and one values
  it('5. should have correct zero and one values', () => {
    // Act
    const result = getBoundaryValues();

    // Assert
    expect(result.zero).toBe(0);
    expect(result.positiveOne).toBe(1);
    expect(result.negativeOne).toBe(-1);
  });

  // Test case 6: Verify epsilon
  it('6. should have correct epsilon value', () => {
    // Act
    const result = getBoundaryValues();

    // Assert
    expect(result.epsilon).toBe(Number.EPSILON);
    expect(result.epsilon).toBeCloseTo(2.220446049250313e-16);
  });

  // Test case 7: Verify NaN
  it('7. should have NaN value', () => {
    // Act
    const result = getBoundaryValues();

    // Assert
    expect(Number.isNaN(result.nan)).toBe(true);
  });

  // Test case 8: All values are numbers
  it('8. should have all properties as numbers', () => {
    // Act
    const result = getBoundaryValues();

    // Assert
    Object.values(result).forEach((value) => {
      expect(typeof value).toBe('number');
    });
  });

  // Test case 9: Returns new object each time
  it('9. should return new object instance each time', () => {
    // Act
    const result1 = getBoundaryValues();
    const result2 = getBoundaryValues();

    // Assert
    expect(result1).not.toBe(result2);
    expect(result1.zero).toBe(result2.zero);
  });

  // Test case 10: Has expected number of properties
  it('10. should have exactly 11 boundary properties', () => {
    // Act
    const result = getBoundaryValues();

    // Assert
    const keys = Object.keys(result);
    expect(keys).toHaveLength(11);
  });
});
