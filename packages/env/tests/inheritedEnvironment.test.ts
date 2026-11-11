import {
  getEnv,
  hasEnv,
  parseEnvArray,
  parseEnvBool,
  parseEnvEnum,
  parseEnvFloat,
  parseEnvInt,
  parseEnvJSON,
  parseEnvPort,
  requireEnv,
  requireEnvAll,
} from '../src';

describe('environment own-property boundaries', () => {
  it.each(['constructor', 'toString', '__proto__'])(
    'treats inherited %s as absent in every environment reader',
    (key) => {
      const previous = Object.getOwnPropertyDescriptor(process.env, key);
      delete process.env[key];
      try {
        expect(getEnv(key)).toBeUndefined();
        expect(getEnv(key, 'fallback')).toBe('fallback');
        expect(hasEnv(key)).toBe(false);
        expect(parseEnvArray(key, ',', ['fallback'])).toEqual(['fallback']);
        expect(parseEnvBool(key, true)).toBe(true);
        expect(parseEnvEnum(key, ['fallback'], 'fallback')).toBe('fallback');
        expect(parseEnvFloat(key, 1.5)).toBe(1.5);
        expect(parseEnvInt(key, 42)).toBe(42);
        expect(parseEnvJSON(key, { fallback: true })).toEqual({
          fallback: true,
        });
        expect(parseEnvPort(key, 8080)).toBe(8080);
        expect(() => requireEnv(key)).toThrow('is not set');
        expect(() => requireEnvAll([key])).toThrow('Missing required');
      } finally {
        if (previous) Object.defineProperty(process.env, key, previous);
      }
    },
  );
});
