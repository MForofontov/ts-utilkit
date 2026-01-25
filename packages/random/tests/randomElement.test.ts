import type { WeightedElement } from '../src/randomElement';
import { randomElement } from '../src/randomElement';

/**
 * Unit tests for the randomElement function.
 */
describe('randomElement', () => {
  // Test case 1: Returns WeightedElement
  it('1. should return a WeightedElement object', () => {
    const elements: WeightedElement<string>[] = [
      { value: 'a', weight: 1 },
      { value: 'b', weight: 1 },
    ];

    const result = randomElement(elements);
    expect(result).toHaveProperty('value');
    expect(result).toHaveProperty('weight');
  });

  // Test case 2: Returns element from array
  it('2. should return one of the provided elements', () => {
    const elements: WeightedElement<string>[] = [
      { value: 'a', weight: 1 },
      { value: 'b', weight: 1 },
      { value: 'c', weight: 1 },
    ];

    const result = randomElement(elements);
    expect(elements).toContainEqual(result);
  });

  // Test case 3: Weighted selection favors higher weight
  it('3. should favor elements with higher weights', () => {
    const elements: WeightedElement<string>[] = [
      { value: 'rare', weight: 1 },
      { value: 'common', weight: 99 },
    ];

    let commonCount = 0;

    for (let i = 0; i < 1000; i++) {
      if (randomElement(elements).value === 'common') {
        commonCount++;
      }
    }

    // Should be around 990 (allow 95-100% range)
    expect(commonCount).toBeGreaterThan(950);
  });

  // Test case 4: Handles metadata
  it('4. should preserve metadata in returned element', () => {
    const elements: WeightedElement<string>[] = [
      { value: 'item', weight: 1, metadata: { id: 1, name: 'test' } },
    ];

    const result = randomElement(elements);
    expect(result.metadata).toEqual({ id: 1, name: 'test' });
  });

  // Test case 5: Works without metadata
  it('5. should work without metadata property', () => {
    const elements: WeightedElement<number>[] = [
      { value: 1, weight: 1 },
      { value: 2, weight: 1 },
    ];

    const result = randomElement(elements);
    expect([1, 2]).toContain(result.value);
  });

  // Test case 6: Single element
  it('6. should return the only element when array has one item', () => {
    const elements: WeightedElement<string>[] = [
      { value: 'only', weight: 5, metadata: { test: true } },
    ];

    const result = randomElement(elements);
    expect(result.value).toBe('only');
    expect(result.metadata).toEqual({ test: true });
  });

  // Test case 7: Zero weight elements never selected
  it('7. should never select elements with zero weight', () => {
    const elements: WeightedElement<string>[] = [
      { value: 'never', weight: 0 },
      { value: 'always', weight: 1 },
    ];

    for (let i = 0; i < 100; i++) {
      const result = randomElement(elements);
      expect(result.value).toBe('always');
    }
  });

  // Test case 8: Works with complex types
  it('8. should work with complex value types', () => {
    const elements: WeightedElement<{ id: number; name: string }>[] = [
      { value: { id: 1, name: 'first' }, weight: 1 },
      { value: { id: 2, name: 'second' }, weight: 1 },
    ];

    const result = randomElement(elements);
    expect(result.value).toHaveProperty('id');
    expect(result.value).toHaveProperty('name');
  });

  // Test case 9: Distribution test
  it('9. should produce varied results with equal weights', () => {
    const elements: WeightedElement<number>[] = [
      { value: 1, weight: 1 },
      { value: 2, weight: 1 },
      { value: 3, weight: 1 },
    ];

    const values = new Set<number>();

    for (let i = 0; i < 100; i++) {
      values.add(randomElement(elements).value);
    }

    expect(values.size).toBe(3); // Should get all values
  });

  // Test case 10: Rarity system simulation
  it('10. should work for rarity system', () => {
    const items: WeightedElement<string>[] = [
      { value: 'common', weight: 70, metadata: { rarity: 'common' } },
      { value: 'rare', weight: 25, metadata: { rarity: 'rare' } },
      { value: 'legendary', weight: 5, metadata: { rarity: 'legendary' } },
    ];

    const counts = { common: 0, rare: 0, legendary: 0 };

    for (let i = 0; i < 1000; i++) {
      const result = randomElement(items);
      counts[result.value as keyof typeof counts]++;
    }

    // Common should be ~700, rare ~250, legendary ~50
    expect(counts.common).toBeGreaterThan(600);
    expect(counts.rare).toBeGreaterThan(150);
    expect(counts.rare).toBeLessThan(350);
    expect(counts.legendary).toBeGreaterThan(10);
    expect(counts.legendary).toBeLessThan(100);
  });

  // Error Test case 11: TypeError for non-array
  it('11. should throw TypeError when elements is not an array', () => {
    expect(() => randomElement('not array' as any)).toThrow(TypeError);
    expect(() => randomElement('not array' as any)).toThrow(
      'elements must be an array',
    );
  });

  // Error Test case 12: Error for empty array
  it('12. should throw Error when elements array is empty', () => {
    expect(() => randomElement([])).toThrow(Error);
    expect(() => randomElement([])).toThrow('elements array cannot be empty');
  });

  // Error Test case 13: Error for non-object element
  it('13. should throw Error when element is not an object', () => {
    const elements = ['not', 'objects'] as any;
    expect(() => randomElement(elements)).toThrow(Error);
    expect(() => randomElement(elements)).toThrow('must be an object');
  });

  // Error Test case 14: Error for missing value property
  it('14. should throw Error when element lacks value property', () => {
    const elements = [{ weight: 1 }] as any;
    expect(() => randomElement(elements)).toThrow(Error);
    expect(() => randomElement(elements)).toThrow("must have a 'value'");
  });

  // Error Test case 15: Error for missing weight property
  it('15. should throw Error when element lacks weight property', () => {
    const elements = [{ value: 'test' }] as any;
    expect(() => randomElement(elements)).toThrow(Error);
    expect(() => randomElement(elements)).toThrow("must have a 'weight'");
  });

  // Error Test case 16: Error for non-number weight
  it('16. should throw Error when weight is not a number', () => {
    const elements = [{ value: 'test', weight: '1' }] as any;
    expect(() => randomElement(elements)).toThrow(Error);
    expect(() => randomElement(elements)).toThrow(
      'Weight at index 0 must be a number',
    );
  });

  // Error Test case 17: Error for NaN weight
  it('17. should throw Error when weight is NaN', () => {
    const elements: WeightedElement<string>[] = [
      { value: 'test', weight: NaN },
    ];
    expect(() => randomElement(elements)).toThrow(Error);
    expect(() => randomElement(elements)).toThrow('Weight at index 0 is NaN');
  });

  // Error Test case 18: Error for negative weight
  it('18. should throw Error when weight is negative', () => {
    const elements: WeightedElement<string>[] = [{ value: 'test', weight: -1 }];
    expect(() => randomElement(elements)).toThrow(Error);
    expect(() => randomElement(elements)).toThrow(
      'All weights must be non-negative',
    );
  });

  // Error Test case 19: Error for all zero weights
  it('19. should throw Error when all weights are zero', () => {
    const elements: WeightedElement<string>[] = [
      { value: 'a', weight: 0 },
      { value: 'b', weight: 0 },
    ];
    expect(() => randomElement(elements)).toThrow(Error);
    expect(() => randomElement(elements)).toThrow(
      'Sum of weights must be greater than zero',
    );
  });
});
