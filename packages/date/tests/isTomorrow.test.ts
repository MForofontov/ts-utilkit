import { isTomorrow } from '../src/isTomorrow';

describe('isTomorrow', () => {
  it("1. should return true for tomorrow's date", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    expect(isTomorrow(tomorrow)).toBe(true);
  });

  it("2. should return false for today's date", () => {
    expect(isTomorrow(new Date())).toBe(false);
  });

  it("3. should return false for yesterday's date", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(isTomorrow(yesterday)).toBe(false);
  });

  it('4. should return true for tomorrow at midnight (start of day)', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    expect(isTomorrow(tomorrow)).toBe(true);
  });

  it('5. should return true for tomorrow at end of day', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(23, 59, 59, 999);
    expect(isTomorrow(tomorrow)).toBe(true);
  });

  it('6. should return false for two days from now', () => {
    const inTwoDays = new Date();
    inTwoDays.setDate(inTwoDays.getDate() + 2);
    expect(isTomorrow(inTwoDays)).toBe(false);
  });

  it('7. should return false for a date from a different year', () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    expect(isTomorrow(futureDate)).toBe(false);
  });

  it('8. should return false for a specific far-future date', () => {
    expect(isTomorrow(new Date('2100-01-01'))).toBe(false);
  });

  it('9. should return false for a date three days from now', () => {
    const inThreeDays = new Date();
    inThreeDays.setDate(inThreeDays.getDate() + 3);
    expect(isTomorrow(inThreeDays)).toBe(false);
  });

  it('10. should throw Error for invalid date', () => {
    expect(() => isTomorrow(new Date('invalid'))).toThrow(Error);
    expect(() => isTomorrow(new Date('invalid'))).toThrow('Invalid date');
  });
});
