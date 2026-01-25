import { randomBoolean } from '../src/randomBoolean';

/**
 * Unit tests for the randomBoolean function.
 */
describe('randomBoolean', () => {
  // Test case 1: Default 50/50 probability
  it('1. should return boolean with default probability', () => {
    const result = randomBoolean();
    expect(typeof result).toBe('boolean');
  });

  // Test case 2: Probability distribution (50/50)
  it('2. should produce roughly 50/50 distribution with default', () => {
    const results = { true: 0, false: 0 };

    for (let i = 0; i < 1000; i++) {
      results[String(randomBoolean()) as 'true' | 'false']++;
    }

    // Should be roughly 500/500 (allow 40-60% range)
    expect(results.true).toBeGreaterThan(400);
    expect(results.true).toBeLessThan(600);
  });

  // Test case 3: High probability (0.9)
  it('3. should favor true with high probability', () => {
    let trueCount = 0;

    for (let i = 0; i < 1000; i++) {
      if (randomBoolean(0.9)) trueCount++;
    }

    // Should be around 900 true values (allow 85-95% range)
    expect(trueCount).toBeGreaterThan(850);
    expect(trueCount).toBeLessThan(950);
  });

  // Test case 4: Low probability (0.1)
  it('4. should favor false with low probability', () => {
    let trueCount = 0;

    for (let i = 0; i < 1000; i++) {
      if (randomBoolean(0.1)) trueCount++;
    }

    // Should be around 100 true values (allow 5-15% range)
    expect(trueCount).toBeGreaterThan(50);
    expect(trueCount).toBeLessThan(150);
  });

  // Test case 5: Probability of 0
  it('5. should always return false with probability 0', () => {
    for (let i = 0; i < 100; i++) {
      expect(randomBoolean(0)).toBe(false);
    }
  });

  // Test case 6: Probability of 1
  it('6. should always return true with probability 1', () => {
    for (let i = 0; i < 100; i++) {
      expect(randomBoolean(1)).toBe(true);
    }
  });

  // Test case 7: Probability of 0.5
  it('7. should produce roughly equal distribution with 0.5', () => {
    const results = { true: 0, false: 0 };

    for (let i = 0; i < 1000; i++) {
      results[String(randomBoolean(0.5)) as 'true' | 'false']++;
    }

    expect(results.true).toBeGreaterThan(400);
    expect(results.true).toBeLessThan(600);
  });

  // Test case 8: Multiple calls return varied results
  it('8. should return varied results over multiple calls', () => {
    const results = new Set<boolean>();

    for (let i = 0; i < 50; i++) {
      results.add(randomBoolean());
    }

    expect(results.size).toBe(2); // Should have both true and false
  });

  // Error Test case 9: TypeError for non-number probability
  it('9. should throw TypeError when probability is not a number', () => {
    expect(() => randomBoolean('0.5' as any)).toThrow(TypeError);
    expect(() => randomBoolean('0.5' as any)).toThrow(
      'probability must be a number',
    );
  });

  // Error Test case 10: Error for NaN probability
  it('10. should throw Error when probability is NaN', () => {
    expect(() => randomBoolean(NaN)).toThrow(Error);
    expect(() => randomBoolean(NaN)).toThrow(
      'probability must be a valid number, not NaN',
    );
  });

  // Error Test case 11: Error for negative probability
  it('11. should throw Error when probability is negative', () => {
    expect(() => randomBoolean(-0.1)).toThrow(Error);
    expect(() => randomBoolean(-0.1)).toThrow(
      'probability must be between 0 and 1',
    );
  });

  // Error Test case 12: Error for probability > 1
  it('12. should throw Error when probability is greater than 1', () => {
    expect(() => randomBoolean(1.5)).toThrow(Error);
    expect(() => randomBoolean(1.5)).toThrow(
      'probability must be between 0 and 1',
    );
  });
});
