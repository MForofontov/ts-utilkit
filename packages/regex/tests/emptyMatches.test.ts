import { countMatches } from '../src/countMatches';
import { extractMatches } from '../src/extractMatches';
import { extractMatchGroups } from '../src/extractMatchGroups';
import { findAll } from '../src/findAll';

describe('zero-width regex matching', () => {
  it('1. counts zero-width matches and leaves caller state unchanged', () => {
    const regex = /(?=a)/g;
    regex.lastIndex = 1;
    expect(countMatches('aa', regex)).toBe(2);
    expect(regex.lastIndex).toBe(1);
  });

  it('2. extracts empty matches including the end of input', () => {
    expect(extractMatches('a', /(?:)/g)).toEqual(['', '']);
    expect(extractMatchGroups('a', /(?:)/g).map((m) => m.index)).toEqual([
      0, 1,
    ]);
    expect(findAll('a', /(?:)/g).map((m) => m.index)).toEqual([0, 1]);
  });

  it('3. advances over complete Unicode code points', () => {
    expect(countMatches('😀', /(?:)/gu)).toBe(2);
    expect(extractMatches('😀', /(?:)/gu)).toEqual(['', '']);
    expect(extractMatchGroups('😀', /(?:)/gu).map((m) => m.index)).toEqual([
      0, 2,
    ]);
    expect(findAll('😀', /(?:)/gu).map((m) => m.index)).toEqual([0, 2]);
  });
});
