import { hasBacktracking } from '../../regexFunctions/hasBacktracking';

/**
 * Unit tests for the hasBacktracking function.
 */
describe('hasBacktracking', () => {
  // Patterns with backtracking issues
  it('1. should detect nested quantifiers', () => {
    const result = hasBacktracking(/(a+)+/);
    expect(result).toBe(true);
  });

  it('2. should detect double star quantifier', () => {
    const result = hasBacktracking(/(a*)*/);
    expect(result).toBe(true);
  });

  it('3. should detect nested plus quantifiers', () => {
    const result = hasBacktracking(/([a-z]+)+/);
    expect(result).toBe(true);
  });

  it('4. should detect overlapping alternatives', () => {
    const result = hasBacktracking(/(a|a)*/);
    expect(result).toBe(true);
  });

  it('5. should detect multiple greedy quantifiers', () => {
    const result = hasBacktracking(/.*.*/);
    expect(result).toBe(true);
  });

  it('6. should detect catastrophic backtracking pattern', () => {
    const result = hasBacktracking(/(x+x+)+y/);
    expect(result).toBe(true);
  });

  // Safe patterns
  it('7. should return false for simple pattern', () => {
    const result = hasBacktracking(/test/);
    expect(result).toBe(false);
  });

  it('8. should return false for single quantifier', () => {
    const result = hasBacktracking(/a+/);
    expect(result).toBe(false);
  });

  it('9. should return false for character class with quantifier', () => {
    const result = hasBacktracking(/[a-z]+/);
    expect(result).toBe(false);
  });

  it('10. should return false for non-overlapping alternatives', () => {
    const result = hasBacktracking(/cat|dog/);
    expect(result).toBe(false);
  });

  it('11. should return false for anchored pattern', () => {
    const result = hasBacktracking(/^test$/);
    expect(result).toBe(false);
  });

  it('12. should return false for email pattern', () => {
    const result = hasBacktracking(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    );
    expect(result).toBe(false);
  });

  // Error cases
  it('13. should throw TypeError when pattern is not a string or RegExp', () => {
    expect(() => hasBacktracking(123 as any)).toThrow(TypeError);
    expect(() => hasBacktracking(123 as any)).toThrow(
      'pattern must be a string or RegExp',
    );
  });

  it('14. should throw TypeError when pattern is null', () => {
    expect(() => hasBacktracking(null as any)).toThrow(TypeError);
    expect(() => hasBacktracking(null as any)).toThrow(
      'pattern must be a string or RegExp',
    );
  });

  it('15. should throw TypeError when pattern is undefined', () => {
    expect(() => hasBacktracking(undefined as any)).toThrow(TypeError);
    expect(() => hasBacktracking(undefined as any)).toThrow(
      'pattern must be a string or RegExp',
    );
  });
});
