# Pharos Web Components

<!-- toc -->

- [Installation](#installation)
- [Using web components](#using-web-components)
  * [Browser support and polyfills](#browser-support-and-polyfills)
- [Using Pharos components in React](#using-pharos-components-in-react)
- [Using Pharos design tokens](#using-pharos-design-tokens)
- [Typography and mixins](#typography-and-mixins)
- [Styling components](#styling-components)
- [Using Pharos form elements in forms](#using-pharos-form-elements-in-forms)
- [Component-specific notes](#component-specific-notes)
  * [Tooltip and Dropdown Menu](#tooltip-and-dropdown-menu)
  * [Loading spinner](#loading-spinner)
- [Adoption Governance Model](#adoption-governance-model)

<!-- tocstop -->

[Web Components](https://www.webcomponents.org/introduction) are a set of web platform APIs that allow you to create new custom, reusable, encapsulated HTML tags to use in web pages and web apps.

Pharos provides a web component library for building products consistent with the JSTOR brand.

If you're using Vue, you can use these components in the same manner specified, without any additional steps!

## Installation

```shell
$ npm install @ithaka/pharos
```

## Using web components

After installing Pharos, you can find the built web components in the `lib/components/` directory of the package. To use a component, first import it:

```javascript
import '@ithaka/pharos/lib/components/tooltip/pharos-tooltip';
```

Then, render the component in your template:

```html
<pharos-tooltip>
  <button>Hover here!</button>
  <span slot="content">I am a tooltip</span>
</pharos-tooltip>
```

See the [web component Storybook](https://pharos.jstor.org/storybooks/wc/) for details on component-specific syntax.

### Browser support and polyfills

Web components are still an emerging technology. Modern browser support is pretty good, but still exhibits small variations. Support is low or none in older versions of Edge and Internet Explorer.

Pharos does not come with polyfilling measures included. Because products have a wide variety of browser support strategies, Pharos would need to support the union of all these strategies, leading to reduced performance for products that support a more limited set of browsers. If you need wide browser support, you may need the following polyfills:

| Polyfill                                                                                             | Needed for                                                                                                          |
| ---------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| [`webcomponentsjs`](https://github.com/webcomponents/polyfills/tree/master/packages/webcomponentsjs) | Any page where you use web components that need wide browser support                                                |
| [`resize-observer-polyfill`](https://github.com/que-etc/resize-observer-polyfill)                    | `pharos-tooltip`, `pharos-dropdown-menu`                                                                            |
| [`web-animations-js`](https://github.com/web-animations/web-animations-js)                           | `pharos-loading-spinner`                                                                                            |
| [`formdata-polyfill`](https://github.com/jimmywarting/FormData)                                      | All form control components &mdash; see [Using Pharos form elements in forms](#using-pharos-form-elements-in-forms) |

It's always a good idea to double check the features you want to use against the browsers you need to support using [Can I use](https://caniuse.com) or [MDN](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Browser_support_for_JavaScript_APIs).

## Using Pharos components in React

[React](https://reactjs.org/) is a JavaScript library used to build encapsulated components that manage their own state. React doesn't currently play perfectly with raw web components, so if you're developing a React application you should use the wrapper components provided in the `lib/react-components/` directory of the package. To use a component, first import it:

```javascript
import { PharosTooltip } from '@ithaka/pharos/lib/react-components/tooltip/pharos-tooltip';
```

Then, render the component in your JSX:

```jsx
<PharosTooltip content={'I am a tooltip'}>Hover here!</PharosTooltip>
```

See the [React Storybook](https://pharos.jstor.org/storybooks/react/) for details on component-specific syntax.

## Using Pharos design tokens

Components in Pharos are styled using design tokens, a tech agnostic way to store variables such as typography, color, and spacing so that Pharos can be shared across platforms. You can use these tokens to help style your own components and pages to ensure our brand is properly expressed to users. The token files are located in the `lib/styles/` directory of the package.

To use the tokens as CSS variables, import them like so in your styles entrypoint to be available globally:

```css
/* index.css */

@import '@ithaka/pharos/lib/styles/variables.css';

/* More global styles */
```

To use the tokens as SASS variables, import them like so in the file where you want to use them:

```scss
/* example-page.scss */

@import '@ithaka/pharos/lib/styles/_variables';

/* More styling for the example page */
```

To use the tokens as ESM modules in your JavaScript, import them like so to ensure unused tokens are tree-shaken:

```js
/* example-page.js */

import { PharosColorTextBase } from '@ithaka/pharos/lib/styles/variables';
```

## Typography and mixins

Pharos uses `Ivar` a serif primarily for headlines and `GT America` a sans serif for body copy. The font-face stylesheet and base typography styles are located in the `lib/styles/` directory of the package. Import them, along with the design tokens, in your app's styles entrypoint file:

```scss
/* index.scss */

@import '@ithaka/pharos/lib/styles/fonts.css';
@import '@ithaka/pharos/lib/styles/variables.css';
@import '@ithaka/pharos/lib/styles/typography';

/* More global styles and imports */
```

Pharos also provides SASS mixins which are reusable styles shared across multiple components. Import them like so in the file where you want to use them:

```scss
/* example-page.scss */

@use "@ithaka/pharos/lib/styles/pharos";

.some-text {
  @include pharos.font-base;
}
```

The base typography styles and mixins utilize [SASS modules](https://sass-lang.com/blog/the-module-system-is-launched) which replaces `@import` with `@use` to make CSS, variables, mixins, and functions from another stylesheet accessible in the current stylesheet. If your project uses Webpack for bundling, you will need to make sure `sass-loader` is set to use `dart-sass` instead of `node-sass` as Node Sass is [deprecated](https://sass-lang.com/blog/libsass-is-deprecated) and does not support SASS modules. If using `sass-loader` >= 9.0.0 no change is required as `sass` is set as the default. Otherwise, update your Webpack config as so:

```js
/* webpack.config.js */

{
  loader: 'sass-loader',
  options: {
    implementation: require('sass'),
  }
}
```

You can access all Pharos variables, mixins, and functions from a single `pharos.scss` entrypoint file. Import it in the file where you want to use its modules:

```scss
/* example-page.scss */

@use "@ithaka/pharos/lib/styles/pharos";

.some-text {
  @include pharos.font-base;

  color: pharos.$pharos-color-text-20;
}
```

## Styling components

Most components in Pharos benefit from the fully isolated styling provided by web components. However, some components provide slots you can populate with your own content. Content provided by application authors is rendered in the light DOM, and is not always stylable by web components.

You may need to import additional CSS files into your project's build for components whose slots expect nested content. These files are located in the `lib/styles/` directory of the package. To use the CSS, import it in whichever bundle will be included on the same page as your component:

```css
/* example-page.css */

@import '@ithaka/pharos/lib/styles/pharos-alert.css';

/* More styling for the example page */
```

Selectors in component stylesheets are scoped to the component's host element (`<pharos-alert>` in the above example).

Components that have corresponding stylesheets are:

- `pharos-alert`
- `pharos-footer`
- `pharos-modal`

## Using Pharos form elements in forms

Pharos form elements listen to the [`formdata` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/formdata_event) to add their values to the enclosing `<form>`. Safari and IE11 don't natively fire the `formdata` event, so form authors need to fire a custom event in its stead.

Pharos provides a cross-browser `createFormData` utility function for populating forms via a custom `formdata` event. You should call `createFormData` in your form's `submit` event handler. You will also need to use [`formdata-polyfill`](https://www.npmjs.com/package/formdata-polyfill) to support IE11 and Safari.

```javascript
import 'formdata-polyfill'; // Should come before the createFormData import
import createFormData from '@ithaka/pharos/lib/utils/createFormData.js';

const form = document.querySelector('form');
form.addEventListener('submit', (event) => createFormData(event.target));
```

If you submit your forms asynchronously, you can pass the result of `createFormData` in your request:

```javascript
import 'formdata-polyfill'; // Should come before the createFormData import
import createFormData from '@ithaka/pharos/lib/utils/createFormData.js';

const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = createFormData(event.target);

  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'https://some-url.com');
  xhr.send(formData);
});
```

## Component-specific notes

### Tooltip and Dropdown Menu

Pharos tooltips and dropdown menus utilize the [`ResizeObserver API`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) to size themselves appropriately in `full-width` mode. You will need to use the [`resize-observer-polyfill`](https://www.npmjs.com/package/resize-observer-polyfill) polyfill to support tooltips in IE11.

### Loading spinner

Pharos loading spinners utilize the [`Web Animations API`](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) to animate the spinner SVG. You will need to use the [`web-animations-js`](https://github.com/web-animations/web-animations-js) polyfill to support spinners in IE11.

## Adoption Governance Model

Take a look at the [adoption governance model](https://coggle.it/diagram/XpRbDBqrZN1pBosN/t/product-team-wants-to-adopt-pharos-components) for a quick overview of the adoption process.
