# 4. Provide a React wrapper for web components

Date: 2020-03

## Status

Accepted

Enhances [3. Build components using web component technology](0003-build-components-using-web-component-technology.md)

## Context

React [does not integrate tightly with web components](https://reactjs.org/docs/web-components.html).
A React component that wishes to use a web component's imperative API must create a ref to do so.
A React component that wishes to listen for a web component's events must explicitly listen for those as well.

A team using React will experience the same basic needs for every component they use.
Because each component in the system is a web component, if they're using the raw components, this will be a burden.

## Decision

Provide a React wrapper for every component.

## Consequences

- This will create duplicative code or the need for an automated method of React wrapper creation at build time.
