import { delay } from '../src/delay';

describe('delay', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // Test case 1: Resolve after specified delay
  it('1. should resolve after the specified delay', async () => {
    const spy = jest.fn();
    const promise = delay(50).then(spy);
    jest.advanceTimersByTime(50);
    await promise;
    expect(spy).toHaveBeenCalled();
  });

  // Test case 2: Resolve immediately for zero delay
  it('2. should resolve immediately for zero delay', async () => {
    const spy = jest.fn();
    const promise = delay(0).then(spy);
    jest.runAllTimers();
    await promise;
    expect(spy).toHaveBeenCalled();
  });

  // Test case 3: Work with async/await
  it('3. should work with async/await', async () => {
    const spy = jest.fn();
    const asyncFunc = async () => {
      await delay(30);
      spy();
    };
    const promise = asyncFunc();
    jest.advanceTimersByTime(30);
    await promise;
    expect(spy).toHaveBeenCalled();
  });

  // Test case 4: Multiple delays resolve independently
  it('4. should allow multiple delays to resolve independently', async () => {
    const spy1 = jest.fn();
    const spy2 = jest.fn();
    const p1 = delay(20).then(spy1);
    const p2 = delay(40).then(spy2);
    jest.advanceTimersByTime(20);
    await p1;
    expect(spy1).toHaveBeenCalled();
    expect(spy2).not.toHaveBeenCalled();
    jest.advanceTimersByTime(20);
    await p2;
    expect(spy2).toHaveBeenCalled();
  });

  // Test case 5: Should not resolve before time
  it('5. should not resolve before the specified time', () => {
    const spy = jest.fn();
    void delay(50).then(spy);
    jest.advanceTimersByTime(30);
    expect(spy).not.toHaveBeenCalled();
  });
});
