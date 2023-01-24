import type { TemplateResult, CSSResultArray } from 'lit';
import { html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { state } from 'lit/decorators.js';

import { PharosElement } from '../base/pharos-element';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { dropdownMenuNavCategoryStyles } from './pharos-dropdown-menu-nav-category.css';
import { PharosIcon } from '../icon/pharos-icon';

import FocusMixin from '../../utils/mixins/focus';

/**
 * Pharos dropdown menu nav heading component.
 *
 * @tag pharos-dropdown-menu-nav-heading
 *
 * @slot - Contains the content of the heading (the default slot).
 *
 */

export class DropdownMenuNavCategory extends ScopedRegistryMixin(FocusMixin(PharosElement)) {
  @state()
  private _alert = false;

  @state()
  private _hover = false;

  static elementDefinitions = {
    'pharos-icon': PharosIcon,
  };

  public static override get styles(): CSSResultArray {
    return [dropdownMenuNavCategoryStyles];
  }

  protected override render(): TemplateResult {
    return html`<div
      tabindex="0"
      id="heading-element"
      class="${classMap({
        [`link--alert`]: this._alert,
        [`link--hover`]: this._hover,
      })}"
    >
      <slot name="category"></slot>
      <pharos-icon name="chevron-down" class="link__icon"></pharos-icon>
    </div>`;
  }
}
