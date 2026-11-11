// Run after npm run build. Measures query sorting without malformed/empty values.
const assert = require('node:assert/strict');
const { performance } = require('node:perf_hooks');
const { normalizeURL } = require('../packages/network/dist/normalizeURL');
// Exact implementation before stable native sorting and per-entry filtering.
const previous = (() => {
  const _parseURL_1 = require('../packages/network/dist/_parseURL');
  function normalizeURL(url, options = {}) {
    // Set defaults
    const opts = {
      removeTrailingSlash: options.removeTrailingSlash ?? true,
      lowercaseHostname: options.lowercaseHostname ?? true,
      sortQueryParams: options.sortQueryParams ?? true,
      removeDefaultPorts: options.removeDefaultPorts ?? true,
      removeEmptyParams: options.removeEmptyParams ?? true,
    };
    const parsed = (0, _parseURL_1._parseURL)(url);
    // Lowercase hostname
    if (opts.lowercaseHostname) {
      parsed.hostname = parsed.hostname.toLowerCase();
    }
    // Remove default ports
    if (opts.removeDefaultPorts) {
      if (
        (parsed.protocol === 'http:' && parsed.port === '80') ||
        (parsed.protocol === 'https:' && parsed.port === '443')
      ) {
        parsed.port = '';
      }
    }
    // Remove trailing slash from pathname
    if (opts.removeTrailingSlash && parsed.pathname.endsWith('/')) {
      parsed.pathname = parsed.pathname.replace(/\/$/, '') || '/';
    }
    // Handle query parameters
    if (parsed.search) {
      const params = new URLSearchParams(parsed.search);
      // Remove empty parameters
      if (opts.removeEmptyParams) {
        const keysToDelete = [];
        params.forEach((value, key) => {
          if (value === '') {
            keysToDelete.push(key);
          }
        });
        keysToDelete.forEach((key) => params.delete(key));
      }
      // Sort query parameters
      if (opts.sortQueryParams) {
        const sortedParams = new URLSearchParams();
        const keys = Array.from(new Set(params.keys())).sort();
        keys.forEach((key) => {
          const values = params.getAll(key);
          values.forEach((value) => sortedParams.append(key, value));
        });
        parsed.search = sortedParams.toString();
      } else {
        parsed.search = params.toString();
      }
    }
    return parsed.toString();
  }

  return normalizeURL;
})();
let sink;
function measure(fn, input, iterations) {
  const run = () => {
    const start = performance.now();
    for (let i = 0; i < iterations; i++) sink = fn(input);
    return (performance.now() - start) / iterations;
  };
  for (let i = 0; i < 3; i++) run();
  return Array.from({ length: 7 }, run).sort((a, b) => a - b)[3];
}
for (const keys of [10, 250, 1000, 5000]) {
  const params = new URLSearchParams();
  for (let i = keys - 1; i >= 0; i--) {
    const key = 'key' + String(i).padStart(5, '0');
    params.append(key, 'first');
    params.append(key, 'second');
  }
  const input = 'https://Example.com/path/?' + params.toString() + '#fragment';
  assert.equal(normalizeURL(input), previous(input));
  const iterations = keys <= 250 ? 100 : keys <= 1000 ? 10 : 1;
  const beforeMs = measure(previous, input, iterations);
  const afterMs = measure(normalizeURL, input, iterations);
  assert.equal(sink, previous(input));
  console.log(
    JSON.stringify({
      keys,
      entries: keys * 2,
      iterations,
      beforeMs,
      afterMs,
      speedup: beforeMs / afterMs,
    }),
  );
}
