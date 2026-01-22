import { randomPattern } from '../src/randomPattern';

/**
 * Unit tests for the randomPattern function.
 */
describe('randomPattern', () => {
  // Test case 1: Digit pattern
  it('1. should replace # with random digits', () => {
    const result = randomPattern('###');
    expect(result).toHaveLength(3);
    expect(result).toMatch(/^[0-9]{3}$/);
  });

  // Test case 2: Uppercase letter pattern
  it('2. should replace A with random uppercase letters', () => {
    const result = randomPattern('AAA');
    expect(result).toHaveLength(3);
    expect(result).toMatch(/^[A-Z]{3}$/);
  });

  // Test case 3: Lowercase letter pattern
  it('3. should replace a with random lowercase letters', () => {
    const result = randomPattern('aaa');
    expect(result).toHaveLength(3);
    expect(result).toMatch(/^[a-z]{3}$/);
  });

  // Test case 4: Mixed pattern
  it('4. should handle mixed pattern types', () => {
    const result = randomPattern('AAA-###-aaa');
    expect(result).toHaveLength(11);
    expect(result).toMatch(/^[A-Z]{3}-[0-9]{3}-[a-z]{3}$/);
  });

  // Test case 5: Phone number pattern
  it('5. should generate phone number pattern', () => {
    const result = randomPattern('###-###-####');
    expect(result).toHaveLength(12);
    expect(result).toMatch(/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/);
  });

  // Test case 6: License plate pattern
  it('6. should generate license plate pattern', () => {
    const result = randomPattern('AAA-###');
    expect(result).toHaveLength(7);
    expect(result).toMatch(/^[A-Z]{3}-[0-9]{3}$/);
  });

  // Test case 7: Product code pattern
  it('7. should generate product code pattern', () => {
    const result = randomPattern('PROD-####-aaa');
    expect(result).toHaveLength(13);
    expect(result).toMatch(/^PROD-[0-9]{4}-[a-z]{3}$/);
  });

  // Test case 8: Preserved characters
  it('8. should preserve non-pattern characters', () => {
    const result = randomPattern('ID: AAA-###-aaa');
    expect(result).toHaveLength(15);
    expect(result).toMatch(/^ID: [A-Z]{3}-[0-9]{3}-[a-z]{3}$/);
    expect(result).toContain('ID: ');
  });

  // Test case 9: Special characters preserved
  it('9. should preserve special characters', () => {
    const result = randomPattern('###@###.###');
    expect(result).toHaveLength(11);
    expect(result).toMatch(/^[0-9]{3}@[0-9]{3}\.[0-9]{3}$/);
  });

  // Test case 10: Empty template
  it('10. should handle patterns with only preserved characters', () => {
    const result = randomPattern('HELLO-WORLD');
    expect(result).toBe('HELLO-WORLD');
  });

  // Test case 11: Randomness verification
  it('11. should produce different results over multiple calls', () => {
    const results = new Set<string>();

    for (let i = 0; i < 100; i++) {
      results.add(randomPattern('AAA-###'));
    }

    expect(results.size).toBeGreaterThan(90);
  });

  // Test case 12: Long pattern
  it('12. should handle long patterns', () => {
    const pattern = 'A'.repeat(50) + '#'.repeat(50);
    const result = randomPattern(pattern);
    expect(result).toHaveLength(100);
    expect(result).toMatch(/^[A-Z]{50}[0-9]{50}$/);
  });

  // Test case 13: All digit types appear
  it('13. should use all digits (0-9)', () => {
    const digits = new Set<string>();

    for (let i = 0; i < 500; i++) {
      const result = randomPattern('##########');
      for (const char of result) {
        digits.add(char);
      }
    }

    expect(digits.size).toBe(10);
  });

  // Test case 14: All uppercase letters appear
  it('14. should use all uppercase letters (A-Z)', () => {
    const letters = new Set<string>();

    for (let i = 0; i < 1000; i++) {
      const result = randomPattern('AAAAAAAAAA');
      for (const char of result) {
        letters.add(char);
      }
    }

    expect(letters.size).toBeGreaterThan(20);
  });

  // Test case 15: Performance test
  it('15. should generate patterns efficiently', () => {
    const startTime = performance.now();
    for (let i = 0; i < 1000; i++) {
      randomPattern('AAA-###-aaa');
    }
    const endTime = performance.now();

    expect(endTime - startTime).toBeLessThan(100);
  });

  // Error Test case 16: TypeError for non-string template
  it('16. should throw TypeError when template is not a string', () => {
    expect(() => randomPattern(123 as any)).toThrow(TypeError);
    expect(() => randomPattern(123 as any)).toThrow(
      'template must be a string, got number',
    );
  });

  // Error Test case 17: TypeError for null template
  it('17. should throw TypeError when template is null', () => {
    expect(() => randomPattern(null as any)).toThrow(TypeError);
    expect(() => randomPattern(null as any)).toThrow(
      'template must be a string, got object',
    );
  });

  // Error Test case 18: Error for empty template
  it('18. should throw Error when template is empty', () => {
    expect(() => randomPattern('')).toThrow(Error);
    expect(() => randomPattern('')).toThrow('template cannot be empty');
  });

  // Error Test case 19: Error for template longer than 100 characters
  it('19. should throw Error when template exceeds 100 characters', () => {
    const longTemplate = 'A'.repeat(101);
    expect(() => randomPattern(longTemplate)).toThrow(Error);
    expect(() => randomPattern(longTemplate)).toThrow(
      'template length must be 100 or less',
    );
  });
});
