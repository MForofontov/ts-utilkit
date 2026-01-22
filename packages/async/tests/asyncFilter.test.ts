import { asyncFilter } from '../src/asyncFilter';

/**
 * Unit tests for the asyncFilter function.
 */
describe('asyncFilter', () => {
  // Test case 1: Normal/happy path
  it('1. should filter array using async predicate', async () => {
    // Arrange
    const numbers = [1, 2, 3, 4, 5, 6];
    const isEvenAsync = async (num: number) => {
      await new Promise((resolve) => setTimeout(resolve, 1));
      return num % 2 === 0;
    };

    // Act
    const result = await asyncFilter(numbers, isEvenAsync);

    // Assert
    expect(result).toEqual([2, 4, 6]);
  });

  // Test case 2: Empty array
  it('2. should handle empty array', async () => {
    // Arrange
    const emptyArray: number[] = [];
    const mockPredicate = jest.fn().mockResolvedValue(true);

    // Act
    const result = await asyncFilter(emptyArray, mockPredicate);

    // Assert
    expect(result).toEqual([]);
    expect(mockPredicate).not.toHaveBeenCalled();
  });

  // Test case 3: All elements pass filter
  it('3. should return all elements when all pass filter', async () => {
    // Arrange
    const strings = ['a', 'b', 'c'];
    const allTrueAsync = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1));
      return true;
    };

    // Act
    const result = await asyncFilter(strings, allTrueAsync);

    // Assert
    expect(result).toEqual(['a', 'b', 'c']);
  });

  // Test case 4: No elements pass filter
  it('4. should return empty array when no elements pass filter', async () => {
    // Arrange
    const numbers = [1, 3, 5, 7];
    const isEvenAsync = async (num: number) => {
      await new Promise((resolve) => setTimeout(resolve, 1));
      return num % 2 === 0;
    };

    // Act
    const result = await asyncFilter(numbers, isEvenAsync);

    // Assert
    expect(result).toEqual([]);
  });

  // Test case 5: Predicate receives correct arguments
  it('5. should pass item and index to predicate function', async () => {
    // Arrange
    const items = ['a', 'b', 'c'];
    const predicateMock = jest.fn().mockResolvedValue(true);

    // Act
    await asyncFilter(items, predicateMock);

    // Assert
    expect(predicateMock).toHaveBeenCalledTimes(3);
    expect(predicateMock).toHaveBeenNthCalledWith(1, 'a', 0);
    expect(predicateMock).toHaveBeenNthCalledWith(2, 'b', 1);
    expect(predicateMock).toHaveBeenNthCalledWith(3, 'c', 2);
  });

  // Test case 6: Predicates execute in parallel
  it('6. should execute predicates in parallel for better performance', async () => {
    // Arrange
    const items = [1, 2, 3, 4];
    const executionTimes: number[] = [];
    const slowPredicate = async (item: number) => {
      executionTimes.push(Date.now());
      await new Promise((resolve) => setTimeout(resolve, 50));
      return item % 2 === 0;
    };

    // Act
    const start = Date.now();
    const result = await asyncFilter(items, slowPredicate);
    const totalTime = Date.now() - start;

    // Assert
    expect(result).toEqual([2, 4]);
    expect(totalTime).toBeLessThan(100); // Should be closer to 50ms than 200ms

    // All predicates should start at roughly the same time
    const timeDifferences = executionTimes
      .slice(1)
      .map((time, i) => Math.abs(time - executionTimes[i]));
    timeDifferences.forEach((diff) => expect(diff).toBeLessThan(20));
  });

  // Test case 7: TypeError for invalid input types
  it('7. should throw TypeError for invalid input types', () => {
    // Arrange
    const invalidInputs = [123, null, undefined, {}, true, 'string'];
    const mockPredicate = jest.fn().mockResolvedValue(true);

    // Act & Assert
    invalidInputs.forEach((input) => {
      expect(() =>
        asyncFilter(input as unknown as unknown[], mockPredicate),
      ).toThrow(TypeError);
      expect(() =>
        asyncFilter(input as unknown as unknown[], mockPredicate),
      ).toThrow('array must be an array, got');
    });
  });

  // Test case 8: TypeError for invalid predicate
  it('8. should throw TypeError for invalid predicate function', () => {
    // Arrange
    const validArray = [1, 2, 3];
    const invalidPredicates = [123, null, undefined, {}, true, 'string'];

    // Act & Assert
    invalidPredicates.forEach((predicate) => {
      expect(() =>
        asyncFilter(
          validArray,
          predicate as unknown as (
            item: number,
            index: number,
          ) => Promise<boolean>,
        ),
      ).toThrow(TypeError);
      expect(() =>
        asyncFilter(
          validArray,
          predicate as unknown as (
            item: number,
            index: number,
          ) => Promise<boolean>,
        ),
      ).toThrow('asyncPredicate must be a function, got');
    });
  });
});
