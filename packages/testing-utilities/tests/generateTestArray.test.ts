import { generateTestArray } from '../src/generateTestArray';

/**
 * Unit tests for the generateTestArray function.
 */
describe('generateTestArray', () => {
  // Test case 1: Generate array with default generator
  it('1. should generate array of numbers with default generator', () => {
    // Arrange
    const length = 5;

    // Act
    const result = generateTestArray(length);

    // Assert
    expect(result).toHaveLength(5);
    expect(result.every((n) => typeof n === 'number')).toBe(true);
    expect(
      result.every((n) => typeof n === 'number' && n >= 0 && n < 100),
    ).toBe(true);
  });

  // Test case 2: Generate array with custom generator
  it('2. should generate array with custom generator function', () => {
    // Arrange
    const length = 3;
    const generator = (i: number) => i * 2;
    const expected = [0, 2, 4];

    // Act
    const result = generateTestArray(length, generator);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 3: Generate array of objects
  it('3. should generate array of objects', () => {
    // Arrange
    const length = 3;
    const generator = (i: number) => ({ id: i, value: `item${i}` });

    // Act
    const result = generateTestArray(length, generator);

    // Assert
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({ id: 0, value: 'item0' });
    expect(result[1]).toEqual({ id: 1, value: 'item1' });
    expect(result[2]).toEqual({ id: 2, value: 'item2' });
  });

  // Test case 4: Generate array of strings
  it('4. should generate array of strings', () => {
    // Arrange
    const length = 4;
    const generator = (i: number) => `test-${i}`;
    const expected = ['test-0', 'test-1', 'test-2', 'test-3'];

    // Act
    const result = generateTestArray(length, generator);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 5: Empty array
  it('5. should generate empty array when length is 0', () => {
    // Arrange
    const length = 0;

    // Act
    const result = generateTestArray(length);

    // Assert
    expect(result).toEqual([]);
    expect(result).toHaveLength(0);
  });

  // Test case 6: Single element array
  it('6. should generate single element array', () => {
    // Arrange
    const length = 1;
    const generator = (i: number) => i * 10;
    const expected = [0];

    // Act
    const result = generateTestArray(length, generator);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 7: Large array
  it('7. should generate large array efficiently', () => {
    // Arrange
    const length = 10000;

    // Act
    const result = generateTestArray(length);

    // Assert
    expect(result).toHaveLength(10000);
    expect(result.every((n) => typeof n === 'number')).toBe(true);
    expect(
      result.every((n) => typeof n === 'number' && n >= 0 && n < 100),
    ).toBe(true);
  });

  // Test case 8: Generator with constant value
  it('8. should work with generator that returns constant value', () => {
    // Arrange
    const length = 3;
    const generator = () => 42;
    const expected = [42, 42, 42];

    // Act
    const result = generateTestArray(length, generator);

    // Assert
    expect(result).toEqual(expected);
  });

  // Test case 9: Generator receives correct index
  it('9. should pass correct index to generator function', () => {
    // Arrange
    const length = 5;
    const indices: number[] = [];
    const generator = (i: number) => {
      indices.push(i);
      return i;
    };

    // Act
    generateTestArray(length, generator);

    // Assert
    expect(indices).toEqual([0, 1, 2, 3, 4]);
  });

  // Test case 10: Error - invalid length type
  it('10. should throw Error when length is not a number', () => {
    // Arrange
    const length = 'five' as unknown as number;

    // Act & Assert
    expect(() => generateTestArray(length)).toThrow(Error);
    expect(() => generateTestArray(length)).toThrow(
      'length must be a non-negative number',
    );
  });

  // Test case 11: Error - negative length
  it('11. should throw Error when length is negative', () => {
    // Arrange
    const length = -5;

    // Act & Assert
    expect(() => generateTestArray(length)).toThrow(Error);
    expect(() => generateTestArray(length)).toThrow(
      'length must be a non-negative number',
    );
  });

  // Test case 12: Error - invalid generator type
  it('12. should throw TypeError when generator is not a function', () => {
    // Arrange
    const length = 5;
    const generator = 'not a function' as unknown as (i: number) => number;

    // Act & Assert
    expect(() => generateTestArray(length, generator)).toThrow(TypeError);
    expect(() => generateTestArray(length, generator)).toThrow(
      'generator must be a function',
    );
  });
});
