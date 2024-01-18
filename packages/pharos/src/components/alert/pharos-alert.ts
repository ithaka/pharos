import { PharosElement } from '../base/pharos-element';
import { html, nothing } from 'lit';
import { property, queryAssignedElements } from 'lit/decorators.js';
import type { PropertyValues, TemplateResult, CSSResultArray } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { alertStyles } from './pharos-alert.css';
import type { PharosLink } from '../link/pharos-link';

import FocusMixin from '../../utils/mixins/focus';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { PharosIcon } from '../icon/pharos-icon';
import { PharosButton } from '../button/pharos-button';

export type AlertStatus = 'info' | 'success' | 'warning' | 'error';

export enum ALERT_ICON {
  INFO = 'info-inverse',
  ERROR = 'exclamation-inverse',
  SUCCESS = 'checkmark-inverse',
  WARNING = 'exclamation-inverse', // eslint-disable-line @typescript-eslint/no-duplicate-enum-values
}

const STATUSES = ['info', 'success', 'warning', 'error'] as AlertStatus[];

/**
 * Pharos alert component
 *
 * @tag pharos-alert
 *
 * @slot - Contains the alert message (the default slot).
 *
 * @fires pharos-alert-closed - Fires when the alert has closed
 *
 * @cssprop {Color} --pharos-alert-color-text-inverse - The inverted text color for messaging in a dark-colored alert
 * @cssprop {Color} --pharos-alert-color-link-inverse - The inverted text color for links in a dark-colored alert
 *
 * @cssprop {Color} --pharos-alert-color-background-info - The background color of an info alert
 * @cssprop {Color} --pharos-alert-color-icon-info - The fill color for an info alert icon
 *
 * @cssprop {Color} --pharos-alert-color-background-success - The background color of an success alert
 * @cssprop {Color} --pharos-alert-color-icon-success - The fill color for an success alert icon
 *
 * @cssprop {Color} --pharos-alert-color-background-warning - The background color of a warning alert
 * @cssprop {Color} --pharos-alert-color-icon-warning - The fill color for a warning alert icon
 *
 * @cssprop {Color} --pharos-alert-color-background-error - The background color of an error alert
 * @cssprop {Color} --pharos-alert-color-icon-error - The fill color for an error alert icon
 */
export class PharosAlert extends ScopedRegistryMixin(FocusMixin(PharosElement)) {
  static elementDefinitions = {
    'pharos-icon': PharosIcon,
    'pharos-button': PharosButton,
  };

  /**
   * The status to reflect to the user
   * @attr status
   */
  @property({ type: String, reflect: true })
  public status!: AlertStatus;

  /**
   * Indicates if the alert is closable
   * @attr closable
   */
  @property({ type: Boolean, reflect: true })
  public closable = false;

  @queryAssignedElements({ selector: '[data-pharos-component="PharosLink"]' })
  private _allLinks!: NodeListOf<PharosLink>;

  public static override get styles(): CSSResultArray {
    return [alertStyles];
  }

  protected override update(changedProperties: PropertyValues): void {
    super.update && super.update(changedProperties);

    if (!this.status) {
      throw new Error(`status is a required attribute.`);
    }

    if (changedProperties.has('status') && !STATUSES.includes(this.status)) {
      throw new Error(
        `${this.status} is not a valid status. Valid statuses are: ${STATUSES.join(', ')}`
      );
    }
  }

  private _getIcon(): ALERT_ICON {
    const key = this.status?.toUpperCase();
    return ALERT_ICON[key as keyof typeof ALERT_ICON] || ALERT_ICON.INFO;
  }

  private _handleSlotChange(): void {
    this._allLinks.forEach((link) => {
      link['_alert'] = true;
    });
  }

  private close(): void {
    this.remove();
    const details = {
      bubbles: true,
      composed: true,
    };
    this.dispatchEvent(new CustomEvent('pharos-alert-closed', details));
  }

  private _renderCloseButton(): TemplateResult | typeof nothing {
    return this.closable
      ? html` <pharos-button
          type="button"
          variant="subtle"
          icon="close"
          icon-condensed
          a11y-label="Close alert"
          class="alert__button"
          @click=${this.close}
        ></pharos-button>`
      : nothing;
  }

  protected override render(): TemplateResult {
    return html`
      <div
        role="alert"
        class="${classMap({
          [`alert`]: true,
          [`alert--${this.status}`]: this.status || '',
          [`alert--closable`]: this.closable,
        })}"
        tabindex="0"
      >
        <pharos-icon class="alert__icon" name="${this._getIcon()}" a11y-hidden="true"></pharos-icon>
        <div class="alert__body">
          <slot @slotchange=${this._handleSlotChange}></slot>
        </div>
        ${this._renderCloseButton()}
      </div>
    `;
  }
}
