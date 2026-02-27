import { maskString } from '../src/maskString';

/**
 * Unit tests for the maskString function.
 */
describe('maskString', () => {
  // ─── Normal usage ─────────────────────────────────────────────────────────

  it('1. should mask the middle portion of a credit card number', () => {
    expect(maskString('4111111111111111', 4, 11)).toBe('4111********1111');
  });

  it('2. should mask the first character', () => {
    expect(maskString('hello', 0, 0)).toBe('*ello');
  });

  it('3. should mask the last character', () => {
    expect(maskString('hello', 4, 4)).toBe('hell*');
  });

  it('4. should mask the entire string', () => {
    expect(maskString('hello', 0, 4)).toBe('*****');
  });

  it('5. should mask a single character in the middle', () => {
    expect(maskString('hello', 2, 2)).toBe('he*lo');
  });

  it('6. should use a custom mask character', () => {
    expect(maskString('4111111111111111', 4, 11, '#')).toBe('4111########1111');
  });

  it('7. should use a dot as a custom mask character', () => {
    expect(maskString('secret', 2, 4, '.')).toBe('se...t');
  });

  it('8. should mask part of an email address', () => {
    expect(maskString('user@example.com', 1, 3)).toBe('u***@example.com');
  });

  it('9. should mask a phone number', () => {
    expect(maskString('1234567890', 3, 6)).toBe('123****890');
  });

  it('10. should clamp end index to the string length when end exceeds it', () => {
    // end=20 exceeds length 5, should mask to end of string
    expect(maskString('hello', 2, 20)).toBe('he***');
  });

  it('11. should clamp start index when start equals string length', () => {
    // start=5 equals length, nothing to mask
    expect(maskString('hello', 5, 10)).toBe('hello');
  });

  // ─── Edge cases ────────────────────────────────────────────────────────────

  it('12. should return empty string when input is empty', () => {
    expect(maskString('', 0, 0)).toBe('');
  });

  it('13. should handle start equal to end (single character)', () => {
    expect(maskString('abc', 1, 1)).toBe('a*c');
  });

  it('14. should work with a single-character string', () => {
    expect(maskString('x', 0, 0)).toBe('*');
  });

  it('15. should handle start=0 and end equal to last index', () => {
    expect(maskString('abc', 0, 2)).toBe('***');
  });

  // ─── Error cases ───────────────────────────────────────────────────────────

  it('16. should throw TypeError when str is not a string', () => {
    expect(() => maskString(123 as unknown as string, 0, 1)).toThrow(TypeError);
    expect(() => maskString(123 as unknown as string, 0, 1)).toThrow(
      'str must be a string, got number',
    );
  });

  it('17. should throw TypeError when start is not a number', () => {
    expect(() => maskString('hello', '2' as unknown as number, 4)).toThrow(TypeError);
    expect(() => maskString('hello', '2' as unknown as number, 4)).toThrow(
      'start must be a number, got string',
    );
  });

  it('18. should throw TypeError when end is not a number', () => {
    expect(() => maskString('hello', 0, '4' as unknown as number)).toThrow(TypeError);
    expect(() => maskString('hello', 0, '4' as unknown as number)).toThrow(
      'end must be a number, got string',
    );
  });

  it('19. should throw TypeError when mask is not a string', () => {
    expect(() => maskString('hello', 0, 4, 9 as unknown as string)).toThrow(TypeError);
    expect(() => maskString('hello', 0, 4, 9 as unknown as string)).toThrow(
      'mask must be a string, got number',
    );
  });

  it('20. should throw Error when start is negative', () => {
    expect(() => maskString('hello', -1, 4)).toThrow(Error);
    expect(() => maskString('hello', -1, 4)).toThrow(
      'start must be a non-negative number',
    );
  });

  it('21. should throw Error when end is negative', () => {
    expect(() => maskString('hello', 0, -1)).toThrow(Error);
    expect(() => maskString('hello', 0, -1)).toThrow(
      'end must be a non-negative number',
    );
  });

  it('22. should throw Error when start is NaN', () => {
    expect(() => maskString('hello', NaN, 4)).toThrow(Error);
    expect(() => maskString('hello', NaN, 4)).toThrow(
      'start must be a non-negative number',
    );
  });

  it('23. should throw Error when end is NaN', () => {
    expect(() => maskString('hello', 0, NaN)).toThrow(Error);
    expect(() => maskString('hello', 0, NaN)).toThrow(
      'end must be a non-negative number',
    );
  });

  it('24. should throw Error when start is greater than end', () => {
    expect(() => maskString('hello', 4, 2)).toThrow(Error);
    expect(() => maskString('hello', 4, 2)).toThrow(
      'start must be less than or equal to end',
    );
  });

  it('25. should throw Error when mask is empty string', () => {
    expect(() => maskString('hello', 0, 4, '')).toThrow(Error);
    expect(() => maskString('hello', 0, 4, '')).toThrow(
      'mask must be exactly one character',
    );
  });

  it('26. should throw Error when mask has more than one character', () => {
    expect(() => maskString('hello', 0, 4, '**')).toThrow(Error);
    expect(() => maskString('hello', 0, 4, '**')).toThrow(
      'mask must be exactly one character',
    );
  });
});
