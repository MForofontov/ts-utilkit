#!/usr/bin/env python3
"""
Remove all runtime typeof/instanceof TypeError guards from TypeScript source files.
Also removes the corresponding @throws {TypeError} JSDoc tags.
"""

import re
import sys
import os
import glob

def remove_type_error_guards(content: str) -> str:
    """Remove TypeError guards and JSDoc tags from source content."""

    # 1. Remove @throws {TypeError} JSDoc lines.
    # Handles optional blank JSDoc line after it: " *\n"
    content = re.sub(
        r' \* @throws \{TypeError\}[^\n]*\n(?: \*\n)?',
        '',
        content
    )

    # 2. Remove if-blocks that throw TypeError.
    # Match any if (...) { throw new TypeError(...); } block.
    # The condition block can span multiple lines (for chained conditions).
    # The throw can be single-line or multi-line.
    # We use a careful pattern that won't swallow adjacent blocks.

    # Pattern A: if (COND) {\n    throw new TypeError(`...`);\n  }
    # COND may span lines but cannot contain '{' or '}'
    content = re.sub(
        r'\n([ \t]*)if \((?:[^{}]|\n)*?\) \{\n(?:[ \t]*)throw new TypeError\([^;]*\);\n([ \t]*)\}',
        _check_and_remove,
        content,
        flags=re.DOTALL
    )

    # Pattern B: if (COND) {\n    throw new TypeError(\n      `...`,\n    );\n  }
    content = re.sub(
        r'\n([ \t]*)if \((?:[^{}]|\n)*?\) \{\n(?:[ \t]*)throw new TypeError\(\n(?:[ \t]*)[^;]*;\n(?:[ \t]*)\);\n([ \t]*)\}',
        _check_and_remove,
        content,
        flags=re.DOTALL
    )

    # Remove any double blank lines that may result from removals
    content = re.sub(r'\n{3,}', '\n\n', content)

    return content


def _check_and_remove(m: re.Match) -> str:
    """Return empty string (remove the block). All our patterns are TypeError-specific."""
    return ''


def process_file(filepath: str) -> bool:
    """Process a single file. Returns True if modified."""
    with open(filepath, 'r', encoding='utf-8') as f:
        original = f.read()

    modified = remove_type_error_guards(original)

    if modified != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(modified)
        return True
    return False


def main():
    root = '/Users/mykfor1/Documents/git/github/ts-utilkit/packages'

    # Find all .ts source files (not test files, not .d.ts)
    pattern = os.path.join(root, '**', 'src', '*.ts')
    files = glob.glob(pattern, recursive=True)
    files = [f for f in files if not f.endswith('.d.ts') and '.test.' not in f]
    files.sort()

    modified_count = 0
    for filepath in files:
        try:
            if process_file(filepath):
                modified_count += 1
                print(f'  MODIFIED: {os.path.relpath(filepath, root)}')
        except Exception as e:
            print(f'  ERROR: {filepath}: {e}', file=sys.stderr)

    print(f'\nDone. Modified {modified_count} / {len(files)} files.')


if __name__ == '__main__':
    main()
