import { shallowEqual } from '../src/shallowEqual';
import { deepFreeze } from '../src/deepFreeze';
import { unflattenObject } from '../src/unflattenObject';

describe('object boundaries', () => {
  it('3. preserves numeric root keys and containers preceding array indices', () => {
    expect(unflattenObject({ '0': 'A', '1.name': 'B' })).toEqual({
      '0': 'A',
      '1': { name: 'B' },
    });
    expect(unflattenObject({ 'items.name': 'A', 'items[0]': 'B' })).toEqual({
      items: { name: 'A', '0': 'B' },
    });
  });
  it('1. compares own keys even when their values are undefined', () => {
    expect(shallowEqual({ a: undefined }, { b: undefined })).toBe(false);
    expect(shallowEqual({ a: undefined }, { a: undefined })).toBe(true);
  });

  it('2. freezes cycles and symbol-keyed children without recursion overflow', () => {
    const symbol = Symbol('child');
    const object: { self?: object; [symbol]: { value: number } } = {
      [symbol]: { value: 1 },
    };
    object.self = object;
    expect(deepFreeze(object)).toBe(object);
    expect(Object.isFrozen(object[symbol])).toBe(true);
    expect(Object.isFrozen(object)).toBe(true);
  });
});
