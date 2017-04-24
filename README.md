# env-check

Environment variable checking for node apps.

## Usage

> npm install @mcrowe/env-check --save

Add an "env" section to your `package.json` file with a schema for environment variables:

```js
"env": {
  "required": {
    "SERVICE_URL": "URL for the super service",
    "CONCURRENCY": "Number of concurrent workers to run",
  },
  "optional": {
    "LOG_LEVEL": "Log level [debug, info, error] (defaults to 'info')",
  }
}
```

Require `@mcrowe/env-check` when running your program to validate environment variables:

> node -r @mcrowe/env-check index.js

## Development

Install npm modules:

> npm install

Run tests:

> npm test

## Release

Release a new version:

> bin/release.sh

This will publish a new version to npm, as well as push a new tag up to github.
