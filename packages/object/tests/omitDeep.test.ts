import { omitDeep } from '../src';

describe('omitDeep', () => {
  it('1. removes nested keys without changing inputs or unrelated references', () => {
    const shared = { keep: true };
    const input = { user: { name: 'A', token: 'secret' }, shared };
    Object.freeze(input.user);
    Object.freeze(input);
    const result = omitDeep(input, ['user.token']);
    expect(result).toEqual({ user: { name: 'A' }, shared });
    expect(result.user).not.toBe(input.user);
    expect(result.shared).toBe(shared);
    expect(input.user.token).toBe('secret');
  });
  it.each([
    ['user.token', 'user'],
    ['user', 'user.token'],
    ['user.token', 'user.token'],
  ])('2. handles overlapping and duplicate paths: %s', (...paths) => {
    const input = { user: { token: 'secret' }, keep: true };
    const expected = paths.includes('user')
      ? { keep: true }
      : { user: {}, keep: true };
    expect(omitDeep(input, paths)).toEqual(expected);
  });
  it('3. ignores empty/missing paths and primitive or atomic intermediate values', () => {
    const input = {
      count: 1,
      missing: null,
      list: [{ token: 'secret' }],
      date: new Date(),
    };
    expect(
      omitDeep(input, [
        '',
        'unknown.key',
        'count.value',
        'missing.value',
        'list.0.token',
        'date.value',
      ]),
    ).toBe(input);
    expect(omitDeep(input, [])).toBe(input);
    expect(omitDeep(input, ['list'])).toEqual({
      count: 1,
      missing: null,
      date: input.date,
    });
  });
  it('4. preserves null prototypes, symbols, and nonconfigurable own descriptors', () => {
    const symbol = Symbol('id');
    const input = Object.create(null) as Record<string | symbol, unknown>;
    Object.defineProperty(input, 'user', {
      value: Object.freeze({ token: 'secret', name: 'A' }),
      enumerable: false,
    });
    Object.defineProperty(input, symbol, { value: 123 });
    const result = omitDeep(input, ['user.token']);
    expect(Object.getPrototypeOf(result)).toBeNull();
    expect(Object.getOwnPropertyDescriptor(result, 'user')).toEqual({
      value: { name: 'A' },
      writable: false,
      configurable: false,
      enumerable: false,
    });
    expect(Object.getOwnPropertyDescriptor(result, symbol)).toEqual(
      Object.getOwnPropertyDescriptor(input, symbol),
    );
    expect(omitDeep(input, ['user'])).not.toHaveProperty('user');
  });
  it('5. never invokes getters or traverses inherited prototype properties', () => {
    const getter = jest.fn(() => ({ token: 'secret' }));
    const input: Record<string, unknown> = {};
    Object.defineProperty(input, 'user', { get: getter, enumerable: true });
    expect(
      omitDeep(input, [
        'user.token',
        '__proto__.toString',
        'constructor.prototype.toString',
      ]),
    ).toBe(input);
    expect(omitDeep(input, ['user'])).toEqual({});
    expect(getter).not.toHaveBeenCalled();
    expect(Object.hasOwn(Object.prototype, 'toString')).toBe(true);
  });
  it('6. handles own prototype-like keys as data and finite paths through cycles', () => {
    const input = Object.fromEntries([
      ['__proto__', { token: 'secret', keep: true }],
    ]);
    const result = omitDeep(input, ['__proto__.token']);
    expect(Object.hasOwn(result, '__proto__')).toBe(true);
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect(result.__proto__).toEqual({ keep: true });
    const cyclic: Record<string, unknown> = { token: 'secret' };
    cyclic.self = cyclic;
    const omitted = omitDeep(cyclic, ['self.token']);
    expect(omitted.token).toBe('secret');
    expect(omitted.self).not.toBe(cyclic);
    expect(Object.hasOwn(omitted.self as object, 'token')).toBe(false);
    expect(cyclic.token).toBe('secret');
  });
  it('7. validates inputs and unsupported path syntax', () => {
    for (const value of [null, [], new Date(), 1])
      expect(() =>
        omitDeep(value as unknown as Record<string, unknown>, []),
      ).toThrow(TypeError);
    expect(() => omitDeep({}, null as unknown as string[])).toThrow(TypeError);
    expect(() => omitDeep({}, [1 as unknown as string])).toThrow(TypeError);
    for (const path of ['a..b', '.a', 'a.', 'items[0]'])
      expect(() => omitDeep({}, [path])).toThrow(RangeError);
  });
});
