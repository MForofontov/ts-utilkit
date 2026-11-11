import { isValidISODate } from '../src/isValidISODate';

describe('ISO dates before year 100', () => {
  it('1. validates years literally rather than applying the Date constructor offset', () => {
    expect(isValidISODate('0099-01-01')).toBe(true);
    expect(isValidISODate('0000-02-29')).toBe(true);
    expect(isValidISODate('0001-02-29')).toBe(false);
  });
});
