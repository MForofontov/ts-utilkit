import { asyncWaterfall } from '../src/asyncWaterfall';

describe('asyncWaterfall', () => {
  // Test case 1: Pipes value through all tasks in order
  it('1. should pipe the result of each task into the next', async () => {
    // Arrange
    const tasks = [
      async (n: number) => n * 2, // 5 → 10
      async (n: number) => n + 3, // 10 → 13
      async (n: number) => n - 1, // 13 → 12
    ];

    // Act
    const result = await asyncWaterfall(tasks, 5);

    // Assert
    expect(result).toBe(12);
  });

  // Test case 2: Single task — receives initialValue and returns its result
  it('2. should handle a single task correctly', async () => {
    const result = await asyncWaterfall([async (s: string) => s.toUpperCase()], 'hello');
    expect(result).toBe('HELLO');
  });

  // Test case 3: Empty tasks array — returns initialValue unchanged
  it('3. should return initialValue when tasks array is empty', async () => {
    const result = await asyncWaterfall([], 99);
    expect(result).toBe(99);
  });

  // Test case 4: Works with string transformations
  it('4. should correctly chain string transformation tasks', async () => {
    // Arrange
    const tasks = [
      async (s: string) => s.trim(),
      async (s: string) => s.toLowerCase(),
      async (s: string) => s.replace(/\s+/g, '-'),
    ];

    // Act
    const result = await asyncWaterfall(tasks, '  Hello World  ');

    // Assert
    expect(result).toBe('hello-world');
  });

  // Test case 5: Works with object values
  it('5. should correctly thread objects through the pipeline', async () => {
    // Arrange
    type User = { name: string; age?: number; active?: boolean };
    const tasks = [
      async (u: User) => ({ ...u, age: 30 }),
      async (u: User) => ({ ...u, active: true }),
    ];

    // Act
    const result = await asyncWaterfall(tasks, { name: 'Alice' } as User);

    // Assert
    expect(result).toEqual({ name: 'Alice', age: 30, active: true });
  });

  // Test case 6: Tasks execute in the correct order
  it('6. should execute tasks strictly in array order', async () => {
    // Arrange
    const order: string[] = [];
    const tasks = [
      async (n: number) => { order.push('first'); return n + 1; },
      async (n: number) => { order.push('second'); return n + 1; },
      async (n: number) => { order.push('third'); return n + 1; },
    ];

    // Act
    await asyncWaterfall(tasks, 0);

    // Assert
    expect(order).toEqual(['first', 'second', 'third']);
  });

  // Test case 7: Each task receives the result of the previous one
  it('7. should pass each task\'s output as the input to the next task', async () => {
    // Arrange
    const received: number[] = [];
    const tasks = [
      async (n: number) => { received.push(n); return n + 10; },
      async (n: number) => { received.push(n); return n + 10; },
      async (n: number) => { received.push(n); return n + 10; },
    ];

    // Act
    await asyncWaterfall(tasks, 0);

    // Assert
    expect(received).toEqual([0, 10, 20]);
  });

  // Test case 8: Aborts and propagates error when a task throws
  it('8. should abort the pipeline and propagate an error from a failing task', async () => {
    // Arrange
    const thirdTask = jest.fn();
    const tasks = [
      async (n: number) => n + 1,
      async () => { throw new Error('step failed'); },
      thirdTask,
    ];

    // Act & Assert
    await expect(asyncWaterfall(tasks, 0)).rejects.toThrow('step failed');
    expect(thirdTask).not.toHaveBeenCalled();
  });

  // Test case 9: Does not mutate the tasks array
  it('9. should not mutate the tasks array', async () => {
    // Arrange
    const tasks = [async (n: number) => n + 1];
    const original = [...tasks];

    // Act
    await asyncWaterfall(tasks, 0);

    // Assert
    expect(tasks).toHaveLength(original.length);
  });

  // Test case 10: Large pipeline performance
  it('10. should handle a large pipeline efficiently', async () => {
    // Arrange
    const tasks = Array.from({ length: 1000 }, () => async (n: number) => n + 1);

    // Act
    const start = performance.now();
    const result = await asyncWaterfall(tasks, 0);
    const end = performance.now();

    // Assert
    expect(result).toBe(1000);
    expect(end - start).toBeLessThan(1000);
  });

  // Error cases
  // Test case 11: Throws TypeError when tasks is not an array
  it('11. should throw TypeError when tasks is not an array', () => {
    expect(() =>
      asyncWaterfall('not an array' as unknown as Array<(n: number) => Promise<number>>, 0),
    ).toThrow(TypeError);
    expect(() =>
      asyncWaterfall('not an array' as unknown as Array<(n: number) => Promise<number>>, 0),
    ).toThrow('tasks must be an array, got string');
  });

  // Test case 12: Throws Error when a task element is not a function
  it('12. should throw Error when a task element is not a function', () => {
    const tasks = [
      async (n: number) => n + 1,
      42 as unknown as (n: number) => Promise<number>,
    ];

    expect(() => asyncWaterfall(tasks, 0)).toThrow(Error);
    expect(() => asyncWaterfall(tasks, 0)).toThrow(
      'Task at index 1 must be a function, got number',
    );
  });
});
