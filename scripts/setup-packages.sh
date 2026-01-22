#!/bin/bash

# Script to set up individual npm packages for each module

set -e

# Define modules
MODULES=(
  "arrayFunctions"
  "asyncFunctions"
  "collectionFunctions"
  "configurationFunctions"
  "cryptoFunctions"
  "dateFunctions"
  "encodingFunctions"
  "eventFunctions"
  "formatFunctions"
  "mathFunctions"
  "networkFunctions"
  "objectFunctions"
  "parsingFunctions"
  "randomFunctions"
  "regexFunctions"
  "serializationFunctions"
  "stringFunctions"
  "utilityFunctions"
  "validationFunctions"
  "webScrapingFunctions"
)

# Create packages directory if it doesn't exist
mkdir -p packages

echo "Setting up packages for all modules..."

for module in "${MODULES[@]}"; do
  echo "Setting up package for $module..."
  
  # Create package directory
  PKG_DIR="packages/$module"
  mkdir -p "$PKG_DIR/src"
  
  # Copy source files
  if [ -d "$module" ]; then
    cp -r "$module"/* "$PKG_DIR/src/"
  fi
  
  echo "✓ Created $PKG_DIR"
done

echo ""
echo "✓ All package directories created successfully!"
echo "Next steps:"
echo "1. Run node scripts/generate-package-json.js to create package.json files"
echo "2. Run node scripts/generate-configs.js to create tsconfig files"
echo "3. Run node scripts/generate-readmes.js to create README files"
