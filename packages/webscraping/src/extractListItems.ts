/**
 * Extracts list items from HTML content (ul and ol).
 *
 * @param html - The HTML content to extract lists from.
 * @param preserveNesting - Whether to preserve nested list structure (default: false).
 * @returns Array of lists, where each list contains array of items.
 *
 * @throws {TypeError} If html is not a string.
 * @throws {TypeError} If preserveNesting is not a boolean.
 *
 * @example
 * const html = '<ul><li>Item 1</li><li>Item 2</li></ul>';
 * const lists = extractListItems(html);
 * // [['Item 1', 'Item 2']]
 *
 * @example
 * // Nested lists
 * const html = '<ul><li>A<ul><li>A1</li></ul></li></ul>';
 * const lists = extractListItems(html, true);
 *
 * @complexity Time: O(n) where n is html length, Space: O(m) where m is list data size
 */
export function extractListItems(
  html: string,
  preserveNesting: boolean = false,
): string[][] {
  if (typeof html !== 'string') {
    throw new TypeError(`html must be a string, got ${typeof html}`);
  }
  if (typeof preserveNesting !== 'boolean') {
    throw new TypeError(
      `preserveNesting must be a boolean, got ${typeof preserveNesting}`,
    );
  }

  const lists: string[][] = [];
  const listRegex = /<[ou]l[^>]*>([\s\S]*?)<\/[ou]l>/gi;
  let listMatch: RegExpExecArray | null;

  while ((listMatch = listRegex.exec(html)) !== null) {
    const listContent = listMatch[1];
    const items: string[] = [];

    if (preserveNesting) {
      // Keep nested structure
      const itemRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
      let itemMatch: RegExpExecArray | null;

      while ((itemMatch = itemRegex.exec(listContent)) !== null) {
        let itemText = itemMatch[1];
        // Clean but preserve nested lists as text
        itemText = itemText.replace(/&nbsp;/g, ' ');
        itemText = itemText.replace(/\s+/g, ' ').trim();
        if (itemText) {
          items.push(itemText);
        }
      }
    } else {
      // Flatten nested lists
      const itemRegex = /<li[^>]*>([\s\S]*?)<\/li>/gi;
      let itemMatch: RegExpExecArray | null;

      while ((itemMatch = itemRegex.exec(listContent)) !== null) {
        let itemText = itemMatch[1];
        // Remove nested tags
        itemText = itemText.replace(/<[^>]+>/g, ' ');
        itemText = itemText.replace(/&nbsp;/g, ' ');
        itemText = itemText.replace(/\s+/g, ' ').trim();
        if (itemText) {
          items.push(itemText);
        }
      }
    }

    if (items.length > 0) {
      lists.push(items);
    }
  }

  return lists;
}
