import { once } from '../src';

describe('once', () => {
  it('1. caches the first successful result and forwards the first receiver and arguments', () => {
    const fn = jest.fn(function (this: { base: number }, amount: number) {
      return { total: this.base + amount };
    });
    const wrapped = once(fn);
    const first = wrapped.call({ base: 10 }, 2);
    expect(wrapped.call({ base: 50 }, 9)).toBe(first);
    expect(first).toEqual({ total: 12 });
    expect(fn).toHaveBeenCalledTimes(1);
  });
  it.each([undefined, null, false, 0, ''])(
    '2. caches successful falsy results: %s',
    (value) => {
      const fn = jest.fn(() => value);
      const wrapped = once(fn);
      expect(wrapped()).toBe(value);
      expect(wrapped()).toBe(value);
      expect(fn).toHaveBeenCalledTimes(1);
    },
  );
  it('3. retries after synchronous throws', () => {
    const fn = jest.fn<string, []>();
    fn.mockImplementationOnce(() => {
      throw new Error('retry');
    }).mockReturnValue('success');
    const wrapped = once(fn);
    expect(wrapped).toThrow('retry');
    expect(wrapped()).toBe('success');
    expect(wrapped()).toBe('success');
    expect(fn).toHaveBeenCalledTimes(2);
  });
  it('4. caches returned promises, including eventual rejections', async () => {
    const error = new Error('async failure');
    const wrapped = once(() => Promise.reject(error));
    const first = wrapped();
    expect(wrapped()).toBe(first);
    await expect(first).rejects.toBe(error);
    expect(wrapped()).toBe(first);
  });
  it('5. rejects reentrant initialization and permits a subsequent retry', () => {
    let recurse = true;
    const wrapped: () => number = once(() => (recurse ? wrapped() : 42));
    expect(wrapped).toThrow('recursively');
    recurse = false;
    expect(wrapped()).toBe(42);
  });
  it('6. validates callbacks', () => {
    expect(() => once(null as unknown as () => number)).toThrow(TypeError);
  });
});
