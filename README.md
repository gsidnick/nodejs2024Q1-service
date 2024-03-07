# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone https://github.com/gsidnick/nodejs2024Q1-service.git
```

## Environment

Copy `.env.example` file and then rename it to `.env` before running the application

## Installing NPM modules

```
npm install
```

## Running Application

### Production Mode

```
npm run start
```

### Development Mode

```
npm run start:dev
```

### Build Application

```
npm run start:prod
```

> After starting the app on port (4000 as default) you can open
> in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
> For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only users test suites

```
npm run test test/users.e2e.spec.ts
```

To run only albums test suites

```
npm run test test/albums.e2e.spec.ts
```

To run only artists test suites

```
npm run test test/artists.e2e.spec.ts
```

To run only tracks test suites

```
npm run test test/tracks.e2e.spec.ts
```

To run only favorites test suites

```
npm run test test/favorites.e2e.spec.ts
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

## Auto-fix and format

```
npm run lint
```

```
npm run format
```

## Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
