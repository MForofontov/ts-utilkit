import { countSubstring } from '../src/countSubstring';
import { escapeRegex } from '../src/escapeRegex';

describe('countSubstring literal equivalence', () => {
  const previous = (text: string, search: string): number =>
    search.length === 0
      ? 0
      : (text.match(new RegExp(escapeRegex(search), 'g')) || []).length;

  it('matches the previous implementation across Unicode and regex metacharacters', () => {
    const alphabet = [
      'a',
      'b',
      '.',
      '*',
      '/',
      '\\',
      '\n',
      '\0',
      '😀',
      '\ud83d',
    ];
    const strings = ['', ...alphabet];
    for (const a of alphabet) {
      for (const b of alphabet) strings.push(a + b);
    }
    for (const text of strings) {
      for (const search of strings) {
        expect(countSubstring(text, search)).toBe(previous(text, search));
      }
    }
  });

  it('retains non-overlapping counting for dense and absent long searches', () => {
    expect(countSubstring('a'.repeat(200_001), 'aa')).toBe(100_000);
    expect(countSubstring('😀😀😀', '\ude00')).toBe(3);
    expect(countSubstring('abababa', 'aba')).toBe(2);
    expect(countSubstring('a'.repeat(1_000), 'missing')).toBe(0);
    for (const length of [255, 256, 257]) {
      expect(countSubstring('a'.repeat(length), 'aa')).toBe(
        previous('a'.repeat(length), 'aa'),
      );
    }
  });
});
