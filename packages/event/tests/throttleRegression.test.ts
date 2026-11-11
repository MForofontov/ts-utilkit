import { throttleEvent } from '../src/throttleEvent';

describe('throttle scheduling boundaries', () => {
  beforeEach(() => {
    jest.useFakeTimers({ now: 0 });
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  it('1. schedules a single trailing-only call', () => {
    const fn = jest.fn();
    const throttled = throttleEvent(fn, 100, { leading: false });
    throttled('first');
    expect(fn).not.toHaveBeenCalled();
    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledWith('first');
    throttled('next');
    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenLastCalledWith('next');
    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('2. supports a clock starting at zero and cancellation', () => {
    const fn = jest.fn();
    const throttled = throttleEvent(fn, 100);
    throttled('first');
    throttled('second');
    expect(fn).toHaveBeenCalledTimes(1);
    throttled.cancel();
    jest.advanceTimersByTime(100);
    expect(fn).toHaveBeenCalledTimes(1);
    throttled('third');
    expect(fn).toHaveBeenLastCalledWith('third');
  });

  it('3. never invokes handlers with both edges disabled', () => {
    const fn = jest.fn();
    const throttled = throttleEvent(fn, 100, {
      leading: false,
      trailing: false,
    });
    throttled();
    jest.advanceTimersByTime(200);
    throttled();
    expect(fn).not.toHaveBeenCalled();
    expect(jest.getTimerCount()).toBe(0);
  });
});
