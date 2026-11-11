import { parseINI } from '../src/parseINI';
import { parseEnvFile } from '../src/parseEnvFile';
import { parseKeyValue } from '../src/parseKeyValue';

describe('parser prototype safety', () => {
  afterEach(() => {
    Reflect.deleteProperty(Object.prototype, '__iniRegression');
    Reflect.deleteProperty(Object, '__iniConstructorRegression');
  });

  it('3. retains prototype-like keys and consumes complete custom delimiters', () => {
    const result = parseKeyValue('__proto__:=value;key:=other', ';', ':=');
    expect(Object.hasOwn(result, '__proto__')).toBe(true);
    expect(result.__proto__).toBe('value');
    expect(result.key).toBe('other');
  });

  it('1. parses prototype-like INI sections and keys as own data', () => {
    const result = parseINI(
      '[__proto__]\n__iniRegression=yes\n[constructor]\n__iniConstructorRegression=value',
    );
    expect(Object.hasOwn(Object.prototype, '__iniRegression')).toBe(false);
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect(Object.hasOwn(result, '__proto__')).toBe(true);
    expect(result.__proto__).toEqual({ __iniRegression: 'yes' });
    expect(result.constructor).toEqual({ __iniConstructorRegression: 'value' });
    expect(
      Object.hasOwn(parseINI('__proto__=value')._global, '__proto__'),
    ).toBe(true);
  });

  it('2. retains __proto__ environment variables and ignores inherited expansions', () => {
    const result = parseEnvFile('__proto__=value\nCOPY=$constructor', true);
    expect(Object.hasOwn(result, '__proto__')).toBe(true);
    expect(result.__proto__).toBe('value');
    expect(result.COPY).toBe('');
  });
});
