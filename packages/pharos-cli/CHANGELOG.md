# @ithaka/pharos-cli

## 5.1.3

### Patch Changes

- [#233](https://github.com/ithaka/pharos/pull/233) [`87cc04e`](https://github.com/ithaka/pharos/commit/87cc04e7ef80320aab8c67c8ed1cd27ac6f6c748) Thanks [@Niznikr](https://github.com/Niznikr)! - update Lit, TypeScript, and Prettier

## 5.1.2

### Patch Changes

- [#188](https://github.com/ithaka/pharos/pull/188) [`767d6f8`](https://github.com/ithaka/pharos/commit/767d6f8f10267afcb111fa92d9a7b3a71c3fee4e) Thanks [@Niznikr](https://github.com/Niznikr)! - update to TypeScript 4.3:

  - Update packages to use TypeScript 4.3
  - Add `noImplicitOverride` flag
  - Update Prettier to support the new `override` keyword

## 5.1.1

### Patch Changes

- [#124](https://github.com/ithaka/pharos/pull/124) [`cf0b380`](https://github.com/ithaka/pharos/commit/cf0b38024298fe1f60466f171334f7bef8f6d344) Thanks [@Niznikr](https://github.com/Niznikr)! - update dependencies

## 5.1.0

### Minor Changes

- [#19](https://github.com/ithaka/pharos/pull/19) [`70f42ef`](https://github.com/ithaka/pharos/commit/70f42ef0776d1b0ff0ea32ae6560deef92757d8d) Thanks [@Niznikr](https://github.com/Niznikr)! - update to Lit 2:

  - Update to Lit 2 following upgrade guide
  - Update `@open-wc/testing` tools
  - Target `es2019` as recommended by Lit
  - Run tests on built JS package

* [#42](https://github.com/ithaka/pharos/pull/42) [`84e5bfa`](https://github.com/ithaka/pharos/commit/84e5bfad249b5e5738cf6adf03bc6f25c769628d) Thanks [@Niznikr](https://github.com/Niznikr)! - remove support for IE11:

  - Remove polyfills
  - Remove design token imports in components
  - Update documentation
  - Remove IE11 related styles

### Patch Changes

- [#86](https://github.com/ithaka/pharos/pull/86) [`802f4d8`](https://github.com/ithaka/pharos/commit/802f4d8e5d07a1e834e879d86898c77debd05fcf) Thanks [@Niznikr](https://github.com/Niznikr)! - import html from lit

## 5.0.3

### Patch Changes

- [#48](https://github.com/ithaka/pharos/pull/48) [`ced1c1f`](https://github.com/ithaka/pharos/commit/ced1c1f082e40b5e0b5c71830fb6c6cde1277b83) Thanks [@Niznikr](https://github.com/Niznikr)! - update dependencies:

  - Update Gatsby dependencies
  - Update ESLint dependencies
  - Update Sass
  - Update cli dependencies

## 5.0.2

### Patch Changes

- [#33](https://github.com/ithaka/pharos/pull/33) [`46fbc67`](https://github.com/ithaka/pharos/commit/46fbc679c16f094aef2c207e4f4c05e71552a9bb) Thanks [@Niznikr](https://github.com/Niznikr)! - update Storybook to generate React API tables:

  - Update Storybook to 6.3 alpha
  - Follow migration guidelines

## 5.0.1

### Patch Changes

- [#20](https://github.com/ithaka/pharos/pull/20) [`b8581b4`](https://github.com/ithaka/pharos/commit/b8581b4f72309037d0182266571e527a0dec86c5) Thanks [@Niznikr](https://github.com/Niznikr)! - remove component guidelines from Storybook:

  - Remove component guidelines from Storybook
  - Add links to the guidelines
  - Use React versions of components in the guidelines to render properly in Gatsby
  - Move Storybook images to the `.storybook` directory

## 5.0.0

### Major Changes

- [`329505a`](https://github.com/ithaka/pharos/commit/329505af1475004a64b319ca29614d8a0f2177d7) Thanks [@Niznikr](https://github.com/Niznikr)! - rename packages to publish to Ithaka namespace:

  - Rename package `@pharos/core` to `@ithaka/pharos`
  - Rename package `@pharos/cli` to `@ithaka/pharos-cli`
  - Rename package `@pharos/site` to `@ithaka/pharos-site`
  - Update documentation and imports

## 4.1.0

### Minor Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Lint mdx and js files:

  - Add `eslint-plugin-mdx` for linting mdx files
  - Add `eslint-plugin-no-smart-quotes` to find and replace smart quotes
  - Use eslint overrides to explicitly configure settings for each file type
  - Address linting errors

## 4.0.17

### Patch Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Update to TypeScript 4.2

## 4.0.16

### Patch Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Update dependencies

## 4.0.15

### Patch Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Update story title in cli templates:

  - Put stories in `Components` category
  - Generate component `.css.ts` file

## 4.0.14

### Patch Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Update TypeScript to 4.1

## 4.0.13

### Patch Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Update dependencies

## 4.0.12

### Patch Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Add `<pharos-dropdown-menu>` component

## 4.0.11

### Patch Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Update to TypeScript 4

## 4.0.10

### Patch Changes

- Thanks [@daneah](https://github.com/daneah)! - Fix decorator for safe custom element definition

## 4.0.9

### Patch Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Add prop interface for React components

## 4.0.8

### Patch Changes

- Upgrade to Storybook 6

## 4.0.7

### Patch Changes

- Replace Lerna with Yarn and Changesets
