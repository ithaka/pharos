# Design tokens

<!-- toc -->

- [Token architecture](#token-architecture)

<!-- tocstop -->

Design tokens are a way of abstracting decisions about the visual language of a system from that system's implementation. This approach allows design system teams to target multiple platforms with a centralized source of truth, and makes it easier for the team to manage complex hierarchical relationships. Ultimately tokens help maintain the stability and consistency design systems intend to create for product teams.

## Token architecture

Pharos uses [Style Dictionary](https://github.com/amzn/style-dictionary) to organize tokens and transform them for consumption in various formats.

The `packages/core/tokens/` directory organizes tokens according to category and scope. The `components/` directory contains component-scoped tokens, and the other top-level directories each represent a token category.

JSON files within these directories define a hierarchy of token definitions. Token names derive directly from the hierarchy created in any particular JSON file and aren't affected by the directory structure. Read about token naming structure in the [Pharos design token guidelines](https://www.jstor.org/pharos/design-tokens).
