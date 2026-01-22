#!/bin/bash

set -e

echo "Moving test files to packages structure..."

# Function to move tests
move_tests() {
  old_name=$1
  new_name=$2
  old_test_dir="functionsUnittests/$old_name"
  new_test_dir="packages/$new_name/tests"
  
  if [ -d "$old_test_dir" ]; then
    echo "Moving $old_name tests..."
    mkdir -p "$new_test_dir"
    if ls "$old_test_dir"/*.test.ts 1> /dev/null 2>&1; then
      mv "$old_test_dir"/*.test.ts "$new_test_dir/"
      echo "  ✓ Moved to $new_test_dir"
    fi
  fi
}

# Move all tests
move_tests "arrayFunctions" "array"
move_tests "asyncFunctions" "async"
move_tests "collectionFunctions" "collection"
move_tests "configurationFunctions" "configuration"
move_tests "cryptoFunctions" "crypto"
move_tests "dateFunctions" "date"
move_tests "encodingFunctions" "encoding"
move_tests "eventFunctions" "event"
move_tests "mathFunctions" "math"
move_tests "networkFunctions" "network"
move_tests "objectFunctions" "object"
move_tests "stringFunctions" "string"
move_tests "utilityFunctions" "utility"
move_tests "validationFunctions" "validation"

echo ""
echo "✓ All tests moved to packages!"
