import { asyncMap } from '../src/asyncMap';
import { asyncParallel } from '../src/asyncParallel';

describe('async concurrency validation', () => {
  it('1. preserves Infinity as unlimited concurrency and input ordering', async () => {
    const mapper = (n: number) => Promise.resolve(n * 2);
    expect(await asyncMap([1, 2, 3], mapper, Infinity)).toEqual([2, 4, 6]);
    expect(
      await asyncParallel([() => mapper(1), () => mapper(2)], Infinity),
    ).toEqual([2, 4]);
  });

  it('2. retains batch scheduling when tasks resolve out of order', async () => {
    const releases: Array<() => void> = [];
    const started: number[] = [];
    const promise = asyncMap(
      [0, 1, 2],
      (n) => {
        started.push(n);
        return new Promise<number>((resolve) => {
          releases[n] = () => resolve(n);
        });
      },
      2,
    );
    expect(started).toEqual([0, 1]);
    releases[1]();
    await Promise.resolve();
    expect(started).toEqual([0, 1]);
    releases[0]();
    // Allow the batch's map, Promise.all, and loop continuations to run.
    for (let i = 0; i < 5; i++) await Promise.resolve();
    expect(started).toEqual([0, 1, 2]);
    releases[2]();
    expect(await promise).toEqual([0, 1, 2]);
  });

  it.each([NaN, 1.5, -Infinity])(
    '3. rejects invalid concurrency %s before invoking callbacks',
    (limit) => {
      const task = jest.fn(() => Promise.resolve(1));
      expect(() => asyncMap([1], task, limit)).toThrow(Error);
      expect(() => asyncParallel([task], limit)).toThrow(Error);
      expect(task).not.toHaveBeenCalled();
    },
  );
});
