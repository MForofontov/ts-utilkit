import { asyncMap } from '../src/asyncMap';

/**
 * Unit tests for the asyncMap function.
 */
describe('asyncMap', () => {
  // Test case 1: Normal/happy path
  it('1. should map array elements using async function', async () => {
    // Arrange
    const numbers = [1, 2, 3, 4, 5];
    const doubleAsync = async (num: number) => {
      await new Promise((resolve) => setTimeout(resolve, 1));
      return num * 2;
    };

    // Act
    const result = await asyncMap(numbers, doubleAsync);

    // Assert
    expect(result).toEqual([2, 4, 6, 8, 10]);
  });

  // Test case 2: Empty array
  it('2. should handle empty array', async () => {
    // Arrange
    const emptyArray: number[] = [];
    const mockFn = jest.fn().mockResolvedValue('test');

    // Act
    const result = await asyncMap(emptyArray, mockFn);

    // Assert
    expect(result).toEqual([]);
    expect(mockFn).not.toHaveBeenCalled();
  });

  // Test case 3: Function receives correct arguments
  it('3. should pass item and index to async function', async () => {
    // Arrange
    const items = ['a', 'b', 'c'];
    const mockFn = jest
      .fn()
      .mockImplementation((item: string, index: number) => {
        return Promise.resolve(`${item}-${index}`);
      });

    // Act
    const result = await asyncMap(items, mockFn);

    // Assert
    expect(result).toEqual(['a-0', 'b-1', 'c-2']);
    expect(mockFn).toHaveBeenCalledTimes(3);
    expect(mockFn).toHaveBeenNthCalledWith(1, 'a', 0);
    expect(mockFn).toHaveBeenNthCalledWith(2, 'b', 1);
    expect(mockFn).toHaveBeenNthCalledWith(3, 'c', 2);
  });

  // Test case 4: Performance test with concurrency
  it('4. should process items with respect to concurrency limit', async () => {
    // Arrange
    const items = [1, 2, 3, 4, 5, 6];
    let activeCount = 0;
    let maxActiveCount = 0;

    const slowFn = async (num: number) => {
      activeCount++;
      maxActiveCount = Math.max(maxActiveCount, activeCount);
      await new Promise((resolve) => setTimeout(resolve, 50));
      activeCount--;
      return num * 2;
    };

    // Act
    const result = await asyncMap(items, slowFn, 3);

    // Assert
    expect(result).toEqual([2, 4, 6, 8, 10, 12]);
    expect(maxActiveCount).toBeLessThanOrEqual(3);
  });

  // Test case 5: Small array should use Promise.all
  it('5. should use Promise.all for small arrays', async () => {
    // Arrange
    const items = [1, 2];
    const mockFn = jest
      .fn()
      .mockImplementation((num: number) => Promise.resolve(num * 2));

    // Act
    const result = await asyncMap(items, mockFn, 5);

    // Assert
    expect(result).toEqual([2, 4]);
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  // Test case 6: Different data types
  it('6. should handle different input and output types', async () => {
    // Arrange
    const strings = ['hello', 'world', 'test'];
    const lengthFn = async (str: string) => {
      await new Promise((resolve) => setTimeout(resolve, 1));
      return str.length;
    };

    // Act
    const result = await asyncMap(strings, lengthFn);

    // Assert
    expect(result).toEqual([5, 5, 4]);
  });

  // Test case 7: Error handling
  it('7. should propagate errors from async function', async () => {
    // Arrange
    const numbers = [1, 2, 3];
    const errorFn = (num: number) => {
      if (num === 2) {
        throw new Error('Error on second item');
      }
      return Promise.resolve(num * 2);
    };

    // Act & Assert
    await expect(asyncMap(numbers, errorFn)).rejects.toThrow(
      'Error on second item',
    );
  });

  // Test case 8: TypeError for invalid input types
  it('8. should throw TypeError for invalid input types', () => {
    // Arrange
    const invalidInputs = [123, null, undefined, {}, true, 'string'];
    const mockFn = jest.fn().mockResolvedValue('test');

    // Act & Assert
    invalidInputs.forEach((input) => {
      expect(() => asyncMap(input as unknown as unknown[], mockFn)).toThrow(
        TypeError,
      );
      expect(() => asyncMap(input as unknown as unknown[], mockFn)).toThrow(
        'array must be an array, got',
      );
    });
  });

  // Test case 9: TypeError for invalid async function
  it('9. should throw TypeError for invalid async function', () => {
    // Arrange
    const validArray = [1, 2, 3];
    const invalidFunctions = [123, null, undefined, {}, true, 'string', []];

    // Act & Assert
    invalidFunctions.forEach((fn) => {
      expect(() =>
        asyncMap(
          validArray,
          fn as unknown as (item: number, index: number) => Promise<unknown>,
        ),
      ).toThrow(TypeError);
      expect(() =>
        asyncMap(
          validArray,
          fn as unknown as (item: number, index: number) => Promise<unknown>,
        ),
      ).toThrow('asyncFn must be a function, got');
    });
  });

  // Test case 10: Invalid concurrency
  it('10. should throw TypeError for invalid concurrency', () => {
    // Arrange
    const validArray = [1, 2, 3];
    const validFn = jest.fn().mockResolvedValue('test');
    // Note: undefined is excluded as it's a valid value (optional parameter)
    const invalidConcurrency = [null, {}, true, 'string', [], NaN];

    // Act & Assert
    invalidConcurrency.forEach((concurrency) => {
      expect(() =>
        asyncMap(validArray, validFn, concurrency as unknown as number),
      ).toThrow(TypeError);
      expect(() =>
        asyncMap(validArray, validFn, concurrency as unknown as number),
      ).toThrow('concurrency must be a number, got');
    });

    expect(() => asyncMap(validArray, validFn, 0)).toThrow(Error);
    expect(() => asyncMap(validArray, validFn, 0)).toThrow(
      'concurrency must be at least 1, got 0',
    );
  });
});
