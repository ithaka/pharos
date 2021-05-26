import { html, LitElement, property } from 'lit-element';
import type { TemplateResult, CSSResultArray, PropertyValues } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { toastStyles } from './pharos-toast.css';
import { customElement } from '../../utils/decorators';
import debounce from '../../utils/debounce';

import FocusMixin from '../../utils/mixins/focus';
import '../icon/pharos-icon';
import './pharos-toast-button';
import type { Procedure } from '../../typings/procedure';

export type ToastStatus = 'success' | 'error';

export enum TOAST_ICON {
  ERROR = 'exclamation-inverse',
  SUCCESS = 'checkmark-inverse',
}

const STATUSES = ['success', 'error'];

const TOAST_LIFE = 6000;

export const DEFAULT_STATUS = 'success';

/**
 * Pharos toast component.
 *
 * @element pharos-toast
 *
 * @slot - Content inside the toast (the default slot).
 *
 * @fires pharos-toast-close - Fires when the toast has closed
 *
 */
@customElement('pharos-toast')
export class PharosToast extends FocusMixin(LitElement) {
  /**
   * The status to reflect to the user.
   * @attr status
   */
  @property({ type: String, reflect: true })
  public status: ToastStatus = DEFAULT_STATUS;

  /**
   * Indicates if the toast is open.
   * @attr open
   */
  @property({ type: Boolean, reflect: true })
  public open = false;

  private _timer: number | void = 0;
  private _debouncer: Procedure = debounce(() => {
    this.close();
  }, TOAST_LIFE);

  public static get styles(): CSSResultArray {
    return [toastStyles];
  }

  protected firstUpdated(): void {
    this.addEventListener('focusin', this._handleTimer);
    this.addEventListener('focusout', this._handleTimer);

    this.open = true;
  }

  protected update(changedProperties: PropertyValues): void {
    super.update && super.update(changedProperties);

    if (changedProperties.has('status') && !STATUSES.includes(this.status)) {
      throw new Error(
        `${this.status} is not a valid status. Valid statuses are: ${STATUSES.join(', ')}`
      );
    }
  }

  private _handleTimer(event: FocusEvent): void {
    if (event.type === 'focusin') {
      clearTimeout(this._timer as number);
    } else {
      this._timer = this._debouncer();
    }
  }

  private _getIcon(): TOAST_ICON {
    const key = this.status.toUpperCase();
    return TOAST_ICON[key as keyof typeof TOAST_ICON] || TOAST_ICON.SUCCESS;
  }

  public close(): void {
    const details = {
      bubbles: true,
      composed: true,
      detail: this,
    };

    this.open = false;
    debounce(() => {
      this.dispatchEvent(new CustomEvent('pharos-toast-close', details));
    }, 500)();
  }

  protected render(): TemplateResult {
    return html`
      <div
        role="alert"
        class="${classMap({
          [`toast`]: true,
          [`toast--${this.status}`]: this.status,
        })}"
        tabindex="0"
      >
        <pharos-icon class="toast__icon" name="${this._getIcon()}"></pharos-icon>
        <div class="toast__body">
          <slot></slot>
        </div>
        <pharos-toast-button class="toast__button" @click=${this.close}></pharos-toast-button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-toast': PharosToast;
  }
}
