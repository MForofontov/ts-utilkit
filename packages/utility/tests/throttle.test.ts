import { throttle } from '../src/throttle';

describe('throttle', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(1000);
  });
  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it('1. should preserve the context for immediate and delayed calls', () => {
    const obj = {
      count: 0,
      increment: function () {
        this.count++;
      },
    };

    const throttledIncrement = throttle(obj.increment.bind(obj), 20);

    throttledIncrement();
    throttledIncrement();

    expect(obj.count).toBe(1);
    jest.advanceTimersByTime(20);
    expect(obj.count).toBe(2);
  });

  // Test case 1: Ensure the function is only called once within the limit
  it('1. should throttle rapid successive calls', () => {
    const mockFn = jest.fn();
    const throttled = throttle(mockFn, 30);

    throttled();
    throttled();
    throttled();

    // Only the first call should execute immediately
    expect(mockFn).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(29);
    expect(mockFn).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1);
    expect(mockFn).toHaveBeenCalledTimes(2);
  });

  // Test case 2: Verify arguments from the last call are used
  it('2. should use the latest arguments for the delayed call', () => {
    const received: number[] = [];
    const throttled = throttle((val: number) => received.push(val), 20);

    throttled(1);
    throttled(2);

    expect(received).toEqual([1]);
    jest.advanceTimersByTime(20);
    expect(received).toEqual([1, 2]);
  });

  // Test case 3: Allow calls after the wait period has passed
  it('3. should execute again after the limit when called later', () => {
    const mockFn = jest.fn();
    const throttled = throttle(mockFn, 20);

    throttled();

    jest.advanceTimersByTime(30);
    throttled();
    expect(mockFn).toHaveBeenCalledTimes(2);
    expect(jest.getTimerCount()).toBe(0);
  });

  it('3. should throttle immediately after a trailing execution', () => {
    const mockFn = jest.fn();
    const throttled = throttle(mockFn, 30);

    throttled();
    throttled();

    jest.advanceTimersByTime(40);
    expect(mockFn).toHaveBeenCalledTimes(2);
    throttled();
    expect(mockFn).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(19);
    expect(mockFn).toHaveBeenCalledTimes(2);
    jest.advanceTimersByTime(1);
    expect(mockFn).toHaveBeenCalledTimes(3);
    expect(jest.getTimerCount()).toBe(0);
  });
});

describe('deterministic throttle scheduling', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(0);
  });
  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });
  it('throttles calls when the first timestamp is zero', () => {
    const fn = jest.fn();
    const throttled = throttle(fn, 100);
    throttled('first');
    throttled('latest');
    expect(fn.mock.calls).toEqual([['first']]);
    jest.advanceTimersByTime(100);
    expect(fn.mock.calls).toEqual([['first'], ['latest']]);
    expect(jest.getTimerCount()).toBe(0);
  });
  it('clears an obsolete trailing timer when a newer call can execute immediately', () => {
    jest.setSystemTime(1000);
    const fn = jest.fn();
    const throttled = throttle(fn, 100);
    throttled('first');
    throttled('obsolete');
    jest.setSystemTime(1200);
    throttled('newest');
    jest.advanceTimersByTime(100);
    expect(fn.mock.calls).toEqual([['first'], ['newest']]);
    expect(jest.getTimerCount()).toBe(0);
  });
  it('applies the limit to reentrant leading and trailing callbacks', () => {
    const calls: number[] = [];
    const throttled = throttle((n: number) => {
      calls.push(n);
      if (n < 3) throttled(n + 1);
    }, 100);
    throttled(1);
    expect(calls).toEqual([1]);
    jest.advanceTimersByTime(100);
    expect(calls).toEqual([1, 2]);
    jest.advanceTimersByTime(100);
    expect(calls).toEqual([1, 2, 3]);
    expect(jest.getTimerCount()).toBe(0);
  });
});

it.each([-1, NaN])('rejects invalid throttle limit %s', (limit) => {
  expect(() => throttle(() => undefined, limit)).toThrow('limit');
});
it('preserves the latest receiver for trailing work and supports zero delay', () => {
  jest.useFakeTimers();
  jest.setSystemTime(1000);
  try {
    const seen: string[] = [];
    const fn = throttle(function (this: { id: string }, value: string) {
      seen.push(this.id + value);
    }, 10);
    fn.call({ id: 'first' }, 'A');
    fn.call({ id: 'last' }, 'B');
    jest.advanceTimersByTime(10);
    expect(seen).toEqual(['firstA', 'lastB']);
    const immediate = jest.fn();
    const zero = throttle(immediate, 0);
    zero();
    zero();
    expect(immediate).toHaveBeenCalledTimes(2);
    expect(jest.getTimerCount()).toBe(0);
  } finally {
    jest.clearAllTimers();
    jest.useRealTimers();
  }
});
