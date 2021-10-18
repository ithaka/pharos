---
'@ithaka/pharos': major
'@ithaka/pharos-cli': minor
'@ithaka/pharos-site': minor
---

require manual component registration:

* Remove component self-registration
* Scope registries for components composed of other Pharos components using [scoped-registry-mixin](https://github.com/lit/lit/tree/main/packages/labs/scoped-registry-mixin)
* Update React wrapper to detect defined custom tag name
* Create `PharosElement` base class which sets a custom attribute `data-pharos-component` as a common identifier
* Set components to extend `PharosElement`
* Update documentation

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
    import "@ithaka/pharos/lib/patches/jsdom";
    import "your-pharos-component-registration-file";
    ```
