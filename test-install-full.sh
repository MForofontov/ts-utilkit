#!/usr/bin/env bash
# Portable packed-artifact validation; build first with npm run build.
set -euo pipefail
cd "$(dirname "$0")"
npm run test:install:full
