import { parseEnvPort } from '../src/parseEnvPort';

describe('parseEnvPort', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('1. should parse a valid port number', () => {
    process.env.PORT = '3000';
    expect(parseEnvPort('PORT')).toBe(3000);
  });

  it('2. should parse port 1 (minimum valid port)', () => {
    process.env.PORT = '1';
    expect(parseEnvPort('PORT')).toBe(1);
  });

  it('3. should parse port 65535 (maximum valid port)', () => {
    process.env.PORT = '65535';
    expect(parseEnvPort('PORT')).toBe(65535);
  });

  it('4. should return the default when variable is not set', () => {
    delete process.env.PORT;
    expect(parseEnvPort('PORT', 3000)).toBe(3000);
  });

  it('5. should return the default when variable is an empty string', () => {
    process.env.PORT = '';
    expect(parseEnvPort('PORT', 8080)).toBe(8080);
  });

  it('6. should parse common HTTP port 80', () => {
    process.env.PORT = '80';
    expect(parseEnvPort('PORT')).toBe(80);
  });

  it('7. should parse common HTTPS port 443', () => {
    process.env.PORT = '443';
    expect(parseEnvPort('PORT')).toBe(443);
  });

  it('8. should parse a high ephemeral port', () => {
    process.env.PORT = '49152';
    expect(parseEnvPort('PORT')).toBe(49152);
  });

  it('9. should return a number (integer) type', () => {
    process.env.PORT = '4000';
    const result = parseEnvPort('PORT');
    expect(typeof result).toBe('number');
    expect(Number.isInteger(result)).toBe(true);
  });

  it('10. should throw Error when port is 0 (reserved)', () => {
    process.env.PORT = '0';
    expect(() => parseEnvPort('PORT')).toThrow(Error);
    expect(() => parseEnvPort('PORT')).toThrow(
      "Environment variable 'PORT' must be a valid port (1–65535), got '0'",
    );
  });

  it('11. should throw Error when port exceeds 65535', () => {
    process.env.PORT = '99999';
    expect(() => parseEnvPort('PORT')).toThrow(Error);
    expect(() => parseEnvPort('PORT')).toThrow(
      "Environment variable 'PORT' must be a valid port (1–65535), got '99999'",
    );
  });

  it('12. should throw Error when port is negative', () => {
    process.env.PORT = '-1';
    expect(() => parseEnvPort('PORT')).toThrow(
      "Environment variable 'PORT' must be a valid port (1–65535), got '-1'",
    );
  });

  it('13. should throw Error when value is not a number', () => {
    process.env.PORT = 'abc';
    expect(() => parseEnvPort('PORT')).toThrow(Error);
    expect(() => parseEnvPort('PORT')).toThrow(
      "Environment variable 'PORT' must be a valid port (1–65535), got 'abc'",
    );
  });

  it('14. should throw Error when value is a float string', () => {
    process.env.PORT = '3000.5';
    expect(() => parseEnvPort('PORT')).toThrow(
      "Environment variable 'PORT' must be a valid port (1–65535), got '3000.5'",
    );
  });

  it('15. should throw Error when variable is not set and no default provided', () => {
    delete process.env.PORT;
    expect(() => parseEnvPort('PORT')).toThrow(Error);
    expect(() => parseEnvPort('PORT')).toThrow(
      "Required environment variable 'PORT' is not set",
    );
  });

  it('17. should throw Error when key is empty', () => {
    expect(() => parseEnvPort('')).toThrow(Error);
    expect(() => parseEnvPort('')).toThrow('key cannot be an empty string');
  });

  it('19. should throw Error when defaultValue is out of the valid port range', () => {
    expect(() => parseEnvPort('PORT', 0)).toThrow(Error);
    expect(() => parseEnvPort('PORT', 0)).toThrow(
      'defaultValue must be a valid port (1–65535), got 0',
    );
    expect(() => parseEnvPort('PORT', 99999)).toThrow(
      'defaultValue must be a valid port (1–65535), got 99999',
    );
  });
});
