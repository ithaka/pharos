import { html, LitElement, property, state } from 'lit-element';
import type { TemplateResult, CSSResultArray, PropertyValues } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map.js';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { nothing } from 'lit-html';
import { modalStyles } from './pharos-modal.css';
import { designTokens } from '../../styles/variables.css';
import focusable from '../../utils/focusable';
import { customElement } from '../../utils/decorators';

import '../button/pharos-button';
import '../heading/pharos-heading';
import '@ithaka/focus-trap';

const CLOSE_BUTTONS = `[data-modal-close],pharos-button#close-button`;
const FOCUS_ELEMENT = `[data-modal-focus]`;
const matchesFunc = 'matches' in Element.prototype ? 'matches' : 'msMatchesSelector';

export type ModalSize = 'small' | 'medium' | 'large';

const SIZES = ['small', 'medium', 'large'];

/**
 * Pharos modal component.
 *
 * @element pharos-modal
 *
 * @slot description - Content that describes the primary message or purpose of the modal.
 * @slot - Contains the content of the modal body.
 * @slot footer - Contains the content of the modal footer.
 *
 * @fires pharos-modal-open - Fires when the modal is about to open - cancelable
 * @fires pharos-modal-opened - Fires when the modal has opened
 * @fires pharos-modal-close - Fires when the modal is about to close - cancelable
 * @fires pharos-modal-closed - Fires when the modal has closed
 *
 */
@customElement('pharos-modal')
export class PharosModal extends LitElement {
  /**
   * Indicates if the modal is open.
   * @attr open
   */
  @property({ type: Boolean, reflect: true })
  public open = false;

  /**
   * Text content for the modal header
   * @attr header
   */
  @property({ type: String, reflect: true })
  public header = '';

  /**
   * Indicates if the modal footer should contain a divider.
   * @attr footer-divider
   */
  @property({ type: Boolean, reflect: true, attribute: 'footer-divider' })
  public footerDivider = false;

  /**
   * Indicates the size of the modal
   * @attr size
   */
  @property({ type: String, reflect: true })
  public size: ModalSize = 'medium';

  private _currentTrigger: Element | null = null;

  private _triggers!: NodeListOf<HTMLElement>;

  @state()
  private _isFooterEmpty = true;

  constructor() {
    super();
    this._handleKeydown = this._handleKeydown.bind(this);
    this._handleTriggerClick = this._handleTriggerClick.bind(this);
  }

  public static get styles(): CSSResultArray {
    return [designTokens, modalStyles];
  }

  protected firstUpdated(): void {
    this._addTriggerListeners();
  }

  protected update(changedProperties: PropertyValues): void {
    super.update && super.update(changedProperties);

    if (changedProperties.has('size') && !SIZES.includes(this.size)) {
      throw new Error(`${this.size} is not a valid size. Valid sizes are: ${SIZES.join(', ')}`);
    }
  }

  protected updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('open')) {
      const body = document.querySelector('body');

      if (this.open) {
        body?.classList.add('pharos-modal__body');
        this._focusContents();
      } else {
        body?.classList.remove('pharos-modal__body');
        this._returnTriggerFocus();
      }

      this._emitVisibilityChange();
    }
  }

  connectedCallback(): void {
    super.connectedCallback && super.connectedCallback();
    document.addEventListener('keydown', this._handleKeydown);

    this._addTriggerListeners();
  }

  disconnectedCallback(): void {
    document.removeEventListener('keydown', this._handleKeydown);
    this._triggers.forEach((trigger) => {
      trigger.removeEventListener('click', this._handleTriggerClick);
    });

    super.disconnectedCallback && super.disconnectedCallback();
  }

  private _addTriggerListeners(): void {
    const id = this.getAttribute('id');
    this._triggers = document.querySelectorAll(`[data-modal-id="${id}"]`);
    this._triggers.forEach((trigger) => {
      trigger.addEventListener('click', this._handleTriggerClick);
    });
  }

  private _closeModal(trigger: EventTarget | null): void {
    if (this.open) {
      const details = {
        bubbles: true,
        composed: true,
        detail: trigger,
      };

      if (
        this.dispatchEvent(
          new CustomEvent('pharos-modal-close', {
            ...details,
            cancelable: true,
          })
        )
      ) {
        this.open = false;
      }
    }
  }

  private _openModal(trigger: EventTarget | null): void {
    if (!this.open) {
      const details = {
        bubbles: true,
        composed: true,
        detail: trigger,
      };

      if (
        this.dispatchEvent(new CustomEvent('pharos-modal-open', { ...details, cancelable: true }))
      ) {
        this.open = true;
      }
    }
  }

  private _handleKeydown(event: KeyboardEvent): void {
    if ((event.key === 'Escape' || event.key === 'Esc') && this.open) {
      event.stopPropagation();
      this._closeModal(event.target);
    }
  }

  private _handleDialogClick(event: MouseEvent): void {
    if ((event.target as Element)[matchesFunc](CLOSE_BUTTONS)) {
      this._closeModal(event.target);
    }
  }

  private _handleTriggerClick(event: MouseEvent): void {
    event.preventDefault();
    this._openModal(event.target);
  }

  private async _focusContents(): Promise<void> {
    this._currentTrigger = this.ownerDocument.activeElement;
    const focusElement = this.querySelector(FOCUS_ELEMENT);
    if (focusElement) {
      await 0;
      (focusElement as HTMLElement).focus();
    } else {
      const tabbable = this.shadowRoot?.querySelector(focusable);
      if (tabbable) {
        await 0;
        (tabbable as HTMLElement).focus();
      }
    }
  }

  private _returnTriggerFocus(): void {
    if (this._currentTrigger && typeof (this._currentTrigger as HTMLElement).focus === 'function') {
      (this._currentTrigger as HTMLElement).focus();
      this._currentTrigger = null;
    }
  }

  private _emitVisibilityChange() {
    const details = {
      bubbles: true,
      composed: true,
    };

    if (this.open) {
      this.dispatchEvent(new CustomEvent('pharos-modal-opened', details));
    } else {
      this.dispatchEvent(new CustomEvent('pharos-modal-closed', details));
    }
  }

  protected get descriptionContent(): TemplateResult | typeof nothing {
    const descriptionSlot = [...this.children].filter((child) => child.slot === 'description');
    const content = descriptionSlot.length
      ? html` <div id="description">
          <slot name="description"></slot>
        </div>`
      : nothing;
    return content;
  }

  protected get descriptionId(): string | undefined {
    const descriptionSlot = [...this.children].filter((child) => child.slot === 'description');
    return descriptionSlot.length ? 'description' : undefined;
  }

  private _handleFooterSlotchange(e: Event) {
    this._isFooterEmpty =
      (e.target as HTMLSlotElement).assignedNodes({ flatten: true }).length === 0;
  }

  protected render(): TemplateResult {
    return html`
      <div class="modal__overlay">
        <div
          role="dialog"
          class=${classMap({
            [`modal__dialog`]: true,
            [`modal__dialog--${this.size}`]: this.size,
          })}
          aria-modal="true"
          aria-labelledby="modal-header"
          aria-describedby="${ifDefined(this.descriptionId)}"
          @click=${this._handleDialogClick}
        >
          <focus-trap>
            <div class="modal__content">
              <div class="modal__header">
                <pharos-heading id="modal-header" level="2" preset="5" no-margin
                  >${this.header}</pharos-heading
                >
                <pharos-button
                  id="close-button"
                  type="button"
                  variant="subtle"
                  icon="close"
                  label="Close modal"
                ></pharos-button>
              </div>
              <div class="modal__body">
                ${this.descriptionContent}
                <slot></slot>
              </div>
              <div class="modal__footer${this._isFooterEmpty ? '--empty' : ''}">
                <slot @slotchange=${this._handleFooterSlotchange} name="footer"></slot>
              </div>
            </div>
          </focus-trap>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-modal': PharosModal;
  }
}
