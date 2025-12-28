import { getPatternComplexity } from '../../regexFunctions/getPatternComplexity';

/**
 * Unit tests for the getPatternComplexity function.
 */
describe('getPatternComplexity', () => {
  // Low complexity tests
  it('1. should identify low complexity pattern', () => {
    const result = getPatternComplexity(/test/);
    expect(result.complexityLevel).toBe('low');
    expect(result.captureGroups).toBe(0);
    expect(result.score).toBeLessThanOrEqual(5);
  });

  it('2. should count character classes', () => {
    const result = getPatternComplexity(/[a-z][0-9]/);
    expect(result.characterClasses).toBe(2);
  });

  it('3. should count quantifiers', () => {
    const result = getPatternComplexity(/a+b*c?d{2,5}/);
    expect(result.quantifiers).toBe(4);
  });

  // Medium complexity tests
  it('4. should identify medium complexity pattern', () => {
    const result = getPatternComplexity(/(\d{3})-(\d{3})-(\d{4})/);
    expect(result.complexityLevel).toBe('medium');
    expect(result.captureGroups).toBe(3);
    expect(result.score).toBeGreaterThan(5);
    expect(result.score).toBeLessThanOrEqual(15);
  });

  it('5. should count alternations', () => {
    const result = getPatternComplexity(/cat|dog|bird/);
    expect(result.alternations).toBe(2);
  });

  it('6. should detect lookarounds', () => {
    const result = getPatternComplexity(/(?=.*\d)(?!.*admin)/);
    expect(result.hasLookarounds).toBe(true);
  });

  // High complexity tests
  it('7. should identify high complexity pattern', () => {
    const result = getPatternComplexity(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    );
    expect(result.complexityLevel).toBe('high');
    expect(result.score).toBeGreaterThan(15);
  });

  it('8. should detect backreferences', () => {
    const result = getPatternComplexity(/(\w+)\s+\1/);
    expect(result.hasBackreferences).toBe(true);
    expect(result.captureGroups).toBe(1);
  });

  // Edge cases
  it('9. should handle simple literal pattern', () => {
    const result = getPatternComplexity(/abc/);
    expect(result.captureGroups).toBe(0);
    expect(result.characterClasses).toBe(0);
    expect(result.quantifiers).toBe(0);
    expect(result.alternations).toBe(0);
    expect(result.hasLookarounds).toBe(false);
    expect(result.hasBackreferences).toBe(false);
    expect(result.complexityLevel).toBe('low');
  });

  it('10. should handle pattern with only quantifiers', () => {
    const result = getPatternComplexity(/a+/);
    expect(result.quantifiers).toBe(1);
    expect(result.complexityLevel).toBe('low');
  });

  it('11. should handle pattern with multiple lookaheads', () => {
    const result = getPatternComplexity(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])/);
    expect(result.hasLookarounds).toBe(true);
    // \d is not a character class (it's a shorthand), only [a-z] and [A-Z] count
    expect(result.characterClasses).toBe(2);
  });

  it('12. should handle non-capturing groups', () => {
    const result = getPatternComplexity(/(?:test)+/);
    expect(result.captureGroups).toBe(0); // Non-capturing groups don't count
  });

  // Error cases
  it('13. should throw TypeError when pattern is not a string or RegExp', () => {
    expect(() => getPatternComplexity(123 as any)).toThrow(TypeError);
    expect(() => getPatternComplexity(123 as any)).toThrow(
      'pattern must be a string or RegExp',
    );
  });

  it('14. should throw TypeError when pattern is null', () => {
    expect(() => getPatternComplexity(null as any)).toThrow(TypeError);
    expect(() => getPatternComplexity(null as any)).toThrow(
      'pattern must be a string or RegExp',
    );
  });

  it('15. should throw TypeError when pattern is undefined', () => {
    expect(() => getPatternComplexity(undefined as any)).toThrow(TypeError);
    expect(() => getPatternComplexity(undefined as any)).toThrow(
      'pattern must be a string or RegExp',
    );
  });

  // Complex real-world patterns
  it('16. should analyze email pattern complexity', () => {
    const result = getPatternComplexity(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    );
    expect(result.characterClasses).toBeGreaterThan(0);
    expect(result.quantifiers).toBeGreaterThan(0);
    expect(result.complexityLevel).not.toBe('low');
  });
});
