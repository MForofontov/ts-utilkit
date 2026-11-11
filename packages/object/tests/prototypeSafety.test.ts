import { safeSet } from '../src/safeSet';
import { setNestedValue } from '../src/setNestedValue';
import { fromDotNotation } from '../src/fromDotNotation';
import { unflattenObject } from '../src/unflattenObject';
import { groupByObject } from '../src/groupByObject';
import { deepMerge } from '../src/deepMerge';
import { keyBy } from '../src/keyBy';
import { zipObject } from '../src/zipObject';

describe('prototype-safe object utilities', () => {
  const marker = '__utilkitRegression';

  it('8. preserves existing writable property descriptors', () => {
    const obj = Object.defineProperty({}, '__proto__', {
      value: 1,
      writable: true,
    });
    safeSet(obj, '__proto__', 2);
    expect(Object.getOwnPropertyDescriptor(obj, '__proto__')).toEqual({
      value: 2,
      writable: true,
      configurable: false,
      enumerable: false,
    });
    expect(Object.getPrototypeOf(obj)).toBe(Object.prototype);
  });

  afterEach(() => {
    Reflect.deleteProperty(Object.prototype, marker);
  });

  it.each([safeSet, setNestedValue])(
    '1. setters preserve prototype-like path segments as own data',
    (setter) => {
      const obj: Record<string, unknown> = {};
      setter(obj, `__proto__.${marker}`, true);
      expect(Object.hasOwn(Object.prototype, marker)).toBe(false);
      expect(Object.getPrototypeOf(obj)).toBe(Object.prototype);
      expect(Object.hasOwn(obj, '__proto__')).toBe(true);
      expect(obj.__proto__).toEqual({ [marker]: true });
    },
  );

  it.each([safeSet, setNestedValue])(
    '2. setters do not modify inherited object values',
    (setter) => {
      const inherited = { nested: { value: 1 } };
      const obj = Object.create(inherited) as Record<string, unknown>;
      setter(obj, 'nested.value', 2);
      expect(inherited.nested.value).toBe(1);
      expect(obj.nested).toEqual({ value: 2 });
    },
  );

  it.each([fromDotNotation, unflattenObject])(
    '3. unflatteners retain dangerous keys without modifying prototypes',
    (unflatten) => {
      const obj = unflatten({
        [`__proto__.${marker}`]: true,
        'constructor.prototype.local': 1,
        'items[0].name': 'A',
      });
      expect(Object.hasOwn(Object.prototype, marker)).toBe(false);
      expect(Object.getPrototypeOf(obj)).toBe(Object.prototype);
      expect(Object.hasOwn(obj, '__proto__')).toBe(true);
      expect(obj.constructor).toEqual({ prototype: { local: 1 } });
      expect(obj.items).toEqual([{ name: 'A' }]);
    },
  );

  it('4. groups inherited property names as ordinary keys', () => {
    const items = ['__proto__', 'constructor', 'toString'].map((key) => ({
      key,
    }));
    const grouped = groupByObject(items, 'key');
    for (const item of items) {
      expect(Object.hasOwn(grouped, item.key)).toBe(true);
      expect(grouped[item.key]).toEqual([item]);
    }
    expect(Object.getPrototypeOf(grouped)).toBe(Object.prototype);
  });

  it('5. merges __proto__ as data without changing the result prototype', () => {
    const source = JSON.parse('{"__proto__":{"local":1}}') as object;
    const merged = deepMerge({}, source);
    expect(Object.getPrototypeOf(merged)).toBe(Object.prototype);
    expect(Object.hasOwn(merged, '__proto__')).toBe(true);
  });

  it('6. lookup builders retain __proto__ as an own key', () => {
    const item = { id: '__proto__' };
    const keyed = keyBy([item], 'id');
    const zipped = zipObject(['__proto__'], [item]);
    for (const obj of [keyed, zipped]) {
      expect(Object.getPrototypeOf(obj)).toBe(Object.prototype);
      expect(Object.hasOwn(obj, '__proto__')).toBe(true);
      expect(obj.__proto__).toBe(item);
    }
  });

  it('7. safeSet treats separator-only paths as empty', () => {
    const obj = {};
    safeSet(obj, '...', 1);
    expect(obj).toEqual({});
  });
});
