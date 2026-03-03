import { deepFreeze } from '../src/deepFreeze';

describe('deepFreeze', () => {
  // Test case 1: Deep freeze a simple object
  it('1. should deep freeze a simple object', () => {
    const obj = { a: 1, b: 2 };
    const frozenObj = deepFreeze(obj);
    expect(Object.isFrozen(frozenObj)).toBe(true);
    expect(() => {
      frozenObj.a = 2;
    }).toThrow();
  });

  // Test case 2: Deep freeze a nested object
  it('2. should deep freeze a nested object', () => {
    const obj = { a: 1, b: { c: 2, d: 3 } };
    const frozenObj = deepFreeze(obj);
    expect(Object.isFrozen(frozenObj)).toBe(true);
    expect(Object.isFrozen(frozenObj.b)).toBe(true);
    expect(() => {
      frozenObj.b.c = 3;
    }).toThrow();
  });

  // Test case 3: Deep freeze an array
  it('3. should deep freeze an array', () => {
    const arr = [1, 2, { a: 3 }];
    const frozenArr = deepFreeze(arr);
    expect(Object.isFrozen(frozenArr)).toBe(true);
    expect(Object.isFrozen(frozenArr[2])).toBe(true);
    expect(() => {
      frozenArr[0] = 4;
    }).toThrow();
  });

  // Test case 4: Deep freeze an object with various data types
  it('4. should deep freeze an object with various data types', () => {
    const obj = {
      a: 1,
      b: 'string',
      c: true,
      d: null,
      e: undefined,
      f: [1, 2, 3],
      g: { h: 4 },
    };
    const frozenObj = deepFreeze(obj);
    expect(Object.isFrozen(frozenObj)).toBe(true);
    expect(Object.isFrozen(frozenObj.f)).toBe(true);
    expect(Object.isFrozen(frozenObj.g)).toBe(true);
    expect(() => {
      frozenObj.a = 2;
    }).toThrow();
  });

});
