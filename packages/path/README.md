# @ts-utilkit/path

Version: [0.2.1](https://www.npmjs.com/package/@ts-utilkit/path/v/0.2.1). Requires Node.js 20 or later.

POSIX-oriented path helpers with no filesystem I/O. Built on Node.js `path.posix`.

## Installation

```bash
npm install @ts-utilkit/path
```

## Quick Example

```typescript
import { joinPath, changeExt, relativePath } from '@ts-utilkit/path';

joinPath('src', 'utils', 'index.ts'); // 'src/utils/index.ts'
changeExt('photo.jpg', '.png'); // 'photo.png'
relativePath('/a/b', '/a/c'); // '../c'
```

## Available Functions

- `joinPath` / `normalizePath`
- `basename` / `dirname` / `extname`
- `changeExt`
- `ensureTrailingSlash` / `stripTrailingSlash`
- `isAbsolutePath` / `relativePath`

## License

MIT © [Mykyta Forofontov](https://github.com/MForofontov)
