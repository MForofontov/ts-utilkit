import { debounce } from '../src/debounce';

describe('debounce', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // Test case 1: Execute after delay
  it('1. should execute after the specified delay', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 50);
    debounced();
    expect(fn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  // Test case 2: Execute only once for rapid calls
  it('2. should execute only once for rapid calls', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 50);
    debounced();
    debounced();
    jest.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  // Test case 3: Use latest arguments
  it('3. should use the latest arguments', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 50);
    debounced('first');
    debounced('second');
    jest.advanceTimersByTime(50);
    expect(fn).toHaveBeenCalledWith('second');
  });

  // Test case 4: Preserve context
  it('4. should preserve the context', () => {
    const obj = {
      count: 0,
      inc(this: { count: number }, amount: number) {
        this.count += amount;
      },
    };
    const debounced = debounce(obj.inc.bind(obj), 50);
    debounced(2);
    jest.advanceTimersByTime(50);
    expect(obj.count).toBe(2);
  });

  // Test case 5: Reset timer on successive calls
  it('5. should reset the timer on successive calls', () => {
    const fn = jest.fn();
    const debounced = debounce(fn, 50);
    debounced();
    jest.advanceTimersByTime(30);
    debounced();
    jest.advanceTimersByTime(30);
    expect(fn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(20);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
