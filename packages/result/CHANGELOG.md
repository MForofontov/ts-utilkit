# Changelog - @ts-utilkit/result

All notable changes to this package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2026-07-29

### Added

- Initial release of `@ts-utilkit/result`
- Types: `Ok`, `Err`, `Result`
- Constructors: `ok`, `err`
- Guards: `isOk`, `isErr`
- Transforms: `map`, `mapErr`, `andThen`
- Extractors: `unwrap`, `unwrapOr`, `match`
- Bridge: `fromThrowable`
