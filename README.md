# Typescript NPM Package Starter
My template for creating npm packages using typescript.

- TS to JS
- Testing via Jest, includes coverage
- ESLint
- Ignore files to ensure minimal code is stored/shipped

NPM link: [@el3um4s/typescript-npm-package-starter](https://www.npmjs.com/package/@el3um4s/typescript-npm-package-starter)

### Getting Started

To create a new project based on this template using degit:

```bash
npx degit el3um4s/typescript-npm-package-starter
```

Then install the dependencies with

```bash
npm install
```

Now update the name field in package.json with your desired package name. Then update the homepage field in package.json. And finally add your code.

### Build the package

Run

```bash
npm run build
```

### Test the package

You can test the code with [Jest](https://jestjs.io/)

```bash
npm test
```

You can find the test coverage in `coverage/lcov-report/index.html`.

### Check dependencies

You can check and upgrade dependencies to the latest versions, ignoring specified versions. with [npm-check-updates](https://www.npmjs.com/package/npm-check-updates):

```bash
npm run check-updates
```

You can also use `npm run check-updates:minor` to update only patch and minor.

Instead `npm run check-updates:patch` only updates patch.

### Publish

First commit the changes to GitHub. Then login to your [NPM](https://www.npmjs.com) account (If you don’t have an account you can do so on [https://www.npmjs.com/signup](https://www.npmjs.com/signup))

```bash
npm login
```

Then run publish:

```bash
npm publish
```

If you're using a scoped name use:

```bash
npm publish --access public
```

### Bumping a new version

To update the package use:

```bash
npm version patch
```

and then

```bash
npm publish
```

### Install and use the package

To use the package in a project:

```bash
npm i @el3um4s/typescript-npm-package-starter
```

and then in a file:

```ts
import { ciao } from "@el3um4s/typescript-npm-package-starter";

const b = ciao("mondo");
console.log(b); // Ciao Mondo
```