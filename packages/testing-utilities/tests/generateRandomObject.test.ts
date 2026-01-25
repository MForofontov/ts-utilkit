import { generateRandomObject } from '../src/generateRandomObject';

/**
 * Unit tests for the generateRandomObject function.
 */
describe('generateRandomObject', () => {
  // Test case 1: Generate object with simple schema
  it('1. should generate object matching simple schema', () => {
    // Arrange
    const schema = {
      id: () => 123,
      name: () => 'test',
      active: () => true,
    };

    // Act
    const result = generateRandomObject(schema);

    // Assert
    expect(result).toHaveProperty('id', 123);
    expect(result).toHaveProperty('name', 'test');
    expect(result).toHaveProperty('active', true);
  });

  // Test case 2: Generate object with random values
  it('2. should call generator functions for each property', () => {
    // Arrange
    const schema = {
      randomNum: () => Math.floor(Math.random() * 100),
      randomStr: () => Math.random().toString(36).substring(7),
    };

    // Act
    const result = generateRandomObject(schema);

    // Assert
    expect(typeof result.randomNum).toBe('number');
    expect(typeof result.randomStr).toBe('string');
    expect(result.randomNum).toBeGreaterThanOrEqual(0);
    expect(result.randomNum).toBeLessThan(100);
  });

  // Test case 3: Generate nested object
  it('3. should generate object with nested objects', () => {
    // Arrange
    const schema = {
      user: () => ({ name: 'John', age: 30 }),
      metadata: () => ({ created: new Date(), version: 1 }),
    };

    // Act
    const result = generateRandomObject(schema);

    // Assert
    expect(result.user).toEqual({ name: 'John', age: 30 });
    expect(result.metadata).toHaveProperty('created');
    expect(result.metadata).toHaveProperty('version', 1);
  });

  // Test case 4: Generate object with array properties
  it('4. should generate object with array properties', () => {
    // Arrange
    const schema = {
      tags: () => ['tag1', 'tag2', 'tag3'],
      scores: () => [10, 20, 30],
    };

    // Act
    const result = generateRandomObject(schema);

    // Assert
    expect(Array.isArray(result.tags)).toBe(true);
    expect(Array.isArray(result.scores)).toBe(true);
    expect(result.tags).toEqual(['tag1', 'tag2', 'tag3']);
    expect(result.scores).toEqual([10, 20, 30]);
  });

  // Test case 5: Different calls produce different objects
  it('5. should generate different values when using random generators', () => {
    // Arrange
    const schema = {
      id: () => Math.random(),
      value: () => Math.floor(Math.random() * 1000),
    };

    // Act
    const obj1 = generateRandomObject(schema);
    const obj2 = generateRandomObject(schema);

    // Assert
    expect(obj1.id).not.toBe(obj2.id);
    expect(obj1.value).not.toBe(obj2.value);
  });

  // Test case 6: Empty schema produces empty object
  it('6. should generate empty object for empty schema', () => {
    // Arrange
    const schema = {};

    // Act
    const result = generateRandomObject(schema);

    // Assert
    expect(result).toEqual({});
    expect(Object.keys(result)).toHaveLength(0);
  });

  // Test case 7: Complex schema with mixed types
  it('7. should handle complex schema with mixed types', () => {
    // Arrange
    const schema = {
      id: () => Math.floor(Math.random() * 1000),
      name: () => `User${Math.random().toString(36).substring(7)}`,
      active: () => Math.random() > 0.5,
      scores: () => [10, 20, 30],
      metadata: () => ({ created: new Date(), version: 1 }),
      tags: () => ['new', 'featured'].filter(() => Math.random() > 0.5),
    };

    // Act
    const result = generateRandomObject(schema);

    // Assert
    expect(typeof result.id).toBe('number');
    expect(typeof result.name).toBe('string');
    expect(typeof result.active).toBe('boolean');
    expect(Array.isArray(result.scores)).toBe(true);
    expect(typeof result.metadata).toBe('object');
    expect(Array.isArray(result.tags)).toBe(true);
  });

  // Test case 8: Generators are called each time
  it('8. should call generator functions on each invocation', () => {
    // Arrange
    let callCount = 0;
    const schema = {
      counter: () => ++callCount,
    };

    // Act
    const obj1 = generateRandomObject(schema);
    const obj2 = generateRandomObject(schema);

    // Assert
    expect(obj1.counter).toBe(1);
    expect(obj2.counter).toBe(2);
  });
});
