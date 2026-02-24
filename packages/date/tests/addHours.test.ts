import { addHours } from '../src/addHours';

describe('addHours', () => {
  it('1. should add hours within the same day', () => {
    const date = new Date('2025-01-15T10:00:00');
    const result = addHours(date, 3);
    expect(result.getHours()).toBe(13);
    expect(result.getDate()).toBe(15);
  });

  it('2. should cross midnight into the next day', () => {
    const result = addHours(new Date('2025-01-15T22:00:00'), 4);
    expect(result.getDate()).toBe(16);
    expect(result.getHours()).toBe(2);
  });

  it('3. should subtract hours with a negative value', () => {
    const result = addHours(new Date('2025-01-15T10:00:00'), -3);
    expect(result.getHours()).toBe(7);
    expect(result.getDate()).toBe(15);
  });

  it('4. should cross midnight backwards with a negative value', () => {
    const result = addHours(new Date('2025-01-15T01:00:00'), -3);
    expect(result.getDate()).toBe(14);
    expect(result.getHours()).toBe(22);
  });

  it('5. should return same time when adding zero hours', () => {
    const date = new Date('2025-01-15T12:30:00');
    const result = addHours(date, 0);
    expect(result).toEqual(date);
  });

  it('6. should handle fractional hours (1.5 hours = 90 minutes)', () => {
    const result = addHours(new Date('2025-01-15T10:00:00'), 1.5);
    expect(result.getHours()).toBe(11);
    expect(result.getMinutes()).toBe(30);
  });

  it('7. should cross a year boundary', () => {
    const result = addHours(new Date('2025-12-31T23:00:00'), 2);
    expect(result.getFullYear()).toBe(2026);
    expect(result.getMonth()).toBe(0);
    expect(result.getDate()).toBe(1);
  });

  it('8. should not modify the original date', () => {
    const original = new Date('2025-01-15T10:00:00');
    const originalTime = original.getTime();
    addHours(original, 5);
    expect(original.getTime()).toBe(originalTime);
  });

  it('9. should advance the date by 2 days when adding 48 hours', () => {
    const result = addHours(new Date('2025-01-15T10:00:00'), 48);
    expect(result.getDate()).toBe(17);
    expect(result.getHours()).toBe(10);
  });

  it('10. should cross a month boundary when adding hours', () => {
    const result = addHours(new Date('2025-01-31T20:00:00'), 5);
    expect(result.getMonth()).toBe(1); // February
    expect(result.getDate()).toBe(1);
    expect(result.getHours()).toBe(1);
  });

  it('11. should preserve minutes and seconds when adding hours', () => {
    const result = addHours(new Date('2025-06-15T10:30:45'), 3);
    expect(result.getHours()).toBe(13);
    expect(result.getMinutes()).toBe(30);
    expect(result.getSeconds()).toBe(45);
  });

  it('12. should throw Error for invalid date', () => {
    expect(() => addHours(new Date('invalid'), 1)).toThrow('Invalid date');
  });

  it('13. should throw Error when hours is NaN', () => {
    expect(() => addHours(new Date('2025-01-01'), NaN)).toThrow('Hours must be a number');
  });
});
