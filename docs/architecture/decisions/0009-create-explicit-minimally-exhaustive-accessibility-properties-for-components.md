# 9. Create explicit, minimally exhaustive accessibility properties for components

Date: 2023-04-04

## Status

Accepted

## Context

Pharos uses the web components, a set of standards that allow web developers to create custom elements with isolated styling and behavior. The web component standards have not brought accessibility along with them, and the accessibility object model (AOM) has not yet been standardized across all browsers with first-class support for web components.

In particular, placing ARIA attributes on custom elements doesn’t produce the proper outcomes in the accessibility tree, resulting in issues parsing the intended calculated values and relationships while using assistive technologies.

Consumers of these components should not need to access the shadow DOM directly to get their work done—they care about using components, and that those components do the right thing. Components should not need to access the shadow DOM directly to get their work done—a Tooltip should not need to know about a Button’s underlying <button>. Management of attributes deferred to underlying native elements should be as painless as possible—explicitly deferring each and every possible attribute will not fly.

## Decision

Create an (enforced) convention of property names that, when supplied at the custom element, are rendered as ARIA attributes on the appropriate underlying native element(s) in the web component’s shadow DOM.

When a custom element has a a11y-\* attribute, that attribute gets passed down to the appropriate (as decided on a per-component basis) underlying native element.

<pharos-button a11y-aria-describedby="the-tooltip">
    Click me
</pharos-button>

<pharos-tooltip id="the-tooltip">
    I am a tooltip
</pharos-tooltip>

The button’s shadow DOM would then look like:

<button aria-describedby="the-tooltip">
    Click me
</button>

Shorter attribute names could have been used for brevity, but we should in general avoid possible conflicts with valid HTML5 attribute names.

## Consequences

- We must introduce breaking changes, because we don't want the current ARIA-related attributes that don't follow this convention to continue working after a certain point in the interest of having one right way to do things.
- We must enumerate the possible valid ARIA attributes for all our components and ensure each one renders the supplied value to the appropriate shadow DOM element. This is usually the first child, but not always.
- We can increase awareness of usage so that consumers know that accessibility with Pharos components should generally be done using the new attribute convention, rather than supplying raw ARIA attributes directly.
- We may need to react in the future if the AOM catches up to web components and makes a breaking or strongly suggested change that enables supplying ARIA attributes on custom element hosts.

## References

- [How to Meet WCAG (Quick Reference)](https://www.w3.org/WAI/WCAG21/quickref/)
- [Understanding Success Criterion 4.1.2: Name, Role, Value | WAI | W3C](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html)
- [The ARIA Role Conformance Matrices](https://whatsock.com/training/matrices/)
