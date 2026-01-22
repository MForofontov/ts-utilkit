import { throttle } from '../src/throttle';

describe('throttle', () => {
  it('1. should preserve the context for immediate and delayed calls', (done) => {
    const obj = {
      count: 0,
      increment: function () {
        this.count++;
      },
    };

    const throttledIncrement = throttle(obj.increment.bind(obj), 20);

    throttledIncrement();
    throttledIncrement();

    setTimeout(() => {
      expect(obj.count).toBe(2);
      done();
    }, 40);
  });

  // Test case 1: Ensure the function is only called once within the limit
  it('1. should throttle rapid successive calls', (done) => {
    const mockFn = jest.fn();
    const throttled = throttle(mockFn, 30);

    throttled();
    throttled();
    throttled();

    // Only the first call should execute immediately
    expect(mockFn).toHaveBeenCalledTimes(1);

    setTimeout(() => {
      // After the limit, the function should be called a second time
      expect(mockFn).toHaveBeenCalledTimes(2);
      done();
    }, 50);
  });

  // Test case 2: Verify arguments from the last call are used
  it('2. should use the latest arguments for the delayed call', (done) => {
    const received: number[] = [];
    const throttled = throttle((val: number) => received.push(val), 20);

    throttled(1);
    throttled(2);

    setTimeout(() => {
      expect(received).toEqual([1, 2]);
      done();
    }, 40);
  });

  // Test case 3: Allow calls after the wait period has passed
  it('3. should execute again after the limit when called later', (done) => {
    const mockFn = jest.fn();
    const throttled = throttle(mockFn, 20);

    throttled();

    setTimeout(() => {
      throttled();
    }, 30);

    setTimeout(() => {
      expect(mockFn).toHaveBeenCalledTimes(2);
      done();
    }, 60);
  });

  it('3. should throttle immediately after a trailing execution', (done) => {
    const mockFn = jest.fn();
    const throttled = throttle(mockFn, 30);

    throttled();
    throttled();

    setTimeout(() => {
      expect(mockFn).toHaveBeenCalledTimes(2);
      throttled();
      expect(mockFn).toHaveBeenCalledTimes(2);
    }, 40);

    setTimeout(() => {
      expect(mockFn).toHaveBeenCalledTimes(3);
      done();
    }, 80);
  });
});
