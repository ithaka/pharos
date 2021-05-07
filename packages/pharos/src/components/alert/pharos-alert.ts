import { LitElement, html, property } from 'lit-element';
import type { PropertyValues, TemplateResult, CSSResultArray } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { alertStyles } from './pharos-alert.css';
import { designTokens } from '../../styles/variables.css';
import { customElement } from '../../utils/decorators';

import FocusMixin from '../../utils/mixins/focus';
import '../icon/pharos-icon';

export type AlertStatus = 'info' | 'success' | 'warning' | 'error' | '';

export enum ALERT_ICON {
  BASE = 'base',
  INFO = 'info-inverse',
  ERROR = 'exclamation-inverse',
  SUCCESS = 'checkmark-inverse',
  WARNING = 'exclamation-inverse',
}

const STATUSES = ['info', 'success', 'warning', 'error', ''];

/**
 * Pharos alert component
 *
 * @element pharos-alert
 *
 * @slot - Contains the alert message (the default slot).
 *
 * @cssprop {Color} --pharos-alert-color-background-base - The default background color of an alert
 * @cssprop {Color} --pharos-alert-color-text-base - The default text color for messaging in an alert
 * @cssprop {Color} --pharos-alert-color-link-base - The default text color for links in an alert
 * @cssprop {Color} --pharos-alert-color-icon-base - The default fill color for an alert icon
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
  public status: AlertStatus = '';

  public static get styles(): CSSResultArray {
    return [designTokens, alertStyles];
  }

  protected update(changedProperties: PropertyValues): void {
    super.update && super.update(changedProperties);

    if (changedProperties.has('status') && !STATUSES.includes(this.status)) {
      throw new Error(
        `${this.status} is not a valid status. Valid statuses are: ${STATUSES.join(', ')}`
      );
    }
  }

  private _getIcon(): ALERT_ICON {
    const key = this.status.toUpperCase();
    return ALERT_ICON[key as keyof typeof ALERT_ICON] || ALERT_ICON.BASE;
  }

  protected render(): TemplateResult {
    return html`
      <div
        role="alert"
        class="${classMap({
          [`alert`]: true,
          [`alert--${this.status}`]: this.status,
        })}"
        tabindex="0"
      >
        <pharos-icon class="alert__icon" name="${this._getIcon()}"></pharos-icon>
        <div class="alert__body">
          <slot></slot>
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
