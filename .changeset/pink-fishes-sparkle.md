---
'@ithaka/pharos-site': patch
---

docs(pharos-site): add storybook links to public component sections

- add `storyBookType` prop to `PageSection` component which takes in the element type for a specified component
- if 'storyBookType' is passed, pharos link is rendered to component specified url
- pass in `storyBookType` into the component sections
