import '@webcomponents/scoped-custom-element-registry';
import * as pharos from '@ithaka/pharos/lib/index';
import type { LitElement } from 'lit';

/**
 * The Pharos component exports to register, by export name. The tag name is
 * derived from these strings rather than from each class's `name` property.
 *
 * Pharos' own `registerComponents` helper reads `clazz.name`, which the
 * production minifier rewrites (`PharosButton` -> `oo`), registering broken
 * tags like `<site-oo>` and leaving every element undefined. Terser's
 * `keep_classnames` would prevent that, but Astro minifies these bundles with
 * esbuild and the option does not survive into the vendor chunk. Deriving the
 * tag from a string literal is minifier-independent, so it holds in both dev
 * and production builds.
 */
const COMPONENT_NAMES = [
  'PharosAlert',
  'PharosBreadcrumb',
  'PharosBreadcrumbItem',
  'PharosButton',
  'PharosCheckbox',
  'PharosCheckboxGroup',
  'PharosCoachMark',
  'PharosCombobox',
  'PharosDropdownMenu',
  'PharosDropdownMenuItem',
  'PharosDropdownMenuNav',
  'PharosDropdownMenuNavLink',
  'PharosDropdownMenuNavCategory',
  'PharosFooter',
  'PharosHeader',
  'PharosHeading',
  'PharosIcon',
  'PharosImageCard',
  'PharosInputGroup',
  'PharosInputGroupSelect',
  'PharosLayout',
  'PharosLink',
  'PharosLoadingSpinner',
  'PharosModal',
  'PharosMultiselectDropdown',
  'PharosPagination',
  'PharosPill',
  'PharosProgressBar',
  'PharosRadioButton',
  'PharosRadioGroup',
  'PharosSelect',
  'PharosSidenav',
  'PharosSidenavLink',
  'PharosSidenavMenu',
  'PharosSidenavSection',
  'PharosSwitch',
  'PharosTabs',
  'PharosTab',
  'PharosTable',
  'PharosTabPanel',
  'PharosTextInput',
  'PharosTextarea',
  'PharosToast',
  'PharosToaster',
  'PharosToastButton',
  'PharosToggleButton',
  'PharosToggleButtonGroup',
  'PharosTooltip',
] as const;

const PREFIX = 'site';

/** `PharosDropdownMenuNav` -> `pharos-dropdown-menu-nav`, matching Pharos. */
const toTagName = (exportName: string): string =>
  exportName
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

const componentExports = pharos as unknown as Record<string, typeof LitElement | undefined>;

/**
 * Registers the Pharos custom elements under the `site` prefix, so markup such
 * as `<site-pharos-button>` resolves.
 *
 * `customElements.define` throws on a repeat registration, and Astro can run
 * this module more than once across HMR reloads, so each tag is checked first.
 */
const registerPharosComponents = (): void => {
  for (const exportName of COMPONENT_NAMES) {
    const component = componentExports[exportName];
    if (!component) {
      continue;
    }

    const tagName = `${PREFIX}-${toTagName(exportName)}`;
    if (customElements.get(tagName)) {
      continue;
    }

    // Pharos registers a trivial subclass wrapped in `PharosComponentMixin`,
    // which stamps `data-pharos-component` from the base class's `name`. That
    // attribute is a styling hook (see `[data-pharos-component='PharosIcon']`
    // in global.scss), so it is set from the export name here for the same
    // minification reason the tag name is.
    customElements.define(
      tagName,
      class extends component {
        override connectedCallback(): void {
          super.connectedCallback?.();
          this.dataset.pharosComponent = exportName;
        }
      }
    );
  }
};

registerPharosComponents();

export default registerPharosComponents;
