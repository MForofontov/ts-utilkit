import { addMinutes } from '../src/addMinutes';

describe('addMinutes', () => {
  it('1. should add minutes within the same hour', () => {
    const result = addMinutes(new Date('2025-01-15T10:00:00'), 30);
    expect(result.getHours()).toBe(10);
    expect(result.getMinutes()).toBe(30);
  });

  it('2. should cross an hour boundary', () => {
    const result = addMinutes(new Date('2025-01-15T10:45:00'), 30);
    expect(result.getHours()).toBe(11);
    expect(result.getMinutes()).toBe(15);
  });

  it('3. should subtract minutes with a negative value', () => {
    const result = addMinutes(new Date('2025-01-15T10:10:00'), -10);
    expect(result.getHours()).toBe(10);
    expect(result.getMinutes()).toBe(0);
  });

  it('4. should cross midnight into the next day', () => {
    const result = addMinutes(new Date('2025-01-15T23:50:00'), 15);
    expect(result.getDate()).toBe(16);
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(5);
  });

  it('5. should return same time when adding zero minutes', () => {
    const date = new Date('2025-01-15T12:30:00');
    expect(addMinutes(date, 0)).toEqual(date);
  });

  it('6. should handle large minute values spanning multiple days', () => {
    // 1440 minutes = 24 hours
    const result = addMinutes(new Date('2025-01-15T00:00:00'), 1440);
    expect(result.getDate()).toBe(16);
    expect(result.getHours()).toBe(0);
  });

  it('7. should handle fractional minutes', () => {
    // 1.5 minutes = 90 seconds
    const result = addMinutes(new Date('2025-01-15T10:00:00'), 1.5);
    expect(result.getMinutes()).toBe(1);
    expect(result.getSeconds()).toBe(30);
  });

  it('8. should not modify the original date', () => {
    const original = new Date('2025-01-15T10:00:00');
    const originalTime = original.getTime();
    addMinutes(original, 30);
    expect(original.getTime()).toBe(originalTime);
  });

  it('9. should subtract minutes crossing midnight backwards', () => {
    const result = addMinutes(new Date('2025-01-16T00:05:00'), -10);
    expect(result.getDate()).toBe(15); // back to previous day
    expect(result.getHours()).toBe(23);
    expect(result.getMinutes()).toBe(55);
  });

  it('10. should add exactly 60 minutes to advance by one full hour', () => {
    const result = addMinutes(new Date('2025-06-15T14:00:00'), 60);
    expect(result.getHours()).toBe(15);
    expect(result.getMinutes()).toBe(0);
  });

  it('11. should preserve the seconds component when adding minutes', () => {
    const result = addMinutes(new Date('2025-06-15T10:00:45'), 5);
    expect(result.getMinutes()).toBe(5);
    expect(result.getSeconds()).toBe(45);
  });

  it('12. should throw Error for invalid date', () => {
    expect(() => addMinutes(new Date('invalid'), 10)).toThrow('Invalid date');
  });

  it('13. should throw Error when minutes is NaN', () => {});
});
