# next-api-utils

[![Build Status](https://github.com/jonahsnider/next-api-utils/workflows/CI/badge.svg)](https://github.com/jonahsnider/next-api-utils/actions)

Utilities for building better APIs with Next.js app router.

## Installation

```sh
npm i next-api-utils
```

### Next.js version compatibility

| Next.js version | next-api-utils version    |
| --------------- | ------------------------- |
| v15             | v2                        |
| v14             | v1 (no longer maintained) |
| v13             | v1 (no longer maintained) |

## Documentation

Generated documentation for the latest version is available at [next-api-utils.jonahsnider.dev](http://next-api-utils.jonahsnider.dev/).

## Usage

### Client components

If you try importing `next-api-utils` from a client component, you will get an error since certain features are only available on the server.

There is a separate export you can use in client components, which doesn't include any of the server-only features.

```js
import { ... } from 'next-api-utils/client';
```

The default export and `next-api-utils/server` extend `next-api-utils/client` with server-only features.
