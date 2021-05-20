# @ithaka/pharos-site

## 5.1.0

### Minor Changes

- [#17](https://github.com/ithaka/pharos/pull/17) [`4dd7f01`](https://github.com/ithaka/pharos/commit/4dd7f010bdad906f0d21dbd35e48378e9bceffd7) Thanks [@Niznikr](https://github.com/Niznikr)! - add layout component:

  - Add design tokens for breakpoints and grid gutter
  - Add layout component which applies a 12-column grid for a specified layout
  - Add Sass mixins for establishing grid styles for the breakpoints
  - Add Sass maps for storing column and margin design decisions
  - Update example Storybook pages to utilize the component

### Patch Changes

- [#20](https://github.com/ithaka/pharos/pull/20) [`b8581b4`](https://github.com/ithaka/pharos/commit/b8581b4f72309037d0182266571e527a0dec86c5) Thanks [@Niznikr](https://github.com/Niznikr)! - remove component guidelines from Storybook:

  - Remove component guidelines from Storybook
  - Add links to the guidelines
  - Use React versions of components in the guidelines to render properly in Gatsby
  - Move Storybook images to the `.storybook` directory

- Updated dependencies [[`b8581b4`](https://github.com/ithaka/pharos/commit/b8581b4f72309037d0182266571e527a0dec86c5), [`3d6e99c`](https://github.com/ithaka/pharos/commit/3d6e99c07bcf4d46062dc781d4e812fa69c22114), [`4dd7f01`](https://github.com/ithaka/pharos/commit/4dd7f010bdad906f0d21dbd35e48378e9bceffd7), [`482ac64`](https://github.com/ithaka/pharos/commit/482ac64ca0bb1876c2fb18d8586caef574a82032), [`8c4bd58`](https://github.com/ithaka/pharos/commit/8c4bd580f4dfb0136764a1030fc3b13c6ab19a58)]:
  - @ithaka/pharos@9.1.0

## 5.0.0

### Major Changes

- [`329505a`](https://github.com/ithaka/pharos/commit/329505af1475004a64b319ca29614d8a0f2177d7) Thanks [@Niznikr](https://github.com/Niznikr)! - rename packages to publish to Ithaka namespace:

  - Rename package `@pharos/core` to `@ithaka/pharos`
  - Rename package `@pharos/cli` to `@ithaka/pharos-cli`
  - Rename package `@pharos/site` to `@ithaka/pharos-site`
  - Update documentation and imports

### Patch Changes

- Updated dependencies [[`329505a`](https://github.com/ithaka/pharos/commit/329505af1475004a64b319ca29614d8a0f2177d7)]:
  - @ithaka/pharos@9.0.0

## 4.17.0

### Minor Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Lint mdx and js files:

  - Add `eslint-plugin-mdx` for linting mdx files
  - Add `eslint-plugin-no-smart-quotes` to find and replace smart quotes
  - Use eslint overrides to explicitly configure settings for each file type
  - Address linting errors

* Thanks [@Niznikr](https://github.com/Niznikr)! - Update images for open source compliance:

  - Replace images on Pharos site and Storybook with compliant ones
  - Update styles to match design

- Thanks [@SMQuazi](https://github.com/SMQuazi)! - Add icon documentation to storybook and site

### Patch Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Fix site code blocks

- Updated dependencies:
  - @pharos/core@8.2.0

## 4.16.0

### Minor Changes

- Thanks [@SMQuazi](https://github.com/SMQuazi)! - Add Tabs documentation to pharos site and storybook

* Thanks [@Niznikr](https://github.com/Niznikr)! - Add type styles documentation to storybook and site

- Thanks [@SMQuazi](https://github.com/SMQuazi)! - Add dropdown menu documentation to storybook and site

* Thanks [@Niznikr](https://github.com/Niznikr)! - Highlight component status page on the homepage:

  - Add copy for component status page on homepage hero
  - Update homepage layout with a 12 column grid
  - Add `data-sc` attributes on homepage links for GA tracking
  - Update footer content and show it on all pages
  - Update general layout of pages

- Thanks [@Niznikr](https://github.com/Niznikr)! - Add loading spinner documentation to storybook and site

* Thanks [@Niznikr](https://github.com/Niznikr)! - Add pagination documentation to storybook and site

### Patch Changes

- Updated dependencies:
  - @pharos/core@8.1.0

## 4.15.0

### Minor Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Use the Pharos sidenav on site:

  - Replace standalone sidenav on site with the Pharos sidenav
  - Use Gatsby's `navigate` function to retain routing performance features

### Patch Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Move out functional tests and fonts:

  - Move functional tests to new repo `pharos-functional-tests` and update test job
  - Remove fonts and pull them in from S3
  - Fix site home page hero font and layout

* Thanks [@Niznikr](https://github.com/Niznikr)! - Forward Sass modules from a single entrypoint file

- Thanks [@Niznikr](https://github.com/Niznikr)! - Fix spacing and links for content style guide pages

- Updated dependencies:
  - @pharos/core@8.0.0

## 4.14.0

### Minor Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Add editing checklist page to content style guide:

  - Add editing checklist page
  - Fix Dos and Donts styles
  - Remove unused button component
  - Create `BestPractices` component to reuse on other content style guide pages

* Thanks [@likwidsage](https://github.com/likwidsage)! - Add grammar and style page to content style guide

- Thanks [@Niznikr](https://github.com/Niznikr)! - Create Storybook example item detail page:

  - Create an item detail page inspired by latest designs
  - Update the revised header used in the example pages to allow enabling search for every breakpoint
  - Upgrade `husky` to v6

* Thanks [@Niznikr](https://github.com/Niznikr)! - Add web elements page to content style guide:

  - Add web elements page
  - Update `BestPractices` to account for multiple guidelines

- Thanks [@Niznikr](https://github.com/Niznikr)! - Add input group documentation:

  - Add input group documentation and guidelines
  - Update Gatsby babel config to fix decorator runtime error
  - Remove `margin` and `padding` from `*` selector in site styles to not interfere with slotted component styles

* Thanks [@likwidsage](https://github.com/likwidsage)! - Add Modal to Pharos site and storybook

- Thanks [@Niznikr](https://github.com/Niznikr)! - Add JSTOR terms page to content style guide:

  - Add JSTOR terms page

### Patch Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Fix React live examples

* Thanks [@likwidsage](https://github.com/likwidsage)! - Add Voice and Tone Content Style Guide to Pharos site

* Updated dependencies:
  - @pharos/core@7.25.0

## 4.13.0

### Minor Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Create Storybook example reports page:

  - Create a reports page inspired by latest designs
  - Keep margin at 56px until 320px breakpoint is reached
  - Remove 1440px from list of breakpoints
  - Update 1024px to 1056px in list of breakpoints
  - Update margins used in the list of breakpoints
  - Add a modal for creating reports and error toasts when the download buttons are clicked
  - Add value prop to `pharos-button` as native buttons support name and value attributes for forms

### Patch Changes

- Thanks [@likwidsage](https://github.com/likwidsage)! - Add sidenav documentation

* Thanks [@likwidsage](https://github.com/likwidsage)! - Remove sidenav code example

* Updated dependencies:
  - @pharos/core@7.24.0

## 4.12.2

### Patch Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Fix header responsive styles

- Updated dependencies:
  - @pharos/core@7.23.2

## 4.12.1

### Patch Changes

- Thanks [@likwidsage](https://github.com/likwidsage)! - update breadcrumb status

- Updated dependencies:
  - @pharos/core@7.22.1

## 4.12.0

### Minor Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Upgrade to Gatsby v3:

  - Update dependencies and verify `develop` and `build` scripts.
  - Import CSS modules as ES modules
  - Preload fonts for Pharos site
  - Use Webpack 5 builder for Storybook
  - Add `addon-backgrounds` to easily evaluate components on dark backgrounds

* Thanks [@Niznikr](https://github.com/Niznikr)! - Create Storybook example home page:

  - Create a home page inspired by latest designs
  - Create a revised header to use in the story
  - Change `contain` value for `pharos-heading` to address cutoff for large headings with prop `no-margin`
  - Fix `pharos-footer` centering for larger viewports
  - Add additional viewports to the story to test a wider range of breakpoints
  - Utilize a grid sass map for sharing layout design decisions between the home page and revised header
  - Use the `minmax` CSS function to add fluidity when transitioning between margins and content widths for each breakpoint range
  - Use a 12 column grid for breakpoints 1584 down to 768
  - Use a 8 column grid for 768 down to 320
  - Use a 4 column grid for 320

### Patch Changes

- Thanks [@likwidsage](https://github.com/likwidsage)! - Add breadcrumb documentation

* Thanks [@Niznikr](https://github.com/Niznikr)! - Add toast documentation

* Updated dependencies:
  - @pharos/core@7.22.0

## 4.11.1

### Patch Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Update breadcrumb and toast status

- Updated dependencies:
  - @pharos/core@7.21.0

## 4.11.0

### Minor Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Conform design tokens:

  - Create new tokens without the word `brand` from color, line height, and spacing tokens
  - Update all styles to use the new tokens
  - Mark `base` and `brand` color, line height, and spacing tokens as deprecated
  - Store deprecated tokens in separate json
  - Ensure token related pages in Storybook and the Pharos site display updated names

  **Migration Guidelines**

  1. Remove `brand` from `pharos-color`, `pharos-line-height`, and `pharos-spacing` tokens:

     | Old Token                      | New Token                |
     | ------------------------------ | ------------------------ |
     | \$pharos-color-brand-jstor-red | \$pharos-color-jstor-red |

  2. Replace legacy `pharos-color-base` and `pharos-line-height-base` tokens with their modern equivalent:

     | Legacy Token                     | Modern Token                |
     | -------------------------------- | --------------------------- |
     | \$pharos-line-height-base-xsmall | \$pharos-line-height-xsmall |

  3. Replace legacy token `pharos-font-color-base` with `pharos-color-text-base`

  _Note: Make sure to update all token types used in your app: `scss`, `css`, and `es6` types_

### Patch Changes

- Updated dependencies:
  - @pharos/core@7.20.0

## 4.10.0

### Minor Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Add sidenav component:

  - Create `SideElement` base class for `pharos-sidenav` and upcoming `pharos-sidebar` components to inherit styles from
  - Add `top` slot to `pharos-sidenav` for content shown above the main body
  - Construct default slot to house `pharos-sidenav-section`, `pharos-sidenav-menu`, and `pharos-sidenav-link` elements
  - Add `pharos-sidenav-section` with properties for adding a heading and/or divider
  - Add `pharos-sidenav-link` which extends `pharos-link` and include an `external` variant
  - Add `pharos-sidenav-menu` that acts as a menu of `pharos-sidenav-link` elements with appropriate accessibility features
  - Add `onBackground` variant for `pharos-text-input`

### Patch Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Update component statuses to include sidenav and planned breadcrumb work

* Thanks [@Niznikr](https://github.com/Niznikr)! - Update component status page with accordion

* Updated dependencies:
  - @pharos/core@7.19.0

## 4.9.1

### Patch Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Add dropdown menu nav documentation in site and storybook

* Thanks [@Niznikr](https://github.com/Niznikr)! - Update to TypeScript 4.2

* Updated dependencies:
  - @pharos/core@7.18.0

## 4.9.0

### Minor Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Create Storybook search page to test interoperability between atoms and molecules:

  - Create a search page inspired by latest designs
  - Add stories to `Pages` category to fit atomic design model
  - Use `stories.ts` and `stories.tsx` format to emulate developer experience
  - Add full width prop to buttons

### Patch Changes

- Thanks [@likwidsage](https://github.com/likwidsage)! - Add documentation for progress bar

* Thanks [@Niznikr](https://github.com/Niznikr)! - Update svg favicon to include a background

* Updated dependencies:
  - @pharos/core@7.17.0

## 4.8.1

### Patch Changes

- Thanks [@likwidsage](https://github.com/likwidsage)! - Add token story in StoryBook

- Updated dependencies:
  - @pharos/core@7.16.0

## 4.8.0

### Minor Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Add tests column to component status page

### Patch Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Remove unused images from Pharos site

* Thanks [@Niznikr](https://github.com/Niznikr)! - Fix Pharos site nav accessibility

* Updated dependencies:
  - @pharos/core@7.15.0

## 4.7.6

### Patch Changes

- Thanks [@likwidsage](https://github.com/likwidsage)! - Add Pharos Header documentation in site and storybook

- Updated dependencies:
  - @pharos/core@7.14.0

## 4.7.5

### Patch Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Add footer documentation in site and storybook

- Updated dependencies:
  - @pharos/core@7.13.1

## 4.7.4

### Patch Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Update header and dropdown menu components to support a section for the PDS on JSTOR:

  - Add slot `top` to `pharos-header` for a top section on the header
  - Create base class `OverlayElement` for tooltips and dropdown menus to extend from
  - Update `pharos-dropdown-menus` to support menus with no items
  - Fix `pharos-dropdown-menus` screen reader experience by wrapping `ul` element with the focus trap
  - Implement responsive design

- Updated dependencies:
  - @pharos/core@7.13.0

## 4.7.3

### Patch Changes

- Thanks [@kelseytrabue](https://github.com/kelseytrabue)! - Button documentation, tooltip asset fixes:
  Added documentation for how buttons should be used along with its variants.
  Also changed the location of the tooltip component guidelines assets for better organization.
- Updated dependencies:
  - @pharos/core@7.12.0

## 4.7.2

### Patch Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Update dependencies

- Updated dependencies:
  - @pharos/core@7.11.0

## 4.7.1

### Patch Changes

- Thanks [@likwidsage](https://github.com/likwidsage)! - Add new icon to pharos-icon
  - Update pharos homepage styles

* Thanks [@Niznikr](https://github.com/Niznikr)! - Update component statuses for 2021

- Thanks [@Niznikr](https://github.com/Niznikr)! - Update input group and dropdown menu nav status:

  - Set input group and dropdown menu nav as released

* Thanks [@likwidsage](https://github.com/likwidsage)! - Add token for font type scale 14
  - Update pharos homepage

- Thanks [@kelseytrabue](https://github.com/kelseytrabue)! - Update Headings Documentation

* Thanks [@Niznikr](https://github.com/Niznikr)! - Show latest Pharos version on homepage

- Thanks [@likwidsage](https://github.com/likwidsage)! - Create getting started page for Pharos site

- Updated dependencies:
  - @pharos/core@7.10.0

## 4.7.0

### Minor Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Add link documentation

### Patch Changes

- Updated dependencies:
  - @pharos/core@7.9.0

## 4.6.0

### Minor Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Add help page to Pharos site

### Patch Changes

- Thanks [@likwidsage](https://github.com/likwidsage)! - Fix Navigation bar for Pharos Site

* Thanks [@kelseytrabue](https://github.com/kelseytrabue)! - Improve Pharos site typography

  - Updated main heading styles to use different presets to align with the design
  - Replaced some buttons, links with Pharos components
  - Added, adjusted some spacing between sections for better vertical rhythm, this will still need work/re-work in the future
  - Some general clean up to create more alignment

* Updated dependencies:
  - @pharos/core@7.7.1

## 4.5.0

### Minor Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Upgrade to React 17:

  - Update dependencies
  - Follow guide to configure Storybook and Gatsby to use new JSX transform
  - Verify Storybook and Gatsby develop/build commands
  - Verify React components work as intended on JSTOR

### Patch Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Fix Gatsby reload and enable use of Pharos components in MDX:

  - Update Gatsby to fix the reload bug
  - Update MDXProvider config to enable use of Pharos React components in MDX

- Updated dependencies:
  - @pharos/core@7.6.0

## 4.4.1

### Patch Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Update TypeScript to 4.1

- Updated dependencies:
  - @pharos/core@7.3.0

## 4.4.0

### Minor Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Add component status page to Pharos site:

  - Add new icons for statuses
  - Create legend and status `json` files to indicate current status
  - Create component status page

### Patch Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Add typography stories to Storybook:

  - Add typography stories
  - Add styles for lists

* Thanks [@Niznikr](https://github.com/Niznikr)! - Add `pharos-button` component:

  - Create button with `primary`, `secondary`, and `subtle` variants
  - Add `large`, `on-background`, `icon`, `icon-right`, and `icon-left` properties to further customize buttons
  - Remove `variant` property from links and instead allow buttons to be rendered as links with the `href` prop to allow for all design variations
  - Create `AnchorElement` base class for links and buttons to inherit anchor properties
  - Create string literal type for icon names
  - Update existing stories to use Pharos buttons
  - Update `combobox` and `modal` components to use `button` component

- Thanks [@Niznikr](https://github.com/Niznikr)! - Add `pharos-link` component:

  - Add link component with `primary`, `subtle`, and `on background` states
  - Add `primary-button` and `secondary-button` variants
  - Style links appropriately when in a non-error alert
  - Create Sass mixins for links and buttons to reuse for variants
  - Ensure focus outline is consistent for links that span multiple lines across all browsers

* Thanks [@Niznikr](https://github.com/Niznikr)! - Update icons in Pharos:

  - Remove `add-link`, `checkmark-large`, `close-inverse`, `external-link`, `external-link-arrow`, `gallery`, `list`, `magnifying-glass`, `new-folder`, `x` icons
  - Add `chevron-left-large`, `chevron-right-large`, `edit`, `email`, `facebook`, `fit-to-view`, `folder-new`, `fullscreen-minimize`, `fullscreen`, `instagram`, `link-add`, `link-external`, `linkedin`, `tumblr`, `twitter`, `view-grid`, `youtube`, `zoom-in`, `zoom-out` icons
  - Update existing icons
  - Add icon stories to show all possible icons and gain insight into regressions
  - Move component status page icons to `site` package as they should not be delivered as part of `core`
  - Update checkbox component to pull in icons for `checked` and `indeterminate` state
  - Update icon component to set dimensions to 16x16 for small icons (end with `-small`)

* Updated dependencies:
  - @pharos/core@7.0.0

## 4.3.0

### Minor Changes

- Thanks [@likwidsage](https://github.com/likwidsage)! - Add more icons to `pharos-icon` and update iconography & imagery pages

### Patch Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Deliver fonts from Pharos:

  - Generate font-face definitions from tokens
  - Include assets with delivered package
  - Create font-family tokens with fallbacks
  - Pharos site uses fonts from core package

* Thanks [@Niznikr](https://github.com/Niznikr)! - Import typography styles in Pharos site

- Thanks [@daneah](https://github.com/daneah)! - Use tokens created in #267 to style Pharos components, add a few SCSS utilities where needed. Also update the Heading component to reflect the latest decisions from the Brand team on usage, leading to an API change:

  - Remove `expressive` and `size` properties
  - Add new `preset` property to indicate to Heading which visual display to use—these can be chosen quickly by designers and specified quickly in code to achieve the desired display.

- Updated dependencies:
  - @pharos/core@6.0.0

## 4.2.0

### Minor Changes

- Thanks [@likwidsage](https://github.com/likwidsage)! - \* Update brand color page on site.
  - Update color tokens.
  - Update spinner tokens to reflect changes in color tokens.

* Thanks [@daneah](https://github.com/daneah)! - Add Google Tag Manager to analyze traffic

- Thanks [@Niznikr](https://github.com/Niznikr)! - Convert Pharos site package to TypeScript

### Patch Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Rework tooltips for better accessibility

  Previous API:

  ```
  <pharos-tooltip>
    <button slot="target">I am a button</button>
    <span slot"content">Hi there!</span>
  </pharos-tooltip>
  ```

  New API:

  ```
  <button data-tooltip-id="my-tooltip">I am a button</button>
  <pharos-tooltip id="my-tooltip">Hi there!</pharos-tooltip>
  ```

* Thanks [@likwidsage](https://github.com/likwidsage)! - Update Typography and Logos pages on Pharos site

- Thanks [@likwidsage](https://github.com/likwidsage)! - Update checkbox document with dark variant and indeterminate state

* Thanks [@likwidsage](https://github.com/likwidsage)! - Fix artifacts and fonts for Typography page

- Thanks [@Niznikr](https://github.com/Niznikr)! - Provide design tokens in es6 format:

  - Rename js object design tokens to `tokens.js`
  - Add es6 design tokens as `variables.js`

* Thanks [@Niznikr](https://github.com/Niznikr)! - Update components to use new brand color tokens:

  - Update component colors based off design
  - Remove irrelevant component tokens
  - Update radio and checkbox SVG sizing to match design
  - Update gulp sass task to use sass as the compiler instead of node-sass to take advantage of sass modules for shared form element mixins

- Thanks [@Niznikr](https://github.com/Niznikr)! - Add `<pharos-dropdown-menu>` component

- Updated dependencies:
  - @pharos/core@5.0.0

## 4.1.1

### Patch Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Add `<pharos-modal>` component

- Updated dependencies:
  - @pharos/core@4.3.0

## 4.1.0

### Minor Changes

- Add dark variant and hover style for checkboxes
- Add icons to pharos-icons and update site navigation

### Patch Changes

- Upgrade to Storybook 6
- Updated dependencies:
  - @pharos/core@4.2.0

## 4.0.7

### Patch Changes

- Replace Lerna with Yarn and Changesets
- Updated dependencies:
  - @pharos/core@4.1.0
