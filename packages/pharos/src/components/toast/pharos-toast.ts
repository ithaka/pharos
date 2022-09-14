import { PharosElement } from '../base/pharos-element';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray, PropertyValues } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { toastStyles } from './pharos-toast.css';
import debounce from '../../utils/debounce';
import type { Procedure } from '../../typings/procedure';

import FocusMixin from '../../utils/mixins/focus';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { PharosIcon } from '../icon/pharos-icon';
import { PharosToastButton } from './pharos-toast-button';

export type ToastStatus = 'success' | 'error' | 'info';

export enum TOAST_ICON {
  ERROR = 'exclamation-inverse',
  SUCCESS = 'checkmark-inverse',
  INFO = 'exclamation-inverse',
}

const STATUSES = ['success', 'error', 'info'];

const TOAST_LIFE = 6000;

export const DEFAULT_STATUS = 'success';

export const DEFAULT_ID = 'toast';

export const DEFAULT_INDEFINITE = false;

/**
 * Pharos toast component.
 *
 * @tag pharos-toast
 *
 * @slot - Content inside the toast (the default slot).
 *
 * @fires pharos-toast-close - Fires when the toast has closed
 *
 */
export class PharosToast extends ScopedRegistryMixin(FocusMixin(PharosElement)) {
  static elementDefinitions = {
    'pharos-icon': PharosIcon,
    'pharos-toast-button': PharosToastButton,
  };

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

  /**
   * The optional id passed to the toast. Can be used as a handle so the toast can be updated.
   * @attr id
   */
  @property({ type: String, reflect: true })
  public id = DEFAULT_ID;

  /**
   * Indicates if the toast should persist indefinitely
   * @attr indefinite
   */
  @property({ type: Boolean, reflect: true })
  public indefinite = false;

  private _timer: number | void = 0;
  private _debouncer: Procedure = debounce(() => {
    this.close();
  }, TOAST_LIFE);

  public static override get styles(): CSSResultArray {
    return [toastStyles];
  }

  protected override firstUpdated(): void {
    if (!this.indefinite) {
      this.addEventListener('focusin', this._handleTimer);
      this.addEventListener('focusout', this._handleTimer);
    }
    this.open = true;
  }

  protected override update(changedProperties: PropertyValues): void {
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

  protected override render(): TemplateResult {
    return html`
      <div
        role="alert"
        id="${this.id}"
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
