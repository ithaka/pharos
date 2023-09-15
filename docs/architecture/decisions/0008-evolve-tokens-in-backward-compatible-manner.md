# 8. Evolve tokens in backward compatible manner

Date: 2023-02-15

## Status

Proposed

Enhances [6. Use CSS custom properties for component styles](0006-use-css-custom-properties-for-component-styles.md)

Enhances [7. Use scoped elements for decoupled teams](0007-use-scoped-elements-for-decoupled-teams.md)

## Context

When teams are using micro frontends with module sharing, the precise version of a component is not guaranteed.
This means removing a token that seems unused by the current component code base is still a breaking change.

Distribute teams experience this when trying to use a component that expects newly-available tokens
without having updated the version of tokens available on the host application first.

An improved protocol would ensure that using new tokens and removing old tokens has failsafes in place.

## Decision

Use an "add-only" approach for design tokens with a fallback mechanism for backward compatibility.

## Consequences

- Removing tokens must be treated as a breaking change.
- Usage of newly-added tokens must provide fallbacks. As an example, `var(--new-token, var(--old-token))`.
- Removing fallbacks must be treated as a breaking change.
- Tokens we want to remove should be marked as deprecated so consumers can audit their usage footprint.
