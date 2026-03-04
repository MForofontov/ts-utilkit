import { parseEnvEnum } from '../src/parseEnvEnum';

describe('parseEnvEnum', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('1. should return the value when it is in the allowed list', () => {
    process.env.NODE_ENV = 'production';
    expect(
      parseEnvEnum('NODE_ENV', ['development', 'production', 'test']),
    ).toBe('production');
  });

  it('2. should return the default when the variable is not set', () => {
    delete process.env.LOG_LEVEL;
    expect(
      parseEnvEnum('LOG_LEVEL', ['debug', 'info', 'warn', 'error'], 'info'),
    ).toBe('info');
  });

  it('3. should return the default when the variable is an empty string', () => {
    process.env.LOG_LEVEL = '';
    expect(
      parseEnvEnum('LOG_LEVEL', ['debug', 'info', 'warn', 'error'], 'info'),
    ).toBe('info');
  });

  it('4. should return a single-item allowed list value correctly', () => {
    process.env.MODE = 'only';
    expect(parseEnvEnum('MODE', ['only'])).toBe('only');
  });

  it('5. should work with numeric-string enum values', () => {
    process.env.TIER = '2';
    expect(parseEnvEnum('TIER', ['1', '2', '3'])).toBe('2');
  });

  it('6. should work with mixed-case enum values (case-sensitive)', () => {
    process.env.ENV = 'Dev';
    expect(parseEnvEnum('ENV', ['Dev', 'Prod', 'Test'])).toBe('Dev');
  });

  it('7. should accept the default when variable is unset and default is the first element', () => {
    delete process.env.NODE_ENV;
    expect(
      parseEnvEnum(
        'NODE_ENV',
        ['development', 'production', 'test'],
        'development',
      ),
    ).toBe('development');
  });

  it('8. should accept the default when variable is unset and default is the last element', () => {
    delete process.env.NODE_ENV;
    expect(
      parseEnvEnum('NODE_ENV', ['development', 'production', 'test'], 'test'),
    ).toBe('test');
  });

  it('9. should throw Error when variable is set to a value not in the allowed list', () => {
    process.env.LOG_LEVEL = 'verbose';
    expect(() =>
      parseEnvEnum('LOG_LEVEL', ['debug', 'info', 'warn', 'error']),
    ).toThrow(Error);
    expect(() =>
      parseEnvEnum('LOG_LEVEL', ['debug', 'info', 'warn', 'error']),
    ).toThrow(
      "Environment variable 'LOG_LEVEL' has invalid value 'verbose'. Allowed: debug, info, warn, error",
    );
  });

  it('10. should throw Error when variable is not set and no default is provided', () => {
    delete process.env.NODE_ENV;
    expect(() =>
      parseEnvEnum('NODE_ENV', ['development', 'production', 'test']),
    ).toThrow(Error);
    expect(() =>
      parseEnvEnum('NODE_ENV', ['development', 'production', 'test']),
    ).toThrow("Required environment variable 'NODE_ENV' is not set");
  });

  it('11. should throw Error for comparison being case-sensitive', () => {
    process.env.NODE_ENV = 'Production'; // capital P — not in list
    expect(() =>
      parseEnvEnum('NODE_ENV', ['development', 'production', 'test']),
    ).toThrow("has invalid value 'Production'");
  });

  it('13. should throw Error when key is empty', () => {
    expect(() => parseEnvEnum('', ['a', 'b'])).toThrow(Error);
    expect(() => parseEnvEnum('', ['a', 'b'])).toThrow(
      'key cannot be an empty string',
    );
  });
});
