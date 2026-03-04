import { extractNumbers } from '../src/extractNumbers';

/**
 * Unit tests for the extractNumbers function.
 */
describe('extractNumbers', () => {
  // ─── Normal usage ─────────────────────────────────────────────────────────

  it('1. should extract integers from a sentence', () => {
    expect(extractNumbers('I have 3 cats and 2 dogs')).toEqual([3, 2]);
  });

  it('2. should extract decimal numbers', () => {
    expect(extractNumbers('I have 3 cats and 1.5 dogs')).toEqual([3, 1.5]);
  });

  it('3. should extract a negative number', () => {
    expect(extractNumbers('Temperature is -12.5 degrees')).toEqual([-12.5]);
  });

  it('4. should extract mixed positive and negative numbers', () => {
    expect(extractNumbers('Range from -5 to 10')).toEqual([-5, 10]);
  });

  it('5. should extract numbers embedded in text without spaces', () => {
    expect(extractNumbers('item1costs$4.99')).toEqual([1, 4.99]);
  });

  it('6. should extract a price', () => {
    expect(extractNumbers('Total: $29.99')).toEqual([29.99]);
  });

  it('7. should extract multiple prices', () => {
    expect(extractNumbers('item costs $4.99 and another $12.00')).toEqual([
      4.99, 12,
    ]);
  });

  it('8. should extract year and a percentage', () => {
    expect(extractNumbers('In 2024, success rate was 98.5%')).toEqual([
      2024, 98.5,
    ]);
  });

  it('9. should extract a single large integer', () => {
    expect(extractNumbers('Population: 1000000')).toEqual([1000000]);
  });

  it('10. should extract zero', () => {
    expect(extractNumbers('score is 0 points')).toEqual([0]);
  });

  it('11. should extract a positive signed number (+5)', () => {
    expect(extractNumbers('+5 degrees')).toEqual([5]);
  });

  it('12. should extract multiple decimals from a data string', () => {
    expect(extractNumbers('x=3.14 y=2.71 z=1.41')).toEqual([3.14, 2.71, 1.41]);
  });

  // ─── Edge cases ────────────────────────────────────────────────────────────

  it('13. should return empty array when no numbers are present', () => {
    expect(extractNumbers('no numbers here')).toEqual([]);
  });

  it('14. should return empty array for an empty string', () => {
    expect(extractNumbers('')).toEqual([]);
  });

  it('15. should return empty array for whitespace-only string', () => {
    expect(extractNumbers('   ')).toEqual([]);
  });

  it('16. should return empty array for a string with only punctuation', () => {
    expect(extractNumbers('!@#$%^&*()')).toEqual([]);
  });

  it('17. should handle a string that is just a single number', () => {
    expect(extractNumbers('42')).toEqual([42]);
    expect(extractNumbers('3.14')).toEqual([3.14]);
  });

  it('18. should handle consecutive numbers separated by letters', () => {
    expect(extractNumbers('3a4b5')).toEqual([3, 4, 5]);
  });

  // ─── Error cases ───────────────────────────────────────────────────────────
});
