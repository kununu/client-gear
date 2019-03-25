# client-gear
Layout and theming utilities, shared molecular components:
- @kununu/kununu-footer - layout utility to build kununu footer
- @kununu/form-wrapper - HOC to use with forms
- @kununu/kununu-header - layout utility to build kununu header
- @kununu/kununu-icons - icon components
- @kununu/kununu-logo - kununu logo component
- @kununu/kununu-overlay - overlay with kununu flower spinning
- @kununu/kununu-utils - aggregation of utility functions and middlewares

## Setup
```sh
npm i # Install all dependencies in all packages via lerna
```

## Start client-playground
```sh
npm start
```

## Useful commands
### Build all packages
```sh
npm run dist
```

### Run tests for specific package
Run tests for kununu-utils
```sh
npm run test -- packages/kununu-utils
```

### Run script for specific package
Run `npm run sass` for kununu-footer
```sh
lerna exec npm run sass --scope @kununu/kununu-footer
```

### Check outdated npm packages in all packages
Run `npm outdated` in all packages ignoring non-zero (error) exit codes
```sh
lerna exec npm outdated --no-bail
```

### Publish a specific package
```sh
npm run publish:footer
```
