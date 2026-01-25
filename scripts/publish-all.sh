#!/bin/bash

# Script to build and publish all packages to npm

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo "========================================="
echo "  ts-utilkit Package Publisher"
echo "========================================="
echo ""

# Check if user is logged in to npm
if ! npm whoami &> /dev/null; then
  echo -e "${RED}Error: You must be logged in to npm${NC}"
  echo "Run: npm login"
  exit 1
fi

NPM_USER=$(npm whoami)
echo -e "${GREEN}✓ Logged in as: $NPM_USER${NC}"
echo ""

# Confirm publishing
echo -e "${YELLOW}This will publish 21 packages to npm under the @ts-utilkit scope.${NC}"
read -p "Are you sure you want to continue? (yes/no): " -r
echo
if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
  echo "Publishing cancelled."
  exit 0
fi

# Packages to publish (object must come before array since array depends on it)
PACKAGES=(
  "async"
  "collection"
  "configuration"
  "crypto"
  "date"
  "encoding"
  "event"
  "format"
  "network"
  "object"
  "parsing"
  "random"
  "regex"
  "serialization"
  "string"
  "testing-utilities"
  "utility"
  "validation"
  "webscraping"
  "array"
  "math"
)

SUCCESS_COUNT=0
FAILURE_COUNT=0
FAILED_PACKAGES=()

echo "Building and publishing packages..."
echo ""

for package in "${PACKAGES[@]}"; do
  PACKAGE_PATH="packages/$package"
  
  echo "----------------------------------------"
  echo "Processing: @ts-utilkit/$package"
  echo "----------------------------------------"
  
  if [ ! -d "$PACKAGE_PATH" ]; then
    echo -e "${RED}✗ Directory not found: $PACKAGE_PATH${NC}"
    ((FAILURE_COUNT++))
    FAILED_PACKAGES+=("@ts-utilkit/$package")
    continue
  fi
  
  cd "$PACKAGE_PATH"
  
  # Check if this version is already published
  PACKAGE_NAME="@ts-utilkit/$package"
  CURRENT_VERSION=$(node -p "require('./package.json').version")
  
  echo "  Checking npm registry for version $CURRENT_VERSION..."
  if npm view "$PACKAGE_NAME@$CURRENT_VERSION" version &> /dev/null; then
    echo -e "  ${YELLOW}⚠️  Version $CURRENT_VERSION already published, skipping...${NC}"
    cd - > /dev/null
    continue
  fi
  
  # Publish the package (prepublishOnly hook will build it)
  echo "  Publishing..."
  if npm publish --access public; then
    echo -e "  ${GREEN}✓ Published successfully${NC}"
    ((SUCCESS_COUNT++))
  else
    echo -e "  ${RED}✗ Publish failed${NC}"
    ((FAILURE_COUNT++))
    FAILED_PACKAGES+=("@ts-utilkit/$package")
  fi
  
  cd - > /dev/null
  echo ""
done

echo "========================================="
echo "  Publishing Complete"
echo "========================================="
echo -e "${GREEN}✓ Successfully published: $SUCCESS_COUNT packages${NC}"

if [ $FAILURE_COUNT -gt 0 ]; then
  echo -e "${RED}✗ Failed to publish: $FAILURE_COUNT packages${NC}"
  echo ""
  echo "Failed packages:"
  for pkg in "${FAILED_PACKAGES[@]}"; do
    echo "  - $pkg"
  done
  exit 1
else
  echo ""
  echo -e "${GREEN}All packages published successfully! 🎉${NC}"
  echo ""
  echo "You can now install packages with:"
  echo "  npm install @ts-utilkit/array"
  echo "  npm install @ts-utilkit/crypto"
  echo "  # etc."
fi
