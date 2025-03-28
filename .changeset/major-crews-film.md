---
'@ithaka/pharos': minor
---

- Remove resizeObserver from every table cell, since it was causing performance issues with larger tables. 
- Update the table to allow passing custom headers while maintaining backwards compatibility for a columns array being passed in.
