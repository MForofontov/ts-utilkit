import { generateRange } from '../src/generateRange';

/**
 * Unit tests for the generateRange function.
 */
describe('generateRange', () => {
  // Test case 1: Basic range generation
  it('1. should generate range from 1 to 5', () => {
    // Arrange
    const start = 1;
    const end = 5;
    const expected = [1, 2, 3, 4, 5];

    // Act
    const result = generateRange(start, end);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 2: Range with step
  it('2. should generate range with step of 2', () => {
    // Arrange
    const start = 0;
    const end = 10;
    const step = 2;
    const expected = [0, 2, 4, 6, 8, 10];

    // Act
    const result = generateRange(start, end, step);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 3: Single element range
  it('3. should generate single element when start equals end', () => {
    // Arrange
    const start = 5;
    const end = 5;
    const expected = [5];

    // Act
    const result = generateRange(start, end);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 4: Negative range
  it('4. should generate range with negative numbers', () => {
    // Arrange
    const start = -5;
    const end = 5;
    const expected = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];

    // Act
    const result = generateRange(start, end);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 5: Range with step larger than range
  it('5. should handle step larger than range', () => {
    // Arrange
    const start = 0;
    const end = 3;
    const step = 10;
    const expected = [0];

    // Act
    const result = generateRange(start, end, step);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 6: Zero as start
  it('6. should handle zero as start value', () => {
    // Arrange
    const start = 0;
    const end = 3;
    const expected = [0, 1, 2, 3];

    // Act
    const result = generateRange(start, end);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 7: Large range
  it('7. should generate large range efficiently', () => {
    // Arrange
    const start = 0;
    const end = 1000;

    // Act
    const result = generateRange(start, end);

    // Assert
    expect(result).toHaveLength(1001);
    expect(result[0]).toBe(0);
    expect(result[1000]).toBe(1000);
  });

  // Test case 8: Step of 5
  it('8. should handle custom step of 5', () => {
    // Arrange
    const start = 0;
    const end = 20;
    const step = 5;
    const expected = [0, 5, 10, 15, 20];

    // Act
    const result = generateRange(start, end, step);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 9: Error - start greater than end returns empty array
  it('9. should return empty array when start is greater than end', () => {
    // Arrange
    const start = 10;
    const end = 5;

    // Act
    const result = generateRange(start, end);

    // Assert
    expect(result).toEqual([]);
  });

  // Test case 10: Error - invalid start type
  it('10. should throw TypeError when start is not a number', () => {
    // Arrange
    const start = 'one' as unknown as number;
    const end = 5;

    // Act & Assert
    expect(() => generateRange(start, end)).toThrow(TypeError);
    expect(() => generateRange(start, end)).toThrow(
      'start must be a valid number',
    );
  });

  // Test case 11: Error - invalid end type
  it('11. should throw TypeError when end is not a number', () => {
    // Arrange
    const start = 1;
    const end = 'five' as unknown as number;

    // Act & Assert
    expect(() => generateRange(start, end)).toThrow(TypeError);
    expect(() => generateRange(start, end)).toThrow(
      'end must be a valid number',
    );
  });

  // Test case 12: Error - invalid step type
  it('12. should throw Error when step is not a number', () => {
    // Arrange
    const start = 1;
    const end = 5;
    const step = 'two' as unknown as number;

    // Act & Assert
    expect(() => generateRange(start, end, step)).toThrow(Error);
    expect(() => generateRange(start, end, step)).toThrow(
      'step must be a positive number',
    );
  });

  // Test case 13: Error - step less than 1
  it('13. should throw Error when step is less than 1', () => {
    // Arrange
    const start = 1;
    const end = 5;
    const step = 0;

    // Act & Assert
    expect(() => generateRange(start, end, step)).toThrow(Error);
    expect(() => generateRange(start, end, step)).toThrow(
      'step must be a positive number',
    );
  });
});
