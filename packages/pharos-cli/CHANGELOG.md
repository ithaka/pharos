# @ithaka/pharos-cli

## 5.5.1

### Patch Changes

- [#697](https://github.com/ithaka/pharos/pull/697) [`a2eca68`](https://github.com/ithaka/pharos/commit/a2eca6818ed032beef5ad00c3b2089444e063e6b) Thanks [@brentswisher](https://github.com/brentswisher)! - Update onBackground prop to isOnBackground

## 5.5.0

### Minor Changes

- [#630](https://github.com/ithaka/pharos/pull/630) [`ff057f1`](https://github.com/ithaka/pharos/commit/ff057f17289fce0fc45c8626e901aab51dfebda6) Thanks [@satya-achanta-venkata](https://github.com/satya-achanta-venkata)! - Add newly created components to init components files so that developer can start using the components without any manual changes

### Patch Changes

- [#644](https://github.com/ithaka/pharos/pull/644) [`55c263f`](https://github.com/ithaka/pharos/commit/55c263f71c9a9d2fd759c4d2ed6fc98e7d57b5a4) Thanks [@daneah](https://github.com/daneah)! - Upgrade to TypeScript 5

## 5.4.0

### Minor Changes

- [#575](https://github.com/ithaka/pharos/pull/575) [`730d381`](https://github.com/ithaka/pharos/commit/730d381dd86fffe2543e37e2ef9a367611a997f1) Thanks [@daneah](https://github.com/daneah)! - Support latest Storybook CSF format

## 5.3.0

### Minor Changes

- [#268](https://github.com/ithaka/pharos/pull/268) [`ffb2f63`](https://github.com/ithaka/pharos/commit/ffb2f63523bfe51ee2cc16de1740309590cded59) Thanks [@Niznikr](https://github.com/Niznikr)! - Add register utility:

  - Update `PharosElement` to set `[data-pharos-component]` with `constructor.name`
  - Update `PharosComponentMixin` to set `[data-pharos-component]` with base class name
  - Add register utility to simplify component registration and ensure trivial classes are used for custom elements:

    ```javascript
    import { PharosAlert, PharosButton, PharosIcon } from '@ithaka/pharos';
    import registerComponents from '@ithaka/pharos/lib/utils/registerComponents';

    registerComponents('{prefix}', [PharosAlert, PharosButton, PharosIcon]);
    ```

  - Add a React Pharos context provider for consumers to indicate prefix used for registration:

    ```jsx
    import { PharosContext } from '@ithaka/pharos/lib/utils/PharosContext';

    const context = { prefix: 'homepage' };

    <PharosContext.Provider value={context}>...app code</PharosContext.Provider>;
    ```

### Patch Changes

- [#264](https://github.com/ithaka/pharos/pull/264) [`988881d`](https://github.com/ithaka/pharos/commit/988881d2c10274c1fbffc23ab04f35397b6e5742) Thanks [@Niznikr](https://github.com/Niznikr)! - update dependencies

## 5.2.0

### Minor Changes

- [#226](https://github.com/ithaka/pharos/pull/226) [`7843568`](https://github.com/ithaka/pharos/commit/78435685eb15b1c88122c0c71bbc228272a6651d) Thanks [@Niznikr](https://github.com/Niznikr)! - require manual component registration:

  - Remove component self-registration
  - Scope registries for components composed of other Pharos components using [scoped-registry-mixin](https://github.com/lit/lit/tree/main/packages/labs/scoped-registry-mixin)
  - Update React wrapper to detect defined custom tag name
  - Create `PharosElement` base class which sets a custom attribute `data-pharos-component` as a common identifier
  - Set components to extend `PharosElement`
  - Update documentation

  **Migration Guidelines**

  1. Remove all individual imports of Pharos web components.

  2. Register them with a custom tag in your app's entrypoint in the form of `{app/bundle}-pharos-{component}`:

     ```javascript
     import { PharosAlert } from '@ithaka/pharos/lib/components/alert/pharos-alert';

     customElements.define('homepage-pharos-alert', PharosAlert);
     ```

  3. Update templates, queries, unit tests, and integration tests with the newly defined tag names.

  4. Add the [scoped custom element registry polyfill](https://github.com/webcomponents/polyfills/tree/master/packages/scoped-custom-element-registry) to a globally available location in your project.

  5. Update your bundler's production build settings to keep class names unminified:

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

  6. Import the JSDOM patch in your Jest setup file if you use Jest for unit testing:

     ```javascript
     import '@ithaka/pharos/lib/patches/jsdom';
     import 'your-pharos-component-registration-file';
     ```

## 5.1.3

### Patch Changes

- [#233](https://github.com/ithaka/pharos/pull/233) [`87cc04e`](https://github.com/ithaka/pharos/commit/87cc04e7ef80320aab8c67c8ed1cd27ac6f6c748) Thanks [@Niznikr](https://github.com/Niznikr)! - update Lit, TypeScript, and Prettier

## 5.1.2

### Patch Changes

- [#188](https://github.com/ithaka/pharos/pull/188) [`767d6f8`](https://github.com/ithaka/pharos/commit/767d6f8f10267afcb111fa92d9a7b3a71c3fee4e) Thanks [@Niznikr](https://github.com/Niznikr)! - update to TypeScript 4.3:

  - Update packages to use TypeScript 4.3
  - Add `noImplicitOverride` flag
  - Update Prettier to support the new `override` keyword

## 5.1.1

### Patch Changes

- [#124](https://github.com/ithaka/pharos/pull/124) [`cf0b380`](https://github.com/ithaka/pharos/commit/cf0b38024298fe1f60466f171334f7bef8f6d344) Thanks [@Niznikr](https://github.com/Niznikr)! - update dependencies

## 5.1.0

### Minor Changes

- [#19](https://github.com/ithaka/pharos/pull/19) [`70f42ef`](https://github.com/ithaka/pharos/commit/70f42ef0776d1b0ff0ea32ae6560deef92757d8d) Thanks [@Niznikr](https://github.com/Niznikr)! - update to Lit 2:

  - Update to Lit 2 following upgrade guide
  - Update `@open-wc/testing` tools
  - Target `es2019` as recommended by Lit
  - Run tests on built JS package

* [#42](https://github.com/ithaka/pharos/pull/42) [`84e5bfa`](https://github.com/ithaka/pharos/commit/84e5bfad249b5e5738cf6adf03bc6f25c769628d) Thanks [@Niznikr](https://github.com/Niznikr)! - remove support for IE11:

  - Remove polyfills
  - Remove design token imports in components
  - Update documentation
  - Remove IE11 related styles

### Patch Changes

- [#86](https://github.com/ithaka/pharos/pull/86) [`802f4d8`](https://github.com/ithaka/pharos/commit/802f4d8e5d07a1e834e879d86898c77debd05fcf) Thanks [@Niznikr](https://github.com/Niznikr)! - import html from lit

## 5.0.3

### Patch Changes

- [#48](https://github.com/ithaka/pharos/pull/48) [`ced1c1f`](https://github.com/ithaka/pharos/commit/ced1c1f082e40b5e0b5c71830fb6c6cde1277b83) Thanks [@Niznikr](https://github.com/Niznikr)! - update dependencies:

  - Update Gatsby dependencies
  - Update ESLint dependencies
  - Update Sass
  - Update cli dependencies

## 5.0.2

### Patch Changes

- [#33](https://github.com/ithaka/pharos/pull/33) [`46fbc67`](https://github.com/ithaka/pharos/commit/46fbc679c16f094aef2c207e4f4c05e71552a9bb) Thanks [@Niznikr](https://github.com/Niznikr)! - update Storybook to generate React API tables:

  - Update Storybook to 6.3 alpha
  - Follow migration guidelines

## 5.0.1

### Patch Changes

- [#20](https://github.com/ithaka/pharos/pull/20) [`b8581b4`](https://github.com/ithaka/pharos/commit/b8581b4f72309037d0182266571e527a0dec86c5) Thanks [@Niznikr](https://github.com/Niznikr)! - remove component guidelines from Storybook:

  - Remove component guidelines from Storybook
  - Add links to the guidelines
  - Use React versions of components in the guidelines to render properly in Gatsby
  - Move Storybook images to the `.storybook` directory

## 5.0.0

### Major Changes

- [`329505a`](https://github.com/ithaka/pharos/commit/329505af1475004a64b319ca29614d8a0f2177d7) Thanks [@Niznikr](https://github.com/Niznikr)! - rename packages to publish to Ithaka namespace:

  - Rename package `@pharos/core` to `@ithaka/pharos`
  - Rename package `@pharos/cli` to `@ithaka/pharos-cli`
  - Rename package `@pharos/site` to `@ithaka/pharos-site`
  - Update documentation and imports

## 4.1.0

### Minor Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Lint mdx and js files:

  - Add `eslint-plugin-mdx` for linting mdx files
  - Add `eslint-plugin-no-smart-quotes` to find and replace smart quotes
  - Use eslint overrides to explicitly configure settings for each file type
  - Address linting errors

## 4.0.17

### Patch Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Update to TypeScript 4.2

## 4.0.16

### Patch Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Update dependencies

## 4.0.15

### Patch Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Update story title in cli templates:

  - Put stories in `Components` category
  - Generate component `.css.ts` file

## 4.0.14

### Patch Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Update TypeScript to 4.1

## 4.0.13

### Patch Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Update dependencies

## 4.0.12

### Patch Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Add `<pharos-dropdown-menu>` component

## 4.0.11

### Patch Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Update to TypeScript 4

## 4.0.10

### Patch Changes

- Thanks [@daneah](https://github.com/daneah)! - Fix decorator for safe custom element definition

## 4.0.9

### Patch Changes

- Thanks [@Niznikr](https://github.com/Niznikr)! - Add prop interface for React components

## 4.0.8

### Patch Changes

- Upgrade to Storybook 6

## 4.0.7

### Patch Changes

- Replace Lerna with Yarn and Changesets
