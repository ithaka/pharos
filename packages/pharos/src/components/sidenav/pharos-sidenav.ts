import { html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray } from 'lit';
import { sidenavStyles } from './pharos-sidenav.css';
import { SideElement } from '../base/side-element';
import type { PharosSidenavButton } from './pharos-sidenav-button';

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
 *
 */
export class PharosSidenav extends ScopedRegistryMixin(FocusMixin(SideElement)) {
  static elementDefinitions = {
    'pharos-button': PharosButton,
    'pharos-link': PharosLink,
  };

  /**
   * Indicates that the sidenav should slide in.
   * @attr slide
   */
  @property({ type: Boolean, reflect: true })
  public slide = false;

  /**
   * Indicates the skip to target
   * @attr main-content-id
   */
  @property({ type: String, reflect: true, attribute: 'main-content-id' })
  public mainContentId?: string;

  private _mediaQuery: MediaQueryList = window.matchMedia(`(max-width: 1055px)`);

  constructor() {
    super();
    this._handleMediaChange = this._handleMediaChange.bind(this);
  }

  override connectedCallback(): void {
    super.connectedCallback && super.connectedCallback();
    this._mediaQuery.addEventListener('change', this._handleMediaChange);
  }

  override disconnectedCallback(): void {
    this._mediaQuery.removeEventListener('change', this._handleMediaChange);
    super.disconnectedCallback && super.disconnectedCallback();
  }

  public static override get styles(): CSSResultArray {
    return [super.styles, sidenavStyles];
  }

  private _handleClickClose(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    this.slide = false;
    const button: PharosSidenavButton | null = document.querySelector(
      '[data-pharos-component="PharosSidenavButton"]'
    );
    button?.focus();

    const details = {
      bubbles: true,
      composed: true,
      detail: this,
    };
    this.dispatchEvent(new CustomEvent('pharos-sidenav-close', details));
  }

  private _handleMediaChange(e: MediaQueryListEvent): void {
    if (!e.matches) {
      this.slide = false;
    }
  }

  private _renderSkipToMain(): TemplateResult | typeof nothing {
    return this.mainContentId
      ? html`<pharos-link id="sidenav-skip-link" on-background skip href="#${this.mainContentId}">
          Skip to main content</pharos-link
        > `
      : nothing;
  }

  protected override render(): TemplateResult {
    return html`
      <nav id="nav-element" class="side-element__container">
        <div class="side-element__content">
          <pharos-button
            class="side-element__button"
            icon="close"
            variant="subtle"
            a11y-label="Close menu"
            on-background
            icon-condensed
            @click=${this._handleClickClose}
          ></pharos-button>
          ${this._renderSkipToMain()}
          <slot name="top"></slot>
        </div>
        <div class="sidenav__sections">
          <slot></slot>
        </div>
      </nav>
    `;
  }
}
