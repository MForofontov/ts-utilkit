import { requireEnvAll } from '../src/requireEnvAll';

it('retains a required environment variable named __proto__', () => {
  // Jest's Windows env proxy has its own __proto__ lookup bug; use a plain env.
  const replacement = jest.replaceProperty(process, 'env', {
    ...process.env,
    ['__proto__']: 'configured',
  });
  try {
    const result = requireEnvAll(['__proto__']);
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect(Object.hasOwn(result, '__proto__')).toBe(true);
    expect(result.__proto__).toBe('configured');
  } finally {
    replacement.restore();
  }
});
