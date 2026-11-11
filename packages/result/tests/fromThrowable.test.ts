import { fromThrowable } from '../src/fromThrowable';
import { isErr } from '../src/isErr';
import { isOk } from '../src/isOk';

describe('fromThrowable', () => {
  it('1. should wrap successful return values as Ok', () => {
    const result = fromThrowable(() => 42);
    expect(isOk(result)).toBe(true);
    if (isOk(result)) {
      expect(result.value).toBe(42);
    }
  });

  it('2. should wrap thrown errors as Err', () => {
    const result = fromThrowable(() => {
      throw new Error('nope');
    });
    expect(isErr(result)).toBe(true);
    if (isErr(result)) {
      expect(result.error).toBeInstanceOf(Error);
    }
  });

  it('3. should capture SyntaxError from JSON.parse', () => {
    const result = fromThrowable(() => JSON.parse('bad'));
    expect(isErr(result)).toBe(true);
  });
});
