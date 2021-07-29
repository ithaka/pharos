import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import type { PropertyValues, TemplateResult, CSSResultArray } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { alertStyles } from './pharos-alert.css';
import { customElement } from '../../utils/decorators';
import type { PharosLink } from '../link/pharos-link';

import FocusMixin from '../../utils/mixins/focus';
import '../icon/pharos-icon';

export type AlertStatus = 'info' | 'success' | 'warning' | 'error';

export enum ALERT_ICON {
  INFO = 'info-inverse',
  ERROR = 'exclamation-inverse',
  SUCCESS = 'checkmark-inverse',
  WARNING = 'exclamation-inverse',
}

const STATUSES = ['info', 'success', 'warning', 'error'];

/**
 * Pharos alert component
 *
 * @tag pharos-alert
 *
 * @slot - Contains the alert message (the default slot).
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
@customElement('pharos-alert')
export class PharosAlert extends FocusMixin(LitElement) {
  /**
   * The status to reflect to the user
   * @attr status
   */
  @property({ type: String, reflect: true })
  public status!: AlertStatus;

  private _allLinks!: NodeListOf<PharosLink>;

  public static get styles(): CSSResultArray {
    return [alertStyles];
  }

  protected update(changedProperties: PropertyValues): void {
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
    this._allLinks = this.querySelectorAll('pharos-link');

    this._allLinks.forEach((link) => {
      link['_alert'] = true;
    });
  }

  protected render(): TemplateResult {
    return html`
      <div
        role="alert"
        class="${classMap({
          [`alert`]: true,
          [`alert--${this.status}`]: this.status || '',
        })}"
        tabindex="0"
      >
        <pharos-icon class="alert__icon" name="${this._getIcon()}"></pharos-icon>
        <div class="alert__body">
          <slot @slotchange=${this._handleSlotChange}></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-alert': PharosAlert;
  }
}
