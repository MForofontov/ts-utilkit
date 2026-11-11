import { mapToObject } from '../src/mapToObject';

describe('mapToObject prototype keys', () => {
  it('1. creates an own data property for __proto__', () => {
    const value = { local: 1 };
    const result = mapToObject(new Map([['__proto__', value]]));
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect(Object.hasOwn(result, '__proto__')).toBe(true);
    expect(result.__proto__).toBe(value);
  });
});
