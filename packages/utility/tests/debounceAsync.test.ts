import { debounceAsync } from '../src/debounceAsync';

describe('debounceAsync', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // Test case 1: Resolve with function result after delay
  it('1. should resolve with the function result after the delay', async () => {
    const fn = jest.fn((n: number) => Promise.resolve(n * 2));
    const debounced = debounceAsync(fn, 50);
    const promise = debounced(2);
    jest.advanceTimersByTime(50);
    await expect(promise).resolves.toBe(4);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  // Test case 2: Execute only the last call
  it('2. should execute only the last call made before the delay', async () => {
    const fn = jest.fn((n: number) => Promise.resolve(n));
    const debounced = debounceAsync(fn, 50);
    const first = debounced(1);
    const promise = debounced(2);
    jest.advanceTimersByTime(50);
    await expect(first).rejects.toMatchObject({ name: 'AbortError' });
    await expect(promise).resolves.toBe(2);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  // Test case 3: Pass arguments correctly
  it('3. should pass arguments correctly', async () => {
    const fn = jest.fn((a: number, b: number) => Promise.resolve(a + b));
    const debounced = debounceAsync(fn, 50);
    const promise = debounced(1, 2);
    jest.advanceTimersByTime(50);
    await expect(promise).resolves.toBe(3);
  });

  // Test case 4: Work with zero wait time
  it('4. should work with zero wait time', async () => {
    const fn = jest.fn(() => Promise.resolve('done'));
    const debounced = debounceAsync(fn, 0);
    const promise = debounced();
    jest.runAllTimers();
    await expect(promise).resolves.toBe('done');
  });

  // Test case 5: Propagate rejection
  it('5. should propagate rejection from the underlying function', async () => {
    const fn = jest.fn(() => Promise.reject(new Error('Test error')));
    const debounced = debounceAsync(fn, 50);
    const promise = debounced();
    jest.advanceTimersByTime(50);
    await expect(promise).rejects.toThrow('Test error');
  });
});

it.each([new Error('synchronous failure'), 'failure', undefined, null])(
  'rejects synchronous throws (%p) without escaping the timer, and permits a later call',
  async (error) => {
    jest.useFakeTimers();
    try {
      const fn = jest
        .fn<Promise<number>, []>()
        .mockImplementationOnce(() => {
          // eslint-disable-next-line @typescript-eslint/only-throw-error -- Exercise preservation of arbitrary JavaScript thrown values
          throw error;
        })
        .mockResolvedValue(42);
      const debounced = debounceAsync(fn, 10);
      const first = debounced();
      const rejection = expect(first).rejects.toBe(error);
      expect(() => jest.advanceTimersByTime(10)).not.toThrow();
      await rejection;
      const second = debounced();
      jest.advanceTimersByTime(10);
      await expect(second).resolves.toBe(42);
      expect(jest.getTimerCount()).toBe(0);
    } finally {
      jest.useRealTimers();
    }
  },
);

it.each([-1, NaN])(
  'rejects an invalid wait of %s before scheduling a timer',
  (wait) => {
    expect(() => debounceAsync(() => Promise.resolve(1), wait)).toThrow(
      'wait must be a non-negative number',
    );
  },
);
