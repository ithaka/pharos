# 2. Capture design decisions in a token hierarchy

Date: 2019-11

## Status

Accepted

## Context

Design decisions around aspects like color, font, spacing, animation, and so on are intentional and specific.
These decisions must make their way into the concrete implementation of components.
Hard-coding values can lead to divergence and makes updating values across the system a tedious task.
Hard-coding also makes it difficult to see at a glance what values we use at any given time.

Design decisions have layers of abstraction based on the context of the decision.
We can choose a specific color to exist in our palette, but that doesn't provide meaning.
We can then choose that color as the primary color for interactive elements, which adds significant context.
We can then assign that interactive color for variants of components like primary buttons, links, and so on.
If this hierarchy of context is built using the raw color value at each level, consistency becomes difficult.

## Decision

Use a hierarchical design token model that supports referential values to provide design decisions to components.

## Consequences

- We will experience increased complexity of the system due to abstraction of the design decision concept into tokens.
- We need to store tokens in a format components can use directly, or that can be transformed into such a format.
