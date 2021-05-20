import { html, LitElement, property } from 'lit-element';
import type { TemplateResult, CSSResultArray } from 'lit-element';
import { nothing } from 'lit-html';
import { imageCardStyles } from './pharos-image-card.css';
import { designTokens } from '../../styles/variables.css';
import { customElement } from '../../utils/decorators';
import type { PharosButton } from '../button/pharos-button';
import type { PharosDropdownMenu } from '../dropdown-menu/pharos-dropdown-menu';

import '../heading/pharos-heading';
import '../link/pharos-link';
import '../icon/pharos-icon';
import '../button/pharos-button';

@customElement('pharos-image-card')
export class PharosImageCard extends LitElement {
  /**
   * Indicates the title of the item presented in the card.
   * @attr title
   */
  @property({ type: String, reflect: true })
  public title = '';

  /**
   * Indicates the link to apply to the title and image.
   * @attr link
   */
  @property({ type: String, reflect: true })
  public link = '';

  /**
   * Indicates if the image is not available or accessible.
   * @attr error
   */
  @property({ type: Boolean, reflect: true })
  public error = false;

  /**
   * Indicates if the metadata should only show on hover of the image.
   * @attr subtle
   */
  @property({ type: Boolean, reflect: true })
  public subtle = false;

  /**
   * Indicates the action menu id to be passed to the action button.
   * @attr action-menu
   */
  @property({ type: String, reflect: true, attribute: 'action-menu' })
  public actionMenu?: string;

  public static get styles(): CSSResultArray {
    return [designTokens, imageCardStyles];
  }

  private _handleClick(e: MouseEvent): void {
    const trigger = e.target as PharosButton;
    const menu: PharosDropdownMenu | null = document.querySelector(
      `pharos-dropdown-menu#${this.actionMenu}`
    );
    menu?.openWithTrigger(trigger);
  }

  private _renderImage(): TemplateResult {
    return this.error
      ? html`<div class="card__container--error">
          <pharos-icon name="exclamation-inverse"></pharos-icon>Preview not available
        </div>`
      : html`<pharos-link class="card__image" href="${this.link}" subtle flex
          ><slot name="image"></slot>${this.subtle
            ? html`<div class="card__metadata--hover"><slot name="metadata"></slot></div>`
            : nothing}</pharos-link
        >`;
  }

  protected get renderTitle(): TemplateResult {
    return html`<pharos-link class="card__title" href="${this.link}" subtle flex
      ><pharos-heading preset="1--bold" level="3" no-margin
        >${this.title}</pharos-heading
      ></pharos-link
    >`;
  }

  private _renderActionButton(): TemplateResult | typeof nothing {
    return this.actionMenu
      ? html`<pharos-button
          class="card__button"
          icon="ellipses-vertical"
          variant="subtle"
          icon-condensed
          label="More actions"
          @click=${this._handleClick}
        ></pharos-button>`
      : nothing;
  }

  protected render(): TemplateResult {
    return html`<div class="card">
      ${this._renderImage()}
      <div class="card__container--title">${this.renderTitle} ${this._renderActionButton()}</div>
      ${this.subtle
        ? nothing
        : html`<div class="card__metadata"><slot name="metadata"></slot></div>`}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-image-card': PharosImageCard;
  }
}
