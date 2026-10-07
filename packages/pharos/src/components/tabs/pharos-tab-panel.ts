import { PharosElement } from '../base/pharos-element';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray } from 'lit';
import { tabPanelStyles } from './pharos-tab-panel.css';
import focusable from '../../utils/focusable';

/**
 * Pharos tab panel component.
 *
 * @tag pharos-tab-panel
 *
 * @slot - Contains the content of the panel.
 *
 */
export class PharosTabPanel extends PharosElement {
  /**
   * Indicates if the panel is selected.
   * @attr selected
   */
  @property({ type: Boolean, reflect: true })
  public selected = false;

  public static override get styles(): CSSResultArray {
    return [tabPanelStyles];
  }

  protected override firstUpdated(): void {
    this.setAttribute('role', 'tabpanel');
    const focusableElements = this.querySelector(focusable);
    if (!focusableElements) {
      this.setAttribute('tabindex', '0');
    }
  }

  protected override render(): TemplateResult {
    return html` <slot></slot> `;
  }
}
