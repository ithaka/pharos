import { PharosElement } from '../base/pharos-element';
import { html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray } from 'lit';
import { sidenavSectionStyles } from './pharos-sidenav-section.css';

import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { PharosHeading } from '../heading/pharos-heading';

/**
 * Pharos sidenav section component.
 *
 * @slot - Contains the content of the section (the default slot).
 *
 */
export class PharosSidenavSection extends ScopedRegistryMixin(PharosElement) {
  static elementDefinitions = {
    'pharos-heading': PharosHeading,
  };

  /**
   * Indicates the label to apply to the section.
   * @attr label
   */
  @property({ type: String, reflect: true })
  public label?: string;

  /**
   * Indicates if the section should contain a divider.
   * @attr show-divider
   */
  @property({ type: Boolean, reflect: true, attribute: 'show-divider' })
  public showDivider = false;

  public static override get styles(): CSSResultArray {
    return [sidenavSectionStyles];
  }

  private _renderLabel(): TemplateResult | typeof nothing {
    if (this.label) {
      return html`
        <pharos-heading class="section__heading" level="3" preset="legend"
          >${this.label}</pharos-heading
        >
      `;
    }
    return nothing;
  }

  private _renderDivider(): TemplateResult | typeof nothing {
    if (this.showDivider) {
      return html`<hr class="section__divider" />`;
    }
    return nothing;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="section__container">
        ${this._renderLabel()}
        <slot></slot>
      </div>
      ${this._renderDivider()}
    `;
  }
}
