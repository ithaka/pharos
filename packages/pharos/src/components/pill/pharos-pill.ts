import { html, nothing } from 'lit';
import type { TemplateResult, CSSResultArray, PropertyValues } from 'lit';
import { pillStyles } from './pill.css';

import { PharosElement } from '../base/pharos-element';
import { property, state } from 'lit/decorators.js';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import close from '../../styles/icons/close';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { PharosIcon } from '../icon/pharos-icon';
import type { IconName } from '../icon/pharos-icon';
export type { IconName };

/**
 * Pharos pill component.
 *
 * @tag pharos-pill
 *
 * @fires pharos-pill-dismissed - Fires when the pill is dismissed
 **/

export type PillVariant = 'primary' | 'secondary';
export class PharosPill extends ScopedRegistryMixin(PharosElement) {
  static elementDefinitions = {
    'pharos-icon': PharosIcon,
  };

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

  /**
   * The icon to be shown to the left of the pill content.
   * @attr icon
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
    if (changedProperties.has('iconLeft')) {
      try {
        const icon = await import(`../../styles/icons/${this.iconLeft}`);
        this._icon = this._renderIcon(icon.default, this.iconLeft ?? '', this.size);
      } catch (e) {
        console.log(e);
        throw new Error(`Could not get icon named "${this.iconLeft}"`);
      }
    }
  }

  private _handleDismiss(event: MouseEvent): void {
    event.stopPropagation();
    const dismissEvent = new CustomEvent('pharos-pill-dismissed', {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(dismissEvent);
  }

  private _renderIcon(icon: string, title: string, size: string): TemplateResult | undefined {
    // We need the normal icon proportions, but at smaller sizes, so we have to manually render the svg
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
        class="pill__icon"
      >
        <title>${title}</title>
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
          ${this._icon ?? nothing}
          <slot></slot>
          ${this._renderIcon(close, 'close', this.size)}
        </button>
      `;
    }
    return html`<div class="${classes.join(' ')}" style="${style}">
      ${this._icon ?? nothing}
      <slot></slot>
    </div>`;
  }
}
