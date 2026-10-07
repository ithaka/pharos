## Review component documentation

When reviewing a pull request, check whether changes to public Pharos components require corresponding
documentation updates.

- Identify changes to public properties and attributes, events, slots, defaults, supported values,
  usage, keyboard interactions, or accessibility behavior. Include consumer-visible changes introduced
  by shared code.
- Compare those changes with the affected component's documentation in
  `packages/pharos-site/src/content/components/<component>.mdx` and any relevant examples. For example,
  button documentation is in `button.mdx`.
- Check whether documentation remains accurate and sufficiently explains how consumers should use the
  changed component. An unrelated documentation edit does not satisfy this check.
- Do not request documentation changes for internal refactors, test-only changes, or fixes that restore
  already documented behavior.
- Report concrete gaps: describe the changed behavior, identify the affected documentation file or
  section, and explain what needs updating.
- If you cannot locate or verify the relevant documentation, state that limitation rather than claiming
  documentation is missing or up to date.
- Avoid generic "please update documentation" comments and do not repeat concerns already raised in the
  review.
