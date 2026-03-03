import { removeAccents } from '../src/removeAccents';

/**
 * Unit tests for the removeAccents function.
 */
describe('removeAccents', () => {
  // ─── Normal usage ─────────────────────────────────────────────────────────

  it('1. should remove acute accent from é', () => {
    expect(removeAccents('café')).toBe('cafe');
  });

  it('2. should remove diaeresis from ï', () => {
    expect(removeAccents('naïve')).toBe('naive');
  });

  it('3. should remove accents from multiple words', () => {
    expect(removeAccents('naïve résumé')).toBe('naive resume');
  });

  it('4. should handle Spanish characters', () => {
    expect(removeAccents('señor')).toBe('senor');
    expect(removeAccents('jalapeño')).toBe('jalapeno');
  });

  it('5. should handle German umlaut ü', () => {
    expect(removeAccents('über')).toBe('uber');
  });

  it('6. should handle German umlaut ä and ö', () => {
    expect(removeAccents('äpfel')).toBe('apfel');
    expect(removeAccents('öl')).toBe('ol');
  });

  it('7. should handle French accents in a full phrase', () => {
    expect(removeAccents('être ou ne pas être')).toBe(
      'etre ou ne pas etre',
    );
  });

  it('8. should handle uppercase accented characters', () => {
    expect(removeAccents('CAFÉ')).toBe('CAFE');
    expect(removeAccents('Ñoño')).toBe('Nono');
  });

  it('9. should handle grave accent à', () => {
    expect(removeAccents('à')).toBe('a');
    expect(removeAccents('crème')).toBe('creme');
  });

  it('10. should handle circumflex accent ê', () => {
    expect(removeAccents('fête')).toBe('fete');
    expect(removeAccents('forêt')).toBe('foret');
  });

  it('11. should handle cedilla ç', () => {
    expect(removeAccents('façade')).toBe('facade');
    expect(removeAccents('garçon')).toBe('garcon');
  });

  it('12. should handle Italian accented vowels', () => {
    expect(removeAccents('università')).toBe('universita');
  });

  // ─── Edge cases ────────────────────────────────────────────────────────────

  it('13. should return empty string for empty input', () => {
    expect(removeAccents('')).toBe('');
  });

  it('14. should return string unchanged when no accents are present', () => {
    expect(removeAccents('hello world')).toBe('hello world');
  });

  it('15. should return string unchanged for ASCII-only input', () => {
    expect(removeAccents('The quick brown fox 123')).toBe(
      'The quick brown fox 123',
    );
  });

  it('16. should handle a single accented character', () => {
    expect(removeAccents('é')).toBe('e');
    expect(removeAccents('ü')).toBe('u');
  });

  it('17. should handle whitespace-only strings unchanged', () => {
    expect(removeAccents('   ')).toBe('   ');
  });

  // ─── Error cases ───────────────────────────────────────────────────────────

});
