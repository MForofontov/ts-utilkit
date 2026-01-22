import { isValidUUID } from '../src/isValidUUID';

/**
 * Unit tests for the isValidUUID function.
 */
describe('isValidUUID', () => {
  // Test case 1: Valid UUIDs
  it('1. should return true for valid UUIDs', () => {
    // Arrange & Act & Assert
    expect(isValidUUID('123e4567-e89b-12d3-a456-426614174000')).toBe(true); // v1
    expect(isValidUUID('6ba7b810-9dad-11d1-80b4-00c04fd430c8')).toBe(true); // v1
    expect(isValidUUID('6ba7b811-9dad-31d1-80b4-00c04fd430c8')).toBe(true); // v3
    expect(isValidUUID('550e8400-e29b-41d4-a716-446655440000')).toBe(true); // v4
    expect(isValidUUID('6ba7b812-9dad-51d1-80b4-00c04fd430c8')).toBe(true); // v5
  });

  // Test case 2: Invalid UUIDs
  it('2. should return false for invalid UUIDs', () => {
    // Arrange & Act & Assert
    expect(isValidUUID('invalid-uuid')).toBe(false);
    expect(isValidUUID('123e4567-e89b-12d3-a456-42661417400')).toBe(false); // Too short
    expect(isValidUUID('123e4567-e89b-12d3-a456-4266141740000')).toBe(false); // Too long
    expect(isValidUUID('123e4567-e89b-12d3-a456-426614174g00')).toBe(false); // Invalid char
    expect(isValidUUID('123e4567e89b12d3a456426614174000')).toBe(false); // No hyphens
    expect(isValidUUID('')).toBe(false); // Empty string
  });

  // Test case 3: Version-specific validation
  it('3. should validate specific UUID versions correctly', () => {
    // Arrange & Act & Assert
    expect(isValidUUID('123e4567-e89b-12d3-a456-426614174000', 1)).toBe(true); // v1
    expect(isValidUUID('6ba7b811-9dad-31d1-80b4-00c04fd430c8', 3)).toBe(true); // v3
    expect(isValidUUID('550e8400-e29b-41d4-a716-446655440000', 4)).toBe(true); // v4
    expect(isValidUUID('6ba7b812-9dad-51d1-80b4-00c04fd430c8', 5)).toBe(true); // v5

    // Wrong version specified
    expect(isValidUUID('123e4567-e89b-12d3-a456-426614174000', 4)).toBe(false);
    expect(isValidUUID('550e8400-e29b-41d4-a716-446655440000', 1)).toBe(false);
  });

  // Test case 4: Performance with various UUIDs
  it('4. should validate UUIDs efficiently', () => {
    // Arrange
    const uuids = [
      '123e4567-e89b-12d3-a456-426614174000',
      '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
      'invalid-uuid',
      '550e8400-e29b-41d4-a716-446655440000',
      '123e4567-e89b-12d3-a456-42661417400',
    ];

    // Act
    const startTime = performance.now();
    const results = uuids.map((uuid) => isValidUUID(uuid));
    const endTime = performance.now();

    // Assert
    expect(results).toEqual([true, true, false, true, false]);
    expect(endTime - startTime).toBeLessThan(100); // Should complete quickly (increased threshold for CI environments)
  });

  // Test case 5: TypeError for invalid input types
  it('5. should throw TypeError for invalid input types', () => {
    // Arrange
    const invalidInputs: unknown[] = [null, undefined, 42, {}, [], true];
    const expectedMessage = 'uuid must be a string, got';

    // Act & Assert
    for (const input of invalidInputs) {
      expect(() => isValidUUID(input as string)).toThrow(TypeError);
      expect(() => isValidUUID(input as string)).toThrow(expectedMessage);
    }

    // Test invalid version types
    expect(() =>
      isValidUUID(
        '123e4567-e89b-12d3-a456-426614174000',
        'invalid' as unknown as number,
      ),
    ).toThrow(TypeError);
    expect(() =>
      isValidUUID(
        '123e4567-e89b-12d3-a456-426614174000',
        'invalid' as unknown as number,
      ),
    ).toThrow('version must be a number, got');
  });

  // Test case 6: Error for unsupported version
  it('6. should throw Error for unsupported UUID version', () => {
    // Arrange
    const validUUID = '123e4567-e89b-12d3-a456-426614174000';
    const unsupportedVersions = [0, 2, 6, 7, -1, 10];

    // Act & Assert
    unsupportedVersions.forEach((version) => {
      expect(() => isValidUUID(validUUID, version)).toThrow(Error);
      expect(() => isValidUUID(validUUID, version)).toThrow(
        'version must be 1, 3, 4, or 5',
      );
    });
  });
});
