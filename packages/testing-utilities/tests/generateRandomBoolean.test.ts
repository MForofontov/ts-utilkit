import { generateRandomBoolean } from '../src/generateRandomBoolean';

/**
 * Unit tests for the generateRandomBoolean function.
 */
describe('generateRandomBoolean', () => {
  // Test case 1: Generate boolean with 50% probability
  it('1. should generate boolean values', () => {
    // Act
    const result = generateRandomBoolean();

    // Assert
    expect(typeof result).toBe('boolean');
    expect([true, false]).toContain(result);
  });

  // Test case 2: Default 50/50 distribution
  it('2. should generate roughly 50/50 distribution by default', () => {
    // Arrange
    const iterations = 1000;
    let trueCount = 0;

    // Act
    for (let i = 0; i < iterations; i++) {
      if (generateRandomBoolean()) {
        trueCount++;
      }
    }

    // Assert
    const truePercentage = trueCount / iterations;
    expect(truePercentage).toBeGreaterThan(0.4);
    expect(truePercentage).toBeLessThan(0.6);
  });

  // Test case 3: Custom probability - mostly true
  it('3. should respect custom probability for mostly true', () => {
    // Arrange
    const iterations = 1000;
    const probability = 0.8;
    let trueCount = 0;

    // Act
    for (let i = 0; i < iterations; i++) {
      if (generateRandomBoolean(probability)) {
        trueCount++;
      }
    }

    // Assert
    const truePercentage = trueCount / iterations;
    expect(truePercentage).toBeGreaterThan(0.7);
    expect(truePercentage).toBeLessThan(0.9);
  });

  // Test case 4: Custom probability - mostly false
  it('4. should respect custom probability for mostly false', () => {
    // Arrange
    const iterations = 1000;
    const probability = 0.2;
    let trueCount = 0;

    // Act
    for (let i = 0; i < iterations; i++) {
      if (generateRandomBoolean(probability)) {
        trueCount++;
      }
    }

    // Assert
    const truePercentage = trueCount / iterations;
    expect(truePercentage).toBeGreaterThan(0.1);
    expect(truePercentage).toBeLessThan(0.3);
  });

  // Test case 5: Probability 0 always returns false
  it('5. should always return false when probability is 0', () => {
    // Act
    const results = Array.from({ length: 100 }, () => generateRandomBoolean(0));

    // Assert
    expect(results.every((r) => r === false)).toBe(true);
  });

  // Test case 6: Probability 1 always returns true
  it('6. should always return true when probability is 1', () => {
    // Act
    const results = Array.from({ length: 100 }, () => generateRandomBoolean(1));

    // Assert
    expect(results.every((r) => r === true)).toBe(true);
  });

  // Test case 7: Error - probability less than 0
  it('7. should throw Error when probability is less than 0', () => {
    // Arrange
    const probability = -0.1;

    // Act & Assert
    expect(() => generateRandomBoolean(probability)).toThrow(Error);
    expect(() => generateRandomBoolean(probability)).toThrow(
      'trueProbability must be between 0 and 1',
    );
  });

  // Test case 8: Error - probability greater than 1
  it('8. should throw Error when probability is greater than 1', () => {
    // Arrange
    const probability = 1.5;

    // Act & Assert
    expect(() => generateRandomBoolean(probability)).toThrow(Error);
    expect(() => generateRandomBoolean(probability)).toThrow(
      'trueProbability must be between 0 and 1',
    );
  });
});
