import { cloneTestData } from '../src/cloneTestData';

/**
 * Unit tests for the cloneTestData function.
 */
describe('cloneTestData', () => {
  // Test case 1: Clone primitive values
  it('1. should clone primitive values', () => {
    // Assert
    expect(cloneTestData(42)).toBe(42);
    expect(cloneTestData('test')).toBe('test');
    expect(cloneTestData(true)).toBe(true);
    expect(cloneTestData(null)).toBe(null);
    expect(cloneTestData(undefined)).toBe(undefined);
  });

  // Test case 2: Clone simple array
  it('2. should deep clone simple array', () => {
    // Arrange
    const original = [1, 2, 3, 4, 5];

    // Act
    const cloned = cloneTestData(original);
    cloned[0] = 999;

    // Assert
    expect(cloned[0]).toBe(999);
    expect(original[0]).toBe(1);
    expect(cloned).not.toBe(original);
  });

  // Test case 3: Clone nested array
  it('3. should deep clone nested arrays', () => {
    // Arrange
    const original = [
      [1, 2],
      [3, 4],
    ];

    // Act
    const cloned = cloneTestData(original);
    cloned[0][0] = 999;

    // Assert
    expect(cloned[0][0]).toBe(999);
    expect(original[0][0]).toBe(1);
  });

  // Test case 4: Clone simple object
  it('4. should deep clone simple object', () => {
    // Arrange
    const original = { a: 1, b: 2, c: 3 };

    // Act
    const cloned = cloneTestData(original);
    cloned.a = 999;

    // Assert
    expect(cloned.a).toBe(999);
    expect(original.a).toBe(1);
    expect(cloned).not.toBe(original);
  });

  // Test case 5: Clone nested object
  it('5. should deep clone nested objects', () => {
    // Arrange
    const original = { user: { name: 'John', score: 100 } };

    // Act
    const cloned = cloneTestData(original);
    cloned.user.score = 200;

    // Assert
    expect(cloned.user.score).toBe(200);
    expect(original.user.score).toBe(100);
  });

  // Test case 6: Clone Date object
  it('6. should clone Date objects', () => {
    // Arrange
    const original = new Date('2023-01-01');

    // Act
    const cloned = cloneTestData(original);
    cloned.setFullYear(2024);

    // Assert
    expect(cloned.getFullYear()).toBe(2024);
    expect(original.getFullYear()).toBe(2023);
    expect(cloned).not.toBe(original);
  });

  // Test case 7: Clone RegExp object
  it('7. should clone RegExp objects', () => {
    // Arrange
    const original = /test/gi;

    // Act
    const cloned = cloneTestData(original);

    // Assert
    expect(cloned.source).toBe(original.source);
    expect(cloned.flags).toBe(original.flags);
    expect(cloned).not.toBe(original);
  });

  // Test case 8: Clone Map object
  it('8. should clone Map objects', () => {
    // Arrange
    const original = new Map<string, unknown>([
      ['key1', 'value1'],
      ['key2', { nested: 'value' }],
    ]);

    // Act
    const cloned = cloneTestData(original);
    const clonedNestedValue = cloned.get('key2') as { nested: string };
    clonedNestedValue.nested = 'modified';

    // Assert
    expect(cloned.get('key1')).toBe('value1');
    expect((original.get('key2') as { nested: string }).nested).toBe('value');
    expect(clonedNestedValue.nested).toBe('modified');
    expect(cloned).not.toBe(original);
  });

  // Test case 9: Clone Set object
  it('9. should clone Set objects', () => {
    // Arrange
    const original = new Set([1, 2, { value: 3 }]);

    // Act
    const cloned = cloneTestData(original);

    // Assert
    expect(cloned.size).toBe(original.size);
    expect(cloned).not.toBe(original);
  });

  // Test case 10: Clone complex nested structure
  it('10. should clone complex nested structures', () => {
    // Arrange
    const original = {
      users: [
        { id: 1, data: { score: 100, tags: ['admin', 'user'] } },
        { id: 2, data: { score: 200, tags: ['user'] } },
      ],
      metadata: {
        created: new Date('2023-01-01'),
        pattern: /test/i,
      },
    };

    // Act
    const cloned = cloneTestData(original);
    cloned.users[0].data.score = 999;
    cloned.users[0].data.tags.push('modified');
    cloned.metadata.created.setFullYear(2024);

    // Assert
    expect(cloned.users[0].data.score).toBe(999);
    expect(original.users[0].data.score).toBe(100);
    expect(cloned.users[0].data.tags).toContain('modified');
    expect(original.users[0].data.tags).not.toContain('modified');
    expect(cloned.metadata.created.getFullYear()).toBe(2024);
    expect(original.metadata.created.getFullYear()).toBe(2023);
  });

  // Test case 11: Clone array with mixed types
  it('11. should clone arrays with mixed types', () => {
    // Arrange
    const original = [
      1,
      'string',
      { key: 'value' },
      [1, 2],
      new Date('2023-01-01'),
    ];

    // Act
    const cloned = cloneTestData(original);

    // Assert
    expect(cloned).toEqual(original);
    expect(cloned).not.toBe(original);
    expect(cloned[2]).not.toBe(original[2]);
    expect(cloned[3]).not.toBe(original[3]);
    expect(cloned[4]).not.toBe(original[4]);
  });

  // Test case 12: Clone empty structures
  it('12. should clone empty structures', () => {
    // Assert
    expect(cloneTestData([])).toEqual([]);
    expect(cloneTestData({})).toEqual({});
    expect(cloneTestData(new Map())).toEqual(new Map());
    expect(cloneTestData(new Set())).toEqual(new Set());
  });
});
