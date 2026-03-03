import { requireEnvAll } from '../src/requireEnvAll';

describe('requireEnvAll', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('1. should return a record with all values when all variables are set', () => {
    process.env.DB_URL = 'postgres://localhost/db';
    process.env.JWT_SECRET = 'supersecret';
    process.env.API_KEY = 'key123';

    const result = requireEnvAll(['DB_URL', 'JWT_SECRET', 'API_KEY']);

    expect(result).toEqual({
      DB_URL: 'postgres://localhost/db',
      JWT_SECRET: 'supersecret',
      API_KEY: 'key123',
    });
  });

  it('2. should work with a single key', () => {
    process.env.SINGLE_VAR = 'only_one';
    const result = requireEnvAll(['SINGLE_VAR']);
    expect(result).toEqual({ SINGLE_VAR: 'only_one' });
  });

  it('3. should return string values (not undefined)', () => {
    process.env.MY_VAR = '42';
    const result = requireEnvAll(['MY_VAR']);
    expect(typeof result['MY_VAR']).toBe('string');
    expect(result['MY_VAR']).toBe('42');
  });

  it('4. should include variable set to "0" (truthy presence)', () => {
    process.env.PORT = '0';
    // Port 0 is not a valid port, but for requireEnvAll it is a non-empty value
    const result = requireEnvAll(['PORT']);
    expect(result['PORT']).toBe('0');
  });

  it('5. should include variable set to "false"', () => {
    process.env.FEATURE_FLAG = 'false';
    const result = requireEnvAll(['FEATURE_FLAG']);
    expect(result['FEATURE_FLAG']).toBe('false');
  });

  it('6. should include all keys as own properties of the returned record', () => {
    process.env.A = 'alpha';
    process.env.B = 'beta';
    const result = requireEnvAll(['A', 'B']);
    expect(Object.keys(result).sort()).toEqual(['A', 'B']);
  });

  it('7. should not include extra keys beyond those requested', () => {
    process.env.EXTRA = 'extra_value';
    process.env.WANTED = 'wanted_value';
    const result = requireEnvAll(['WANTED']);
    expect(Object.keys(result)).toEqual(['WANTED']);
    expect(result).not.toHaveProperty('EXTRA');
  });

  it('8. should throw Error listing the single missing variable', () => {
    delete process.env.MISSING_ONE;
    process.env.PRESENT = 'ok';

    expect(() => requireEnvAll(['PRESENT', 'MISSING_ONE'])).toThrow(Error);
    expect(() => requireEnvAll(['PRESENT', 'MISSING_ONE'])).toThrow(
      'Missing required environment variables: MISSING_ONE',
    );
  });

  it('9. should throw Error listing all missing variables', () => {
    delete process.env.DB_URL;
    delete process.env.JWT_SECRET;
    process.env.PORT = '3000';

    expect(() => requireEnvAll(['DB_URL', 'JWT_SECRET', 'PORT'])).toThrow(Error);
    expect(() => requireEnvAll(['DB_URL', 'JWT_SECRET', 'PORT'])).toThrow(
      'Missing required environment variables: DB_URL, JWT_SECRET',
    );
  });

  it('10. should treat empty-string variables as missing', () => {
    process.env.EMPTY_VAR = '';
    delete process.env.ALSO_MISSING;

    expect(() => requireEnvAll(['EMPTY_VAR', 'ALSO_MISSING'])).toThrow(
      'Missing required environment variables: EMPTY_VAR, ALSO_MISSING',
    );
  });

  it('11. should preserve the order of missing keys in the error message', () => {
    delete process.env.FIRST;
    delete process.env.SECOND;
    delete process.env.THIRD;

    expect(() => requireEnvAll(['FIRST', 'SECOND', 'THIRD'])).toThrow(
      'Missing required environment variables: FIRST, SECOND, THIRD',
    );
  });

  it('13. should throw Error when keys array is empty', () => {
    expect(() => requireEnvAll([])).toThrow(Error);
    expect(() => requireEnvAll([])).toThrow('keys array cannot be empty');
  });

  it('15. should throw Error when any key is an empty string', () => {
    expect(() => requireEnvAll(['VALID', ''])).toThrow(Error);
    expect(() => requireEnvAll(['VALID', ''])).toThrow(
      'keys array must not contain empty strings',
    );
  });
});
