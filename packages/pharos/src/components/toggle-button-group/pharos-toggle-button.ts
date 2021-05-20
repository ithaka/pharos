import { html, property, state } from 'lit-element';
import type { TemplateResult, CSSResultArray, PropertyValues } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { toggleButtonStyles } from './pharos-toggle-button.css';
import { designTokens } from '../../styles/variables.css';
import { customElement } from '../../utils/decorators';
import { PharosButton } from '../button/pharos-button';
import type { ButtonType, LinkTarget, IconName } from '../button/pharos-button';

export type { ButtonType, LinkTarget, IconName };

/**
 * Pharos toggle button component.
 *
 * @element pharos-toggle-button
 *
 * @slot - Contains the content of the button (the default slot).
 *
 */
@customElement('pharos-toggle-button')
export class PharosToggleButton extends PharosButton {
  /**
   * Indicates that the button is currently toggled on and cannot be pressed or focused by the user.
   * @attr selected
   */
  @property({ type: Boolean, reflect: true })
  public selected = false;

  @state()
  private _first = false;

  @state()
  private _last = false;

  @state()
  private _hideBorder = false;

  constructor() {
    super();
    this.variant = 'secondary';
    this.type = 'button';
  }

  public static get styles(): CSSResultArray {
    return [designTokens, super.styles, toggleButtonStyles];
  }

  protected update(changedProperties: PropertyValues): void {
    super.update && super.update(changedProperties);

    if (
      changedProperties.has('href') ||
      changedProperties.has('hreflang') ||
      changedProperties.has('ping') ||
      changedProperties.has('rel') ||
      changedProperties.has('target')
    ) {
      throw new Error(
        'The toggle button component does not support these properties: href, hreflang, ping, rel, and target.'
      );
    }

    if (changedProperties.has('_first')) {
      this.setAttribute('first', this._first ? 'true' : 'false');
    }

    if (changedProperties.has('_last')) {
      this.setAttribute('last', this._last ? 'true' : 'false');
    }

    if (changedProperties.has('_hideBorder')) {
      this.setAttribute('hideBorder', this._hideBorder ? 'true' : 'false');
    }
  }

  protected firstUpdated(): void {
    this.addEventListener('click', this._handleClickToggle);
  }

  private _handleClickToggle(): void {
    const details = {
      bubbles: true,
      composed: true,
    };
    this.selected = true;
    this.dispatchEvent(new CustomEvent('pharos-toggle-button-selected', details));
  }

  protected render(): TemplateResult {
    return html`
      <button
        id="button-element"
        ?autofocus=${this.autofocus}
        ?selected=${this.selected}
        ?disabled="${this.selected}"
        type="button"
        aria-label=${ifDefined(this.label)}
      >
        ${this.buttonContent}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-toggle-button': PharosToggleButton;
  }
}
