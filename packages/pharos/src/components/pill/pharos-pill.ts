import { html, nothing } from 'lit';
import type { TemplateResult, CSSResultArray, PropertyValues } from 'lit';
import { pillStyles } from './pill.css';

import { PharosElement } from '../base/pharos-element';
import { property, state } from 'lit/decorators.js';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import close from '../../styles/icons/close';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import type { IconName } from '../icon/pharos-icon';
export type { IconName };

/**
 * Pharos pill component.
 *
 * @tag pharos-pill
 *
 * @fires pharos-pill-dismissed - Fires when the pill is dismissed
 **/

export type PillPreset = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
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
  public size: 'base' | 'small' = 'base';

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
   * Makes the pill disabled, should only be used with dismissible pills
   * @attr disabled
   */
  @property({
    type: Boolean,
    reflect: true,
  })
  public disabled = false;

  /**
   * The preset color style of the pill
   * @attr preset
   */
  @property({
    type: String,
    reflect: true,
  })
  public preset: PillPreset = '1';

  /**
   * The icon to be shown to the left of the pill content.
   * @attr icon-left
   * @type {IconName | undefined}
   */
  @property({
    type: String,
    reflect: true,
    attribute: 'icon-left',
  })
  public iconLeft?: IconName;

  @state()
  private _icon: TemplateResult | undefined = undefined;

  public static override get styles(): CSSResultArray {
    return [pillStyles];
  }

  protected override async updated(changedProperties: PropertyValues): Promise<void> {
    // Dynamically import the icon when the icon property is set
    if (changedProperties.has('iconLeft')) {
      try {
        const icon = await import(`../../styles/icons/${this.iconLeft}`);
        this._icon = html`<div class="pill__icon">
          ${this._renderIcon(icon.default, this.iconLeft ?? '', this.size)}
        </div>`;
      } catch (e) {
        console.log(e);
        throw new Error(`Could not get icon named "${this.iconLeft}"`);
      }
    }
  }

  // We need the normal icon proportions, but at smaller sizes, so we have to manually render the svg instead of using pharos-icon
  private _renderIcon(icon: string, title: string, size: string): TemplateResult | undefined {
    const iconSize = size === 'small' ? 12 : 16;
    const iconBlob = atob(icon);
    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 24 24"
        class="icon"
        role="img"
        aria-hidden="true"
        height="${iconSize}"
        width="${iconSize}"
        focusable="false"
      >
        <title>${title}</title>
        ${unsafeSVG(iconBlob)}
      </svg>
    `;
  }

  private _handleDismiss(event: MouseEvent): void {
    event.stopPropagation();
    const dismissEvent = new CustomEvent('pharos-pill-dismissed', {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(dismissEvent);
  }

  protected override render(): TemplateResult {
    const classes = ['pill', `pill--preset-${this.preset}`];

    if (this.size === 'small') {
      classes.push('pill--small');
    }

    if (this.dismissible) {
      classes.push('pill--dismissible');
      const labelText = `Dismiss ${this.renderRoot.querySelector('slot')?.innerText}`;
      return html`
        <button
          class="${classes.join(' ')}"
          ?disabled="${this.disabled}"
          type="button"
          .aria-label="${labelText}"
          @click="${this._handleDismiss}"
        >
          ${this._icon ?? nothing}
          <div class="pill__content">
            <slot></slot>
          </div>
          <div class="pill__close">${this._renderIcon(close, 'close', this.size)}</div>
        </button>
      `;
    }
    return html`<div class="${classes.join(' ')}">
      ${this._icon ?? nothing}
      <div class="pill__content">
        <slot></slot>
      </div>
    </div>`;
  }
}
