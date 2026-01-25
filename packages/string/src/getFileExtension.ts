/**
 * Extracts the file extension from a filename or file path.
 *
 * @param filename - The filename or file path to extract the extension from.
 * @returns The file extension without the dot, or an empty string if none exists.
 *
 * @throws {TypeError} If filename is not a string.
 *
 * @example
 * // Basic usage
 * getFileExtension("example.txt"); // "txt"
 * getFileExtension("document.pdf"); // "pdf"
 *
 * @example
 * // No extension
 * getFileExtension("example"); // ""
 * getFileExtension("README"); // ""
 *
 * @example
 * // Multiple dots
 * getFileExtension("archive.tar.gz"); // "gz" (returns last extension)
 * getFileExtension("file.backup.old"); // "old"
 *
 * @example
 * // Edge cases
 * getFileExtension(".gitignore"); // "" (hidden file without extension)
 * getFileExtension("file."); // "" (trailing dot)
 * getFileExtension("."); // ""
 * getFileExtension(""); // ""
 *
 * @example
 * // With paths
 * getFileExtension("/path/to/file.js"); // "js"
 * getFileExtension("C:\\Users\\file.txt"); // "txt"
 *
 * @note Returns only the extension without the dot (e.g., "txt" not ".txt").
 * @note Hidden files starting with a dot (like .gitignore) return empty string.
 * @note For files with multiple dots, returns only the last extension.
 * @note Works with both Unix and Windows path formats.
 *
 * @complexity Time: O(n), Space: O(1) where n is the length of the filename
 */
export function getFileExtension(filename: string): string {
  const lastDotIndex = filename.lastIndexOf('.');
  if (
    lastDotIndex === -1 ||
    lastDotIndex === 0 ||
    lastDotIndex === filename.length - 1
  ) {
    return '';
  }
  return filename.substring(lastDotIndex + 1);
}
