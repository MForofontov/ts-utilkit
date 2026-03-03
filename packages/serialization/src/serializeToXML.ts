/**
 * Converts an object to basic XML string (simple implementation, no namespaces).
 *
 * @param data - Object to convert to XML.
 * @param rootTag - Root element tag name (default: 'root').
 * @param pretty - Whether to format with indentation (default: false).
 * @returns XML string representation.
 *
 * @example
 * // Convert to XML
 * serializeToXML({ name: 'John', age: 30 }, 'person');
 * // '<person><name>John</name><age>30</age></person>'
 *
 * @example
 * // With pretty formatting
 * serializeToXML({ name: 'John' }, 'person', true);
 * // '<person>\n  <name>John</name>\n</person>'
 *
 * @note Arrays are serialized with repeated tags. Attributes not supported.
 *
 * @complexity Time: O(n), Space: O(n) where n is object depth
 */
export function serializeToXML(
  data: any,
  rootTag: string = 'root',
  pretty: boolean = false,
): string {

  if (rootTag.length === 0) {
    throw new Error('rootTag cannot be empty');
  }

  const escapeXML = (str: string): string => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  const serialize = (obj: any, tag: string, depth: number = 0): string => {
    const indent = pretty ? '  '.repeat(depth) : '';
    const newline = pretty ? '\n' : '';

    if (obj === null || obj === undefined) {
      return `${indent}<${tag}/>${newline}`;
    }

    if (typeof obj !== 'object') {
      return `${indent}<${tag}>${escapeXML(String(obj))}</${tag}>${newline}`;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => serialize(item, tag, depth)).join('');
    }

    const children = Object.entries(obj)
      .map(([key, value]) => serialize(value, key, depth + 1))
      .join('');

    return `${indent}<${tag}>${newline}${children}${indent}</${tag}>${newline}`;
  };

  const xml = serialize(data, rootTag, 0);
  return xml.trim();
}
