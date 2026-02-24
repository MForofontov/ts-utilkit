import { addYears } from '../src/addYears';

describe('addYears', () => {
  it('1. should add years to a date', () => {
    expect(addYears(new Date('2025-06-15'), 3)).toEqual(new Date('2028-06-15'));
  });

  it('2. should subtract years with a negative value', () => {
    expect(addYears(new Date('2025-06-15'), -5)).toEqual(new Date('2020-06-15'));
  });

  it('3. should return the same date when adding zero years', () => {
    const date = new Date('2025-01-01');
    expect(addYears(date, 0)).toEqual(date);
  });

  it('4. should handle leap day (Feb 29 + 1 year overflows to March 1 in non-leap year)', () => {
    // JavaScript setFullYear does not clamp — Feb 29 in a non-leap year overflows to March 1
    const result = addYears(new Date('2024-02-29'), 1);
    expect(result).toEqual(new Date('2025-03-01'));
  });

  it('5. should handle leap day (Feb 29 + 4 years = Feb 29 in next leap year)', () => {
    const result = addYears(new Date('2024-02-29'), 4);
    expect(result).toEqual(new Date('2028-02-29'));
  });

  it('6. should add a large number of years', () => {
    expect(addYears(new Date('2025-01-01'), 100)).toEqual(new Date('2125-01-01'));
  });

  it('7. should preserve time components', () => {
    const date = new Date('2025-06-15T14:30:00');
    const result = addYears(date, 2);
    expect(result.getFullYear()).toBe(2027);
    expect(result.getHours()).toBe(14);
    expect(result.getMinutes()).toBe(30);
  });

  it('8. should not modify the original date', () => {
    const original = new Date('2025-06-15');
    const originalTime = original.getTime();
    addYears(original, 1);
    expect(original.getTime()).toBe(originalTime);
  });

  it('9. should keep December dates in December after adding a year', () => {
    const result = addYears(new Date(2025, 11, 25), 1); // Dec 25 local
    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(11); // December
    expect(result.getDate()).toBe(25);
  });

  it('10. should keep January 1st as January 1st after adding years', () => {
    const result = addYears(new Date(2025, 0, 1), 3); // Jan 1 local
    expect(result.getFullYear()).toBe(2028);
    expect(result.getMonth()).toBe(0); // January
    expect(result.getDate()).toBe(1);
  });

  it('11. should handle a very large year addition', () => {
    const result = addYears(new Date(2025, 5, 15), 1000); // June 15 local
    expect(result.getFullYear()).toBe(3025);
    expect(result.getMonth()).toBe(5); // June
    expect(result.getDate()).toBe(15);
  });

  it('12. should throw Error for invalid date', () => {
    expect(() => addYears(new Date('invalid'), 1)).toThrow('Invalid date');
  });

  it('13. should throw Error when years is NaN', () => {
    expect(() => addYears(new Date('2025-01-01'), NaN)).toThrow('Years must be a number');
  });
});
