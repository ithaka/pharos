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

Pharos is committed to supporting the current long-term support (LTS) version of Node.js.
Refer to [.tool-versions](../../.tool-versions) for the latest node version compatible with Pharos.
Node can be installed from [its website](https://nodejs.org/en/), with [nvm](https://github.com/nvm-sh/nvm#install--update-script),
or with [asdf](https://asdf-vm.com/) and its [Node.js plugin](https://github.com/asdf-vm/asdf-nodejs).

If you're using `nvm`, run the following command to switch to a Node version compatible with the project:

```shell
$ nvm use
```

If you're using `asdf` then the compatible Node version is selected automatically if it's already installed. If it's not installed, run the following command to install the compatible Node version:

```shell
$ asdf install
```

The Pharos repository contains multiple packages, and [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) helps you manage dependencies and tasks across them. Use `npm` to install Yarn globally:

```shell
npm install --global yarn
```

The Pharos repository uses Yarn version 1, also known as Yarn classic. The repository contains Yarn configuration that should select the right verion of Yarn to run automatically.

Once Yarn is installed, use it to install the dependencies for the Pharos project and its packages. From the root folder of the project run:

```shell
$ yarn install
```

Pharos packages are written in [TypeScript](https://www.typescriptlang.org/), a superset of JavaScript that adds static typing. Each package contains Typescript as a development dependency, so Typescript is automatically installed when running Yarn.

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
