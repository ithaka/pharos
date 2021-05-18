import { html, property } from 'lit-element';
import type { TemplateResult, CSSResultArray, PropertyValues } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { nothing } from 'lit-html';
import { toggleButtonStyles } from './pharos-toggle-button.css';
import { designTokens } from '../../styles/variables.css';
import { customElement } from '../../utils/decorators';

import { AnchorElement } from '../base/anchor-element';
import type { LinkTarget } from '../base/anchor-element';
import FocusMixin from '../../utils/mixins/focus';
import '../icon/pharos-icon';
import type { IconName } from '../icon/pharos-icon';

export type ButtonType = 'button' | 'reset';

export type { LinkTarget, IconName };

const TYPES = ['button', 'reset'];

/**
 * Pharos toggle button component.
 *
 * @element pharos-toggle-button
 *
 * @slot - Contains the content of the button (the default slot).
 *
 */
@customElement('pharos-toggle-button')
export class PharosToggleButton extends FocusMixin(AnchorElement) {
  /**
   * Indicates that the button should have input focus when the page loads.
   * @attr autofocus
   */
  @property({ type: Boolean, reflect: true })
  public autofocus = false;

  /**
   * Indicates that the button is currently toggled on
   * @attr selected
   */
  @property({ type: Boolean, reflect: true })
  public selected = false;

  /**
   * Indicates the default behavior of the button via the HTML5 attribute.
   * @attr type
   * @type {ButtonType | undefined}
   */
  @property({ type: String, reflect: true })
  public type?: ButtonType;

  /**
   * The icon to be shown as the content of the button.
   * @attr icon
   * @type {IconName | undefined}
   */
  @property({ type: String, reflect: true })
  public icon?: IconName;

  /**
   * Applies only to icon-only buttons. If true, the button will have minimal padding.
   * @attr icon-condensed
   */
  @property({ type: Boolean, reflect: true, attribute: 'icon-condensed' })
  public iconCondensed = false;

  /**
   * The icon to be shown on the right side.
   * @attr icon-right
   * @type {IconName | undefined}
   */
  @property({ type: String, reflect: true, attribute: 'icon-right' })
  public iconRight?: IconName;

  /**
   * The icon to be shown on the left side.
   * @attr icon-left
   * @type {IconName | undefined}
   */
  @property({ type: String, reflect: true, attribute: 'icon-left' })
  public iconLeft?: IconName;

  /**
   * Indicates the button is on a AA compliant background.
   * @attr on-background
   */
  @property({ type: Boolean, reflect: true, attribute: 'on-background' })
  public onBackground = false;

  /**
   * Indicates the button has more padding.
   * @attr large
   */
  @property({ type: Boolean, reflect: true })
  public large = false;

  /**
   * Indicates the aria label to apply to the button.
   * @attr label
   */
  @property({ type: String, reflect: true })
  public label?: string;

  /**
   * Indicates the button's width should match its container.
   * @attr full-width
   */
  @property({ type: Boolean, reflect: true, attribute: 'full-width' })
  public fullWidth = false;

  /**
   * Indicates the name when submitted with form data.
   * @attr name
   */
  @property({ type: String, reflect: true })
  public name?: string;

  /**
   * Indicates the value associated with the name when submitted with form data.
   * @attr value
   */
  @property({ type: String, reflect: true })
  public value?: string;

  public static get styles(): CSSResultArray {
    return [designTokens, toggleButtonStyles];
  }

  protected firstUpdated(): void {
    this.addEventListener('click', this._handleClick);
  }

  protected update(changedProperties: PropertyValues): void {
    super.update && super.update(changedProperties);

    if (changedProperties.has('type') && this.type && !TYPES.includes(this.type)) {
      throw new Error(`${this.type} is not a valid type. Valid types are: ${TYPES.join(', ')}`);
    }
  }

  private _handleClick(): void {
    const details = {
      bubbles: true,
      composed: true,
    };
    this.selected = true;
    this.dispatchEvent(new CustomEvent('pharos-toggle-button-selected', details));
  }

  private _renderIcon(direction = ''): TemplateResult | typeof nothing {
    let icon;

    if (direction === 'left') {
      icon = this.iconLeft;
    } else if (direction === 'right') {
      icon = this.iconRight;
    } else {
      icon = this.icon;
    }

    return icon ? html` <pharos-icon name="${icon}"></pharos-icon> ` : nothing;
  }

  protected get buttonContent(): TemplateResult {
    return this.icon
      ? html`${this._renderIcon()}`
      : html`
          ${this._renderIcon('left')}
          <slot></slot>
          ${this._renderIcon('right')}
        `;
  }

  protected render(): TemplateResult {
    return html`
      <button
        id="toggle-button-element"
        name="${ifDefined(this.name)}"
        value="${ifDefined(this.value)}"
        ?autofocus=${this.autofocus}
        ?disabled=${this.selected}
        type="${ifDefined(this.type)}"
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
