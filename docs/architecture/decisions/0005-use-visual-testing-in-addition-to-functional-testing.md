# 5. Use visual testing in addition to functional testing

Date: 2020-04

## Status

Accepted

## Context

In addition to functional behavior, a large part of what it means for a component to "work" is its visual presentation.
We may make changes that continue to pass the scrutiny of our functional tests, but that break a component visually.
These may be changes in CSS or the DOM or the interaction between the two.

## Decision

Test the visual difference between each new change and the previous baseline, and make this a barrier to release.

## Consequences

- We will need a system that can create, store, and compare screenshots of rendered components.
- As with snapshot testing, there may be added noise at moments where we intentionally change something.
