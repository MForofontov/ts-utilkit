import { collectResults, ok, err, type Result } from '../src';

describe('collectResults', () => {
  it('1. collects values in order, retaining their references', () => {
    const value = {};
    const input: Result<object, Error>[] = [ok(value), ok({})];
    Object.freeze(input);
    const result = collectResults(input);
    expect(result).toEqual(ok([value, {}]));
    if (result.ok) expect(result.value[0]).toBe(value);
  });
  it('2. returns the first error without inspecting later results', () => {
    const error = { reason: 'first' };
    const input: Result<number, object>[] = [ok(1), err(error)];
    Object.defineProperty(input, '2', {
      get: () => {
        throw new Error('must not inspect later elements');
      },
    });
    const result = collectResults(input);
    expect(result).toEqual(err(error));
    if (!result.ok) expect(result.error).toBe(error);
  });
  it('3. supports empty results and undefined values or errors', () => {
    expect(collectResults([])).toEqual(ok([]));
    expect(collectResults([ok(undefined)])).toEqual(ok([undefined]));
    expect(collectResults([err(undefined)])).toEqual(err(undefined));
  });
  it('4. validates the collection type', () => {
    expect(() =>
      collectResults(null as unknown as Result<number, Error>[]),
    ).toThrow(TypeError);
  });
});
