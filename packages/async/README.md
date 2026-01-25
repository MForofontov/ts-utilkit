# @ts-utilkit/async

Asynchronous operation utilities for retry logic, timeouts, parallel execution, and promise management.

## Installation

```bash
npm install @ts-utilkit/async
```

## Features

- 🚀 Production-ready async patterns
- ⚡ Retry with exponential backoff
- ⏱️ Promise timeout handling
- 🔄 Controlled parallel execution
- 📦 Series execution with error handling
- ✅ Comprehensive test coverage

## Functions

### Retry Logic
- **asyncRetry** - Retry failed operations with exponential backoff

### Timeout Control
- **asyncTimeout** - Add timeout to any promise

### Execution Control
- **asyncParallel** - Execute multiple async operations with concurrency limit
- **asyncSeries** - Execute async operations sequentially
- **asyncMap** - Map array with async function
- **asyncFilter** - Filter array with async predicate

## Usage Examples

### Retry with Exponential Backoff

```typescript
import { asyncRetry } from '@ts-utilkit/async';

// Retry API call up to 3 times with exponential backoff
const data = await asyncRetry(
  async () => {
    const response = await fetch('https://api.example.com/data');
    if (!response.ok) throw new Error('API error');
    return response.json();
  },
  3,      // max retries
  1000    // initial delay (1s, then 2s, then 4s)
);
```

### Promise Timeout

```typescript
import { asyncTimeout } from '@ts-utilkit/async';

try {
  // Timeout after 5 seconds
  const result = await asyncTimeout(
    fetch('https://api.example.com/slow-endpoint'),
    5000
  );
} catch (error) {
  console.error('Request timed out or failed');
}
```

### Controlled Parallel Execution

```typescript
import { asyncParallel } from '@ts-utilkit/async';

const urls = [
  'https://api.example.com/user/1',
  'https://api.example.com/user/2',
  'https://api.example.com/user/3',
  // ... 100 URLs
];

// Process only 5 requests at a time
const results = await asyncParallel(
  urls.map(url => () => fetch(url).then(r => r.json())),
  5 // concurrency limit
);
```

### Sequential Execution

```typescript
import { asyncSeries } from '@ts-utilkit/async';

const operations = [
  async () => await database.createUser(userData),
  async () => await email.sendWelcome(user.email),
  async () => await analytics.trackSignup(user.id)
];

// Execute in order, stop on first failure
const results = await asyncSeries(operations);
```

### Async Array Operations

```typescript
import { asyncMap, asyncFilter } from '@ts-utilkit/async';

const userIds = [1, 2, 3, 4, 5];

// Map with async function
const users = await asyncMap(userIds, async (id) => {
  return await fetchUser(id);
});

// Filter with async predicate
const activeUsers = await asyncFilter(users, async (user) => {
  const status = await checkUserStatus(user.id);
  return status === 'active';
});
```

## API Documentation

For detailed API documentation, visit the [main repository](https://github.com/MForofontov/ts-utilkit).

## License

GPL-3.0 © MForofontov
