---
'@ithaka/pharos': patch
---

Fix Popover component missing `background-color`, which allowed content behind it to visually show through despite the correct `box-shadow` and `z-index`. See #1386.
