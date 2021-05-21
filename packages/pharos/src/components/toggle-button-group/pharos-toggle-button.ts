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
  private _hideLeftBorder = false;

  @state()
  private _hideRightBorder = false;

  @state()
  protected _hovered = false;

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

    if (changedProperties.has('_hideLeftBorder')) {
      this.setAttribute('hideLeftBorder', this._hideLeftBorder ? 'true' : 'false');
    }

    if (changedProperties.has('_hideRightBorder')) {
      this.setAttribute('hideRightBorder', this._hideRightBorder ? 'true' : 'false');
    }
  }

  protected firstUpdated(): void {
    this.addEventListener('click', this._handleClickToggle);
    this.addEventListener('mouseover', this._handleMouseOver);
    this.addEventListener('mouseout', this._handleMouseOut);
    this.addEventListener('focus', this._dispatchBorderCheck);
    this.addEventListener('focusout', this._dispatchBorderCheck);
  }

  private _handleClickToggle(): void {
    const details = {
      bubbles: true,
      composed: true,
    };
    this.selected = true;
    this.dispatchEvent(new CustomEvent('pharos-toggle-button-selected', details));
  }

  private _handleMouseOver(): void {
    this._hovered = true;
    this._dispatchBorderCheck();
  }

  private _handleMouseOut(): void {
    this._hovered = false;
    this._dispatchBorderCheck();
  }

  private _dispatchBorderCheck(): void {
    const details = {
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('pharos-toggle-button-border-check', details));
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
