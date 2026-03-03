import { generateRandomAlphanumeric } from '../src/generateRandomAlphanumeric';

describe('generateRandomAlphanumeric', () => {
  it('1. should generate string of the requested length', () => {
    expect(generateRandomAlphanumeric(10)).toHaveLength(10);
  });
  it('2. should generate string of length 0', () => {
    expect(generateRandomAlphanumeric(0)).toBe('');
  });
  it('3. should contain only alphanumeric characters', () => {
    const result = generateRandomAlphanumeric(50);
    expect(result).toMatch(/^[A-Za-z0-9]+$/);
  });
  it('4. should produce different results on successive calls', () => {
    const a = generateRandomAlphanumeric(20);
    const b = generateRandomAlphanumeric(20);
    // Very unlikely to be equal
    expect(a).not.toBe(b);
  });
  it('5. should throw RangeError for negative length', () => {
    expect(() => generateRandomAlphanumeric(-1)).toThrow(RangeError);
    expect(() => generateRandomAlphanumeric(-1)).toThrow('length must be non-negative');
  });
});
