import { asyncSeries } from '../src/asyncSeries';

/**
 * Unit tests for the asyncSeries function.
 */
describe('asyncSeries', () => {
  // Test case 1: Normal/happy path
  it('1. should execute tasks in series and return results', async () => {
    // Arrange
    const executionOrder: number[] = [];
    const tasks = [
      () => {
        executionOrder.push(1);
        return Promise.resolve('result1');
      },
      () => {
        executionOrder.push(2);
        return Promise.resolve('result2');
      },
      () => {
        executionOrder.push(3);
        return Promise.resolve('result3');
      },
    ];

    // Act
    const results = await asyncSeries(tasks);

    // Assert
    expect(results).toEqual(['result1', 'result2', 'result3']);
    expect(executionOrder).toEqual([1, 2, 3]);
  });

  // Test case 2: Empty array
  it('2. should handle empty array', async () => {
    // Arrange
    const tasks: Array<() => Promise<string>> = [];

    // Act
    const results = await asyncSeries(tasks);

    // Assert
    expect(results).toEqual([]);
  });

  // Test case 3: Mixed data types in results
  it('3. should handle mixed data types in results', async () => {
    // Arrange
    const tasks: Array<() => Promise<unknown>> = [
      () => Promise.resolve(42),
      () => Promise.resolve('string result'),
      () => Promise.resolve({ key: 'value' }),
      () => Promise.resolve([1, 2, 3]),
      () => Promise.resolve(true),
    ];

    // Act
    const results = await asyncSeries(tasks);

    // Assert
    expect(results).toEqual([
      42,
      'string result',
      { key: 'value' },
      [1, 2, 3],
      true,
    ]);
  });

  // Test case 4: Performance test
  it('4. should execute tasks sequentially (not in parallel)', async () => {
    // Arrange
    const startTimes: number[] = [];
    const tasks = Array.from({ length: 3 }, (_, i) => async () => {
      startTimes.push(Date.now());
      await new Promise((resolve) => setTimeout(resolve, 50));
      return `result${i + 1}`;
    });

    // Act
    const start = Date.now();
    const results = await asyncSeries(tasks);
    const totalTime = Date.now() - start;

    // Assert
    expect(results).toHaveLength(3);
    expect(totalTime).toBeGreaterThan(140); // Should take at least 150ms (3 * 50ms)

    // Each task should start after the previous one completes
    for (let i = 1; i < startTimes.length; i++) {
      expect(startTimes[i] - startTimes[i - 1]).toBeGreaterThan(40);
    }
  });

  // Test case 5: Single task
  it('5. should handle single task correctly', async () => {
    // Arrange
    const task = () => Promise.resolve('single result');

    // Act
    const results = await asyncSeries([task]);

    // Assert
    expect(results).toEqual(['single result']);
  });

  // Test case 6: Error handling
  it('6. should stop execution on first error', async () => {
    // Arrange
    const executionOrder: number[] = [];
    const tasks = [
      () => {
        executionOrder.push(1);
        return Promise.resolve('result1');
      },
      () => {
        executionOrder.push(2);
        return Promise.reject(new Error('Task 2 failed'));
      },
      () => {
        executionOrder.push(3);
        return Promise.resolve('result3');
      },
    ];

    // Act & Assert
    await expect(asyncSeries(tasks)).rejects.toThrow('Task 2 failed');
    expect(executionOrder).toEqual([1, 2]); // Third task should not execute
  });

  // Test case 7: TypeError for invalid input types
  it('7. should throw TypeError for invalid input types', () => {
    // Arrange
    const invalidInputs = [123, null, undefined, {}, true, 'string'];

    // Act & Assert
    invalidInputs.forEach((input) => {
      expect(() =>
        asyncSeries(input as unknown as (() => Promise<unknown>)[]),
      ).toThrow(TypeError);
      expect(() =>
        asyncSeries(input as unknown as (() => Promise<unknown>)[]),
      ).toThrow('tasks must be an array, got');
    });
  });

  // Test case 8: Error for non-function tasks
  it('8. should throw Error for non-function tasks', () => {
    // Arrange
    const invalidTasks = [123, null, undefined, {}, true, 'string'];

    // Act & Assert
    invalidTasks.forEach((task) => {
      expect(() =>
        asyncSeries([task as unknown as () => Promise<unknown>]),
      ).toThrow(Error);
      expect(() =>
        asyncSeries([task as unknown as () => Promise<unknown>]),
      ).toThrow('Task at index 0 must be a function, got');
    });
  });
});
