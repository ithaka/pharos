# 7. Use scoped elements for decoupled teams

Date: 2021-09

## Status

Accepted

Enhanced by [8. Evolve tokens in backward compatible manner](0008-evolve-tokens-in-backward-compatible-manner.md)

## Context

In the context of distributed teams, each team may consume components independently but arrive on a single page.
Imposing a single unified component version across the whole page creates maintenance burden and cross-team coupling.
Allowing differing versions without care could result in a version (and API) mismatch.

## Decision

Use scoped custom element registries to ensure each consumer is isolated from others.

## Consequences

- Scoped custom elements are still a proposal, so a polyfill is required and the proposal may never be accepted.
  - We are comfortable with this trade-off given the support in the ecosystem, but may need to react later on.
- Teams adopting Pharos will have increased complexity up front to register the components they use.
- Teams adopting Pharos will have increased complexity ongoing to use the scoped component names in their DOM.
- Internal complexity increases when components are nested due to scoping; those must remain "invisible" to consumers.
