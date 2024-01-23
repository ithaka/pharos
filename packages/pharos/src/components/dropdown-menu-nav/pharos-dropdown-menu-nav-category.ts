import type { TemplateResult, CSSResultArray } from 'lit';
import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { property, state } from 'lit/decorators.js';

import { PharosElement } from '../base/pharos-element';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { dropdownMenuNavCategoryStyles } from './pharos-dropdown-menu-nav-category.css';
import { PharosIcon } from '../icon/pharos-icon';

import FocusMixin from '../../utils/mixins/focus';

/**
 * Pharos dropdown menu nav category component.
 *
 * @tag pharos-dropdown-menu-nav-category
 *
 * @slot - Contains the content of the category (the default slot).
 *
 */

export class PharosDropdownMenuNavCategory extends ScopedRegistryMixin(FocusMixin(PharosElement)) {
  /**
   * Indicates the link is active
   * @attr is-active
   */
  @property({ type: Boolean, reflect: true, attribute: 'is-active' })
  public isActive = false;

  static elementDefinitions = {
    'pharos-icon': PharosIcon,
  };

  public static override get styles(): CSSResultArray {
    return [dropdownMenuNavCategoryStyles];
  }

  @state()
  private _alert = false;

  @state()
  private _hover = false;

  protected override render(): TemplateResult {
    return html`<button
      aria-expanded="${this.isActive}"
      aria-haspopup="true"
      id="category-element"
      class="${classMap({
        [`link--alert`]: this._alert,
        [`link--hover`]: this._hover,
      })}"
    >
      <slot name="category"></slot>
      <pharos-icon name="chevron-down"></pharos-icon>
    </button>`;
  }
}
