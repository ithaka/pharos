import { html, property } from 'lit-element';
import type { TemplateResult, CSSResultArray } from 'lit-element';
import { sidenavStyles } from './pharos-sidenav.css';
import { designTokens } from '../../styles/variables.css';
import { customElement } from '../../utils/decorators';
import { nothing } from 'lit-html';

import { SideElement } from '../base/side-element';

import FocusMixin from '../../utils/mixins/focus';

import '../button/pharos-button';
import '../link/pharos-link';

/**
 * Pharos sidenav component.
 *
 * @element pharos-sidenav
 *
 * @slot top - Content to be shown at the top of the sidenav.
 * @slot - Contains the sections of the sidenav (the default slot).
 *
 */
@customElement('pharos-sidenav')
export class PharosSidenav extends FocusMixin(SideElement) {
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

  connectedCallback(): void {
    super.connectedCallback && super.connectedCallback();
    this._mediaQuery.addEventListener('change', this._handleMediaChange);
  }

  disconnectedCallback(): void {
    this._mediaQuery.removeEventListener('change', this._handleMediaChange);
    super.disconnectedCallback && super.disconnectedCallback();
  }

  public static get styles(): CSSResultArray {
    return [designTokens, super.styles, sidenavStyles];
  }

  private _handleClickClose(): void {
    this.slide = false;
    document.querySelector('pharos-sidenav-button')?.focus();
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

  protected render(): TemplateResult {
    return html`
      <nav id="nav-element" class="side-element__container">
        <div class="side-element__content">
          <pharos-button
            class="side-element__button"
            icon="close"
            variant="subtle"
            label="Close menu"
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

declare global {
  interface HTMLElementTagNameMap {
    'pharos-sidenav': PharosSidenav;
  }
}
