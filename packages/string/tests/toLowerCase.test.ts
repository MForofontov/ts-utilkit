import { toLowerCase } from '../src/toLowerCase';

describe('toLowerCase', () => {
  it('1. should convert uppercase to lowercase', () => {
    expect(toLowerCase('HELLO WORLD')).toBe('hello world');
  });
  it('2. should return already lowercase string unchanged', () => {
    expect(toLowerCase('hello')).toBe('hello');
  });
  it('3. should handle mixed case', () => {
    expect(toLowerCase('HeLLo WoRLd')).toBe('hello world');
  });
  it('4. should handle empty string', () => {
    expect(toLowerCase('')).toBe('');
  });
  it('5. should leave non-letter characters unchanged', () => {
    expect(toLowerCase('ABC123!@#')).toBe('abc123!@#');
  });
});
