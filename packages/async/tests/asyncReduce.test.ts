import { asyncReduce } from '../src';

describe('asyncReduce', () => {
  it('1. accumulates in order with original indices and different accumulator types', async () => {
    const items = [1, 2, 3];
    Object.freeze(items);
    const reducer = jest.fn((acc: string, item: number, index: number) =>
      Promise.resolve(`${acc}${index}:${item};`),
    );
    expect(await asyncReduce(items, reducer, '')).toBe('0:1;1:2;2:3;');
    expect(reducer).toHaveBeenCalledTimes(3);
  });
  it('2. awaits each step before starting the next', async () => {
    let release!: (n: number) => void;
    const reducer = jest.fn((acc: number, item: number) =>
      item === 1
        ? new Promise<number>((resolve) => {
            release = resolve;
          })
        : Promise.resolve(acc + item),
    );
    const promise = asyncReduce([1, 2], reducer, 0);
    expect(reducer).toHaveBeenCalledTimes(1);
    release(10);
    expect(await promise).toBe(12);
    expect(reducer.mock.calls[1]).toEqual([10, 2, 1]);
  });
  it('3. returns the same initial value for empty input and visits sparse slots', async () => {
    const initial = {};
    expect(await asyncReduce([], () => Promise.resolve(initial), initial)).toBe(
      initial,
    );
    expect(
      await asyncReduce(
        new Array<undefined>(2),
        (acc, item) => Promise.resolve(acc + String(item)),
        '',
      ),
    ).toBe('undefinedundefined');
  });
  it('4. stops after rejections and synchronous throws, preserving their reasons', async () => {
    const reason = new Error('failed');
    const rejected = jest.fn(() => Promise.reject(reason));
    await expect(asyncReduce([1, 2], rejected, 0)).rejects.toBe(reason);
    expect(rejected).toHaveBeenCalledTimes(1);
    await expect(
      asyncReduce(
        [1],
        () => {
          throw reason;
        },
        0,
      ),
    ).rejects.toBe(reason);
  });
  it('5. validates arguments synchronously', () => {
    expect(() =>
      asyncReduce(null as unknown as number[], () => Promise.resolve(0), 0),
    ).toThrow(TypeError);
    expect(() =>
      asyncReduce([], null as unknown as () => Promise<number>, 0),
    ).toThrow(TypeError);
  });
});
