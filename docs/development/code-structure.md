# Code structure

<!-- toc -->

- [Infrastructure code](#infrastructure-code)
- [`@pharos/core` package](#pharoscore-package)
- [`@pharos/site` package](#pharossite-package)

<!-- tocstop -->

At a high level, the Pharos code base consists of two packages, `@pharos/core` and `@pharos/site`, along with supporting continuous integration infrastructure code.

## Infrastructure code

The infrastructure code enables continuous integration tools to perform activities like unit testing, visual regression testing, deployment of Storybooks, and so on. You can find infrastructure related code in the `jenkins/` and `k8s/` directories.

## `@pharos/core` package

The `@pharos/core` package contains the design tokens and components you can use to develop user interfaces for your pages. The package contains a number of additional directories:

```
packages/core
├── ...
├── scripts/
├── src/
├── tasks/
└── tokens/
```

The `scripts/` and `tasks/` directories contain code for building the package. The `src/` directory contains the TypeScript code for all Pharos components, along with utilities for developing those components. The `tokens/` directory contains the [design tokens](./design-tokens.md) used to define Pharos' visual language.

## `@pharos/site` package

The `@pharos/site` package contains a [Gatsby](https://www.gatsbyjs.org/)-based site that will act as a portal for Pharos consumers to read the Pharos design guidelines, download brand assets, and so on. The site is in active design and development but not yet ready for mass consumption.
