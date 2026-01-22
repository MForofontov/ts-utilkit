import { randomUUID } from '../src/randomUUID';

/**
 * Unit tests for the randomUUID function.
 */
describe('randomUUID', () => {
  // UUID v4 format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
  const uuidV4Regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

  // Test case 1: Returns string
  it('1. should return a string', () => {
    const result = randomUUID();
    expect(typeof result).toBe('string');
  });

  // Test case 2: Matches UUID v4 format
  it('2. should match UUID v4 format', () => {
    const result = randomUUID();
    expect(result).toMatch(uuidV4Regex);
  });

  // Test case 3: Has correct length
  it('3. should have length of 36 characters', () => {
    const result = randomUUID();
    expect(result.length).toBe(36);
  });

  // Test case 4: Contains hyphens at correct positions
  it('4. should have hyphens at correct positions', () => {
    const result = randomUUID();
    expect(result[8]).toBe('-');
    expect(result[13]).toBe('-');
    expect(result[18]).toBe('-');
    expect(result[23]).toBe('-');
  });

  // Test case 5: Has version 4 marker
  it('5. should have version 4 marker at position 14', () => {
    const result = randomUUID();
    expect(result[14]).toBe('4');
  });

  // Test case 6: Has variant marker
  it('6. should have variant marker (8, 9, a, or b) at position 19', () => {
    const result = randomUUID();
    expect(['8', '9', 'a', 'b']).toContain(result[19]);
  });

  // Test case 7: Generates unique UUIDs
  it('7. should generate unique UUIDs', () => {
    const uuids = new Set<string>();

    for (let i = 0; i < 1000; i++) {
      uuids.add(randomUUID());
    }

    // All should be unique
    expect(uuids.size).toBe(1000);
  });

  // Test case 8: Uses lowercase hex digits
  it('8. should use lowercase hex digits', () => {
    const result = randomUUID();
    const withoutHyphens = result.replace(/-/g, '');

    for (const char of withoutHyphens) {
      expect('0123456789abcdef').toContain(char);
    }
  });

  // Test case 9: Multiple calls produce different values
  it('9. should produce different UUIDs on consecutive calls', () => {
    const uuid1 = randomUUID();
    const uuid2 = randomUUID();
    const uuid3 = randomUUID();

    expect(uuid1).not.toBe(uuid2);
    expect(uuid2).not.toBe(uuid3);
    expect(uuid1).not.toBe(uuid3);
  });

  // Test case 10: Works in loop without issues
  it('10. should work correctly in tight loop', () => {
    const uuids: string[] = [];

    for (let i = 0; i < 100; i++) {
      uuids.push(randomUUID());
    }

    // All should be valid
    uuids.forEach((uuid) => {
      expect(uuid).toMatch(uuidV4Regex);
    });

    // All should be unique
    expect(new Set(uuids).size).toBe(100);
  });

  // Test case 11: Performance test
  it('11. should generate UUIDs efficiently', () => {
    const startTime = performance.now();

    for (let i = 0; i < 1000; i++) {
      randomUUID();
    }

    const endTime = performance.now();
    expect(endTime - startTime).toBeLessThan(100);
  });

  // Test case 12: Correct structure segments
  it('12. should have correct segment lengths', () => {
    const result = randomUUID();
    const segments = result.split('-');

    expect(segments).toHaveLength(5);
    expect(segments[0].length).toBe(8);
    expect(segments[1].length).toBe(4);
    expect(segments[2].length).toBe(4);
    expect(segments[3].length).toBe(4);
    expect(segments[4].length).toBe(12);
  });
});
