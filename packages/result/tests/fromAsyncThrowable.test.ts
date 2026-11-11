import { fromAsyncThrowable, type Result } from '../src';

describe('fromAsyncThrowable', () => {
  it('1. wraps synchronous and asynchronous values with inferred types', async () => {
    const sync: Promise<Result<number, unknown>> = fromAsyncThrowable(() => 42);
    const asyncValue: Promise<Result<string, unknown>> = fromAsyncThrowable(
      () => Promise.resolve('value'),
    );
    expect(await sync).toEqual({ ok: true, value: 42 });
    expect(await asyncValue).toEqual({ ok: true, value: 'value' });
    expect(await fromAsyncThrowable(() => undefined)).toEqual({
      ok: true,
      value: undefined,
    });
  });

  it('2. preserves the identity of successful objects', async () => {
    const value = { id: 1 };
    const result = await fromAsyncThrowable(() => Promise.resolve(value));
    expect(result.ok && result.value).toBe(value);
  });

  it.each([new Error('failed'), undefined, null, 'rejected', 0])(
    '3. preserves arbitrary thrown and rejected values (%s)',
    async (reason) => {
      const thrown = await fromAsyncThrowable(() => {
        // eslint-disable-next-line @typescript-eslint/only-throw-error -- Verify arbitrary thrown values are retained.
        throw reason;
      });
      // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors -- Verify arbitrary rejection values are retained.
      const rejected = await fromAsyncThrowable(() => Promise.reject(reason));
      expect(thrown.ok).toBe(false);
      expect(rejected.ok).toBe(false);
      if (!thrown.ok) expect(thrown.error).toBe(reason);
      if (!rejected.ok) expect(rejected.error).toBe(reason);
    },
  );

  it('4. assimilates thenables and captures throwing then accessors', async () => {
    const thenable = { then: Promise.resolve(7).then.bind(Promise.resolve(7)) };
    expect(await fromAsyncThrowable(() => thenable)).toEqual({
      ok: true,
      value: 7,
    });
    const error = new Error('then accessor');
    const broken = Object.defineProperty({}, 'then', {
      get() {
        throw error;
      },
    }) as PromiseLike<number>;
    expect(await fromAsyncThrowable(() => broken)).toEqual({
      ok: false,
      error,
    });
  });

  it('5. invokes the callback exactly once per call', async () => {
    const fn = jest.fn(() => Promise.resolve(1));
    await fromAsyncThrowable(fn);
    expect(fn).toHaveBeenCalledTimes(1);
  });
});
