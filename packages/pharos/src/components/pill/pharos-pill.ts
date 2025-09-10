import { html } from 'lit';
import type { TemplateResult, CSSResultArray } from 'lit';
import { pillStyles } from './pill.css';

import { PharosElement } from '../base/pharos-element';
import { property } from 'lit/decorators.js';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import close from '../../styles/icons/close';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';

/**
 * Pharos pill component.
 *
 * @tag pharos-pill
 *
 * @fires pharos-pill-dismissed - Fires when the pill is dismissed
 **/

export type PillVariant = 'primary' | 'secondary';
export class PharosPill extends ScopedRegistryMixin(PharosElement) {
  /**
   * The size of the pill
   * @attr size
   */
  @property({
    type: String,
    reflect: true,
    useDefault: false,
  })
  public size: string = 'base';

  /**
   * Makes the pill dismissible with a close button
   * @attr dismissible
   */
  @property({
    type: Boolean,
    reflect: true,
  })
  public dismissible = false;

  /**
   * The name of the color token to use for the pill color
   * @attr color
   */
  @property({
    type: String,
    reflect: true,
  })
  public color: string = 'marble-gray-40';

  /**
   * Indicates the variant of button.
   * @attr variant
   */
  @property({ type: String, reflect: true })
  public variant: PillVariant = 'primary';

  /**
   * The name of the color token to use for the pill color
   * @attr color
   */
  @property({
    type: String,
    reflect: true,
    attribute: 'text-color',
  })
  public textColor: string = 'white';

  public static override get styles(): CSSResultArray {
    return [pillStyles];
  }

  private _handleDismiss(event: MouseEvent): void {
    event.stopPropagation();
    const dismissEvent = new CustomEvent('pharos-pill-dismissed', {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(dismissEvent);
  }

  private _renderIcon(): TemplateResult | typeof undefined {
    // We need the normal close icon proportions, but at a smaller size
    // The close-small icon has different spacing inside the SVG that doesn't work here
    const iconBlob = atob(close);
    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 24 24"
        class="icon"
        role="img"
        aria-hidden="true"
        height="16"
        width="16"
        focusable="false"
      >
        <title>Close Icon</title>
        ${unsafeSVG(iconBlob)}
      </svg>
    `;
  }

  protected override render(): TemplateResult {
    const classes = ['pill', `pill--${this.variant}`];
    const style = `--pharos-pill-color: var(--pharos-color-${this.color}); --pharos-pill-text-color: var(--pharos-color-${this.textColor});`;

    if (this.size === 'small') {
      classes.push('pill--small');
    }

    if (this.dismissible) {
      classes.push('pill--dismissible');
      const labelText = `Dismiss ${this.renderRoot.querySelector('slot')?.innerText}`;
      return html`
        <button
          class="${classes.join(' ')}"
          style="${style}"
          type="button"
          .aria-label="${labelText}"
          @click="${this._handleDismiss}"
        >
          <slot></slot>
          ${this._renderIcon()}
        </button>
      `;
    }
    return html`<div class="${classes.join(' ')}" style="${style}">
      <slot></slot>
    </div>`;
  }
}
