import { asyncMapSettled } from '../src';

describe('asyncMapSettled', () => {
  it('1. collects fulfilled values, synchronous throws, and original rejection reasons', async () => {
    const reason = { failure: true };
    const items = [0, 1, 2, 3];
    Object.freeze(items);
    const result = await asyncMapSettled(
      items,
      (item, index) => {
        // eslint-disable-next-line @typescript-eslint/only-throw-error -- Verify arbitrary synchronous failure reasons are retained.
        if (item === 1) throw reason;
        // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors -- Verify non-Error promise rejection reasons are retained.
        if (item === 2) return Promise.reject('rejected');
        return Promise.resolve(index + 10);
      },
      2,
    );
    expect(result).toEqual([
      { status: 'fulfilled', value: 10 },
      { status: 'rejected', reason },
      { status: 'rejected', reason: 'rejected' },
      { status: 'fulfilled', value: 13 },
    ]);
    expect((result[1] as PromiseRejectedResult).reason).toBe(reason);
  });
  it('2. preserves batching and order when completions arrive out of order', async () => {
    const started: number[] = [];
    const finish: Array<(value: number) => void> = [];
    let notifyThird!: () => void;
    const thirdStarted = new Promise<void>((resolve) => {
      notifyThird = resolve;
    });
    const promise = asyncMapSettled(
      [0, 1, 2],
      (item) => {
        started.push(item);
        if (item === 2) notifyThird();
        return new Promise<number>((resolve) => {
          finish[item] = resolve;
        });
      },
      2,
    );
    expect(started).toEqual([0, 1]);
    finish[1](11);
    await Promise.resolve();
    expect(started).toEqual([0, 1]);
    finish[0](10);
    await thirdStarted;
    expect(started).toEqual([0, 1, 2]);
    finish[2](12);
    expect(await promise).toEqual(
      [10, 11, 12].map((value) => ({ status: 'fulfilled', value })),
    );
  });
  it('3. supports default and unlimited concurrency and empty arrays', async () => {
    expect(await asyncMapSettled([1], (n) => Promise.resolve(n))).toEqual([
      { status: 'fulfilled', value: 1 },
    ]);
    expect(
      await asyncMapSettled([], (n) => Promise.resolve(n), Infinity),
    ).toEqual([]);
    expect(
      await asyncMapSettled([1, 2], (n) => Promise.resolve(n), Infinity),
    ).toHaveLength(2);
  });
  it('4. gives every sparse slot a settled result for every batch size', async () => {
    const items = new Array<undefined>(2);
    for (const concurrency of [1, Infinity]) {
      expect(
        await asyncMapSettled(
          items,
          (value) => Promise.resolve(value),
          concurrency,
        ),
      ).toEqual([
        { status: 'fulfilled', value: undefined },
        { status: 'fulfilled', value: undefined },
      ]);
    }
  });
  it('5. validates arguments before starting work', () => {
    const mapper = jest.fn(() => Promise.resolve(1));
    expect(() => asyncMapSettled(null as unknown as number[], mapper)).toThrow(
      TypeError,
    );
    expect(() =>
      asyncMapSettled([], null as unknown as () => Promise<number>),
    ).toThrow(TypeError);
    for (const limit of [0, -1, NaN, 1.5, -Infinity])
      expect(() => asyncMapSettled([1], mapper, limit)).toThrow(Error);
    expect(mapper).not.toHaveBeenCalled();
  });
});
