# 3. Build components using web component technology

Date: 2020-03

## Status

Accepted

Enhanced by [4. Provide a React wrapper for web components](0004-provide-a-react-wrapper-for-web-components.md)

## Context

Web technologies change rapidly, and they change fastest at the layers that exist above web standards.
Frameworks such as React and Vue face a growing list of competitors, and teams may use multiple frameworks.
A design system needs to support these scenarios with longevity.

A system that provides components specific to a framework(s) will need to adapt and shift as teams use new frameworks.
This creates complexity and maintenance burden with a chance for divergence and human error.

## Decision

Use web component technology to remain framework agnostic and stabilize development even as frameworks come and go.

## Consequences

- There will be a learning curve to understand web component standards and life cycles.
- Because web components are more isolated by way of the shadow DOM, the need for careful customizability and governance will arise.
- The current state of browser support for the shadow DOM and of our support for browsers will require polyfilling.
