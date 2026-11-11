# @ts-utilkit/path

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
