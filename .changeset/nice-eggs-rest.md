---
'@ithaka/pharos': major
---

Added selected state for secondary and subtle button variants

Added a new `selected` property to the Pharos button component to indicate when a button is in an active or pressed state. This addresses the need to show button state in toolbars and forms where single buttons (not toggle groups) need to display their current selection status.

What was added:

- New `selected` boolean property that can be applied to button components
- Visual styling for selected state on secondary button variant with interactive blue border and text color
- Visual styling for selected state on subtle button variant with light gray background and orange text color
- Support for selected states on dark backgrounds with appropriate color adjustments
- Updated hover behavior for secondary buttons to include light gray background fill
- Comprehensive test coverage for accessibility and functionality of selected states
- Storybook documentation showing examples of selected buttons in both web component and React implementations

How it works:
Users can now add the `selected` attribute to secondary and subtle button variants to visually indicate the button is active or represents the current selection. The styling follows the design system specifications with proper color contrast and accessibility support. This feature is intended for use cases like toolbar buttons, form controls, and other interfaces where showing active button state improves user experience.

Design guidelines followed:

- Secondary selected buttons use blue border styling to maintain visual hierarchy
- Subtle selected buttons use orange text with gray background for clear indication
- Avoided applying selected state to primary buttons to prevent confusion with primary actions
- Maintained all existing accessibility features and keyboard navigation
