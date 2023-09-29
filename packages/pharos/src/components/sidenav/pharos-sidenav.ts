import { html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray } from 'lit';
import { sidenavStyles } from './pharos-sidenav.css';
import { SideElement } from '../base/side-element';

import FocusMixin from '../../utils/mixins/focus';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { PharosButton } from '../button/pharos-button';
import { PharosLink } from '../link/pharos-link';

/**
 * Pharos sidenav component.
 *
 * @tag pharos-sidenav
 *
 * @slot top - Content to be shown at the top of the sidenav.
 * @slot - Contains the sections of the sidenav (the default slot).
 *
 * @fires pharos-sidenav-close - Fires when the sidenav has closed
 * @fires pharos-sidenav-open - Fires when the sidenav has opened
 *
 */
export class PharosSidenav extends ScopedRegistryMixin(FocusMixin(SideElement)) {
  static elementDefinitions = {
    'pharos-button': PharosButton,
    'pharos-link': PharosLink,
  };

  /**
   * Indicates whether or not the sidenav is open
   */
  @property({ type: Boolean, reflect: true, attribute: 'open' })
  public open = false;

  /**
   * Indicates whether or not the close button displays in the sidenav.
   */
  @property({ type: Boolean, reflect: true, attribute: 'has-close-button' })
  public hasCloseButton = false;

  /**
   * Indicates the skip to target
   * @attr main-content-id
   */
  @property({ type: String, reflect: true, attribute: 'main-content-id' })
  public mainContentId?: string;

  private _triggers!: NodeListOf<HTMLElement>;

  constructor() {
    super();
  }

  override connectedCallback(): void {
    super.connectedCallback && super.connectedCallback();
    this._addTriggerListeners();
  }

  override disconnectedCallback(): void {
    this._triggers.forEach((trigger) => {
      trigger.removeEventListener('click', this._openSidenav);
    });
    super.disconnectedCallback && super.disconnectedCallback();
  }

  public static override get styles(): CSSResultArray {
    return [super.styles, sidenavStyles];
  }

  private _addTriggerListeners(): void {
    const id = this.getAttribute('id');
    this._triggers = document.querySelectorAll(`[data-sidenav-id="${id}"]`);
    console.log(this._triggers);
    this._triggers.forEach((trigger) => {
      trigger.addEventListener('click', this._openSidenav);
    });
  }

  private _closeSidenav(event: Event): void {
    event.preventDefault();

    if (this.open) {
      const details = {
        bubbles: true,
        composed: true,
        detail: this,
      };
      if (
        this.dispatchEvent(
          new CustomEvent('pharos-sidenav-close', { ...details, cancelable: true })
        )
      ) {
        this.open = false;
      }
    }
  }

  private _openSidenav = (event: Event): void => {
    event.preventDefault();
    if (!this.open) {
      const details = {
        bubbles: true,
        composed: true,
        detail: event.target,
      };

      if (
        this.dispatchEvent(new CustomEvent('pharos-sidenav-open', { ...details, cancelable: true }))
      ) {
        this.open = true;
      }
    }
  };

  private _renderSkipToMain(): TemplateResult | typeof nothing {
    return this.mainContentId
      ? html`<pharos-link id="sidenav-skip-link" on-background skip href="#${this.mainContentId}">
          Skip to main content</pharos-link
        > `
      : nothing;
  }

  private _renderCloseButton(): TemplateResult | typeof nothing {
    return this.hasCloseButton
      ? html`<pharos-button
          class="side-element__button"
          icon="close"
          variant="subtle"
          label="Close menu"
          on-background
          icon-condensed
          @click=${this._closeSidenav}
        ></pharos-button> `
      : nothing;
  }

  protected override render(): TemplateResult {
    return html`
      <nav id="nav-element" class="side-element__container">
        <div class="side-element__content">
          ${this._renderCloseButton()} ${this._renderSkipToMain()}
          <slot name="top"></slot>
        </div>
        <div class="sidenav__sections">
          <slot></slot>
        </div>
      </nav>
    `;
  }
}
