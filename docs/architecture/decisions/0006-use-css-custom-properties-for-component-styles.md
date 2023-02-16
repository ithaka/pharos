# 6. Use CSS custom properties for component styles

Date: 2020-04

## Status

Accepted

Enhanced by [8. Evolve tokens in backward compatible manner](0008-evolve-tokens-in-backward-compatible-manner.md)

Enhanced by [8. Evolve tokens in backward compatible manner](0008-evolve-tokens-in-backward-compatible-manner.md)

Enhanced by [8. Evolve tokens in backward compatible manner](0008-evolve-tokens-in-backward-compatible-manner.md)

## Context

Web components tend toward full isolation from the host for a variety of good reasons.
There are also good reasons components should be affected by the host application.
User-indicated theming such as light and dark mode or accessible color schemes for visual impairments are examples.

Because environmental dynamics should be able to impact a component's visual display, we can't bake everything in.
SCSS variables allow for referential abstraction during development, but are dereferenced at build time.

## Decision

Use CSS custom properties, also known as CSS variables, to reference design tokens in component CSS.

## Consequences

- A component's visual design can be impacted from outside the component's scope.
- This allows for theming and other dynamics we can't yet predict.
- This opens up the possibility of accidental impact by consumers, but design token names are namespaced clearly.
