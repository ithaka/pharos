# Pharos Web Components

<!-- toc -->

- [Installation](#installation)
- [Registering components](#registering-components)
- [Using web components](#using-web-components)
- [Using Pharos components in React](#using-pharos-components-in-react)
- [Styling components](#styling-components)
- [Using Pharos design tokens](#using-pharos-design-tokens)
- [Typography and mixins](#typography-and-mixins)
- [Additional component styles](#additional-component-styles)
- [Using Pharos form elements in forms](#using-pharos-form-elements-in-forms)
- [Adoption Governance Model](#adoption-governance-model)

<!-- tocstop -->

[Web Components](https://www.webcomponents.org/introduction) are a set of web platform APIs that allow you to create new custom, reusable, encapsulated HTML tags to use in web pages and web apps.

Pharos provides a web component library for building products consistent with the JSTOR brand.

If you're using Vue, you can use these components in the same manner specified, without any additional steps!

## Installation

```shell
$ npm install @ithaka/pharos
```

## Registering components

1. To allow multiple versions of Pharos to exist on a page, this package only exports component classes for you to register on the [custom element registry](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry) in your application. To register a component, import the classes you wish to use in your application's entrypoint and define the component with a tag name in the form of `{app/bundle}-pharos-{component}`:

```javascript
import { PharosAlert } from '@ithaka/pharos/lib/components/alert/pharos-alert';

customElements.define('homepage-pharos-alert', PharosAlert);
```

**Note: If you register a name that already exists the browser will throw an error about the duplicate.**

2. Internally, Pharos components that are composed of other Pharos components scope their registries to their shadow root to avoid duplicate registrations. Because the `Scoped Custom Element Registries` proposal is not yet finalized, you need to apply a [polyfill](https://github.com/webcomponents/polyfills/tree/master/packages/scoped-custom-element-registry) to use our components.

3. Every component sets a custom data attribute `data-pharos-component` on itself with its class name (such as `PharosAlert`) to allow you to query any instance of that component regardless of its defined tag. Components also use this attribute to locate slotted Pharos children. Bundlers minify these class names by default for production builds. To ensure components work as expected, update your configurations like so:

Webpack (Terser):

```javascript
optimization: {
  minimizer: [
    new TerserPlugin({
      terserOptions: {
        keep_classnames: /^Pharos/,
        keep_fnames: /^Pharos/,
      }
    }),
  ],
}
```

Vite (ESBuild):

```javascript
export default defineConfig({
  esbuild: {
    keepNames: true,
  },
});
```

## Using web components

After installing Pharos and registering the components, you can render them in any of your templates:

```html
<pharos-tooltip>
  <button>Hover here!</button>
  <span slot="content">I am a tooltip</span>
</pharos-tooltip>
```

See the [web component Storybook](https://pharos.jstor.org/storybooks/wc/) for details on component-specific syntax.

## Using Pharos components in React

[React](https://reactjs.org/) is a JavaScript library used to build encapsulated components that manage their own state. React doesn't currently play perfectly with native web components, so if you're developing a React application you need to use the wrapper components provided in the `lib/react-components/` directory of the package. To use a component, first import it:

```javascript
import { PharosTooltip } from '@ithaka/pharos/lib/react-components/tooltip/pharos-tooltip';
```

Then, render the component in your JSX:

```jsx
<PharosTooltip content={'I am a tooltip'}>Hover here!</PharosTooltip>
```

See the [React Storybook](https://pharos.jstor.org/storybooks/react/) for details on component-specific syntax.

## Styling components

Pharos components utilize CSS variables for their styling. To style components across your app, import the variables like so in your styles entrypoint:

```css
/* index.css */

@import '@ithaka/pharos/lib/styles/variables.css';

/* More global styles */
```

## Using Pharos design tokens

Components in Pharos are styled using design tokens, a tech agnostic way to store design decisions such as typography, color, and spacing so that Pharos can be shared across platforms. You can use these tokens to help style your own components and pages to ensure the brand is properly expressed to users. The token files are located in the `lib/styles/` directory of the package.

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

## Additional component styles

Most components in Pharos benefit from the fully isolated styling provided by web components and CSS variables. However, some components provide slots you can populate with your own content. Content provided by application authors is rendered in the light DOM, and is not always stylable by web components.

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

Pharos form elements listen to the [`formdata` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/formdata_event) to add their values to the enclosing `<form>`. Safari doesn't natively fire the `formdata` event, so form authors need to fire a custom event in its stead.

Pharos provides a cross-browser `createFormData` utility function for populating forms via a custom `formdata` event. You should call `createFormData` in your form's `submit` event handler.

```javascript
import createFormData from '@ithaka/pharos/lib/utils/createFormData.js';

const form = document.querySelector('form');
form.addEventListener('submit', (event) => createFormData(event.target));
```

If you submit your forms asynchronously, you can pass the result of `createFormData` in your request:

```javascript
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

## Adoption Governance Model

Take a look at the [adoption governance model](https://coggle.it/diagram/XpRbDBqrZN1pBosN/t/product-team-wants-to-adopt-pharos-components) for a quick overview of the adoption process.
