#!/bin/bash
# Reports source modules under packages/*/src that lack a matching test file
# named <basename>.test.ts under packages/*/tests/ (nested src dirs flatten to basename).
# Private helpers (names starting with _) and types.ts are skipped.

set -euo pipefail

echo "Functions missing unit tests:"
echo "=============================="
echo ""

missing_count=0

while IFS= read -r -d '' srcfile; do
  # packages/<pkg>/src/...
  pkg=$(echo "$srcfile" | sed -n 's|^packages/\([^/]*\)/src/.*|\1|p')
  if [[ -z "$pkg" ]]; then
    continue
  fi

  test_base=$(basename "$srcfile" .ts)

  # Skip private helpers and type-only modules
  if [[ "$test_base" == _* || "$test_base" == "types" ]]; then
    continue
  fi

  testfile="packages/${pkg}/tests/${test_base}.test.ts"
  if [[ ! -f "$testfile" ]]; then
    echo "❌ ${srcfile}"
    missing_count=$((missing_count + 1))
  fi
done < <(find packages -type f -path '*/src/*.ts' ! -name 'index.ts' -print0 | sort -z)

echo ""
echo "=============================="
echo "Total functions missing tests: $missing_count"
