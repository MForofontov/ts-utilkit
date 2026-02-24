import { isYesterday } from '../src/isYesterday';

describe('isYesterday', () => {
  it("1. should return true for yesterday's date", () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    expect(isYesterday(yesterday)).toBe(true);
  });

  it("2. should return false for today's date", () => {
    expect(isYesterday(new Date())).toBe(false);
  });

  it("3. should return false for tomorrow's date", () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    expect(isYesterday(tomorrow)).toBe(false);
  });

  it('4. should return true for yesterday at midnight (start of day)', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);
    expect(isYesterday(yesterday)).toBe(true);
  });

  it('5. should return true for yesterday at end of day', () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(23, 59, 59, 999);
    expect(isYesterday(yesterday)).toBe(true);
  });

  it('6. should return false for two days ago', () => {
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
    expect(isYesterday(twoDaysAgo)).toBe(false);
  });

  it('7. should return false for a date from a different year', () => {
    const pastDate = new Date();
    pastDate.setFullYear(pastDate.getFullYear() - 1);
    expect(isYesterday(pastDate)).toBe(false);
  });

  it('8. should return false for a specific historical date far in the past', () => {
    expect(isYesterday(new Date('2000-01-01'))).toBe(false);
  });

  it('9. should return false for a date three days ago', () => {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    expect(isYesterday(threeDaysAgo)).toBe(false);
  });

  it('10. should throw Error for invalid date', () => {
    expect(() => isYesterday(new Date('invalid'))).toThrow(Error);
    expect(() => isYesterday(new Date('invalid'))).toThrow('Invalid date');
  });
});
