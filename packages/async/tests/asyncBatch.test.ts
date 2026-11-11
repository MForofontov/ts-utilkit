import { asyncBatch } from '../src/asyncBatch';

describe('asyncBatch', () => {
  it('retains a batch larger than the engine argument limit', async () => {
    const values = Array.from({ length: 200000 }, (_, index) => index);
    const result = await asyncBatch(
      values,
      (batch) => Promise.resolve(batch),
      values.length,
    );
    expect(result).toEqual(values);
  });

  it('materializes holes in batch results like spread and retains references', async () => {
    const value = { id: 1 };
    const batch = new Array<unknown>(3);
    batch[1] = value;
    const result = await asyncBatch([1], () => Promise.resolve(batch), 1);
    expect(result).toEqual([undefined, value, undefined]);
    expect(Object.keys(result)).toEqual(['0', '1', '2']);
    expect(result[1]).toBe(value);
  });

  // Test case 1: Processes all items and returns concatenated results
  it('1. should process all items and return concatenated results', async () => {
    // Arrange
    const items = [1, 2, 3, 4, 5];
    const batchFn = jest
      .fn()
      .mockImplementation(
        async (batch: number[]) =>
          await Promise.resolve(batch.map((n) => n * 2)),
      );

    // Act
    const result = await asyncBatch(items, batchFn, 2);

    // Assert
    expect(result).toEqual([2, 4, 6, 8, 10]);
  });

  // Test case 2: Correct number of batchFn calls
  it('2. should call batchFn the correct number of times', async () => {
    // Arrange
    const items = [1, 2, 3, 4, 5];
    const batchFn = jest
      .fn()
      .mockImplementation(async (b: number[]) => await Promise.resolve(b));

    // Act
    await asyncBatch(items, batchFn, 2);

    // Assert — 5 items / size 2 = ceil(5/2) = 3 calls
    expect(batchFn).toHaveBeenCalledTimes(3);
  });

  // Test case 3: Correct batch sizes are passed to batchFn
  it('3. should pass correctly-sized batches to batchFn', async () => {
    // Arrange
    const items = [1, 2, 3, 4, 5];
    const batches: number[][] = [];
    const batchFn = jest.fn().mockImplementation(async (b: number[]) => {
      batches.push([...b]);
      return await Promise.resolve(b);
    });

    // Act
    await asyncBatch(items, batchFn, 2);

    // Assert
    expect(batches).toEqual([[1, 2], [3, 4], [5]]);
  });

  // Test case 4: batchSize equals items length — single batch
  it('4. should process all items in a single batch when batchSize equals items length', async () => {
    // Arrange
    const items = [10, 20, 30];
    const batchFn = jest
      .fn()
      .mockImplementation(async (b: number[]) => await Promise.resolve(b));

    // Act
    const result = await asyncBatch(items, batchFn, 3);

    // Assert
    expect(result).toEqual([10, 20, 30]);
    expect(batchFn).toHaveBeenCalledTimes(1);
  });

  // Test case 5: batchSize larger than items length — single batch
  it('5. should process all items in one batch when batchSize exceeds items length', async () => {
    // Arrange
    const items = [1, 2];
    const batchFn = jest
      .fn()
      .mockImplementation(async (b: number[]) => await Promise.resolve(b));

    // Act
    const result = await asyncBatch(items, batchFn, 100);

    // Assert
    expect(result).toEqual([1, 2]);
    expect(batchFn).toHaveBeenCalledTimes(1);
  });

  // Test case 6: batchSize of 1 — each item gets its own batch
  it('6. should process each item individually when batchSize is 1', async () => {
    // Arrange
    const items = ['a', 'b', 'c'];
    const batchFn = jest
      .fn()
      .mockImplementation(
        async (b: string[]) =>
          await Promise.resolve(b.map((s) => s.toUpperCase())),
      );

    // Act
    const result = await asyncBatch(items, batchFn, 1);

    // Assert
    expect(result).toEqual(['A', 'B', 'C']);
    expect(batchFn).toHaveBeenCalledTimes(3);
  });

  // Test case 7: Empty items array returns empty result
  it('7. should return an empty array without calling batchFn when items is empty', async () => {
    // Arrange
    const batchFn = jest.fn().mockResolvedValue([]);

    // Act
    const result = await asyncBatch([], batchFn, 5);

    // Assert
    expect(result).toEqual([]);
    expect(batchFn).not.toHaveBeenCalled();
  });

  // Test case 8: Preserves original item order in results
  it('8. should preserve the original item order in the concatenated results', async () => {
    // Arrange
    const items = [3, 1, 4, 1, 5, 9, 2, 6];
    const batchFn = jest
      .fn()
      .mockImplementation(async (b: number[]) => await Promise.resolve(b));

    // Act
    const result = await asyncBatch(items, batchFn, 3);

    // Assert
    expect(result).toEqual([3, 1, 4, 1, 5, 9, 2, 6]);
  });

  // Test case 9: Works with object items
  it('9. should handle arrays of objects correctly', async () => {
    // Arrange
    const items = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const batchFn = jest
      .fn()
      .mockImplementation(
        async (b: { id: number }[]) =>
          await Promise.resolve(b.map((x) => ({ ...x, processed: true }))),
      );

    // Act
    const result = await asyncBatch(items, batchFn, 2);

    // Assert
    expect(result).toEqual([
      { id: 1, processed: true },
      { id: 2, processed: true },
      { id: 3, processed: true },
    ]);
  });

  // Test case 10: Propagates batchFn rejection
  it('10. should propagate an error thrown by batchFn', async () => {
    // Arrange
    const batchFn = jest.fn().mockRejectedValue(new Error('batch failed'));

    // Act & Assert
    await expect(asyncBatch([1, 2, 3], batchFn, 2)).rejects.toThrow(
      'batch failed',
    );
  });

  // Test case 11: delayMs option inserts delay between batches
  it('11. should apply delayMs between batches and not after the final batch', async () => {
    // Arrange
    const callTimes: number[] = [];
    const start = Date.now();
    const batchFn = jest.fn().mockImplementation(async (b: number[]) => {
      callTimes.push(Date.now() - start);
      return await Promise.resolve(b);
    });

    // Act
    await asyncBatch([1, 2, 3, 4], batchFn, 2, { delayMs: 30 });

    // Assert — second batch should start at least 30ms after the first
    expect(callTimes).toHaveLength(2);
    expect(callTimes[1] - callTimes[0]).toBeGreaterThanOrEqual(25);
  });

  // Test case 12: Large input performance without delayMs
  it('12. should handle large arrays efficiently', async () => {
    // Arrange
    const items = Array.from({ length: 1000 }, (_, i) => i);
    const batchFn = jest
      .fn()
      .mockImplementation(async (b: number[]) => await Promise.resolve(b));

    // Act
    const start = performance.now();
    const result = await asyncBatch(items, batchFn, 100);
    const end = performance.now();

    // Assert
    expect(result).toHaveLength(1000);
    expect(end - start).toBeLessThan(1000);
    expect(batchFn).toHaveBeenCalledTimes(10);
  });

  // Test case 16: Throws Error when batchSize is zero or negative
  it('16. should throw Error when batchSize is not a positive integer', () => {
    expect(() =>
      asyncBatch([1], async (b) => await Promise.resolve(b), 0),
    ).toThrow('batchSize must be a positive integer, got 0');
    expect(() =>
      asyncBatch([1], async (b) => await Promise.resolve(b), -5),
    ).toThrow('batchSize must be a positive integer, got -5');
    expect(() =>
      asyncBatch([1], async (b) => await Promise.resolve(b), 1.5),
    ).toThrow('batchSize must be a positive integer, got 1.5');
  });

  // Test case 18: Throws Error when delayMs is negative
  it('18. should throw Error when delayMs is negative', () => {
    expect(() =>
      asyncBatch([1, 2], async (b) => await Promise.resolve(b), 1, {
        delayMs: -1,
      }),
    ).toThrow(Error);
  });
});
