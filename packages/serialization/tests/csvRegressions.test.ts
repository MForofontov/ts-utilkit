import { deserializeFromCSV } from '../src/deserializeFromCSV';
import { serializeToCSV } from '../src/serializeToCSV';
import { deserializeFromQueryString } from '../src/deserializeFromQueryString';

describe('serialization round-trip regressions', () => {
  it('retains blank rows with a whitespace delimiter', () => {
    const rows = [{ a: '', b: '' }];
    expect(
      deserializeFromCSV(serializeToCSV(rows, { delimiter: '\t' }), {
        delimiter: '\t',
      }),
    ).toEqual(rows);
  });

  it.each([null, undefined])('retains a single nullish cell %j', (value) => {
    expect(deserializeFromCSV(serializeToCSV([{ value }]))).toEqual([
      { value: '' },
    ]);
  });

  it.each(['', ' ', '\t', '\r', 'last\r', 'first\rsecond', '\r\n'])(
    'round-trips a single-column value %j',
    (value) => {
      const rows = [{ value }, { value: 'next' }];
      expect(deserializeFromCSV(serializeToCSV(rows))).toEqual(rows);
      expect(
        deserializeFromCSV(serializeToCSV(rows, { includeHeaders: false }), {
          hasHeaders: false,
        }),
      ).toEqual(rows.map((row) => ({ col0: row.value })));
    },
  );

  it.each(['', ' ', 'heading\r'])('round-trips header %j', (header) => {
    const rows = [{ [header]: 'value' }];
    expect(deserializeFromCSV(serializeToCSV(rows))).toEqual(rows);
  });

  it('1. round-trips quoted newlines and escaped quotes', () => {
    const rows = [{ name: 'A', text: 'first\nsecond "quoted"' }];
    expect(deserializeFromCSV(serializeToCSV(rows))).toEqual(rows);
    expect(deserializeFromCSV('name,value\r\nA,B\r\n')).toEqual([
      { name: 'A', value: 'B' },
    ]);
  });

  it('2. retains embedded equals signs and prototype-like repeated query keys', () => {
    const result = deserializeFromQueryString(
      '__proto__=one&__proto__=two&token=a=b=c',
    );
    expect(Object.hasOwn(result, '__proto__')).toBe(true);
    expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
    expect(result.__proto__).toEqual(['one', 'two']);
    expect(result.token).toBe('a=b=c');
    expect(deserializeFromQueryString('constructor[]=one')).toEqual({
      constructor: ['one'],
    });
  });

  it('3. rejects unterminated quoted CSV', () => {
    expect(() => deserializeFromCSV('name\n"unterminated')).toThrow(Error);
  });
});
