import { findKey } from '../src/findKey';

/**
 * Unit tests for the findKey function.
 */
describe('findKey', () => {
  // ── Normal usage ──────────────────────────────────────────────────────────

  it('1. should return the key whose value matches the predicate', () => {
    // Arrange
    const obj = { a: 1, b: 2, c: 3 };

    // Act
    const result = findKey(obj, (v) => v === 2);

    // Assert
    expect(result).toBe('b');
  });

  it('2. should return the first matching key when multiple match', () => {
    const obj = { x: 10, y: 20, z: 20 };
    // 'y' comes before 'z' in insertion order
    expect(findKey(obj, (v) => v === 20)).toBe('y');
  });

  it('3. should match using both value and key in the predicate', () => {
    const obj = { id_1: true, id_2: false, id_3: true };
    expect(findKey(obj, (v, k) => v && k.endsWith('3'))).toBe('id_3');
  });

  it('4. should work with string values', () => {
    const obj = { a: 'foo', b: 'bar', c: 'baz' };
    expect(findKey(obj, (v) => v.startsWith('ba'))).toBe('b');
  });

  it('5. should work with object values', () => {
    const obj = { u1: { active: false }, u2: { active: true } };
    expect(findKey(obj, (v) => v.active)).toBe('u2');
  });

  it('6. should return the only key when object has one entry', () => {
    expect(findKey({ sole: 99 }, (v) => v > 0)).toBe('sole');
  });

  // ── No match ──────────────────────────────────────────────────────────────

  it('7. should return undefined when no value matches', () => {
    expect(findKey({ a: 1, b: 2 }, (v) => v > 100)).toBeUndefined();
  });

  it('8. should return undefined for an empty object', () => {
    expect(findKey({}, () => true)).toBeUndefined();
  });

  it('9. should return undefined when predicate always returns false', () => {
    expect(findKey({ a: 'x', b: 'y' }, () => false)).toBeUndefined();
  });

  // ── Error cases ───────────────────────────────────────────────────────────
});
