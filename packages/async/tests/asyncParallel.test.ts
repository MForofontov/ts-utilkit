import { asyncParallel } from '../src/asyncParallel';

/**
 * Unit tests for the asyncParallel function.
 */
describe('asyncParallel', () => {
  // Test case 1: Normal/happy path
  it('1. should execute tasks in parallel and return results', async () => {
    // Arrange
    const tasks = [
      jest.fn().mockResolvedValue('result1'),
      jest.fn().mockResolvedValue('result2'),
      jest.fn().mockResolvedValue('result3'),
    ];

    // Act
    const results = await asyncParallel(tasks);

    // Assert
    expect(results).toEqual(['result1', 'result2', 'result3']);
    tasks.forEach((task) => expect(task).toHaveBeenCalledTimes(1));
  });

  // Test case 2: Empty array
  it('2. should handle empty array', async () => {
    // Arrange
    const tasks: Array<() => Promise<string>> = [];

    // Act
    const results = await asyncParallel(tasks);

    // Assert
    expect(results).toEqual([]);
  });

  // Test case 3: Concurrency control
  it('3. should respect concurrency limit', async () => {
    // Arrange
    let activeCount = 0;
    let maxActiveCount = 0;

    const createTask = (delay: number, result: string) => async () => {
      activeCount++;
      maxActiveCount = Math.max(maxActiveCount, activeCount);
      await new Promise((resolve) => setTimeout(resolve, delay));
      activeCount--;
      return result;
    };

    const tasks = [
      createTask(50, 'result1'),
      createTask(50, 'result2'),
      createTask(50, 'result3'),
      createTask(50, 'result4'),
      createTask(50, 'result5'),
    ];

    // Act
    const results = await asyncParallel(tasks, 2);

    // Assert
    expect(results).toEqual([
      'result1',
      'result2',
      'result3',
      'result4',
      'result5',
    ]);
    expect(maxActiveCount).toBeLessThanOrEqual(2);
  });

  // Test case 4: Results maintain order
  it('4. should maintain order of results regardless of completion time', async () => {
    // Arrange
    const tasks = [
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 100));
        return 'slow';
      },
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 10));
        return 'fast';
      },
      async () => {
        await new Promise((resolve) => setTimeout(resolve, 50));
        return 'medium';
      },
    ];

    // Act
    const results = await asyncParallel(tasks, 3);

    // Assert
    expect(results).toEqual(['slow', 'fast', 'medium']);
  });

  // Test case 5: Performance test
  it('5. should execute tasks in parallel for better performance', async () => {
    // Arrange
    const tasks = Array.from({ length: 4 }, (_, i) => async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      return `result${i + 1}`;
    });

    // Act
    const start = Date.now();
    const results = await asyncParallel(tasks, 4);
    const totalTime = Date.now() - start;

    // Assert
    expect(results).toHaveLength(4);
    expect(totalTime).toBeLessThan(100); // Should be closer to 50ms than 200ms
  });

  // Test case 6: Error handling
  it('6. should propagate errors from tasks', async () => {
    // Arrange
    const tasks = [
      jest.fn().mockResolvedValue('result1'),
      jest.fn().mockRejectedValue(new Error('Task failed')),
      jest.fn().mockResolvedValue('result3'),
    ];

    // Act & Assert
    await expect(asyncParallel(tasks)).rejects.toThrow('Task failed');
  });

  // Test case 7: TypeError for invalid input types
  it('7. should throw TypeError for invalid input types', () => {
    // Arrange
    const invalidInputs = [123, null, undefined, {}, true, 'string'];

    // Act & Assert
    invalidInputs.forEach((input) => {
      expect(() =>
        asyncParallel(input as unknown as (() => Promise<unknown>)[]),
      ).toThrow(TypeError);
      expect(() =>
        asyncParallel(input as unknown as (() => Promise<unknown>)[]),
      ).toThrow('tasks must be an array, got');
    });
  });

  // Test case 8: TypeError for invalid concurrency
  it('8. should throw TypeError for invalid concurrency', () => {
    // Arrange
    const validTasks = [jest.fn().mockResolvedValue('test')];
    // Note: undefined is excluded as it's a valid value (optional parameter)
    const invalidConcurrency = [null, {}, true, 'string', [], NaN];

    // Act & Assert
    invalidConcurrency.forEach((concurrency) => {
      expect(() =>
        asyncParallel(validTasks, concurrency as unknown as number),
      ).toThrow(TypeError);
      expect(() =>
        asyncParallel(validTasks, concurrency as unknown as number),
      ).toThrow('concurrency must be a number, got');
    });
  });

  // Test case 9: Error for invalid concurrency value
  it('9. should throw Error for concurrency less than 1', () => {
    // Arrange
    const validTasks = [jest.fn().mockResolvedValue('test')];

    // Act & Assert
    expect(() => asyncParallel(validTasks, 0)).toThrow(Error);
    expect(() => asyncParallel(validTasks, 0)).toThrow(
      'concurrency must be at least 1, got 0',
    );

    expect(() => asyncParallel(validTasks, -1)).toThrow(Error);
    expect(() => asyncParallel(validTasks, -1)).toThrow(
      'concurrency must be at least 1, got -1',
    );
  });

  // Test case 10: Error for non-function tasks
  it('10. should throw Error for non-function tasks', () => {
    // Arrange
    const invalidTasks = [123, null, undefined, {}, true, 'string'];

    // Act & Assert
    invalidTasks.forEach((task, _index) => {
      expect(() =>
        asyncParallel([task as unknown as () => Promise<unknown>]),
      ).toThrow(Error);
      expect(() =>
        asyncParallel([task as unknown as () => Promise<unknown>]),
      ).toThrow('Task at index 0 must be a function, got');
    });
  });
});
