/**
 * Interface for spy call record.
 */
export interface SpyCall {
  args: unknown[];
  result: unknown;
  error?: Error;
}

/**
 * Spy function with call tracking capabilities.
 */
export type SpyFunction<T extends (...args: unknown[]) => unknown> = T & {
  calls: SpyCall[];
  callCount: number;
  reset: () => void;
};

/**
 * Creates a spy function for testing callbacks.
 * Tracks calls, arguments, and results.
 *
 * @template T - The function signature to spy on.
 * @param implementation - Optional implementation for the spy.
 * @returns Spy function with tracking capabilities.
 *
 * @example
 * const callback = createSpy((x: number) => x * 2);
 * myFunction(callback);
 * expect(callback.calls.length).toBe(3);
 * expect(callback.calls[0].args).toEqual([5]);
 *
 * @example
 * // Track callback calls without implementation
 * const spy = createSpy<(val: string) => void>();
 * processItems(['a', 'b', 'c'], spy);
 * expect(spy.callCount).toBe(3);
 * expect(spy.calls[0].args).toEqual(['a']);
 *
 * @complexity Time: O(1) per call, Space: O(n) where n is number of calls
 */
export function createSpy<T extends (...args: unknown[]) => unknown>(
  implementation?: T,
): SpyFunction<T> {
  const calls: SpyCall[] = [];

  const spy = ((...args: unknown[]) => {
    try {
      const result = implementation ? implementation(...args) : undefined;
      calls.push({ args, result });
      return result;
    } catch (error) {
      calls.push({ args, result: undefined, error: error as Error });
      throw error;
    }
  }) as unknown as SpyFunction<T>;

  Object.defineProperty(spy, 'calls', {
    get: () => calls,
    enumerable: true,
  });

  Object.defineProperty(spy, 'callCount', {
    get: () => calls.length,
    enumerable: true,
  });

  spy.reset = () => {
    calls.length = 0;
  };

  return spy;
}
