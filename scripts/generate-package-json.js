const fs = require('fs');
const path = require('path');

// Module metadata
const modules = {
  array: {
    description: 'Comprehensive array manipulation utilities including sorting, filtering, transformation, and mathematical operations',
    keywords: ['array', 'utilities', 'sorting', 'filtering', 'transformation']
  },
  async: {
    description: 'Asynchronous operation utilities for retry logic, timeouts, parallel execution, and promise management',
    keywords: ['async', 'promises', 'retry', 'timeout', 'parallel']
  },
  collection: {
    description: 'Collection utilities for Sets, Maps, and conversions between different collection types',
    keywords: ['collection', 'set', 'map', 'conversion', 'utilities']
  },
  configuration: {
    description: 'Configuration management utilities for environment variables, deep merging, and validation',
    keywords: ['config', 'environment', 'configuration', 'validation', 'settings']
  },
  crypto: {
    description: 'Cryptographic utilities for hashing (SHA-256, SHA-512, MD5), encryption (AES-256), HMAC, and password management',
    keywords: ['crypto', 'hash', 'encryption', 'hmac', 'security', 'password']
  },
  date: {
    description: 'Date and time manipulation utilities for formatting, calculations, and timezone handling',
    keywords: ['date', 'time', 'datetime', 'formatting', 'timezone']
  },
  encoding: {
    description: 'Encoding and decoding utilities for Base64 and other encoding schemes',
    keywords: ['encoding', 'base64', 'decode', 'encode']
  },
  event: {
    description: 'Event handling utilities including EventEmitter, debounce, throttle, event bus, and delegation',
    keywords: ['event', 'emitter', 'debounce', 'throttle', 'pubsub', 'delegation']
  },
  format: {
    description: 'Formatting utilities for numbers, dates, strings, and currencies',
    keywords: ['format', 'formatting', 'number', 'currency', 'string']
  },
  math: {
    description: 'Mathematical utilities covering algebra, geometry, statistics, number theory, and combinatorics',
    keywords: ['math', 'algebra', 'geometry', 'statistics', 'calculation']
  },
  network: {
    description: 'Network utilities for URL validation, IP address handling, and network-related operations',
    keywords: ['network', 'url', 'ip', 'validation', 'http']
  },
  object: {
    description: 'Object manipulation utilities for deep merging, cloning, path access, and transformation',
    keywords: ['object', 'merge', 'clone', 'utilities', 'transformation']
  },
  parsing: {
    description: 'Parsing utilities for JSON, CSV, XML, and other data formats',
    keywords: ['parsing', 'json', 'csv', 'xml', 'data']
  },
  random: {
    description: 'Random generation utilities for numbers, strings, arrays, and weighted selections',
    keywords: ['random', 'generator', 'uuid', 'selection', 'utilities']
  },
  regex: {
    description: 'Regular expression utilities for pattern matching and text processing',
    keywords: ['regex', 'pattern', 'matching', 'validation', 'text']
  },
  serialization: {
    description: 'Serialization and deserialization utilities for various data formats',
    keywords: ['serialization', 'json', 'serialize', 'deserialize', 'data']
  },
  string: {
    description: 'String manipulation utilities for formatting, transformation, and text processing',
    keywords: ['string', 'text', 'formatting', 'manipulation', 'utilities']
  },
  'testing-utilities': {
    description: 'Testing utilities and helpers for generating test data, assertions, and performance testing',
    keywords: ['testing', 'test', 'utilities', 'helpers', 'assertions', 'jest']
  },
  utility: {
    description: 'General-purpose utility functions for debouncing, throttling, color conversion, and common patterns',
    keywords: ['utility', 'helpers', 'debounce', 'throttle', 'utils']
  },
  validation: {
    description: 'Validation utilities for email, URL, IP addresses, UUID, dates, and custom patterns',
    keywords: ['validation', 'validator', 'email', 'url', 'ip', 'uuid']
  },
  webscraping: {
    description: 'Web scraping utilities for HTML parsing, data extraction, and web content processing',
    keywords: ['scraping', 'html', 'parsing', 'extraction', 'web']
  }
};

const baseVersion = '1.0.0';
const author = 'MForofontov';
const license = 'GPL-3.0';
const repository = 'https://github.com/MForofontov/ts-functions';

function generatePackageJson(moduleName) {
  const meta = modules[moduleName];
  const packageName = `@ts-functions/${moduleName}`;
  
  const packageJson = {
    name: packageName,
    version: baseVersion,
    description: meta.description,
    main: 'dist/index.js',
    types: 'dist/index.d.ts',
    license,
    repository: {
      type: 'git',
      url: `${repository}.git`,
      directory: `packages/${moduleName}`
    },
    keywords: meta.keywords,
    author,
    engines: {
      node: '>=20'
    },
    scripts: {
      build: 'tsc',
      prepublishOnly: 'npm run build'
    },
    files: [
      'dist',
      'README.md',
      'LICENSE'
    ],
    publishConfig: {
      access: 'public'
    }
  };
  
  return packageJson;
}

// Generate package.json for each module
console.log('Generating package.json files for all modules...\n');

Object.keys(modules).forEach(moduleName => {
  const packagePath = path.join(__dirname, '..', 'packages', moduleName);
  const packageJsonPath = path.join(packagePath, 'package.json');
  
  if (!fs.existsSync(packagePath)) {
    console.error(`✗ Package directory not found: ${packagePath}`);
    return;
  }
  
  const packageJson = generatePackageJson(moduleName);
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');
  
  console.log(`✓ Created ${moduleName}/package.json (${packageJson.name})`);
});

console.log('\n✓ All package.json files generated successfully!');
