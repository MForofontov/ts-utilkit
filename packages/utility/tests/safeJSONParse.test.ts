import { safeJSONParse } from '../src/safeJSONParse';

describe('safeJSONParse', () => {
  // Test case 1: Parse valid JSON object
  it('1. should parse a valid JSON object', () => {
    const json = '{"name":"John"}';
    expect(safeJSONParse(json, {})).toEqual({ name: 'John' });
  });

  // Test case 2: Return default for invalid JSON
  it('2. should return default for invalid JSON', () => {
    expect(safeJSONParse('invalid', { a: 1 })).toEqual({ a: 1 });
  });

  // Test case 3: Parse numeric JSON
  it('3. should parse numeric JSON', () => {
    expect(safeJSONParse('123', 0)).toBe(123);
  });

  // Test case 4: Parse JSON array
  it('4. should parse a JSON array', () => {
    expect(safeJSONParse('[1,2,3]', [])).toEqual([1, 2, 3]);
  });

  // Test case 5: Return default for empty string
  it('5. should return default for empty string', () => {
    expect(safeJSONParse('', { hello: 'world' })).toEqual({ hello: 'world' });
  });

  // Test case 6: Return null for invalid JSON
  it('6. should return null for invalid JSON', () => {
    expect(safeJSONParse('invalid', null)).toBeNull();
  });

  // Test case 7: Return false for invalid JSON
  it('7. should return false for invalid JSON', () => {
    expect(safeJSONParse('invalid', false)).toBe(false);
  });

  // Test case 8: Parse boolean JSON
  it('8. should parse boolean JSON', () => {
    expect(safeJSONParse('true', false)).toBe(true);
  });

  // Test case 9: Parse JSON with surrounding whitespace
  it('9. should parse JSON with surrounding whitespace', () => {
    expect(safeJSONParse('  {"a":1}  ', {})).toEqual({ a: 1 });
  });

  // Test case 10: Parse JSON literal null
  it('10. should parse JSON literal null', () => {
    expect(safeJSONParse('null', 'default')).toBeNull();
  });

  // Test case 11: Parse nested JSON object
  it('11. should parse a nested JSON object', () => {
    const json = '{"user":{"name":"John"}}';
    expect(safeJSONParse(json, {})).toEqual({ user: { name: 'John' } });
  });
});
