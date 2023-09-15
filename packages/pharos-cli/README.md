# Pharos CLI

<!-- toc -->

- [Getting started](#getting-started)
- [Usage](#usage)
  * [Example](#example)

<!-- tocstop -->

A command-line tool for creating new web components for the Pharos design system.

This will generate SCSS, TypeScript, unit test, and Storybook story files for the component to make getting started more consistent.

# Getting started

The dependencies for `@ithaka/pharos-cli` are installed when running `yarn install` so no additional install step is needed.

To get this CLI setup, go to your terminal and change to this directory:

```shell
$ cd packages/pharos-cli
```

Next, you will need to compile the TypeScript files into JavaScript:

```shell
$ tsc
```

Lastly, you will need to link this package so it is runnable:

```shell
$ npm link
```

At this point the `pharos` command can be used in the root of this repo.

# Usage

To generate the core files needed to start developing a Pharos web component, go to the root of the Pharos repository and run the following command:

```shell
$ pharos component|wc <component-name>
```

## Example

Create a Button component by using the following command:

```shell
$ pharos wc button
```

You should now see your new Button component under the `components` directory:

```
├── packages
│   ├── core
│   │   ├── src
│   │   │   ├── components
│   │   │   │   ├── button
│   │   │   │   │   ├── pharos-button.ts
│   │   │   │   │   ├── pharos-button.scss
│   │   │   │   │   ├── pharos-button.test.ts
│   │   │   │   │   ├── pharos-button.wc.stories.mdx
│   │   │   │   │   └── PharosButton.react.stories.mdx
```

You are now ready to begin developing your new component!

```shell
$ yarn storybook:wc:dev
```

Happy Developing!
