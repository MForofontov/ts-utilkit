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

});
