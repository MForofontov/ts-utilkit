import { generateRandomUUID } from '../src/generateRandomUUID';

/**
 * Unit tests for the generateRandomUUID function.
 */
describe('generateRandomUUID', () => {
  // Test case 1: Generate UUID v4 format
  it('1. should generate UUID v4 format', () => {
    // Act
    const result = generateRandomUUID();

    // Assert
    expect(result).toMatch(
      /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/,
    );
  });

  // Test case 2: Has correct structure
  it('2. should have correct UUID structure with 5 groups', () => {
    // Act
    const result = generateRandomUUID();

    // Assert
    const groups = result.split('-');
    expect(groups).toHaveLength(5);
    expect(groups[0]).toHaveLength(8);
    expect(groups[1]).toHaveLength(4);
    expect(groups[2]).toHaveLength(4);
    expect(groups[3]).toHaveLength(4);
    expect(groups[4]).toHaveLength(12);
  });

  // Test case 3: Version field is 4
  it('3. should have version 4 identifier', () => {
    // Act
    const result = generateRandomUUID();

    // Assert
    const version = result.split('-')[2][0];
    expect(version).toBe('4');
  });

  // Test case 4: Variant field is correct
  it('4. should have correct variant field', () => {
    // Act
    const result = generateRandomUUID();

    // Assert
    const variant = result.split('-')[3][0];
    expect(['8', '9', 'a', 'b']).toContain(variant);
  });

  // Test case 5: Different calls produce different UUIDs
  it('5. should generate different UUIDs on each call', () => {
    // Act
    const uuid1 = generateRandomUUID();
    const uuid2 = generateRandomUUID();
    const uuid3 = generateRandomUUID();

    // Assert
    expect(uuid1).not.toBe(uuid2);
    expect(uuid2).not.toBe(uuid3);
    expect(uuid1).not.toBe(uuid3);
  });

  // Test case 6: Generate multiple unique UUIDs
  it('6. should generate unique UUIDs in batch', () => {
    // Arrange
    const count = 100;

    // Act
    const uuids = Array.from({ length: count }, () => generateRandomUUID());

    // Assert
    const uniqueUuids = new Set(uuids);
    expect(uniqueUuids.size).toBe(count);
  });
});
