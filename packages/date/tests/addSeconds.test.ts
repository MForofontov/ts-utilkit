import { addSeconds } from '../src/addSeconds';

describe('addSeconds', () => {
  it('1. should add seconds within the same minute', () => {
    const result = addSeconds(new Date('2025-01-15T10:00:00'), 30);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(30);
  });

  it('2. should cross a minute boundary', () => {
    const result = addSeconds(new Date('2025-01-15T10:00:45'), 30);
    expect(result.getMinutes()).toBe(1);
    expect(result.getSeconds()).toBe(15);
  });

  it('3. should subtract seconds with a negative value', () => {
    const result = addSeconds(new Date('2025-01-15T10:01:00'), -30);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(30);
  });

  it('4. should cross midnight into the next day', () => {
    const result = addSeconds(new Date('2025-01-15T23:59:55'), 10);
    expect(result.getDate()).toBe(16);
    expect(result.getHours()).toBe(0);
    expect(result.getMinutes()).toBe(0);
    expect(result.getSeconds()).toBe(5);
  });

  it('5. should return same time when adding zero seconds', () => {
    const date = new Date('2025-01-15T12:30:00');
    expect(addSeconds(date, 0)).toEqual(date);
  });

  it('6. should handle large second values spanning multiple hours', () => {
    // 3600 seconds = 1 hour
    const result = addSeconds(new Date('2025-01-15T10:00:00'), 3600);
    expect(result.getHours()).toBe(11);
    expect(result.getSeconds()).toBe(0);
  });

  it('7. should handle fractional seconds (sub-millisecond is truncated by Date)', () => {
    // 1.5 seconds = 1500 ms
    const result = addSeconds(new Date('2025-01-15T10:00:00.000'), 1.5);
    expect(result.getSeconds()).toBe(1);
    expect(result.getMilliseconds()).toBe(500);
  });

  it('8. should not modify the original date', () => {
    const original = new Date('2025-01-15T10:00:00');
    const originalTime = original.getTime();
    addSeconds(original, 60);
    expect(original.getTime()).toBe(originalTime);
  });

  it('9. should advance the date by one day when adding 86,400 seconds', () => {
    const result = addSeconds(new Date('2025-06-15T00:00:00'), 86_400);
    expect(result.getDate()).toBe(16);
    expect(result.getHours()).toBe(0);
    expect(result.getSeconds()).toBe(0);
  });

  it('10. should subtract seconds going back to the previous day', () => {
    const result = addSeconds(new Date('2025-06-15T00:00:10'), -20);
    expect(result.getDate()).toBe(14);
    expect(result.getHours()).toBe(23);
    expect(result.getSeconds()).toBe(50);
  });

  it('11. should preserve the milliseconds component when adding seconds', () => {
    const result = addSeconds(new Date('2025-06-15T10:00:00.250'), 5);
    expect(result.getSeconds()).toBe(5);
    expect(result.getMilliseconds()).toBe(250);
  });

  it('12. should throw Error for invalid date', () => {
    expect(() => addSeconds(new Date('invalid'), 30)).toThrow('Invalid date');
  });

  it('13. should throw Error when seconds is NaN', () => {
    expect(() => addSeconds(new Date('2025-01-01'), NaN)).toThrow('Seconds must be a number');
  });
});
