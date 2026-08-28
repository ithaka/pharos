import '@webcomponents/scoped-custom-element-registry';
import * as pharos from '@ithaka/pharos/lib/index';
import type { LitElement } from 'lit';

/**
 * The Pharos component exports to register, by export name.
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
  'PharosPopover',
  'PharosProgressBar',
  'PharosRadioButton',
  'PharosRadioGroup',
  'PharosSelect',
  'PharosSheet',
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

    // `data-pharos-component` is a styling hook (see global.scss) that Pharos
    // stamps from the class `name`, so it is set from the export name here for
    // the same minification reason the tag name is.
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
