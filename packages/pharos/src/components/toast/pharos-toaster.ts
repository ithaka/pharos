import { PharosElement } from '../base/pharos-element';
import { html } from 'lit';
import type { TemplateResult, CSSResultArray } from 'lit';
import { toasterStyles } from './pharos-toaster.css';

import type { PharosToast } from './pharos-toast';
import { DEFAULT_STATUS, DEFAULT_ID, DEFAULT_INDEFINITE } from './pharos-toast';

/**
 * pharos-toast-open event.
 *
 * @tag pharos-toaster
 *
 * @event pharos-toast-open
 * @type {object}
 * @property {ToastStatus} status - The status for the toast.
 * @property {string} content - The content to slot into the toast.
 */

/**
 * Pharos toaster component.
 *
 * @slot - Contains the toasts (the default slot).
 *
 * @listens pharos-toast-open
 */
export class PharosToaster extends PharosElement {
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
    document.addEventListener('pharos-toast-dismiss', this._dismissToast as EventListener);
    document.addEventListener('pharos-toast-close', this._closeToast as EventListener);
  }

  override disconnectedCallback(): void {
    document.removeEventListener('pharos-toast-open', this._openToast as EventListener);
    document.removeEventListener('pharos-toast-update', this._updateToast as EventListener);
    document.removeEventListener('pharos-toast-dismiss', this._dismissToast as EventListener);
    document.removeEventListener('pharos-toast-close', this._closeToast as EventListener);
    super.disconnectedCallback && super.disconnectedCallback();
  }

  private async _openToast(event: Event): Promise<void> {
    const toastTag = this.localName.split('pharos-toaster')[0] + 'pharos-toast';
    const toast = document.createElement(toastTag) as PharosToast;
    const { content, status, id, indefinite } = (<CustomEvent>event).detail;

    toast.innerHTML = content;
    toast.status = status || DEFAULT_STATUS;
    toast.id = id || DEFAULT_ID;
    toast.indefinite = indefinite || DEFAULT_INDEFINITE;
    this.insertBefore(toast, this.childNodes[0] || null);
    await this.updateComplete;
    toast.focus();
  }

  private _updateToast(event: CustomEvent): void {
    const { content, status, id } = (<CustomEvent>event).detail;
    const toast = document.getElementById(id || DEFAULT_ID);
    if (toast) {
      toast.innerHTML = content;
      toast.status = status;
    }
  }

  private _dismissToast(event: CustomEvent): void {
    const { id } = (<CustomEvent>event).detail;
    const toast = document.getElementById(id || DEFAULT_ID);
    if (toast) {
      toast.open = false;
    }
  }

  private _closeToast(event: CustomEvent): void {
    this.removeChild(event.detail);
  }

  protected override render(): TemplateResult {
    return html`
      <div class="toaster__container">
        <slot></slot>
      </div>
    `;
  }
}
