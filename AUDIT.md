# Utility validation and improvement audit

Validated locally on Windows and Linux using Node 20.20.2, 22.23.4, and 24.22.1.
The project requires Node 20 or newer;
the system's default Node 16 was not used for validation. The matrix used the
package versions retained after the earlier release-version revert. The npm
release preparation below updates those versions at the user's request.
All 23 packages were published to npm on 2026-11-08 and verified through a fresh
public-registry installation. GitHub and npm rollout verification is recorded below.

Latest runtime verification: hosted GitHub Actions passed all six platform/runtime
jobs on 2026-11-08. The local matrix (runs completed 2026-10-30) records **6,350 tests
pass across 552 suites on each of the six Windows/Linux and Node 20/22/24
combinations**, all 23
package builds and source/test/Jest-configuration type checks pass, and full lint
reports **zero errors** with 277 warnings. Overall branch coverage is **96.20%**;
all four repository coverage metrics now exceed 95%. Details and measured
optimizations appear in the reliability-review and local compatibility sections below. Earlier
sections retain historical snapshots, including the previous 513-export count;
the current inventory is **516 runtime exports**.

## Coverage of the review

The original audit covered **505 runtime exports across all 23 packages**.
The eight additions below bring the current total to **513 runtime exports**.
Each public runtime export has a matching implementation or alias test file.
This inventory includes functions, classes, and constants, excludes type-only
exports, and establishes test presence rather than exhaustive behavioral coverage.

All packages were included in the test and build checks: array, async, collection,
crypto, date, encoding, env, event, format, math, network, object, parsing, path,
random, regex, result, serialization, string, testing-utilities, utility,
validation, and webscraping.

Static review and targeted regressions covered invalid numeric inputs, equality,
inherited properties, ordering, input mutation, async concurrency and settlement,
empty regex matches, Unicode code points, date boundaries, and serialization
round trips. Existing documented limitations remain in [KNOWN_ISSUES.md](KNOWN_ISSUES.md).

## Confirmed fixes

- **Object and parser safety:** Nested writers create own containers instead of
  following inherited objects. Object builders retain `__proto__` as ordinary own
  data without changing result prototypes. INI sections, environment expansion,
  collection conversion, and serialization transforms use the same principle.
  Existing writable property descriptors are retained when updating own properties.
- **Equality and reconstruction:** `uniqueElementsWithCounts` verifies deep
  equality instead of treating a 32-bit hash as identity. Reordered object keys,
  Map/Set contents, BigInt-containing objects, and hash collisions are handled.
  Shallow equality checks own keys even for undefined values. Unflattening retains
  numeric root keys and containers preceding numeric indices. `deepFreeze` handles
  cycles and own symbol-keyed children.
- **Async and cache keys:** Concurrency rejects NaN and fractional values while
  retaining default limits, Infinity, batch scheduling, and result order. Default
  sync/async memoization and deduplication keys distinguish special numeric values,
  undefined, marker-shaped objects, and escaped marker-like strings. Custom key
  functions retain control over non-JSON values.
- **Regex and events:** Four regex iterators advance correctly over zero-width
  Unicode matches without modifying the caller's `lastIndex`. Once listeners are
  removed before execution; empty event names are handled explicitly. Throttling
  schedules isolated trailing calls and works with clocks starting at zero.
- **URLs and serialization:** Query processing preserves empty repeated values and
  embedded equals signs; normalization no longer multiplies repeated parameters.
  Localhost checks reject invalid IPv4 and unrelated IPv6 addresses. Scraped links
  and images resolve against page URLs with URL semantics. CSV parsing preserves
  quoted newlines, escaped quotes, and CRLF rows, and rejects unterminated quotes.
- **Numeric and encoding boundaries:** Encoding decoders reject impossible lengths
  and noncanonical padding. Distance helpers avoid intermediate square overflow;
  factorial and range avoid call-stack or argument-count limits. Fractional bytes,
  invalid Date objects, large random-string alphabets, and ISO years 0000–0099 have
  regression coverage. Fractional chunk sizes retain their existing behavior.

## Performance evidence

`removeByIndex` now builds a Set once and performs O(n + m) membership work instead
of O(n × m), with O(m) additional lookup storage. A reproducible benchmark compares
the previous implementation and current built output, checks equal results, warms
each implementation five times, and takes the median of eleven runs.

- 1,000 elements / 100 indices: 0.243 ms → 0.108 ms, approximately **2.2×** faster.
- 10,000 elements / 1,000 indices: 23.287 ms → 0.659 ms, approximately **35.3×** faster.
- 50,000 elements / 5,000 indices: 517.618 ms → 4.110 ms, approximately **125.9×** faster.

These are measurements from this machine under concurrent validation load, not
performance guarantees. Reproduce with `npm run build` followed by
`npm run benchmark:existing`.

The corrected deep object counting algorithm prioritizes correctness: primitive
counting stays O(n), while object inputs can require O(n²) deep comparisons. It is
not claimed as an optimization.

## Validation and tooling

- **Lint:** The full run still reports 114 errors and 350 warnings in existing repository code/configuration. Modified TypeScript files pass the focused lint check with zero errors (56 warnings remain). The remaining errors include 26 configuration files outside the lint TypeScript projects, async functions without awaits, legacy require imports, and existing formatting/throw-style violations. These are recorded separately from the corrected functional defects.
- **Final tests:** 5,973 passing tests across 524 suites; an additional focused cache-key run passed after extending marker-string assertions.
- **Build and types:** All 23 package builds and the root TypeScript check pass. A compiler-based comparison of 538 public value/type export entries found no signature changes.
- **Coverage:** 97.74% lines, 97.67% statements, 99% functions, 94.08% branches overall. Changed source has 98.31% line, 95.03% branch, and 100% function coverage. Coverage combines the full run with the focused cache-key boundary run. Repository-wide branch coverage remains below the >95% target.

- The original code passed **5,898 tests across 502 suites**, including serial
  retries of two suites whose parallel workers ran out of memory.
- Applying the new focused regression suites to the original source produced
  **60 failing tests across 21 suites**. Separate time-bounded VM probes confirmed
  all four original regex iterators hang on zero-width Unicode matches.
- The lockfile is synchronized with the existing manifests; a real `npm ci`
  completed successfully with lifecycle scripts disabled.
- The build command orders workspace dependencies before consumers. The portable
  local Jest configuration resolves cross-package imports to workspace source.
- Percentage endpoint tests use controlled random values rather than depending
  on rare outcomes. Lint ignores generated package outputs, and formatting accepts
  native line endings without rewriting the entire repository.

Reproduce the checks with Node 20+:

```sh
npm ci --ignore-scripts
npm run build
npm run test:local -- --maxWorkers=2 --workerIdleMemoryLimit=512MB
npm run lint
npm run audit:exports
```

The eight functions from [FUNCTION_IDEAS.md](FUNCTION_IDEAS.md) are now implemented
and exported. The validation results above describe the initial fix pass; the
follow-up validation below covers the additions as well.

## Follow-up: eight added functions

Implemented and exported `uniqueBy`, `partitionBy`, `asyncMapSettled`,
`asyncReduce`, `addBusinessDays`, `collectResults`, `omitDeep`, and `once`.
The current inventory is **513 public runtime exports**, with matching test files
for every export. Existing public signatures are retained; these eight APIs are additive.

- **Full suite:** 6,031 tests pass across 532 suites. The additions contribute 58 tests across eight new suites.
- **Build and runtime:** All 23 package builds pass. All eight new exports pass runtime smoke checks against compiled package entry points; root source type checking also passes.
- **New-function coverage:** 100% lines, statements, and functions; branch coverage ranges from 97.14% to 100%.
- **Whole-repository coverage:** 97.8% lines, 97.74% statements, 99.01% functions, and 94.2% branches. The pre-existing repository-wide branch target gap remains.
- **Lint:** The new implementation and test files have zero errors and zero warnings. The repository still reports 114 existing errors and 350 warnings.
- **Boundaries:** Tests cover sparse inputs, SameValueZero keys, callback indices and ordering, synchronous throws, arbitrary rejection reasons, bounded batching, weekend and DST transitions, date-range overflow, immutable descriptor-preserving omission, inherited and prototype-like keys, cycles, and retry/reentrancy semantics.

The DST check transpiles the function before spawning its timezone-isolated Node
process, avoiding a second TypeScript compiler startup under parallel test load.
The final complete run used `--maxWorkers=2 --workerIdleMemoryLimit=768MB`.
No dependencies, package versions, or publishing settings were changed for these additions.

See [the function documentation](FUNCTION_IDEAS.md) for signatures and examples.

## Continued validation: repeated values, async failures, and early years

Confirmed defects were reproduced with failing regression tests before fixes:

- `handleCircularReferences` retained non-plain class instances in its ancestor set. Repeated instances in sibling properties, arrays, Maps, or Sets could become false circular markers. Atomic instances now leave the ancestor set before returning.
- `debounceAsync` allowed synchronous callback throws to escape its timer and leave the returned promise pending. The promise now rejects with the original reason, and later calls remain usable.
- `toUTCDate` mapped local years 0–99 into 1900–1999. UTC setters now preserve the literal year, leap day, and time fields.
- `getDaysInMonth` treated February of year zero as February 1900. Gregorian arithmetic now handles literal early and negative years; tests compare every month across a complete 400-year cycle.

Optimized `findDuplicates` by tracking already-emitted primitive keys in a Set. Previously, each repeated primitive searched the growing output with deep equality, creating quadratic work when many distinct primitives repeated. Duplicate discovery order, signed-zero representatives, NaN, symbols, object equality, and mutation behavior are preserved. Object comparisons retain their existing quadratic worst case. Reproduce the median benchmark after building with `node scripts/benchmark-find-duplicates.cjs`.

With each distinct number repeated three times, median timings across seven samples after three warmups were 10.46 → 0.86 ms for 3,000 items, 289.71 → 3.75 ms for 15,000 items, and 1,220.47 → 12.41 ms for 30,000 items (12.2×, 77.2×, and 98.4×). Each workload asserts equality against the exact previous implementation. These are local informational measurements, not performance guarantees or test thresholds.

Final validation for this pass:

- **Tests:** 6,054 pass across all 532 suites, including 23 additional cases. Timer tests cover synchronous Error, string, null, and undefined throws, retry after failure, cleanup, and invalid delays.
- **Coverage:** All five changed functions have 100% line, statement, function, and branch coverage. Repository coverage is 97.97% lines, 97.92% statements, 99.26% functions, and 94.38% branches; the repository-wide branch target gap remains.
- **Builds and types:** All 23 package builds and root `tsc --noEmit` pass. An overlapping build initially exhausted native process memory; the sequential retry with a 1 GB compiler heap limit passed.
- **Lint:** 113 existing errors and 350 existing warnings remain, down from 114 errors and 350 warnings. Every implementation and test file changed in this pass has zero lint errors; their pre-existing serialization warnings remain unchanged.
- **Diff:** `git diff --check` passes.

Public signatures, package versions, and publishing settings are unchanged. Some other date helpers still use constructors that reinterpret years 0–99; this remaining limitation is recorded in `KNOWN_ISSUES.md`.

## Continued validation: timers, numeric tokens, and combinatorics

The next regression pass reproduced 24 failing cases before fixes:

- `throttle` treated timestamp zero as an absent timestamp, retained obsolete trailing timers after a new immediate call, and allowed callback reentrancy to bypass its interval. Scheduling state is now updated before invocation, and immediate calls cancel obsolete trailing work. Tests use deterministic clocks and verify receivers, arguments, boundaries, and timer cleanup.
- `parseDuration` and `parseDataSize` accepted malformed decimals through `parseFloat` prefix parsing. Both now validate the entire numeric token while preserving `.5`, `1.`, and leading-zero decimal spellings. Duration units use own-property lookup, rejecting inherited names such as `constructor`.
- `asyncRetry` accepted NaN and fractional attempt counts and NaN delays; `asyncPoll` accepted NaN interval/timeout values. These now fail before invoking callbacks. Existing Infinity retry counts, unbounded poll timeouts, fractional poll intervals, and capped retry delays are retained and tested with controlled timers/promises.
- `calculateCombination` and `calculatePermutation` overflowed their factorial intermediates for `n > 170`, even when the answer was small. Overflow-safe fallbacks now compute those cases. Combinations use exact BigInt intermediates before Number conversion; permutations use descending products. True result overflow returns Infinity promptly.

Three further failing regressions reproduced the same overflow in the deprecated `calculateBinomialCoefficient` alias. It now delegates to `calculateCombination`, retaining its public signature, validation behavior, and deprecated status.

All previous factorial ratios through `n = 170` remain bit-for-bit unchanged, checked across every valid `(n, k)` pair. Larger values are checked against independent BigInt oracles, including safe-integer accuracy, symmetry, and Number overflow boundaries. Returned values remain Numbers and cannot represent arbitrary large integers exactly.

`calculateFactorial` now retains at most 171 ascending products in a private cache. Repeated calls reuse the same rounded values without recomputation. First extensions perform the same multiplications as before; inputs above 170 still return Infinity immediately. Reproduce the repeated-call benchmark after building with `node scripts/benchmark-factorial.cjs`.

After three warmups, seven-sample medians for 100,000 warm-cache calls were 1.24 → 0.90 ms at n=10, 15.50 → 1.96 ms at n=100, and 22.93 → 3.02 ms at n=170 (1.37×, 7.90×, and 7.58×). These local measurements describe repeated calls, not cold-cache performance; they are not test thresholds or performance guarantees.

The math, async, utility, and parsing README examples referenced nonexistent exports or an obsolete retry signature. Their examples now use actual exports and pass TypeScript checking. Their available-function lists match the runtime export inventory.

Final validation for this pass:

- **Tests:** All 6,121 tests pass across 532 suites, including 67 additional cases. The complete run finished in 251.48 seconds.
- **Changed-function coverage:** Eight functions have 100% lines, statements, functions, and branches. `asyncRetry` has 96.42% lines, 96.55% statements, 100% functions, and 96.29% branches, exceeding the >95% target.
- **Repository coverage:** 98.09% lines, 98.03% statements, 99.26% functions, and 94.56% branches. The repository-wide branch target gap remains.
- **Builds and types:** All 23 package builds pass; math was rebuilt after the alias fix. Root source type checking, all four revised README examples, and smoke checks against compiled package entry points pass.
- **Lint:** 112 existing errors and 348 existing warnings remain, down from 113 errors and 350 warnings. Changed implementation and test files have zero lint errors; the polling tests retain six existing warnings. There are no new findings.
- **Diff:** `git diff --check` passes.

Validation is intentionally stricter for malformed decimals, NaN options, and fractional retry counts that previously passed incomplete checks. Public signatures, valid documented defaults, package versions, and publishing settings are unchanged.

## Continued validation: URL values, path segments, and timeout deadlines

Eight failing regressions reproduced the following defects before fixes:

- `normalizeURL` deleted every entry for a key if any of its values was empty. Filtering now removes empty entries individually and preserves the relative order of non-empty repeated values.
- `joinURLPaths` trimmed segment boundaries but retained duplicate slashes inside segments, contrary to its documented normalization behavior. It now collapses literal slash runs throughout the joined path while preserving the first segment's root choice, encoded slashes, dot segments, Unicode, and empty-segment behavior.
- `asyncTimeout` accepted NaN, scheduled Infinity and oversized durations as short native timers, and truncated fractional deadlines to an earlier timeout. It now validates the duration, waits indefinitely without a timer for Infinity, and schedules finite deadlines in bounded chunks against monotonic elapsed time. Original rejection values are retained, and completion clears whichever chunk is pending.

Additional controlled-clock tests cover intermediate-chunk cleanup on resolution and rejection, wall-clock changes, already-fulfilled promises with zero timeout, late original settlement after timeout, invalid custom messages, and no timer leaks. URL tests cover stable UTF-16 key ordering, Unicode, repeated and empty values, hashes, normalization idempotence, and both sorting modes.

The query-sort bottleneck repeatedly scanned all parameters once per distinct key. Native stable `URLSearchParams.sort()` replaces that quadratic scan while retaining duplicate-value order. An exact snapshot of the previous implementation is included in `scripts/benchmark-normalize-url.cjs`; benchmark inputs omit empty values, whose filtering behavior was intentionally fixed. Every workload asserts equivalent output before timing.

Seven-sample medians after three warmups, with two values per key, were 0.0240 → 0.0153 ms for 10 keys, 3.512 → 0.217 ms for 250 keys, 17.087 → 1.012 ms for 1,000 keys, and 393.208 → 5.769 ms for 5,000 keys (1.56×, 16.18×, 16.89×, and 68.16×). Small workloads use repeated calls within each timing sample. These local measurements are informational, not performance guarantees or test thresholds.

An unreachable manual default-port branch was removed: the native URL parser already canonicalizes those ports. Both option settings preserve their prior behavior, and the legacy option remains in the public signature. The network README now lists all exports and uses actual package imports in its example.

Final validation for this pass:

- **Tests:** All 6,146 tests pass across 532 suites, including 25 additional cases. The full run finished in 102.99 seconds.
- **Changed-function coverage:** `normalizeURL`, `joinURLPaths`, and `asyncTimeout` each have 100% lines, statements, functions, and branches.
- **Repository coverage:** 98.12% lines, 98.07% statements, 99.26% functions, and 94.65% branches. The repository-wide branch target gap remains.
- **Builds and types:** All 23 package builds, root source type checking, the revised network README example, and compiled network/async entry-point smoke checks pass.
- **Lint:** 112 existing errors and 348 existing warnings remain. All six changed implementation/test files have zero lint errors and zero warnings; there are no new findings.
- **Diff:** `git diff --check` passes.

The final full run used Node 24 with `NODE_OPTIONS="--max-old-space-size=1024 --max-semi-space-size=8"`, two Jest workers, and a 768 MB idle-worker limit to keep validation within the host's memory budget.

NaN and non-number timeout arguments now fail synchronously. Fractional and oversized waits honor their full deadlines, and duplicate path slashes follow the documented normalization rule. Public signatures, package versions, and publishing settings are unchanged. A focused test process initially exhausted native process memory; the heap-capped retry passed.

## Continued validation: literal calendar years and allocation costs

The new early-year regressions reproduced 37 failures across 12 affected public-function suites before implementation changes. Calendar boundaries, month clamping, year-end elapsed-day counts, week calculations, and business-day counting were constructing years 0–99 as 1900–1999.

An internal local-midnight constructor now uses a 400-year Gregorian bootstrap only for those early years, retaining leap days and normalized month/year overflow. Contemporary and negative years retain the native constructor path. This fixes start/end of year and month, previous-month boundaries, add/subtract-month clamping, both week calculations, weekdays in a month, and business days between dates without changing public signatures.

`dayOfYear` now uses fixed cumulative month offsets and leap-year arithmetic, with a January fast path. `getWeekdaysInMonth` computes month length once instead of reconstructing month end on every iteration. The latter also fixes a skipped-last-day defect: the captured previous implementation reports one weekday for December 1994 in Pacific/Kiritimati, because December 31 normalizes to January 1; the corrected result is 22. The baseline counterexample was verified in an isolated timezone process, and a permanent regression covers it.

Validation includes a full 400-year cycle against an independent UTC day-count oracle, year-zero leap days, negative-year rollovers, immutable inputs, local midnight and time precision, and timezone-isolated checks for UTC, Lisbon, New York, Apia, and Kiritimati. Native per-day timezone normalization is retained.

The date README now lists every public export, fixes its previously undefined example inputs, and distinguishes simplified week numbers, ISO week dates, elapsed-day counts, and UTC reinterpretation. `daysLeftInYear` examples now match the existing convention: January 1 to December 31 midnight is 364 days in a common year, and December 31 midnight returns zero. Its elapsed-time behavior remains unchanged.

Reproduce the paired benchmark after building with `node scripts/benchmark-date-calendars.cjs`. The script contains the exact previous implementations, asserts equivalent results on contemporary inputs, warms both implementations three times, alternates measurement order, and reports seven-sample medians for 10,000 calls. January week numbers measured 2.770 → 2.683 ms (1.03×), June 21.978 → 3.181 ms (6.91×), and December 41.284 → 2.957 ms (13.96×). Weekday counting measured 177.389 → 85.198 ms in January (2.08×), 177.505 → 91.339 ms in June (1.94×), and 186.083 → 89.285 ms in December (2.08×). These are informational local measurements, not guarantees or test thresholds.

The normal type-checking Jest transform stalled under host memory pressure and its execution host failed. That owned test process was stopped after checking its command line. Regression runs used a temporary ignored configuration that changes only the TypeScript transform to isolated transpilation, retaining the same environment, module mappings, test discovery, and coverage collection. Source and test-file type checking run separately. The repository's normal test configuration is unchanged.

Final validation for this pass:

- **Tests:** All 6,196 tests pass across 532 suites, including 50 additional cases. The complete runtime run finished in 123.36 seconds using the temporary low-memory transform, two workers, 512 MB heaps, and a 256 MB idle-worker limit.
- **Types and builds:** All 23 package builds pass, with a final date-package rebuild after the January fast path. Root source checking and `tsc -p tsconfig.test.json --noEmit` both pass separately. The revised README example also type-checks.
- **Coverage:** All 12 affected public date functions and both affected internal files have 100% line, statement, function, and branch coverage. Repository coverage is 98.15% lines, 98.10% statements, 99.26% functions, and 94.70% branches; the repository-wide branch target gap remains.
- **Lint:** The complete repository still reports 112 existing errors and 348 existing warnings, with no new findings. Changed implementation and test files have zero lint errors; two existing unused helper-import warnings remain in the affected tests.
- **Runtime checks:** Compiled package entry-point checks pass, including literal-year leap days, ISO week dates, and the captured Kiritimati counterexample. An AST scan confirms the only multi-argument Date constructor remaining in date implementation code is the guarded internal constructor.
- **Diff:** `git diff --check` passes.

Public signatures, package versions, and publishing settings remain unchanged. Business-day ranges retain per-day traversal and do not account for public holidays; native timezone normalization remains in effect.

## Continued validation: CSV round trips and Set comparison

CSV serialization left blank single-column values and headers unquoted, so parsing discarded them as blank lines. It also left carriage returns unquoted, allowing a trailing CR to be stripped as a line ending. A replay of the new regressions against the previous serializer reproduced eight failures. The fix quotes CR-containing fields and blank single-column or whitespace-delimited cells. Ordinary empty cells in multi-column comma-separated output retain their existing representation. Tests cover empty and whitespace-only values, tabs, embedded/trailing CR, CRLF, blank headers, nullish cells, and output with and without headers.

`deepEqual` now builds a membership index from its existing right-hand Set snapshot. Primitive values use native SameValueZero membership, including NaN, signed zero, symbols, and function references. Objects retain one-to-one recursive matching. A regression verifies that object getters mutating the right-hand Set do not change the snapshot semantics. Additional cases cover mixed Sets, repeated deeply equal objects, mismatched special kinds, and comparisons in both argument orders. The complexity annotation now distinguishes linear primitive Set matching from potentially quadratic object matching.

The serialization README now uses the actual exported JSON/XML function names, corrects its XML example, and explains CSV quoting and type conversion. Compiled package entry-point smoke checks verify those examples and the corrected round trips. Known limitations now describe CSV column selection, string conversion, blank-line parsing, and accepted delimiters.

After building, `node scripts/benchmark-deep-equal-sets.cjs` compares the previous matching loop with the corrected implementation on reversed primitive Sets. It asserts result equivalence, warms both implementations three times, alternates measurement order, and reports seven-sample medians for ten comparisons. For 100 values, elapsed time was 1.883 → 0.129 ms (14.59×); 1,000 values, 165.530 → 0.937 ms (176.62×); 5,000 values, 4,389.716 → 5.094 ms (861.69×). These workload-specific local measurements are informational, not performance guarantees or test thresholds.

Final validation for this pass:

- **Tests:** All 6,213 tests pass across 532 suites, including 17 additional cases. The final full run finished in 239.367 seconds using the same temporary ignored low-memory transform, two workers, and separately checked TypeScript sources/tests.
- **Types and builds:** Root source and test-file type checks pass; all 23 package builds pass. Compiled entry-point and README smoke checks pass. Public exports and signatures are unchanged.
- **Coverage:** Both changed implementations have 100% line, statement, function, and branch coverage. Repository coverage is 98.23% lines, 98.17% statements, 99.26% functions, and 94.82% branches. The repository-wide branch target gap remains.
- **Lint:** Full lint reports 111 existing errors and 348 warnings, with no new findings compared with the preceding pass. Formatting the touched equality test removes one existing Prettier error. Changed implementation/test files have zero lint errors; two pre-existing explicit-any warnings remain in the CSV serializer.
- **Diff:** `git diff --check` passes.

CSV output now quotes previously lossy blank rows and CR-containing fields; ordinary comma-separated multi-column empty-cell output is preserved. Object-valued Set comparison remains potentially quadratic, and circular equality inputs remain unsupported. No package versions or publishing settings changed.

## Full workspace audit: remaining defects, lint, and coverage (2026-10-27)

The next pass reproduced 15 failing regression cases before fixes: eight covering oversized batches and number formatting, and seven covering inherited regex preset names, later polling failures, and NaN polling options. The full suite now includes 40 additional tests.

Confirmed defects fixed:

- **Large batches:** `asyncBatch` appended results using a spread call, which failed at the engine's argument-count limit. Iterative appending handles a 200,000-item batch while retaining order, object references, sparse-result materialization, sequential scheduling, and rejection behavior.
- **Number formatting:** Finite values at or above 1e21 could produce scientific notation with an undefined decimal suffix, or overflow during intermediate scaling. They now expand to grouped decimal notation, including custom separators and 100 decimal places. NaN and infinities use their normal string representations. Existing rounding for smaller finite values remains unchanged.
- **Regex presets:** `getCommonPattern` and `testCommonPattern` now reject inherited names such as `constructor`, `__proto__`, and `toString` as unknown presets instead of traversing the pattern object's prototype.
- **Polling failures:** `waitForCondition` rejects with the original reason if a later timer-driven condition check throws, rather than escaping the promise. NaN timeout and interval values reject before invoking the condition or scheduling timers. Deterministic timer tests verify rejection and cleanup.

Optimizations preserve existing contracts:

- `findUniqueElements` uses native membership for non-object values and retains deep comparison for objects. Tests verify first representatives, signed zero, NaN, symbol/function identity, sparse holes, getter ordering, and object references. Its space complexity is correctly documented as O(n).
- `isValidTime` reuses four private non-global regexes and removes parsing and range checks whose results were already enforced by those same expressions. One-digit components, case-insensitive AM/PM, trimming, and both mode switches retain their previous behavior. A captured-baseline comparison verifies 15,552 boundary/mode combinations.
- Phone extraction no longer evaluates a redundant condition whose complementary branches both retained the same match. Its output behavior is unchanged. A private primitive type guard in `mergeUnique` now expresses the runtime narrowing correctly for lint and TypeScript.

Reproduce the paired measurements after building with `node scripts/benchmark-audit-pass8.cjs`. Captured previous implementations are included; the benchmark asserts equivalence, warms both sides three times, alternates order, and reports seven-sample medians. Primitive uniqueness over ten calls measured 70.101 → 0.942 ms for 1,000 distinct values (74.39×), 856.242 → 4.221 ms for 3,000 distinct values (202.88×), and 91.162 → 2.608 ms for 10,000 values with 100 distinct values (34.96×). Object-only and mixed workloads measured 1.16× and 1.09× respectively. For 100,000 time checks, valid 24-hour input measured 64.533 → 12.463 ms (5.18×), valid 12-hour input 59.815 → 11.186 ms (5.35×), and invalid input 20.086 → 16.078 ms (1.25×). These local measurements are workload-specific, not performance guarantees.

The documentation audit covers all 23 package READMEs and the root README. It found 12 imports of nonexistent exports, seven stale export counts, missing listings, and an incorrectly cased preset export. Listings now cover all 513 public runtime exports. Every package's Quick Example is also type-checked in an async context; missing bindings/imports, a weighted-selector mismatch, and an incorrect environment-array argument were corrected. The package output description now accurately states that import and require conditions use the same CommonJS artifact. `npm run audit:docs` checks imports, listings, and counts without modifying files.

Lint now uses a dedicated no-emit TypeScript project covering implementation, tests, and Jest configurations. The shared Jest configuration has an explicit Config type. Test fixtures perform explicit asynchronous work, paired-function tests use static imports, obsolete rule names were corrected, and existing formatting errors were removed. No lint rules were disabled globally; narrow exceptions preserve intentional non-Error throw tests and original predicate rejection reasons.

Final validation:

- **Tests:** All **6,253 tests pass across 532 suites**, completing in 295.835 seconds with the ignored low-memory transform and separate semantic checks.
- **Types and builds:** Source, test, and Jest-configuration type checks pass. All **23 package builds** pass. Compiled entry-point checks load all 23 packages and verify the same 513 runtime exports; targeted compiled checks reproduce the corrected large-batch, number-formatting, preset, and polling behavior.
- **Documentation:** All **23 Quick Examples type-check**. The repeatable documentation audit reports zero invalid imports, invalid listings, omitted exports, or stale counts.
- **Coverage:** Repository coverage is **98.35% lines, 98.33% statements, 99.26% functions, and 95.45% branches**. All four exceed the repository's 95% target without adding coverage exclusions. The seven affected implementation files each have **100% coverage in all four metrics**.
- **Lint:** Full lint passes with **zero errors and 324 warnings**, compared with 111 errors and 348 warnings before this pass. Warnings remain documented maintenance work, primarily existing typing and style findings.
- **Diff:** `git diff --check` passes.

Public signatures and exports are unchanged. No package versions changed and nothing was published. Existing documented limitations, including circular deep-equality inputs, quadratic object comparisons, JSON cache-key restrictions, batch scheduling, and CommonJS-only build output, remain in effect.

## Full repository verification (recorded 2026-10-28)

This pass preserved the existing working-tree changes and reproduced the earlier
baseline using the explicitly selected Node **24.22.1** runtime on Windows. The
baseline passed **6,253 tests in 532 suites** in **221.580 seconds**, with
98.35% line, 98.33% statement, 99.26% function, and 95.45% branch coverage. The
machine's default Node 16 executable was not used for validation. Commands that
invoked npm used its CLI through the selected Node executable as well.

### Confirmed correctness and test improvements

- **Object construction:** `transformKeys`, HTTP-header parsing, required
  environment collection, random test-object generation, and test-data cloning
  retain `__proto__` as an own data property without changing result prototypes.
  Last-write-wins behavior, ordinary object prototypes, and source references are
  retained where applicable.
- **Environment reads:** All 11 readers ignore inherited properties rather than
  treating `constructor`, `toString`, or `__proto__` as configured values. Required
  checks reject absent variables; optional readers retain their existing defaults.
- **XML boundaries:** The basic XML parser distinguishes complete element names
  from longer names sharing a prefix, handles same-name self-closing children,
  and accumulates special-name and repeated tags without reading inherited values.
- **Large collections:** `createMultiMap.setAll` and `calculateMode` no longer
  exceed the engine argument limit on 200,000-element inputs. Ordering, references,
  existing mutation contracts, and numeric result behavior are retained.
- **Dates and events:** `getNextOccurrence` rejects fractional weekdays.
  `waitForEvent` does not schedule a timeout after an event arrives synchronously
  during subscription.
- **Meaningful tests:** Added 22 tests across 11 suites, including regression and
  optimization-equivalence cases. Replaced 22 existing vacuous tests in 19 files
  with assertions for their stated invalid-number behavior. Five real-time throttle
  tests now use fake timers and check exact execution boundaries. This fixes a
  failure reproduced during a loaded full-suite run without changing throttle's
  runtime behavior or increasing test timeouts.

Regression cases failed before the corresponding fixes. The environment fixture
uses a plain replacement env because Jest's Windows env proxy has a separate
`__proto__` lookup problem; the corrected fixture was also checked against the
original implementation. A focused 300-test run passed with open-handle detection
after an earlier parallel worker-exit warning, without reporting an open handle.

### Measured optimization

`countSubstring` uses a literal search loop for strings up to 256 UTF-16 code
units, avoiding regex construction and match-array allocation on that path.
Measurements showed the loop regressed dense long inputs, so longer strings
retain the existing native global matcher. The breakpoint was checked against
dense lengths 16, 64, 256, 1,024, and 4,096; equivalence tests include lengths
255, 256, and 257, regex metacharacters, Unicode, lone surrogates, absent matches,
and non-overlapping dense matches. Its documented worst-case space is now O(n),
accounting for the existing long-input match array.

Reproduce with `npm run build` and `npm run benchmark:substring`. The benchmark
checks equal results, warms both implementations, alternates their order, and
reports nine-sample medians:

- 20,000 short-string calls: **23.533 ms → 2.563 ms (9.18× faster)**.
- Dense long strings: 20.432 ms → 20.922 ms (0.98×).
- Absent long-string searches: 15.039 ms → 14.852 ms (1.01×).
- Long strings with literal metacharacters/Unicode: 12.446 ms → 11.615 ms (1.07×).

The long-input algorithm is unchanged; its small timing differences reflect
measurement variation. These measurements are local and workload-specific, not
performance guarantees or test assertions.

### Packaging and continuous verification

- Aligned five stale workspace dependency ranges with the actual local packages,
  including async's dependency on utility 0.4.x. Package versions are unchanged.
  The synchronized lockfile passed a clean, offline `npm ci --ignore-scripts`
  in an isolated workspace mirror, installing 627 packages. An initial online
  attempt hit the diagnostic's 180-second timeout; the clean offline retry passed.
- Replaced the obsolete installation package list and checkout-local installs
  with workspace discovery and an isolated consumer. All 23 packed artifacts pass
  CommonJS loading, dynamic import, strict declaration compilation, dependency
  resolution, export inventory comparison, and compiled behavior smoke checks.
  Tarball discovery handles npm versions that report scoped filenames differently.
- `npm test` is portable and uses two workers with a 512 MB idle-worker memory
  limit. Jest uses a tracked isolated-transpilation configuration; `npm run
  typecheck` separately checks source, tests, and Jest configurations.
- Added a non-mutating TypeScript `format:check` command and corrected the manual
  lint workflow to call it. Export inventory checks now fail for missing test
  files. `audit:docs` also type-checks all 23 Quick Examples in memory.
- Added automatic pull-request and `main`-push quality checks on Windows and Linux
  with Node 20, 22, and 24. Only Linux/Node 24 collects coverage; all jobs run
  date tests in UTC and Europe/Lisbon and check packed packages. Lint is capped
  at the improved 290-warning baseline, and every global coverage metric must
  exceed 95%. Existing manual reporting workflows remain available.

### Final verification

- **Full suite:** `npm test` passes **6,275 tests across 543 suites** in
  **117.909 seconds**, using UTC and the two-worker memory-bounded configuration.
- **Coverage:** **98.80% lines, 98.76% statements, 99.26% functions, and
  96.18% branches**, without additional coverage exclusions.
- **Timezone checks:** All **615 date tests in 52 suites** pass in Europe/Lisbon.
- **Builds and types:** All 23 package builds and source/test/configuration
  semantic type checks pass. Comparing all **542 emitted declaration files**
  against the captured baseline, with comments and whitespace removed, finds
  unchanged signatures. The public runtime-export inventory remains **513**.
- **Lint and formatting:** Zero errors, **290 warnings**, TypeScript formatting
  checks pass, and `git diff --check` passes with the repository's line-ending
  settings. Warning triage removed unused bindings and duplicate imports and
  strengthened the vacuous tests; remaining warnings are primarily existing
  explicit-any/unsafe-typing findings. No lint rules were disabled globally.
- **Documentation and packages:** All 23 Quick Examples type-check; imports,
  listings, and export counts are valid. The isolated packed-package and clean
  lockfile-install checks pass.

The local runs establish Windows/Node 24 results. The new six-job CI matrix is
configured but has not been executed remotely in this session. No package was
published, no package version changed, and no existing working-tree work was
discarded. Known limitations remain documented in `KNOWN_ISSUES.md`; new features,
native ESM output, breaking API redesigns, and major dependency upgrades remain
outside this pass.

## Release version preparation reverted (2026-10-28)

At the user's request, reverted all 23 release-version bumps and the accompanying
release dependency-range changes. Restored the previous versions in each package
manifest and the lockfile, and moved the prepared release notes back to Unreleased.
The audit's earlier dependency compatibility corrections remain in place.

All implementation fixes, optimizations, new utilities, regression tests, and CI
changes are preserved. Manifest/lockfile version pairs, dependency ranges, and
changelog state were checked after the revert. No package was published.

## Reliability review and three additive utilities (2026-10-28)

This section records the current pass. Earlier sections preserve historical
snapshots, including their then-current export counts and validation results.
All pre-existing working-tree changes and package versions were retained.

### Fresh baseline and review

On Windows with Node 24.22.1, the baseline passed all 23 builds, source/test/config
type checks, lint (zero errors, 290 warnings), TypeScript formatting, export and
documentation audits, and isolated installation of all 23 packed packages.
The UTC coverage run passed **6,275 tests across 543 suites** in 238.895 seconds.
Baseline coverage was 98.80% lines, 98.76% statements, 99.26% functions, and
96.18% branches. Captured all 542 existing declarations for comparison.

The targeted source and contract review sampled the principal boundary risks
across every package, supported by the full test suite:

- **array, object, collection, result:** equality, ordering, own/prototype-like
  keys, reconstruction, and result composition.
- **async, event, utility, testing-utilities:** settlement, timer/listener cleanup,
  cache contracts, callback failures, and numeric iteration.
- **date, format, math, random:** calendar boundaries, numeric limits, formatting,
  and selection contracts.
- **encoding, parsing, serialization, regex, string:** malformed inputs, Unicode,
  escaping, round trips, and documented parser limitations.
- **env, network, path, crypto, webscraping:** inherited environment values, URL
  resolution, POSIX paths, existing cryptographic formats, and HTML contracts.

This was a targeted review rather than formal verification of every export.
Documented limitations in `KNOWN_ISSUES.md` remain in force.

### Confirmed fixes and compatibility

- `differenceBy` now includes missing own keys even when their source value is
  undefined. Inherited comparison values and getters are ignored; existing own
  values still use the caller's comparator. Symbols and prototype-like keys are
  retained safely.
- `generateRange` rejects non-finite endpoints and throws if floating-point
  addition cannot advance. Finite singleton endpoints terminate; fractional
  accumulation, descending empty ranges, and infinite steps with finite endpoints
  retain their behavior. VM deadlines protect the regression tests from hangs.
- The regression suites failed **8 tests** against the original implementations;
  all **10 tests** pass after the fixes. Separate bounded VM probes confirmed the
  original non-advancing and infinite-endpoint loops.
- `.nvmrc` now selects Node 24 while package engines retain Node 20+ support.
  Internal YAML/XML/CSV values and configuration traversal use unknown; regex
  replacement overloads are narrowed without an any cast. Native serializer
  coercion is intentionally retained with three local lint explanations.
- All **542 existing declarations** are unchanged after normalizing comments and
  whitespace and removing only the three new entry-point export statements.

### New APIs

Added and documented `arrayDifferenceBy`, `arrayIntersectionBy`, and
`fromAsyncThrowable`, bringing the inventory to **516 runtime exports**. Both
array helpers preserve source order, duplicates, and references; skip sparse
slots in both inputs; and use SameValueZero keys. Callback failures propagate.
The async Result helper accepts values, promises, and thenables and preserves
original synchronous throws and arbitrary rejection reasons.

The three new implementations have **100% line, statement, function, and branch
coverage**. Their consumer checks cover CommonJS, named dynamic imports, and
strict TypeScript inference against packed declarations.

### Optimization and verification

`arrayDifference` and `arrayIntersection` use O(n + m) native membership for
larger data-only arrays when the comparison array contains no objects. Inputs
shorter than 32 elements, object comparisons, accessors, and inherited indexed
values retain nested comparisons. Genuine holes are never indexed as undefined;
signed zeros, NaN, symbols, functions, duplicates, and original ordering retain
their equality behavior. Accessor regressions verify lazy reads and mutations of
comparison arrays triggered by source getters.

Run `npm run build` and `npm run benchmark:array-membership` to reproduce the
comparison against the exact previous nested algorithms. The script asserts
equal outputs, warms each implementation five times, and reports the median of
eleven runs for small/large primitives, objects, mixed values, duplicates, and
sparse arrays. Timings are informational and are not CI thresholds.

A repeat after the full checks completed confirmed the primitive improvements:

- **10,000 source / 5,000 comparison values:** difference 346.9575 → 2.6146 ms
  (**132.70×**); intersection 512.2747 → 6.0197 ms (**85.10×**).
- **6,000 / 3,000 duplicate-heavy values:** difference 106.6164 → 1.1570 ms
  (**92.15×**); intersection 89.3263 → 1.2275 ms (**72.77×**).
- **2,000 / 1,000 sparse slots:** difference 4.2109 → 0.3173 ms (**13.27×**);
  intersection 3.5636 → 0.2726 ms (**13.07×**).
- Object and mixed workloads retained nested comparisons, with measured ratios
  from 0.95× to 1.09× in the repeat; small arrays also retain the original path.
  These differences do not establish an optimization for those workloads.

The first run under concurrent validation load also showed large-primitive gains
of 130.25× for difference and 102.60× for intersection. Measurements remain local
and workload-dependent, with no cross-platform timing guarantee.

The final UTC run passes **6,318 tests across 549 suites** in 322.450 seconds
under concurrent build/lint/benchmark load; elapsed times are not a controlled
before/after performance comparison. Global coverage is **98.81% lines, 98.76%
statements, 99.27% functions, and 96.20% branches**, without added exclusions.
All builds, source/test/config type checks, formatting, export inventories, and
23 README Quick Examples pass. All 23 packed packages pass dependency resolution,
CommonJS, dynamic import, declarations, and compiled behavior checks, including
the three additions.

All **615 date tests across 52 suites** also pass in Europe/Lisbon. The full lint
rerun has **zero errors and 277 warnings**, down from 290; CI now enforces the
lower warning ceiling. The remaining warnings are dominated by existing explicit
any declarations and unsafe assignments/member accesses, including public legacy
boundaries whose signature changes are outside this compatibility-preserving
pass. No global rules were disabled. `git diff --check` passes, and the six-job
workflow matrix parses with its Windows/Linux and Node 20/22/24 combinations intact.

The existing Windows/Linux and Node 20/22/24 CI matrix remains configured; it was
not executed remotely in this session. No package was published, no package
version changed, and no existing work was discarded.

## Continued local platform/runtime verification (2026-10-29)

At the user's request, verification remained local. GitHub workflows were not
dispatched, and no branch or package was pushed or published. The implementation
was unchanged during this pass; only this audit was updated.

The additional Windows runtimes were downloaded from the official Node.js
distribution and checked against its SHA-256 sums. Linux checks used official
`node:20-bookworm-slim`, `node:22-bookworm-slim`, and `node:24-bookworm-slim` images
in disposable containers with an isolated copy of the current working tree.
Ignored dependencies, build output, local artifacts, and Git metadata were
excluded from that copy. All runtimes resolved to **20.20.2, 22.23.4, and 24.22.1**.

- **Windows Node 20 and 22:** each passed **6,318 tests across 549 suites**, all
  **615 date tests across 52 suites** in Europe/Lisbon, and isolated installation
  of all **23 packed packages**. The earlier Windows Node 24 checks cover the same
  implementation with the same passing counts.
- **Linux Node 20, 22, and 24:** each passed a clean `npm ci --ignore-scripts`, all
  23 builds, source/test/config type checks, lint, TypeScript formatting, export
  and documentation audits, **6,318 tests across 549 suites**, the additional
  **615 Lisbon date tests**, and all **23 packed-package consumer checks**.
- **Linux lint and documentation:** each runtime reports **zero lint errors and
  277 warnings**, with **516 runtime exports** and **23 valid README examples**.
- **Linux Node 24 coverage:** **98.81% lines, 98.76% statements, 99.27% functions,
  and 96.20% branches**, matching the Windows Node 24 results. No exclusions or
  thresholds were weakened.
- **Packed artifacts on all six OS/runtime combinations:** CommonJS loading,
  named dynamic imports, strict declaration compilation, dependency resolution,
  export inventories, and behavior checks pass, including all three new APIs.

Compatibility runs used one Jest worker per runtime to bound local resource use.
Their elapsed times span an overnight interval and are not performance
measurements. No additional implementation fixes were required.

The local evidence is retained under `local-testing/reliability/`, including
`compatibility-summary.json`, runtime checksums, per-runtime logs and test JSON,
and Linux Node 24 coverage. The tested Linux source archive has SHA-256
`110668c7fa0b3f9ca305d735ecaa7be38cd1a462fd5a5aa69fbb805ceb2ecfb7`.

## Weighted-selection boundary follow-up (2026-10-29)

A further numeric review found valid finite-weight inputs that violated weighted
selection contracts. Two `Number.MAX_VALUE` weights overflowed their total, and
subnormal weights lost probability resolution during multiplication. Both could
select a trailing zero-weight entry. Ordinary fractional weights such as
`[0.1, 0.2, 0.3, 0]` could also reach that zero-weight fallback after rounding.

The shared `_weightedPick` helper now scales finite weights by their maximum
when the total overflows or is subnormal. Ordinary cumulative arithmetic remains
unchanged. The rounding fallback tracks the last positive-weight entry instead
of using the final array slot. The helper remains O(n) time and O(1) extra space;
neither input arrays nor selected item references are changed. Both
`randomWeighted` and `randomElement` receive the fix without signature changes.

- Added **13 deterministic regression cases** covering overflow, subnormal
  equal/unequal ratios, fractional rounding, zero-weight entries, ordinary
  cumulative boundaries, frozen inputs, and item identity. **10 cases failed**
  against the original implementation; all 13 now pass.
- The random package passes **402 tests across 28 suites**. Its **29 existing
  declarations** retain their signatures after removing comments and whitespace.
- Updated documentation to describe non-negative weights and extreme finite
  totals, corrected `randomElement` auxiliary space to O(n) for its existing
  weights array, and removed the incorrect claim that `randomChoice` aliases
  weighted `randomElement`.
- **Windows and Linux Node 24:** complete coverage runs pass **6,331 tests across
  550 suites**. Both report **98.83% lines, 98.78% statements, 99.27% functions,
  and 96.18% branches**. All metrics remain above the existing thresholds without
  exclusions or weakened checks.
- The Linux Node 24 clean-install pipeline passes all 23 builds, source/test/config
  type checks, lint, formatting, export/docs audits, **615 Lisbon date tests**, and
  isolated consumer checks for **all 23 packed packages**. Windows types, lint,
  formatting, exports, and documentation audits also pass. Lint remains at
  **zero errors and 277 warnings**; inventories remain at **516 runtime exports**
  and **23 valid Quick Examples**.
- The newly compiled weighted-selection behavior passes focused checks through
  CommonJS and named dynamic imports on **Windows and Linux with Node 20.20.2,
  22.23.4, and 24.22.1**. The preceding full six-combination verification records
  the earlier 6,318-test baseline; the current follow-up reran the complete suite
  on Node 24 and the changed compiled behavior on all six combinations.

Evidence is retained under `local-testing/weighted-boundaries/`, including the
before/after regressions, full test JSON, per-platform coverage summaries,
declaration comparison, compiled smoke script, and Linux quality-step results.
All work remains local; no package version changed and nothing was published.

## Interpolation and stepped-range follow-up (2026-10-29)

A further boundary pass reproduced finite intermediate-overflow errors in
`lerp`, `normalizeValue`, and `mapRange`, plus non-terminating iteration in
`randomFromRange`. Opposite large finite endpoints could produce Infinity,
NaN, or an incorrect position even when the mathematical result was finite.
Stepped random ranges could loop forever when addition stopped advancing or
infinite endpoints were accepted.

- `lerp` uses its existing formula for ordinary differences and a weighted-endpoint
  fallback when a finite endpoint difference overflows. `normalizeValue` halves
  finite operands before subtraction if its numerator or denominator overflows.
  `mapRange` composes these existing helpers, retaining its validation messages
  and returning derived NaN rather than introducing a new error. Extrapolation
  remains unclamped; normal finite arithmetic retains its previous results.
- `randomFromRange` now rejects non-finite endpoints and non-advancing steps. An
  exact endpoint terminates without requiring another increment. Repeated
  floating-point addition, ordinary random-selection boundaries, linear
  enumeration, and positive infinite steps with finite endpoints are retained.
- Added **19 regression cases**, with VM deadlines protecting loop regressions.
  **16 failed** against the original source; all now pass. The focused math/random
  run passes **1,188 tests across 97 suites**. Comparing **95 existing emitted
  declarations** finds no signature changes after removing comments/whitespace.
- **Windows and Linux Node 24:** full coverage runs pass **6,350 tests across 552
  suites**. Both report **98.84% lines, 98.78% statements, 99.27% functions, and
  96.20% branches**. No thresholds or exclusions changed.
- The Linux clean-install pipeline passes all 23 builds, type checks, lint,
  formatting, export/docs audits, **615 Lisbon date tests across 52 suites**, and
  isolated consumer checks for **all 23 packed packages**. Windows type, lint,
  formatting, export, and documentation checks also pass. Lint remains at
  **zero errors and 277 warnings**; inventories remain **516 runtime exports**
  and **23 valid Quick Examples**.
- Focused compiled boundary checks pass through CommonJS and named dynamic
  imports on **Windows and Linux with Node 20.20.2, 22.23.4, and 24.22.1**.
  The standalone Linux harness loads math's declared array/object dependency
  graph; no dependency manifest changes were needed. This is targeted current
  compatibility verification, distinct from the preceding full six-combination
  baseline records.

Evidence is retained under `local-testing/interpolation-boundaries/`, including
the original failing regressions, focused/full test logs and JSON, both platform
coverage summaries, declaration comparison, six compiled smoke results, and
Linux quality-step results. Public signatures, package versions, and existing
working-tree work are preserved. All work stayed local.

## Final local matrix validation (reviewed 2026-11-02)

The current working-tree snapshot completed the full local platform/runtime
matrix on 2026-10-30. These results replace the earlier compatibility limitation
where the complete Node 20/22 runs preceded the final boundary fixes. Reviewing
the recorded results on 2026-11-02 required no implementation changes.

- **Windows and Linux, Node 20.20.2, 22.23.4, and 24.22.1:** every combination
  passes **6,350 tests across 552 suites**, plus **615 Europe/Lisbon date tests
  across 52 suites**. The full runs use UTC; the separate date runs use Lisbon.
- All six combinations pass all 23 package builds, source/test/configuration type
  checks, lint, TypeScript formatting, export/documentation audits, and isolated
  consumer checks for **23 packed packages**. Linux runs each start from a clean
  dependency installation in a disposable container; Windows runs use the local
  installed dependencies. No GitHub workflow was triggered.
- All three Linux coverage runs and the Windows Node 24 coverage run report
  **98.84% lines, 98.78% statements, 99.27% functions, and 96.20% branches**.
  Lint remains **zero errors and 277 warnings** on all six combinations. Existing
  coverage thresholds and the warning cap remain unchanged.
- Packed consumers verify CommonJS, dynamic import, usable strict TypeScript
  declarations, dependency resolution, and the three new APIs. The inventory
  remains **516 runtime exports** and **23 valid Quick Examples**.
- A deterministic supplementary check uses **2,000 seeded sparse/frozen input
  pairs**, making **8,000 differential comparisons** of both original membership
  functions against their nested deep-equality behavior and both key-based APIs
  against Set membership. Inputs include duplicates, object/reference values,
  NaN, signed zero, Unicode, symbols, functions, BigInt, null, and undefined.
  All comparisons pass; this supplements the regression suite rather than
  establishing exhaustive equivalence for every possible JavaScript input.
- Comparing the **542 pre-existing declaration files** finds **540 unchanged**
  after removing comments/whitespace; the remaining two barrels differ only by
  the planned additive exports. There are no unexpected signature changes.
- Hash verification confirms **1,283 source, test, configuration, and
  documentation files** remained unchanged throughout validation, before this
  audit update. Existing working-tree edits and package versions are preserved.

Evidence is retained under `local-testing/final-validation/`. The asserted
`summary.json` aggregates each runtime's step statuses, test counts, coverage,
packed consumers, declaration comparison, and source hashes. Reproducible local
runners are `run-windows.cjs`, `../reliability/linux-runner.sh`,
`differential.cjs` (seed `0x6350552`), and `summarize.cjs`. The source archive
SHA-256 is recorded in `summary.json`. All validation stays local, and the
disposable validation containers have exited. The limitations in
[KNOWN_ISSUES.md](KNOWN_ISSUES.md) and the 277 existing lint warnings remain;
passing these checks does not establish that every possible input is defect-free.

## npm release preparation (2026-11-02)

After local validation, the user requested publication to npm. Public registry
inspection confirmed that all 23 local versions matched their published latest
versions. Release preparation therefore increments the six packages with new
APIs by a minor version and the other 17 packages by a patch version:

- `@ts-utilkit/array`: 0.3.0 → **0.4.0**.
- `@ts-utilkit/async`: 0.2.2 → **0.3.0**.
- `@ts-utilkit/date`: 0.2.2 → **0.3.0**.
- `@ts-utilkit/object`: 0.3.2 → **0.4.0**.
- `@ts-utilkit/result`: 0.2.0 → **0.3.0**.
- `@ts-utilkit/utility`: 0.4.0 → **0.5.0**.
- Patch releases: collection **0.2.1**, crypto **0.3.3**, encoding **0.2.2**,
  env **0.3.1**, event **0.2.1**, format **0.3.1**, math **0.3.2**, network
  **0.2.2**, parsing **0.2.2**, path **0.2.1**, random **0.3.1**, regex **0.3.1**,
  serialization **0.2.3**, string **0.2.2**, testing-utilities **0.3.1**,
  validation **0.3.1**, and webscraping **0.3.2**.

Internal dependency minimums and workspace lock entries now reference the tested
release versions. External dependency lock entries remain unchanged. Package
changelogs retain an empty Unreleased section above the dated release notes.
The root workspace version remains unchanged and is excluded from publication.

The updated versions pass isolated consumer checks for all 23 packages through
CommonJS, dynamic import, strict TypeScript declarations, dependency resolution,
and behavior. `npm publish --workspaces --include-workspace-root=false --dry-run
--ignore-scripts --access=public --tag=latest --registry=https://registry.npmjs.org/
--json` succeeds for all 23 packages. This uses the previously validated builds;
no runtime source code changed during release preparation.

The release plan, original metadata backups, dry-run results, package-check logs,
and prepared artifacts are retained under `local-testing/npm-release/`.
The publisher verifies artifact hashes and npm write access before uploading,
publishes dependencies first, and stops on a failed upload. Publishing is pending
npm authentication; no package has been uploaded at the time of this record.

## GitHub and npm rollout (2026-11-08)

The user authorized pushing the reviewed working-tree changes directly to
`main` and publishing the prepared npm releases. This supersedes the earlier
local-only verification preference and the historical pending-authentication
status above.

- Release commit [`1c8b835`](https://github.com/MForofontov/ts-utilkit/commit/1c8b835b76f6b94ea3744f57b5b8c5b08d74057f)
  was pushed to `origin/main`. The remote and local commit hashes matched, and
  the working tree was clean before the final documentation update.
- The [GitHub Actions quality run](https://github.com/MForofontov/ts-utilkit/actions/runs/42484988730)
  passed **all six jobs**: Windows/Linux with Node 20, 22, and 24. This is hosted
  CI verification of the release commit, distinct from the earlier local matrix.
- npm authentication succeeded as **mforofontov**, with write access confirmed
  for all 23 packages. After the user completed publishing authentication, all
  23 frozen artifacts were uploaded successfully in dependency order with public
  access and the `latest` tag. The root workspace was excluded.
- Public registry verification confirms every planned version and `latest` tag.
  Downloading all **23 public tarballs** confirms their SHA-512 integrities match
  the previously tested release artifacts exactly.
- A fresh consumer outside the checkout installed all **23 packages from npm**,
  using exact release versions and no local tarballs or workspace symlinks.
  CommonJS exports, named dynamic imports, strict TypeScript declarations,
  internal dependency resolution, and the new keyed-array and async Result APIs
  all pass. Synchronous error values retain their identity.
- npm processing initially delayed metadata and some tarball downloads, producing
  temporary 404/ETARGET responses. These resolved before the successful public
  installation and final verification. There are no remaining publication or
  authentication blockers.
- Package changelog release dates now reflect publication on **2026-11-08**.
  Runtime source code and tested tarballs were unchanged by this documentation
  update. The root workspace version remains 0.1.0.

Evidence is retained under `local-testing/npm-release/`, including
`publish-results.json`, `published-verification.json`, `github-ci.json`, and the
`public-install.log`, `public-types.log`, and `public-runtime.log` consumer checks.
All 23 published versions are listed in the release-preparation section above.

## Documentation and main-branch alignment (2026-11-08)

The pre-update local and remote `main` both matched
`99b1e57f01ca4bbd2966ecf2fe2bf323ccc19b7c`, with a clean working tree. Public
registry inspection confirmed that all **23 package.json versions match npm's
latest releases**. The workspace root remains 0.1.0 and is excluded from npm
publication.

- All **23 package READMEs** now show their actual release version with a direct
  npm version link and Node 20+ requirement. The root package overview lists all
  23 release versions and explains the separately versioned development root.
- Corrected the root footer from 408 functions to **516 runtime exports**, removed
  unconditional tree-shaking and zero-dependency claims, described the actual
  CommonJS output, and clarified per-function runtime validation and global
  coverage. Added the missing testing/contributing sections and fixed navigation.
- Corrected root README calls to `findDuplicates`, `asyncRetry`, and
  `calculateHaversineDistance`, the population standard-deviation result, and
  async concurrency examples. The TypeScript configuration uses Node16 module
  resolution, matching the verified public consumer setup.
- Separated the env migration's deprecated import from the current runnable
  example. Current async/utility changelog dependency references now match the
  installed release ranges. Older dated release history remains historical.
- Contributor examples now illustrate the existing per-function validation
  contract and use the current **277-warning** lint cap. The aggregate changelog
  distinguishes the 2026-11-08 package releases from unreleased documentation work.
- `audit:docs` now checks README release versions/links, current package changelog
  versions, root/package export counts, unknown package imports, and every README
  code block that imports a workspace package. It passes **31 examples**, including
  **7 root examples** and all **23 package Quick Examples**, with no mismatches or
  example errors.
- Five isolated in-memory negative controls confirm rejection of stale package,
  root overview, and changelog versions, an incorrect root count, and invalid
  example arguments. No project documents were modified by the negative controls.
  Export auditing still reports **516 runtime exports**; changed-file formatting
  and Git whitespace checks pass.

Evidence is retained under `local-testing/docs-alignment/`, including the live
registry comparison, positive audit report, negative-control reports, export
inventory, and formatting checks. These changes update repository documentation
and its audit; npm versions and previously published tarballs remain unchanged.
