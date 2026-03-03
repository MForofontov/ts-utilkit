#!/usr/bin/env python3
"""Update CHANGELOGs for all packages."""

import os

PACKAGES = [
    'array', 'async', 'collection', 'crypto', 'date', 'encoding',
    'env', 'event', 'format', 'math', 'network', 'object', 'parsing',
    'random', 'regex', 'serialization', 'testing-utilities', 'utility',
    'validation', 'webscraping'
]

CHANGE_ENTRY = """\

### Changed
- Remove all runtime `typeof`/`instanceof` TypeError guards; rely on TypeScript type system for type safety
- Remove all `@throws {TypeError}` JSDoc tags from all affected functions
- Remove all TypeError test cases from all test files

"""

ROOT = '/Users/mykfor1/Documents/git/github/ts-utilkit/packages'

for pkg in PACKAGES:
    fpath = os.path.join(ROOT, pkg, 'CHANGELOG.md')
    if not os.path.exists(fpath):
        print(f'MISSING: {pkg}')
        continue
    with open(fpath, 'r') as f:
        content = f.read()
    if 'Remove all runtime' in content:
        print(f'SKIP: {pkg} (already has entry)')
        continue
    if '## [Unreleased]' not in content:
        print(f'NO_UNRELEASED: {pkg}')
        continue
    new_content = content.replace('## [Unreleased]\n', '## [Unreleased]\n' + CHANGE_ENTRY, 1)
    with open(fpath, 'w') as f:
        f.write(new_content)
    print(f'UPDATED: {pkg}')
