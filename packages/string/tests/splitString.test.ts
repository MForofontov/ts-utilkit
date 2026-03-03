import { splitString } from '../src/splitString';

describe('splitString', () => {
  it('1. should split by a delimiter', () => {
    expect(splitString('a,b,c', ',')).toEqual(['a', 'b', 'c']);
  });
  it('2. should split into characters with empty delimiter', () => {
    expect(splitString('abc', '')).toEqual(['a', 'b', 'c']);
  });
  it('3. should return array with original string when delimiter not found', () => {
    expect(splitString('hello', ',')).toEqual(['hello']);
  });
  it('4. should handle empty string', () => {
    expect(splitString('', ',')).toEqual(['']);
  });
  it('5. should handle multiple spaces as delimiter', () => {
    expect(splitString('hello  world', '  ')).toEqual(['hello', 'world']);
  });
});
