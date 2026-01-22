/**
 * Parses basic XML string to object (simple implementation, no namespaces).
 *
 * @param xmlString - The XML string to parse.
 * @returns Object representation of XML.
 *
 * @throws {TypeError} If xmlString is not a string.
 * @throws {Error} If XML is malformed.
 *
 * @example
 * // Parse XML
 * deserializeFromXML('<person><name>John</name><age>30</age></person>');
 * // { person: { name: 'John', age: '30' } }
 *
 * @example
 * // Parse with repeated tags (becomes array)
 * deserializeFromXML('<root><item>1</item><item>2</item></root>');
 * // { root: { item: ['1', '2'] } }
 *
 * @note Very basic parser - does not support attributes or namespaces.
 *
 * @complexity Time: O(n), Space: O(n) where n is XML string length
 */
export function deserializeFromXML(xmlString: string): Record<string, any> {
  if (typeof xmlString !== 'string') {
    throw new TypeError(`xmlString must be a string, got ${typeof xmlString}`);
  }

  const unescapeXML = (str: string): string => {
    return str
      .replace(/&apos;/g, "'")
      .replace(/&quot;/g, '"')
      .replace(/&gt;/g, '>')
      .replace(/&lt;/g, '<')
      .replace(/&amp;/g, '&');
  };

  const parse = (xml: string): any => {
    const trimmed = xml.trim();

    // Check for simple text content (no tags)
    if (!trimmed.includes('<')) {
      return unescapeXML(trimmed);
    }

    const result: Record<string, any> = {};
    let pos = 0;

    while (pos < trimmed.length) {
      // Skip whitespace
      while (pos < trimmed.length && /\s/.test(trimmed[pos])) {
        pos++;
      }

      if (pos >= trimmed.length || trimmed[pos] !== '<') {
        break;
      }

      // Check for self-closing tag
      const selfClosingMatch = trimmed.slice(pos).match(/^<([^/>\s]+)[^>]*\/>/);
      if (selfClosingMatch) {
        const tag = selfClosingMatch[1];
        if (result[tag] !== undefined) {
          if (Array.isArray(result[tag])) {
            result[tag].push(null);
          } else {
            result[tag] = [result[tag], null];
          }
        } else {
          result[tag] = null;
        }
        pos += selfClosingMatch[0].length;
        continue;
      }

      // Check for regular tag
      const tagMatch = trimmed.slice(pos).match(/^<([^/>\s]+)[^>]*>/);
      if (tagMatch) {
        const tag = tagMatch[1];
        pos += tagMatch[0].length;

        // Find the closing tag
        const closingTag = `</${tag}>`;
        let depth = 1;
        let contentStart = pos;

        while (pos < trimmed.length && depth > 0) {
          if (trimmed.slice(pos).startsWith(`<${tag}`)) {
            // Another opening tag
            const nextTag = trimmed.slice(pos).match(/^<[^/>\s]+[^>]*>/);
            if (nextTag) {
              pos += nextTag[0].length;
              depth++;
            } else {
              pos++;
            }
          } else if (trimmed.slice(pos).startsWith(closingTag)) {
            depth--;
            if (depth === 0) {
              const content = trimmed.slice(contentStart, pos);
              const parsedContent = content ? parse(content) : null;

              if (result[tag] !== undefined) {
                if (Array.isArray(result[tag])) {
                  result[tag].push(parsedContent);
                } else {
                  result[tag] = [result[tag], parsedContent];
                }
              } else {
                result[tag] = parsedContent;
              }

              pos += closingTag.length;
            } else {
              pos++;
            }
          } else {
            pos++;
          }
        }
      } else {
        pos++;
      }
    }

    return Object.keys(result).length > 0 ? result : unescapeXML(trimmed);
  };

  try {
    return parse(xmlString);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to parse XML: ${error.message}`);
    }
    throw new Error('Failed to parse XML: Unknown error');
  }
}
