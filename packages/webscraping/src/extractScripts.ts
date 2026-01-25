/**
 * Interface for extracted script data.
 */
export interface ScriptData {
  src?: string;
  inline?: string;
  type?: string;
  async?: boolean;
  defer?: boolean;
}

/**
 * Extracts script tags from HTML content.
 *
 * @param html - The HTML content to extract scripts from.
 * @returns Array of script objects with src, inline content, and attributes.
 *
 * @throws {TypeError} If html is not a string.
 *
 * @example
 * const html = '<script src="app.js"></script>';
 * const scripts = extractScripts(html);
 * // [{ src: 'app.js' }]
 *
 * @example
 * // Inline script
 * const html = '<script>console.log("test");</script>';
 * const scripts = extractScripts(html);
 * // [{ inline: 'console.log("test");' }]
 *
 * @complexity Time: O(n) where n is html length, Space: O(m) where m is number of scripts
 */
export function extractScripts(html: string): ScriptData[] {
  if (typeof html !== 'string') {
    throw new TypeError(`html must be a string, got ${typeof html}`);
  }

  const scripts: ScriptData[] = [];
  const scriptRegex = /<script([^>]*)>([\s\S]*?)<\/script>/gi;
  let match: RegExpExecArray | null;

  while ((match = scriptRegex.exec(html)) !== null) {
    const attributes = match[1];
    const content = match[2].trim();
    const script: ScriptData = {};

    // Extract src attribute
    const srcMatch = /src=["']([^"']+)["']/i.exec(attributes);
    if (srcMatch) {
      script.src = srcMatch[1];
    }

    // Extract type attribute
    const typeMatch = /type=["']([^"']+)["']/i.exec(attributes);
    if (typeMatch) {
      script.type = typeMatch[1];
    }

    // Check for async/defer
    script.async = /\basync\b/i.test(attributes);
    script.defer = /\bdefer\b/i.test(attributes);

    // Add inline content if exists
    if (content && !script.src) {
      script.inline = content;
    }

    scripts.push(script);
  }

  return scripts;
}
