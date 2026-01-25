import { getCommonInvalidInputs } from '../src/getCommonInvalidInputs';

/**
 * Unit tests for the getCommonInvalidInputs function.
 */
describe('getCommonInvalidInputs', () => {
  // Test case 1: Returns array of invalid inputs
  it('1. should return array of common invalid inputs', () => {
    // Act
    const result = getCommonInvalidInputs();

    // Assert
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
  });

  // Test case 2: Contains null
  it('2. should include null in invalid inputs', () => {
    // Act
    const result = getCommonInvalidInputs();

    // Assert
    expect(result).toContain(null);
  });

  // Test case 3: Contains undefined
  it('3. should include undefined in invalid inputs', () => {
    // Act
    const result = getCommonInvalidInputs();

    // Assert
    expect(result).toContain(undefined);
  });

  // Test case 4: Contains NaN
  it('4. should include NaN in invalid inputs', () => {
    // Act
    const result = getCommonInvalidInputs();

    // Assert
    const hasNaN = result.some((val) => Number.isNaN(val));
    expect(hasNaN).toBe(true);
  });

  // Test case 5: Contains empty string
  it('5. should include empty string in invalid inputs', () => {
    // Act
    const result = getCommonInvalidInputs();

    // Assert
    expect(result).toContain('');
  });

  // Test case 6: Contains empty array
  it('6. should include empty array in invalid inputs', () => {
    // Act
    const result = getCommonInvalidInputs();

    // Assert
    const hasEmptyArray = result.some(
      (val) => Array.isArray(val) && val.length === 0,
    );
    expect(hasEmptyArray).toBe(true);
  });

  // Test case 7: Contains empty object
  it('7. should include empty object in invalid inputs', () => {
    // Act
    const result = getCommonInvalidInputs();

    // Assert
    const hasEmptyObject = result.some(
      (val) =>
        val !== null &&
        typeof val === 'object' &&
        !Array.isArray(val) &&
        Object.keys(val).length === 0,
    );
    expect(hasEmptyObject).toBe(true);
  });

  // Test case 8: Include NaN
  it('8. should include NaN in invalid inputs', () => {
    // Act
    const result = getCommonInvalidInputs();

    // Assert
    const hasNaN = result.some((v) => Number.isNaN(v));
    expect(hasNaN).toBe(true);
  });

  // Test case 9: Include Date
  it('9. should include Date object in invalid inputs', () => {
    // Act
    const result = getCommonInvalidInputs();

    // Assert
    const hasDate = result.some((v) => v instanceof Date);
    expect(hasDate).toBe(true);
  });

  // Test case 10: Returns new array each time
  it('10. should return new array instance each time', () => {
    // Act
    const result1 = getCommonInvalidInputs();
    const result2 = getCommonInvalidInputs();

    // Assert
    expect(result1).not.toBe(result2);
  });

  // Test case 11: Contains various types
  it('11. should include multiple data types', () => {
    // Act
    const result = getCommonInvalidInputs();

    // Assert
    const hasString = result.some((val) => typeof val === 'string');
    const hasNaN = result.some((val) => Number.isNaN(val));
    const hasObject = result.some(
      (val) => val !== null && typeof val === 'object',
    );

    expect(hasString).toBe(true);
    expect(hasNaN).toBe(true);
    expect(hasObject).toBe(true);
  });

  // Test case 12: Has reasonable size
  it('12. should have reasonable number of invalid inputs', () => {
    // Act
    const result = getCommonInvalidInputs();

    // Assert
    expect(result.length).toBeGreaterThanOrEqual(5);
    expect(result.length).toBeLessThan(20);
  });
});
