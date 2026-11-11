import { unflattenFromSerialization } from '../src/unflattenFromSerialization';
import { sanitizeForSerialization } from '../src/sanitizeForSerialization';
import { handleCircularReferences } from '../src/handleCircularReferences';
import { flattenForSerialization } from '../src/flattenForSerialization';

describe('serialization path safety', () => {
  it('3. preserves prototype-like own keys through serialization transforms', () => {
    const input = Object.fromEntries([['__proto__', 'value']]);
    const results: object[] = [
      sanitizeForSerialization(input) as object,
      handleCircularReferences(input) as object,
      flattenForSerialization(input),
    ];
    for (const result of results) {
      expect(Object.hasOwn(result, '__proto__')).toBe(true);
      expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    }
  });
  afterEach(() => {
    Reflect.deleteProperty(Object.prototype, '__serializationRegression');
    Reflect.deleteProperty(
      Object.prototype,
      '__serializationConstructorRegression',
    );
  });

  it('1. expands prototype-like paths as own data', () => {
    const result = unflattenFromSerialization({
      '__proto__.__serializationRegression': 1,
      'constructor.prototype.__serializationConstructorRegression': 2,
      'items.0': 'A',
    });
    expect(Object.hasOwn(Object.prototype, '__serializationRegression')).toBe(
      false,
    );
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect(Object.hasOwn(result, '__proto__')).toBe(true);
    expect(result.constructor).toEqual({
      prototype: { __serializationConstructorRegression: 2 },
    });
    expect(result.items).toEqual(['A']);
  });

  it('2. replaces primitive path conflicts with containers', () => {
    expect(unflattenFromSerialization({ a: 1, 'a.b': 2 })).toEqual({
      a: { b: 2 },
    });
  });
});
