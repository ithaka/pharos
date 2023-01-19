import { PharosElement } from '../base/pharos-element';
import { html } from 'lit';
import type { TemplateResult, CSSResultArray } from 'lit';
import { state } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { toasterStyles } from './pharos-toaster.css';

import type { ToastStatus } from './pharos-toast';
import { PharosToast } from './pharos-toast';
import { DEFAULT_STATUS, DEFAULT_INDEFINITE } from './pharos-toast';

import { v4 as uuidv4 } from 'uuid';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';

/**
 * pharos-toast-open event.
 *
 * @event pharos-toast-open
 * @type {ToastCreateDetail}
 */

/**
 * pharos-toast-update event.
 *
 * @event pharos-toast-update
 * @type {ToastUpdateDetail}
 */

/**
 * pharos-toast-close event.
 *
 * @event pharos-toast-close
 * @type {ToastCloseDetail}
 */

type ToastID = string;
type ToastContent = string;
type ToastIndefinite = boolean;

interface ToastDetail {
  id: ToastID;
  content: ToastContent;
  status: ToastStatus;
  indefinite: ToastIndefinite;
}

interface ToastCreateDetail {
  id?: ToastID;
  content: ToastContent;
  status?: ToastStatus;
  indefinite?: ToastIndefinite;
}

interface ToastUpdateDetail {
  id: ToastID;
  content?: ToastContent;
  status?: ToastStatus;
}

interface ToastCloseDetail {
  id: ToastID;
}

/**
 * Pharos toaster component.
 *
 * @tag pharos-toaster
 *
 * @listens pharos-toast-open - Use this to create new toasts
 * @listens pharos-toast-update - Use this to update an existing toast
 * @listens pharos-toast-close - Use this to close an existing toast
 */
export class PharosToaster extends ScopedRegistryMixin(PharosElement) {
  static elementDefinitions = {
    'pharos-toast': PharosToast,
  };

  @state()
  private _toasts: ToastDetail[] = [];

  constructor() {
    super();
    this._openToast = this._openToast.bind(this);
    this._updateToast = this._updateToast.bind(this);
    this._closeToast = this._closeToast.bind(this);
  }

  public static override get styles(): CSSResultArray {
    return [toasterStyles];
  }

  override connectedCallback(): void {
    super.connectedCallback && super.connectedCallback();
    document.addEventListener('pharos-toast-open', this._openToast as EventListener);
    document.addEventListener('pharos-toast-update', this._updateToast as EventListener);
    document.addEventListener('pharos-toast-close', this._closeToast as EventListener);
  }

  override disconnectedCallback(): void {
    document.removeEventListener('pharos-toast-open', this._openToast as EventListener);
    document.removeEventListener('pharos-toast-update', this._updateToast as EventListener);
    document.removeEventListener('pharos-toast-close', this._closeToast as EventListener);
    super.disconnectedCallback && super.disconnectedCallback();
  }

  private _getToastID(id: ToastID | null | undefined) {
    return id || `toast_${uuidv4()}`;
  }

  private async _openToast(event: Event): Promise<void> {
    const { content, status, id, indefinite } = <ToastCreateDetail>(<CustomEvent>event).detail;
    const toastId = this._getToastID(id);

    this._toasts = [
      {
        content,
        status: status || DEFAULT_STATUS,
        id: toastId,
        indefinite: indefinite || DEFAULT_INDEFINITE,
      },
      ...this._toasts,
    ];

    await this.updateComplete;
    (this.renderRoot.querySelector(`#${toastId}`) as HTMLElement)?.focus();
  }

  private _updateToast(event: CustomEvent): void {
    const { content, status, id } = <ToastUpdateDetail>(<CustomEvent>event).detail;

    this._toasts = this._toasts.map((toast: ToastDetail): ToastDetail => {
      if (toast.id === id) {
        return {
          ...toast,
          content: content || toast.content,
          status: status || toast.status,
        };
      } else {
        return toast;
      }
    });
  }

  private _closeToast(event: CustomEvent): void {
    const { id } = <ToastCloseDetail>(<CustomEvent>event).detail || {};
    this._toasts = this._toasts.filter((toast) => toast.id !== id);
  }

  private _renderToast(toast: ToastDetail): TemplateResult {
    // This is used to properly render any Pharos components present in the supplied content.
    // unsafeHtml will render content in general, but does not appear to render components.
    const toastContentElement = document.createElement('div');
    toastContentElement.innerHTML = toast.content;

    return html`<pharos-toast
      id="${toast.id}"
      status="${toast.status}"
      ?indefinite="${toast.indefinite}"
    >
      ${toastContentElement}
    </pharos-toast>`;
  }

  protected override render(): TemplateResult {
    return html`
      <div class="toaster__container">
        ${repeat(
          this._toasts,
          (toast) => toast.id,
          (toast) => this._renderToast(toast)
        )}
      </div>
    `;
  }
}
