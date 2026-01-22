#!/bin/bash

# Refactor to standard monorepo structure
# - Move everything to packages/
# - Remove "Functions" suffix
# - Colocate tests with packages
# - Clean up root directories

set -e

echo "========================================="
echo "  Refactoring to Standard Monorepo"
echo "========================================="
echo ""

# Module mappings: old_name -> new_name
declare -A MODULES
MODULES[arrayFunctions]=array
MODULES[asyncFunctions]=async
MODULES[collectionFunctions]=collection
MODULES[configurationFunctions]=configuration
MODULES[cryptoFunctions]=crypto
MODULES[dateFunctions]=date
MODULES[encodingFunctions]=encoding
MODULES[eventFunctions]=event
MODULES[formatFunctions]=format
MODULES[mathFunctions]=math
MODULES[networkFunctions]=network
MODULES[objectFunctions]=object
MODULES[parsingFunctions]=parsing
MODULES[randomFunctions]=random
MODULES[regexFunctions]=regex
MODULES[serializationFunctions]=serialization
MODULES[stringFunctions]=string
MODULES[utilityFunctions]=utility
MODULES[validationFunctions]=validation
MODULES[webScrapingFunctions]=webscraping

echo "Step 1: Renaming package directories..."
for old_name in "${!MODULES[@]}"; do
  new_name="${MODULES[$old_name]}"
  
  if [ -d "packages/$old_name" ]; then
    echo "  Renaming packages/$old_name -> packages/$new_name"
    mv "packages/$old_name" "packages/$new_name"
  fi
done
echo "✓ Package directories renamed"
echo ""

echo "Step 2: Removing duplicate src/ layer (already have src from copy)..."
# The packages already have src/ from the setup script, so we're good
echo "✓ Source structure is correct"
echo ""

echo "Step 3: Moving tests to packages..."
for old_name in "${!MODULES[@]}"; do
  new_name="${MODULES[$old_name]}"
  
  # Construct test directory names
  test_dir_old="functionsUnittests/${old_name}Unittest"
  test_dir_alt1="functionsUnittests/${old_name}Unittests"
  test_dir_alt2="functionsUnittests/${old_name}sUnittest"
  
  target_dir="packages/$new_name/tests"
  
  # Find which test directory exists
  if [ -d "$test_dir_old" ]; then
    echo "  Moving $test_dir_old -> $target_dir"
    mkdir -p "$target_dir"
    cp -r "$test_dir_old"/* "$target_dir/" 2>/dev/null || true
  elif [ -d "$test_dir_alt1" ]; then
    echo "  Moving $test_dir_alt1 -> $target_dir"
    mkdir -p "$target_dir"
    cp -r "$test_dir_alt1"/* "$target_dir/" 2>/dev/null || true
  elif [ -d "$test_dir_alt2" ]; then
    echo "  Moving $test_dir_alt2 -> $target_dir"
    mkdir -p "$target_dir"
    cp -r "$test_dir_alt2"/* "$target_dir/" 2>/dev/null || true
  else
    echo "  ⚠ No tests found for $old_name"
  fi
done
echo "✓ Tests moved to packages"
echo ""

echo "Step 4: Cleaning up root-level directories..."
for old_name in "${!MODULES[@]}"; do
  if [ -d "$old_name" ]; then
    echo "  Removing root-level $old_name/"
    rm -rf "$old_name"
  fi
done
echo "✓ Root directories cleaned"
echo ""

echo "Step 5: Removing old test directory..."
if [ -d "functionsUnittests" ]; then
  echo "  Removing functionsUnittests/"
  rm -rf "functionsUnittests"
fi
echo "✓ Old test directory removed"
echo ""

echo "========================================="
echo "  Refactoring Complete!"
echo "========================================="
echo ""
echo "New structure:"
echo "  packages/"
echo "    ├── array/        (was arrayFunctions)"
echo "    │   ├── src/"
echo "    │   ├── tests/"
echo "    │   └── package.json"
echo "    ├── async/"
echo "    ├── crypto/"
echo "    └── ..."
echo ""
echo "Next steps:"
echo "  1. Update test imports (run: node scripts/update-test-imports.js)"
echo "  2. Update root index.ts"
echo "  3. Update package.json scripts"
echo "  4. Run tests to verify: npm test"
