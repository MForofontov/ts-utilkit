#!/usr/bin/env python3
"""
Remove TypeError test cases from TypeScript test files.

Removes:
1. Complete it(...) / test(...) blocks whose description contains "TypeError"
2. Standalone expect(...).toThrow(TypeError) lines and their companion message assertions
3. "must be a ... got ..." type-mismatch assertions within any test block
"""

import re
import sys
import os
import glob


def extract_block(content: str, start_pos: int) -> tuple[int, int]:
    """
    Given a position just before the opening '{' of a block,
    find the matching closing '}' accounting for nested braces.
    Returns (block_start, block_end) where content[block_start:block_end] is the full block.
    """
    i = start_pos
    # Find the opening brace
    while i < len(content) and content[i] != '{':
        i += 1
    if i >= len(content):
        return start_pos, start_pos

    depth = 0
    block_start = i
    while i < len(content):
        if content[i] == '{':
            depth += 1
        elif content[i] == '}':
            depth -= 1
            if depth == 0:
                return block_start, i + 1
        i += 1
    return block_start, len(content)


def remove_it_blocks_with_typeerror(content: str) -> str:
    """Remove complete it/test blocks whose description mentions TypeError."""

    # Find all it/test calls with TypeError in the description
    # Pattern: optional comment lines, then it( or test( with TypeError in the string
    pattern = re.compile(
        r'(?:[ \t]*//[^\n]*\n)*'  # optional preceding comment lines
        r'[ \t]*(?:it|test)\s*\(\s*[\'"`](?:[^\'"`]*[Tt]ype[Ee]rror[^\'"`]*)[\'"`]\s*,'
    )

    result = content
    while True:
        m = pattern.search(result)
        if not m:
            break

        # Find the arrow function / block start after the description
        # The match ends just after the comma; we need to find the opening {
        search_from = m.end()
        block_start, block_end = extract_block(result, search_from)

        if block_start == search_from and block_end == search_from:
            # Couldn't find block, skip
            break

        # The full it/test call ends after the closing brace + optional ); or )
        end_of_call = block_end
        # Consume ); or ) and trailing newline
        while end_of_call < len(result) and result[end_of_call] in ' \t':
            end_of_call += 1
        if end_of_call < len(result) and result[end_of_call] == ')':
            end_of_call += 1
        if end_of_call < len(result) and result[end_of_call] == ';':
            end_of_call += 1
        if end_of_call < len(result) and result[end_of_call] == '\n':
            end_of_call += 1

        # Remove from start of match to end of call
        result = result[:m.start()] + result[end_of_call:]

    return result


def remove_standalone_typeerror_assertions(content: str) -> str:
    """
    Remove individual expect(...).toThrow(TypeError) lines and their
    companion 'must be a ... got' message assertions.
    """
    lines = content.split('\n')
    result_lines = []
    i = 0
    while i < len(lines):
        line = lines[i]
        # Check if this line contains toThrow(TypeError) or toThrow(new TypeError
        if re.search(r'\.toThrow\s*\(\s*TypeError\s*\)', line):
            i += 1
            continue
        # Check if this is a companion message assertion for a type mismatch
        # Patterns: 'X must be a Y, got Z' or "X must be ..."
        if re.search(r'\.toThrow\s*\(\s*[\'"`][^\'"`]*(must be a|must be an|got \$\{)', line):
            i += 1
            continue
        result_lines.append(line)
        i += 1
    return '\n'.join(result_lines)


def clean_up_blank_lines(content: str) -> str:
    """Remove excessive consecutive blank lines (more than 2)."""
    return re.sub(r'\n{3,}', '\n\n', content)


def process_test_file(filepath: str) -> bool:
    """Process a single test file. Returns True if modified."""
    with open(filepath, 'r', encoding='utf-8') as f:
        original = f.read()

    modified = original

    # Step 1: Remove complete it/test blocks with TypeError in name
    modified = remove_it_blocks_with_typeerror(modified)

    # Step 2: Remove standalone TypeError assertions
    modified = remove_standalone_typeerror_assertions(modified)

    # Step 3: Clean up blank lines
    modified = clean_up_blank_lines(modified)

    if modified != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(modified)
        return True
    return False


def main():
    root = '/Users/mykfor1/Documents/git/github/ts-utilkit/packages'

    # Find all test files
    pattern = os.path.join(root, '**', '*.test.ts')
    files = glob.glob(pattern, recursive=True)
    files.sort()

    modified_count = 0
    for filepath in files:
        try:
            if process_test_file(filepath):
                modified_count += 1
                print(f'  MODIFIED: {os.path.relpath(filepath, root)}')
        except Exception as e:
            print(f'  ERROR: {filepath}: {e}', file=sys.stderr)

    print(f'\nDone. Modified {modified_count} / {len(files)} test files.')


if __name__ == '__main__':
    main()
