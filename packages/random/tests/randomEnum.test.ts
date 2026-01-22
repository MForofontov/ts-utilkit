import { randomEnum } from '../src/randomEnum';

/**
 * Unit tests for the randomEnum function.
 */
describe('randomEnum', () => {
  enum Color {
    Red = 'red',
    Green = 'green',
    Blue = 'blue',
  }

  enum Direction {
    North = 0,
    South = 1,
    East = 2,
    West = 3,
  }

  const statusObj = {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    PENDING: 'pending',
  };

  // Test case 1: Returns value from string enum
  it('1. should return a value from string enum', () => {
    const result = randomEnum(Color);
    expect(['red', 'green', 'blue']).toContain(result);
  });

  // Test case 2: Returns value from numeric enum
  it('2. should return a value from numeric enum', () => {
    const result = randomEnum(Direction);
    expect(['North', 'South', 'East', 'West']).toContain(result);
  });

  // Test case 3: Returns value from object
  it('3. should return a value from object', () => {
    const result = randomEnum(statusObj);
    expect(['active', 'inactive', 'pending']).toContain(result);
  });

  // Test case 4: Distribution for string enum
  it('4. should produce varied results from string enum', () => {
    const results = new Set<string>();

    for (let i = 0; i < 100; i++) {
      results.add(randomEnum(Color));
    }

    expect(results.size).toBeGreaterThan(1); // Should have multiple values
  });

  // Test case 5: Distribution for numeric enum
  it('5. should produce varied results from numeric enum', () => {
    const results = new Set<number>();

    for (let i = 0; i < 100; i++) {
      results.add(randomEnum(Direction) as number);
    }

    expect(results.size).toBeGreaterThan(1);
  });

  // Test case 6: Works with two-value enum
  it('6. should work with two-value enum', () => {
    enum Binary {
      Zero = 0,
      One = 1,
    }

    const result = randomEnum(Binary);
    expect(['Zero', 'One']).toContain(result);
  });

  // Test case 7: Works with single-value object
  it('7. should work with single-value object', () => {
    const single = { ONLY: 'only' };
    const result = randomEnum(single);

    expect(result).toBe('only');
  });

  // Test case 8: Type inference for string enum
  it('8. should maintain type for string enum', () => {
    const result = randomEnum(Color);
    expect(typeof result).toBe('string');
  });

  // Test case 9: Works with mixed object
  it('9. should work with object containing different types', () => {
    const mixed = {
      STRING: 'text',
      NUMBER: 42,
      BOOLEAN: true,
    };

    const result = randomEnum(mixed);
    expect(['text', 42, true]).toContain(result);
  });

  // Test case 10: Roughly equal distribution
  it('10. should produce roughly equal distribution', () => {
    const counts = { red: 0, green: 0, blue: 0 };

    for (let i = 0; i < 1000; i++) {
      const result = randomEnum(Color) as 'red' | 'green' | 'blue';
      counts[result]++;
    }

    // Each should be around 333 (allow 25-45% range)
    expect(counts.red).toBeGreaterThan(250);
    expect(counts.red).toBeLessThan(450);
    expect(counts.green).toBeGreaterThan(250);
    expect(counts.green).toBeLessThan(450);
    expect(counts.blue).toBeGreaterThan(250);
    expect(counts.blue).toBeLessThan(450);
  });

  // Error Test case 11: TypeError for non-object
  it('11. should throw TypeError when input is not an object', () => {
    expect(() => randomEnum('not object' as any)).toThrow(TypeError);
    expect(() => randomEnum('not object' as any)).toThrow(
      'enumObj must be an object',
    );
  });

  // Error Test case 12: TypeError for null
  it('12. should throw TypeError when input is null', () => {
    expect(() => randomEnum(null as any)).toThrow(TypeError);
    expect(() => randomEnum(null as any)).toThrow('enumObj must be an object');
  });

  // Error Test case 13: Error for empty object
  it('13. should throw Error when object has no values', () => {
    const empty = {};
    expect(() => randomEnum(empty)).toThrow(Error);
    expect(() => randomEnum(empty)).toThrow(
      'enumObj must have at least one enumerable value',
    );
  });
});
