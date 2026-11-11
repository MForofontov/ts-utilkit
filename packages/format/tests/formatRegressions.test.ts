import { formatBytes } from '../src/formatBytes';
import { formatRelativeTime } from '../src/formatRelativeTime';

describe('formatting boundaries', () => {
  it('1. formats positive fractional bytes using the smallest unit', () => {
    expect(formatBytes(0.5)).toBe('0.50 Bytes');
    expect(formatBytes(Number.MIN_VALUE)).not.toContain('undefined');
  });

  it('2. rejects invalid Date objects like invalid date strings', () => {
    expect(() => formatRelativeTime(new Date(NaN))).toThrow(Error);
    expect(() => formatRelativeTime(new Date(), new Date(NaN))).toThrow(Error);
  });

  it('3. rejects non-finite precision', () => {
    expect(() => formatBytes(1, NaN)).toThrow(Error);
    expect(() => formatBytes(1, Infinity)).toThrow(Error);
  });
});
