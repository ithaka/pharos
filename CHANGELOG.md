# Changelog

**This changelog is historic. To see the latest changes please view the package-specific changelogs**

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- @pharos/core
  - Add `<pharos-loading-spinner>` component

### Fixed

- @pharos/core
  - Remove debounce from focus mixin
  - Emit single click event for checkboxes and radios

### Changed

- @ithaka/pharos-site
  - Modify navigation to new design/layout

## [4.0.6] - 2020-08-05

### Added

- @ithaka/pharos-site
  - Add design token structure and architecture documentation

### Changed

- @pharos/core

  - Use Web Test Runner for unit testing

- @ithaka/pharos-site
  - Use live components instead of screenshots in guidelines

### Maintenance

- @ithaka/pharos-site

  - Update site deployment to use apps/v1 Kubernetes API and a rolling update deployment strategy

- Storybooks
  - Update deployment to use apps/v1 Kubernetes API and a rolling update deployment strategy

### Fixed

- @pharos/core
  - Update Storybook dev script to correct build error thrown
  - Implicitly submit the form on enter for text inputs

## [4.0.5] - 2020-07-30

### Changed

- @pharos/core
  - Update heading letter-spacing for sizes 70 and 80

## [4.0.4] - 2020-07-29

### Fixed

- @pharos/core
  - Update combobox displayed text when value changes

## [4.0.3] - 2020-07-28

### Fixed

- @pharos/core
  - Update combobox displayed value for async options

## [4.0.2] - 2020-07-27

### Fixed

- @pharos/core
  - Initially supplied values or programmatically changed values were not displayed in Combobox
  - Ensure default props are reflected on component attributes
  - Fix tooltip dismiss behavior in IE11

## [4.0.1] - 2020-07-24

### Fixed

- @pharos/core
  - Combobox options were not being properly translated for the React component

## [4.0.0] - 2020-07-24

### Changed

- @pharos/core
  - Update Combobox to return a selected option's _value_ rather than its text

### Fixed

- @pharos/core
  - Fix shifting text in Combobox input on focus
  - Remove unwanted box shadow on required Combobox input (browser-dependent)
  - The hoverable and clickable region for Checkbox and RadioButton didn't align with the visual display
  - Headings without an explicit `size` attribute inherited font size from their parent document
  - Tooltips could cause the text alignment of slotted content to change unexpectedly
  - When a combobox opened it could scroll the page in a jarring way

### Maintenance

- Reduce wait time on Chromatic builds with `--exit-once-uploaded`

## [3.2.0] - 2020-07-22

### Added

- Storybooks
  - Update to use controls instead of knobs
  - Sync React and Web Component stories
  - Update RC9

### Fixed

- @pharos/core
  - Rename tooltip close event and emit/listen to it on the component
  - Improve combobox screen reader experience
  - Select should choose the first option by default if none are explicitly selected
  - Allow links to be clicked in checkbox and radio labels

## [3.1.0] - 2020-07-20

### Added

- @pharos/core

  - Add `<pharos-combobox>` component
  - Add `focus` method to public API for alerts and form elements via mixin

- @ithaka/pharos-site

  - Add `Component: Combobox`
  - Update deployed site's routing to use a `/pharos` prefix in URLs
  - Deploy the site to the production cluster after merges to `develop`

- @ithaka/pharos-cli

  - Added `pharos component|wc <component-name>` command line interface

## [3.0.0] - 2020-07-10

### Changed

- @pharos/core

  - Require ResizeObserver polyfill in order to use Tooltip in IE11 with the additon of the `fullWidth` prop
  - Remove `icon-` prefix from icon filenames
  - Rename icons by their literal item or global use

    | Previous Name | New Name            |
    | ------------- | ------------------- |
    | icon-info     | info-inverse        |
    | icon-warning  | exclamation-inverse |
    | icon-success  | checkmark-inverse   |
    | icon-error    | close-inverse       |

  - Update spacing tokens to be proportionally sized in their naming

    | Previous Name                  | New Name                                |
    | ------------------------------ | --------------------------------------- |
    | \$pharos-spacing-base-xx-small | \$pharos-spacing-brand-one-quarter-x    |
    | \$pharos-spacing-base-x-small  | \$pharos-spacing-brand-one-half-x       |
    | \$pharos-spacing-base-small    | \$pharos-spacing-brand-three-quarters-x |
    | \$pharos-spacing-base-medium   | \$pharos-spacing-brand-1-x              |
    | \$pharos-spacing-base-large    | \$pharos-spacing-brand-one-and-a-half-x |
    | \$pharos-spacing-base-xlarge   | \$pharos-spacing-brand-2-x              |

### Added

- @pharos/core

  - Add `fullWidth` prop to Tooltip to set its width equal to the target width
  - Add primary color token
  - Add new spacing tokens

    ```scss
    $pharos-spacing-brand-one-eighth-x: 0.125rem;
    $pharos-spacing-brand-3-x: 3rem;
    $pharos-spacing-brand-three-and-a-half-x: 3.5rem;
    $pharos-spacing-brand-5-x: 5rem;
    $pharos-spacing-brand-7-x: 7rem;
    ```

  - Add `height` and `width` attributes to icon component to properly size them in IE11

- @ithaka/pharos-site
  - Add Textarea documentation
  - Add `Brand Expression: Color`
  - Add `Brand Expression: Imagery`
  - Add `Brand Expression: Typography`

### Fixed

- @pharos/core
  - Fix alert and select styling in IE11
  - Render select options correctly in IE11
  - Keyboard navigation did not work properly in radio button groups in IE11

### Maintenance

- @pharos/core

  - In addition to Chrome, run unit tests in Firefox (locally and in CI) using karma-firefox-launcher

## [2.0.1] - 2020-06-18

### Fixed

- @pharos/core
  - Pass checkbox value as `on` for form submission when no value is passed
  - Fix checkbox and radio button alignment issues by setting line-height on their label

## [2.0.0] - 2020-06-17

### Changed

- @pharos/core

  - Rename `selected` to `value` in group elements' API for holding the selected value/s
  - Access current selection/s for checkbox and radio groups from the `change` event they dispatch
  - Set selections within the group using the `checked` attribute on the child
  - Change spacing design token values to accommodate additional sizes

    The old values:

    ```scss
    $pharos-spacing-base-x-small: 0.25rem;
    $pharos-spacing-base-small: 0.5rem;
    ```

    The new values:

    ```scss
    $pharos-spacing-base-xx-small: 0.25rem;
    $pharos-spacing-base-x-small: 0.5rem;
    $pharos-spacing-base-small: 0.75rem;
    ```

### Fixed

- @pharos/core
  - Rework radio button group focus
  - Propagate custom attributes from the React component to the web component

### Removed

- @pharos/core
  - Remove Vue and HTML versions of Storybook

## [1.3.0] - 2020-06-12

### Added

- @pharos/core
  - Enable hiding the label for selects, checkboxes, radios, checkbox groups, and radio groups with `hide-label`

### Fixed

- @pharos/core
  - Radio button alignment & rendering
  - Checkbox alignment & rendering

## [1.2.0] - 2020-06-10

### Added

- @pharos/core

  - Create a cross-browser utility function for populating forms containing Pharos form elements
  - Implement error state logic for form elements
  - Add `<pharos-checkbox-group>` component
  - Add `<pharos-select>` component
  - Add `<pharos-textarea>` component

- @ithaka/pharos-site
  - Add `iconography` page
  - Add `logos` page

## [1.1.0] - 2020-05-12

### Changed

- @pharos/core

  - Create React wrapper and generate React components as part of the build process
  - Put built components into `lib` directory in package.
    This requires you to update your React imports from this:

    ```js
    import { PharosTooltip } from '@pharos/react';
    ```

    To this:

    ```js
    import { PharosTooltip } from '@pharos/core/lib/react-components/tooltip/pharos-tooltip';
    ```

- @pharos/react
  - Delete package as React components are delivered as part of the core package

### Maintenance

- @pharos/core
  - Remove generated token files from version control
  - Include sass tokens with delivered styles
  - Add header to generated token files

### Added

- @pharos/core
  - Add `<pharos-radio-group>` component
- @pharos/react
  - Add `<PharosRadioGroup />` component

### Fixed

- @pharos/core
  - Radio button spacing
  - Checkbox spacing
- @pharos/react
  - Radio button for space
  - Checkbox spacing

## [1.0.0] - 2020-05-07

### Changed

- @pharos/core

  - Use TypeScript for component development
  - Put built components and styles into `lib` directory in package
    This requires you to update your imports from this:

    ```js
    import '@pharos/core/web-components/pharos-tooltip';
    ```

    To this:

    ```js
    import '@pharos/core/lib/components/tooltip/pharos-tooltip';
    ```

  - Remove `pharos-` prefix from internal class names to avoid name collisions when polyfilling CSS for older browsers

### Fixed

- @pharos/core
  - Styling of Alert was incorrect in older browsers due to lack of CSS prefixing

### Added

- @pharos/core
  - Add `<pharos-text-input>` component
  - Add `<pharos-radio-button>` component
  - Add `<pharos-checkbox>` component
- @pharos/react
  - Add `<PharosTextInput />` component
  - Add `<PharosRadioButton />` component
  - Add `<PharosCheckbox />` component
- @ithaka/pharos-site
  - Create package for development of the Pharos site

### Maintenance

- Provide CHANGELOG for release notes
- Linting
  - Analyze code using ESLint
  - Run against staged files
- Formatting
  - Format code using Prettier
  - Run when committing files
- Enable Storybooks to load in older versions of Microsoft Edge for compatibility testing

## [0.0.6] - 2020-04-01

### Fixed

- @pharos/core
  - Enable styling of slotted content in Alert component
  - Listen for events on the Tooltip host instead of the root element

## [0.0.5] - 2020-03-31

### Added

- @pharos/core
  - Add `strategy` prop to Tooltip

## [0.0.4] - 2020-03-30

### Added

- @pharos/core
  - Add validation of Tooltip props
  - Enable Tooltip users to specify fallback for placement algorithm
  - Add `<pharos-heading>` component
  - Add `<pharos-alert>` component
- @pharos/react
  - Add `<PharosHeading />` component
  - Add `<PharosAlert />` component

### Fixed

- @pharos/core
  - Debounce closing of Tooltip

### Accessibility

- @pharos/core
  - Close other open Tooltip instances when hovering or focusing on another Tooltip's trigger

### Maintenance

- Storybooks
  - Add web component Storybook
- @pharos/core
  - Ignore generated files from Prettier
- @pharos/react
  - Put testing framework in place for React components

## [0.0.3] - 2020-03-16

### Maintenance

- @pharos/core
  - Rename internal web component methods to indicate private use
  - Run `analyze` script to automate synchronizing web component changes before building Storybooks
  - Exclude external dependencies from built package
- @pharos/react
  - Exclude external dependencies from built package
  - Switch React to a peer dependency

## [0.0.2] - 2020-03-10

### Added

- @pharos/react
  - Use web components in React

### Changed

- @pharos/core
  - Use web components for component development

## [0.0.1] - 2020-03-09

### Added

- @pharos/core
  - Initial release
- @pharos/react
  - Initial release

### Maintenance

- Packaging
  - Manage package lifecycle using Lerna
