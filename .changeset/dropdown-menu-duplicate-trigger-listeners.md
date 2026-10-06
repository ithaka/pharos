---
'@ithaka/pharos': patch
---

Fix Dropdown menu and Popover triggers registering duplicate listeners when another library (such as Sentry) wraps `addEventListener`, which caused a single click to open and immediately close the menu. See #1439.
