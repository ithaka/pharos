# Quick start guide

<!-- toc -->

- [Setup](#setup)
- [Tests](#tests)
- [Storybook](#storybook)

<!-- tocstop -->

This guide will help you create a minimum viable environment for developing Pharos components.

## Setup

Start by cloning the Pharos repository:

```shell
$ git clone git@github.com:ithaka/pharos.git
```

The Pharos repository contains multiple packages. [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) helps you manage dependencies and tasks across them. Use `npm` to install Yarn globally:

```shell
npm install --global yarn
```

Once Yarn is installed, use it to install the dependencies for the Pharos project and its packages:

```shell
$ yarn install
```

Pharos supports the current long-term support (LTS) version of Node.js—currently version 14. Node can be installed from [its website](https://nodejs.org/en/) or with [nvm](https://github.com/nvm-sh/nvm#install--update-script). If you're using `nvm`, run the following command to switch to a Node version compatible with the project:

```shell
$ nvm use
```

The packages in Pharos are written in [TypeScript](https://www.typescriptlang.org/) which is a superset of JavaScript that adds static typing to the language. The minimal supported version in this project is `3.8`. Use `npm` to install the latest version globally:

```shell
$ npm install --global typescript
```

## Tests

If the steps so far have succeeded, you should now be equipped to run the unit tests. Try running those now:

```shell
$ yarn workspace @ithaka/pharos test
# OR
$ yarn test
```

This will run the tests for the `@ithaka/pharos` package, and if they succeed you should see a message like the following:

```
Chromium: |██████████████████████████████| 12/12 test files | 160 passed, 0 failed
Firefox:  |██████████████████████████████| 12/12 test files | 160 passed, 0 failed
Webkit:   |██████████████████████████████| 12/12 test files | 160 passed, 0 failed

Test coverage: 96.21 %
View full coverage report at coverage/lcov-report/index.html

Finished running tests in 17.4s, all tests passed! 🎉
```

## Storybook

[Storybook](https://storybook.js.org) is a development environment and playground for user interface components. It enables developers to create components independently and showcase components interactively in an isolated space. Storybook is an effective way to test components as you develop them, stress testing the behavior and visual design to uncover edge cases.

To start Storybook for web components and watch for changes during development, use the following command:

```shell
$ yarn storybook:wc:dev
```

Similarly, to start Storybook for React and watch for changes during development, use the following command:

```shell
$ yarn storybook:react:dev
```

These commands should open Storybook in your browser of choice, actively polling for changes in components' TypeScript and SCSS files to update and hot reload Storybook accordingly.
