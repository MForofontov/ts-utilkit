#!/usr/bin/env python3
"""
Remove TypeError test cases from TypeScript test files.
IMPROVED VERSION: Removes entire multi-line expect() chains, not just the .toThrow() line.

Removes:
1. Complete it(...) / test(...) blocks whose description contains "TypeError"
2. Entire multi-line expect(...).toThrow(TypeError) chains
3. Entire multi-line expect(...).toThrow('...must be a..., got...') companion chains
4. Any remaining dangling expect(() => ...) calls that lost their .toThrow()
"""

import re
import sys
import os
import glob


# ─────────────────────────────────────────────────────────────────────────────
# Block-finding helper
# ─────────────────────────────────────────────────────────────────────────────

def find_matching_paren(content: str, open_pos: int) -> int:
    """Given the position of '(' in content, return the position of the matching ')'."""
    depth = 0
    i = open_pos
    while i < len(content):
        c = content[i]
        if c == '(':
            depth += 1
        elif c == ')':
            depth -= 1
            if depth == 0:
                return i
        i += 1
    return len(content) - 1


def find_matching_brace(content: str, open_pos: int) -> int:
    """Given the position of '{' in content, return the position of the matching '}'."""
    depth = 0
    i = open_pos
    while i < len(content):
        c = content[i]
        if c == '{':
            depth += 1
        elif c == '}':
            depth -= 1
            if depth == 0:
                return i
        i += 1
    return len(content) - 1


# ─────────────────────────────────────────────────────────────────────────────
# Step 1: Remove complete it/test blocks with "TypeError" in description
# ─────────────────────────────────────────────────────────────────────────────

def remove_it_blocks_with_typeerror(content: str) -> str:
    """Remove complete it/test blocks whose description mentions TypeError."""

    pattern = re.compile(
        r'(?:[ \t]*//[^\n]*\n)*'          # optional preceding comment lines
        r'[ \t]*(?:it|test)\s*\('         # it( or test(
        r'\s*[\'"`](?:[^\'"`]*[Tt]ype[Ee]rror[^\'"`]*)[\'"`]\s*,'  # description with TypeError
    )

    result = content
    while True:
        m = pattern.search(result)
        if not m:
            break

        # Find the opening paren of it(
        paren_open = result.index('(', m.start() + result[m.start():].index('it') if 'it(' in result[m.start():m.end()] else result.index('test(', m.start()))
        paren_close = find_matching_paren(result, paren_open)

        # Move past ); and trailing newline
        end_pos = paren_close + 1
        while end_pos < len(result) and result[end_pos] in ' \t':
            end_pos += 1
        if end_pos < len(result) and result[end_pos] == ';':
            end_pos += 1
        if end_pos < len(result) and result[end_pos] == '\n':
            end_pos += 1

        result = result[:m.start()] + result[end_pos:]

    return result


# ─────────────────────────────────────────────────────────────────────────────
# Step 2: Remove entire multi-line expect().toThrow(TypeError) chains
# ─────────────────────────────────────────────────────────────────────────────

def remove_expect_throw_typeerror_chains(content: str) -> str:
    """Remove entire expect(...).toThrow(TypeError) chains including the leading expect(."""

    # Pattern: find .toThrow(TypeError); occurrences
    # Then walk back to find the start of the expect( call on any line
    throw_pattern = re.compile(r'\.(?:rejects\s*\.\s*)?toThrow\s*\(\s*TypeError\s*\)\s*;')

    result = content
    while True:
        m = throw_pattern.search(result)
        if not m:
            break

        throw_start = m.start()

        # Walk backwards to find 'expect(' or 'await expect('
        # Look for expect( before the .toThrow()
        # The expect(...) call ends just before .toThrow() so we need to find
        # the opening 'expect(' by finding the matching paren context
        # Strategy: find the last 'expect(' before the '.'
        expect_pos = result.rfind('expect(', 0, throw_start)
        if expect_pos == -1:
            # Can't find it, just remove the .toThrow(TypeError); line
            end_pos = m.end()
            if end_pos < len(result) and result[end_pos] == '\n':
                end_pos += 1
            result = result[:m.start()] + result[end_pos:]
            continue

        # Check for 'await ' before expect(
        line_start_pos = result.rfind('\n', 0, expect_pos)
        if line_start_pos == -1:
            line_start_pos = 0
        else:
            line_start_pos += 1

        line_prefix = result[line_start_pos:expect_pos]
        if re.match(r'[ \t]*(?:await\s+)?$', line_prefix):
            block_start = line_start_pos
        else:
            block_start = expect_pos

        # Find end: after .toThrow(TypeError); consume trailing newline
        end_pos = m.end()
        if end_pos < len(result) and result[end_pos] == '\n':
            end_pos += 1

        result = result[:block_start] + result[end_pos:]

    return result


# ─────────────────────────────────────────────────────────────────────────────
# Step 3: Remove entire multi-line expect().toThrow('...must be..., got...') chains
# ─────────────────────────────────────────────────────────────────────────────

def remove_expect_throw_type_msg_chains(content: str) -> str:
    """Remove entire expect(...).toThrow('param must be a type, got X') chains."""

    # Match .toThrow('...must be a/an..., got...') patterns
    throw_msg_pattern = re.compile(
        r'\.(?:rejects\s*\.\s*)?toThrow\s*\(\s*[\'"`][^\'"`]+'
        r'(?:must be a |must be an |, got )[^\'"`]*[\'"`]\s*\)\s*;'
    )

    result = content
    while True:
        m = throw_msg_pattern.search(result)
        if not m:
            break

        throw_start = m.start()
        expect_pos = result.rfind('expect(', 0, throw_start)
        if expect_pos == -1:
            end_pos = m.end()
            if end_pos < len(result) and result[end_pos] == '\n':
                end_pos += 1
            result = result[:m.start()] + result[end_pos:]
            continue

        line_start_pos = result.rfind('\n', 0, expect_pos)
        if line_start_pos == -1:
            line_start_pos = 0
        else:
            line_start_pos += 1

        line_prefix = result[line_start_pos:expect_pos]
        if re.match(r'[ \t]*(?:await\s+)?$', line_prefix):
            block_start = line_start_pos
        else:
            block_start = expect_pos

        end_pos = m.end()
        if end_pos < len(result) and result[end_pos] == '\n':
            end_pos += 1

        result = result[:block_start] + result[end_pos:]

    return result


# ─────────────────────────────────────────────────────────────────────────────
# Step 4: Remove dangling expect(() => ...) calls that have no .toThrow()
# ─────────────────────────────────────────────────────────────────────────────

def remove_dangling_expects(content: str) -> str:
    """
    Remove expect(() => ...) calls that are followed by
    another statement without a .toThrow() or .rejects chain.
    These result from incomplete cleanup.
    """
    # Pattern: expect(EXPR), where EXPR is an arrow function
    # followed immediately by whitespace/newline then another expect( or });
    # Indicating the .toThrow() was removed

    # Match: expect(\n  ...,\n  + (next statement that isn't .toThrow)
    dangling_pattern = re.compile(
        r'[ \t]*(?:await\s+)?expect\s*\(\s*(?:\(\)\s*=>|async\s*\(\)\s*=>)(?:[^;{}]|\n)*?'
        r'\n[ \t]*\)\s*\n(?=[ \t]*(?:expect|await|}\)|};|\};))',
        re.DOTALL
    )

    result = content
    changed = True
    while changed:
        new_result = dangling_pattern.sub('', result)
        changed = new_result != result
        result = new_result

    return result


# ─────────────────────────────────────────────────────────────────────────────
# Cleanup
# ─────────────────────────────────────────────────────────────────────────────

def clean_up_blank_lines(content: str) -> str:
    """Remove excessive consecutive blank lines (more than 2)."""
    return re.sub(r'\n{3,}', '\n\n', content)


# ─────────────────────────────────────────────────────────────────────────────
# Main
# ─────────────────────────────────────────────────────────────────────────────

def process_test_file(filepath: str) -> bool:
    """Process a single test file. Returns True if modified."""
    with open(filepath, 'r', encoding='utf-8') as f:
        original = f.read()

    modified = original

    # Step 1: Remove complete it/test blocks with TypeError in name
    modified = remove_it_blocks_with_typeerror(modified)

    # Step 2: Remove entire expect().toThrow(TypeError) chains
    modified = remove_expect_throw_typeerror_chains(modified)

    # Step 3: Remove entire expect().toThrow('must be...got') companion chains
    modified = remove_expect_throw_type_msg_chains(modified)

    # Step 4: Remove dangling expect() calls
    modified = remove_dangling_expects(modified)

    # Step 5: Clean up blank lines
    modified = clean_up_blank_lines(modified)

    if modified != original:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(modified)
        return True
    return False


def main():
    root = '/Users/mykfor1/Documents/git/github/ts-utilkit/packages'

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
