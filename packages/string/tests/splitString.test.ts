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
  it('6. should throw TypeError when str is not a string', () => {
    expect(() => splitString(123 as unknown as string, ',')).toThrow(TypeError);
    expect(() => splitString(123 as unknown as string, ',')).toThrow('str must be a string, got number');
  });
  it('7. should throw TypeError when delimiter is not a string', () => {
    expect(() => splitString('hello', 123 as unknown as string)).toThrow(TypeError);
    expect(() => splitString('hello', 123 as unknown as string)).toThrow('delimiter must be a string, got number');
  });
});
