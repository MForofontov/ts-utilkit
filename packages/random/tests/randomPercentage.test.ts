import { randomPercentage } from '../src/randomPercentage';

/**
 * Unit tests for the randomPercentage function.
 */
describe('randomPercentage', () => {
  // Test case 1: Returns number
  it('1. should return a number', () => {
    const result = randomPercentage();
    expect(typeof result).toBe('number');
  });

  // Test case 2: Within 0-100 range
  it('2. should return value between 0 and 100', () => {
    const result = randomPercentage();
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(100);
  });

  // Test case 3: Default 2 decimal places
  it('3. should have 2 decimal places by default', () => {
    for (let i = 0; i < 20; i++) {
      const result = randomPercentage();
      const decimals = (result.toString().split('.')[1] || '').length;
      expect(decimals).toBeLessThanOrEqual(2);
    }
  });

  // Test case 4: Zero decimal places
  it('4. should return integers when decimals=0', () => {
    for (let i = 0; i < 20; i++) {
      const result = randomPercentage(0);
      expect(Number.isInteger(result)).toBe(true);
    }
  });

  // Test case 5: Custom decimal places (4)
  it('5. should respect custom decimal places', () => {
    for (let i = 0; i < 20; i++) {
      const result = randomPercentage(4);
      const decimals = (result.toString().split('.')[1] || '').length;
      expect(decimals).toBeLessThanOrEqual(4);
    }
  });

  // Test case 6: Varied distribution
  it('6. should produce varied results', () => {
    const results = new Set<number>();

    for (let i = 0; i < 100; i++) {
      results.add(randomPercentage());
    }

    expect(results.size).toBeGreaterThan(90);
  });

  // Test case 7: Can produce 0
  it('7. should occasionally produce 0', () => {
    let hasZero = false;

    for (let i = 0; i < 1000; i++) {
      if (randomPercentage(0) === 0) {
        hasZero = true;
        break;
      }
    }

    expect(hasZero).toBe(true);
  });

  // Test case 8: Can produce 100
  it('8. should occasionally produce 100', () => {
    let has100 = false;

    for (let i = 0; i < 1000; i++) {
      if (randomPercentage(0) === 100) {
        has100 = true;
        break;
      }
    }

    expect(has100).toBe(true);
  });

  // Test case 9: High precision (10 decimals)
  it('9. should work with maximum decimals (10)', () => {
    const result = randomPercentage(10);
    expect(result).toBeGreaterThanOrEqual(0);
    expect(result).toBeLessThanOrEqual(100);
  });

  // Test case 10: Distribution across range
  it('10. should distribute across full range', () => {
    const buckets = { low: 0, mid: 0, high: 0 };

    for (let i = 0; i < 1000; i++) {
      const val = randomPercentage(0);
      if (val < 33) buckets.low++;
      else if (val < 67) buckets.mid++;
      else buckets.high++;
    }

    // Each bucket should have some values
    expect(buckets.low).toBeGreaterThan(250);
    expect(buckets.mid).toBeGreaterThan(250);
    expect(buckets.high).toBeGreaterThan(250);
  });

  // Error Test case 11: TypeError for non-number
  it('11. should throw TypeError when decimals is not a number', () => {
    expect(() => randomPercentage('2' as any)).toThrow(TypeError);
    expect(() => randomPercentage('2' as any)).toThrow(
      'decimals must be a number',
    );
  });

  // Error Test case 12: Error for non-integer
  it('12. should throw Error when decimals is not an integer', () => {
    expect(() => randomPercentage(2.5)).toThrow(Error);
    expect(() => randomPercentage(2.5)).toThrow('decimals must be an integer');
  });

  // Error Test case 13: Error for negative decimals
  it('13. should throw Error when decimals is negative', () => {
    expect(() => randomPercentage(-1)).toThrow(Error);
    expect(() => randomPercentage(-1)).toThrow(
      'decimals must be between 0 and 10',
    );
  });

  // Error Test case 14: Error for decimals > 10
  it('14. should throw Error when decimals is greater than 10', () => {
    expect(() => randomPercentage(11)).toThrow(Error);
    expect(() => randomPercentage(11)).toThrow(
      'decimals must be between 0 and 10',
    );
  });
});
