---
'@ithaka/pharos': minor
---

Upgrade to Style Dictionary 3.0

- Use the `outputReferences` option to generate tokens by reference instead of by value.
  That is, CSS and SCSS variables can reference other variables in turn, keeping the provenance of each token in the output.
- Rename the `1x`, `2x`, etc. tokens to `1-x`, `2-x`, etc. to maintain and match their output names.
