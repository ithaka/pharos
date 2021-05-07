import { html, LitElement } from 'lit-element';
import type { TemplateResult, CSSResultArray } from 'lit-element';
import { toasterStyles } from './pharos-toaster.css';
import { designTokens } from '../../styles/variables.css';
import { customElement } from '../../utils/decorators';

import './pharos-toast';
import type { PharosToast } from './pharos-toast';
import { DEFAULT_STATUS } from './pharos-toast';

/**
 * pharos-toast-open event.
 *
 * @event pharos-toast-open
 * @type {object}
 * @property {ToastStatus} status - The status for the toast.
 * @property {string} content - The content to slot into the toast.
 */

/**
 * Pharos toaster component.
 *
 * @element pharos-toaster
 *
 * @slot - Contains the toasts (the default slot).
 *
 * @listens pharos-toast-open
 */
@customElement('pharos-toaster')
export class PharosToaster extends LitElement {
  constructor() {
    super();
    this._openToast = this._openToast.bind(this);
    this._closeToast = this._closeToast.bind(this);
  }

  public static get styles(): CSSResultArray {
    return [designTokens, toasterStyles];
  }

  connectedCallback(): void {
    super.connectedCallback && super.connectedCallback();
    document.addEventListener('pharos-toast-open', this._openToast as EventListener);
    document.addEventListener('pharos-toast-close', this._closeToast as EventListener);
  }

  disconnectedCallback(): void {
    document.removeEventListener('pharos-toast-open', this._openToast as EventListener);
    document.removeEventListener('pharos-toast-close', this._closeToast as EventListener);
    super.disconnectedCallback && super.disconnectedCallback();
  }

  private async _openToast(event: Event): Promise<void> {
    const toast = document.createElement('pharos-toast') as PharosToast;
    const { content, status } = (<CustomEvent>event).detail;

    toast.insertAdjacentHTML('afterbegin', content);
    toast.status = status || DEFAULT_STATUS;
    this.insertBefore(toast, this.childNodes[0] || null);
    await this.updateComplete;
    toast.focus();
  }

  private _closeToast(event: CustomEvent): void {
    this.removeChild(event.detail);
  }

  protected render(): TemplateResult {
    return html`
      <div class="toaster__container">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-toaster': PharosToaster;
  }
}
