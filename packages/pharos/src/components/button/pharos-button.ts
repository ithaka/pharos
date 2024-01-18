import { html, nothing } from 'lit';
import { property, query } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray, PropertyValues } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { buttonStyles } from './pharos-button.css';

import { AnchorElement } from '../base/anchor-element';
import FocusMixin from '../../utils/mixins/focus';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { PharosIcon } from '../icon/pharos-icon';

import type { LinkTarget } from '../base/anchor-element';
import type { IconName } from '../icon/pharos-icon';
export type { LinkTarget, IconName };

export type ButtonType = 'button' | 'submit' | 'reset';

export type ButtonVariant = 'primary' | 'secondary' | 'subtle' | 'overlay';

const TYPES = ['button', 'submit', 'reset'] as ButtonType[];

const VARIANTS = ['primary', 'secondary', 'subtle', 'overlay'] as ButtonVariant[];

/**
 * Pharos button component.
 *
 * @tag pharos-button
 *
 * @slot - Contains the content of the button (the default slot).
 *
 */
export class PharosButton extends ScopedRegistryMixin(FocusMixin(AnchorElement)) {
  static elementDefinitions = {
    'pharos-icon': PharosIcon,
  };

  /**
   * Indicates that the button should have input focus when the page loads.
   * @attr autofocus
   */
  @property({ type: Boolean, reflect: true })
  public override autofocus = false;

  /**
   * Indicates that the button cannot be pressed or focused by the user.
   * @attr disabled
   */
  @property({ type: Boolean, reflect: true })
  public disabled = false;

  /**
   * Indicates the default behavior of the button via the HTML5 attribute.
   * @attr type
   * @type {ButtonType | undefined}
   */
  @property({ type: String, reflect: true })
  public type?: ButtonType;

  /**
   * Indicates the variant of button.
   * @attr variant
   */
  @property({ type: String, reflect: true })
  public variant: ButtonVariant = 'primary';

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
   * @deprecated
   * Indicates the aria label to apply to the button.
   * @attr label
   */
  @property({ type: String, reflect: true })
  public label?: string;

  /**
   * Indicates the aria label to apply to the button.
   * @attr a11y-label
   */
  @property({ type: String, reflect: true, attribute: 'a11y-label' })
  public a11yLabel?: string;

  /**
   * Indicates the aria description to apply to the button.
   * @attr a11y-description
   */
  @property({ type: String, reflect: true, attribute: 'a11y-description' })
  public a11yDescription?: string;

  /**
   * Indicates the aria expanded state to apply to the button.
   * @attr a11y-expanded
   */
  @property({ type: String, reflect: true, attribute: 'a11y-expanded' })
  public a11yExpanded: AriaExpandedState = undefined;

  /**
   * Indicates the aria expanded state to apply to the button.
   * @attr a11y-haspopup
   */
  @property({ type: String, reflect: true, attribute: 'a11y-haspopup' })
  public a11yHaspopup: AriaPopupState = undefined;

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

  /**
   * @deprecated
   * Indicates this button is a toggle button and whether it is pressed or not.
   * @attr value
   */
  @property({ type: String, reflect: true })
  public pressed: AriaPressedState = undefined;

  /**
   * Indicates this button is a toggle button and whether it is pressed or not.
   * @attr value
   */
  @property({ type: String, reflect: true, attribute: 'a11y-pressed' })
  public a11yPressed: AriaPressedState = undefined;

  @query('#button-element')
  private _button!: HTMLButtonElement | HTMLAnchorElement;

  private _formButton!: HTMLButtonElement;
  private _form!: HTMLFormElement | null;

  constructor() {
    super();
    this._stopClickLeak = this._stopClickLeak.bind(this);
  }

  public static override get styles(): CSSResultArray {
    return [buttonStyles];
  }

  protected override firstUpdated(): void {
    this._formButton = document.createElement('button');
    this._formButton.addEventListener('click', this._stopClickLeak);
    this.addEventListener('click', this._handleClick);
  }

  protected override update(changedProperties: PropertyValues): void {
    super.update && super.update(changedProperties);

    if (changedProperties.has('type') && this.type && !TYPES.includes(this.type)) {
      throw new Error(`${this.type} is not a valid type. Valid types are: ${TYPES.join(', ')}`);
    }
    if (changedProperties.has('variant') && this.variant && !VARIANTS.includes(this.variant)) {
      throw new Error(
        `${this.variant} is not a valid variant. Valid variants are: ${VARIANTS.join(', ')}`
      );
    }

    if (this.label) {
      console.warn("The 'label' attribute is deprecated. Use 'a11y-label' instead.");
    }

    if (this.pressed) {
      console.warn("The 'pressed' attribute is deprecated. Use 'a11y-pressed' instead.");
    }
  }

  override connectedCallback(): void {
    super.connectedCallback && super.connectedCallback();
    this._form = this.closest('form');
  }

  override disconnectedCallback(): void {
    super.disconnectedCallback && super.disconnectedCallback();
  }

  private _handleKeyup(event: KeyboardEvent): void {
    switch (event.key) {
      case ' ':
      case 'Spacebar':
        event.preventDefault();
        this._button.click();
        break;
    }
  }

  private _handleClick(event: MouseEvent): void {
    if (
      (this.type === 'submit' || this.type === 'reset') &&
      this._form &&
      !event.defaultPrevented
    ) {
      this._formButton.type = this.type;
      this._form?.appendChild(this._formButton);
      this._formButton.click();
      this._form?.removeChild(this._formButton);
    }
  }

  private _stopClickLeak(event: MouseEvent): void {
    if (event.target === this._formButton) {
      event.stopImmediatePropagation();
    }
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

    return icon ? html` <pharos-icon name="${icon}" a11y-hidden="true"></pharos-icon> ` : nothing;
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

  protected override render(): TemplateResult {
    // TODO: Remove in future release once sufficient time elapsed to update naming convention
    const a11yLabel = this.a11yLabel ?? this.label;
    const a11yPressed = this.a11yPressed ?? this.pressed;

    return this.href
      ? html`
          <a
            id="button-element"
            role="button"
            download=${ifDefined(this.download)}
            href=${ifDefined(this.href)}
            hreflang=${ifDefined(this.hreflang)}
            ping=${ifDefined(this.ping)}
            rel=${ifDefined(this.rel)}
            target=${ifDefined(this.target)}
            aria-label=${ifDefined(a11yLabel)}
            aria-description=${ifDefined(this.a11yDescription)}
            aria-pressed=${ifDefined(a11yPressed)}
            aria-expanded=${ifDefined(this.a11yExpanded)}
            aria-haspopup=${ifDefined(this.a11yHaspopup)}
            @keyup=${this._handleKeyup}
          >
            ${this.buttonContent}
          </a>
        `
      : html`
          <button
            id="button-element"
            name="${ifDefined(this.name)}"
            value="${ifDefined(this.value)}"
            ?autofocus=${this.autofocus}
            ?disabled=${this.disabled}
            type="${ifDefined(this.type)}"
            aria-label=${ifDefined(a11yLabel)}
            aria-description=${ifDefined(this.a11yDescription)}
            aria-pressed=${ifDefined(a11yPressed)}
            aria-expanded=${ifDefined(this.a11yExpanded)}
            aria-haspopup=${ifDefined(this.a11yHaspopup)}
          >
            ${this.buttonContent}
          </button>
        `;
  }
}
