import { deserializeFromXML } from '../src/deserializeFromXML';

describe('XML element boundaries', () => {
  it.each(['__proto__', 'constructor', 'toString'])(
    'keeps %s elements as own data, including repeated and empty elements',
    (name) => {
      const result: unknown = deserializeFromXML(
        `<${name}><value>first</value></${name}><${name}/><${name}>last</${name}>`,
      );
      expect(Object.getPrototypeOf(result)).toBe(Object.prototype);
      expect(Object.keys(result as object)).toEqual([name]);
      expect((result as Record<string, unknown>)[name]).toEqual([
        { value: 'first' },
        null,
        'last',
      ]);
    },
  );

  it('distinguishes an element name from a longer name with the same prefix', () => {
    expect(deserializeFromXML('<a><ab>text</ab></a>')).toEqual({
      a: { ab: 'text' },
    });
  });

  it('does not count self-closing children as unclosed same-name elements', () => {
    expect(deserializeFromXML('<a><a/><a>text</a></a>')).toEqual({
      a: { a: [null, 'text'] },
    });
  });
});
