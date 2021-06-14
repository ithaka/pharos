import { html, LitElement, nothing } from 'lit';
import { property, query } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray, PropertyValues } from 'lit';
import { imageCardStyles } from './pharos-image-card.css';
import { customElement } from '../../utils/decorators';

import type { PharosButton } from '../button/pharos-button';
import type { PharosDropdownMenu } from '../dropdown-menu/pharos-dropdown-menu';
import type { PharosLink } from '../link/pharos-link';

import '../heading/pharos-heading';
import '../link/pharos-link';
import '../icon/pharos-icon';
import '../button/pharos-button';

export type ImageCardVariant = 'base' | 'collection';

const VARIANTS = ['base', 'collection'];

/**
 * Pharos image card component.
 *
 * @element pharos-image-card
 *
 * @slot image - Contains the image to display on the card.
 * @slot metadata - Contains the metadata for the item.
 *
 */
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
   * Indicates the variant of card.
   * @attr variant
   */
  @property({ type: String, reflect: true })
  public variant: ImageCardVariant = 'base';

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

  @query('.card__link--title')
  private _title!: PharosLink;

  public static get styles(): CSSResultArray {
    return [imageCardStyles];
  }

  protected update(changedProperties: PropertyValues): void {
    super.update && super.update(changedProperties);

    if (changedProperties.has('variant') && this.variant && !VARIANTS.includes(this.variant)) {
      throw new Error(
        `${this.variant} is not a valid variant. Valid variants are: ${VARIANTS.join(', ')}`
      );
    }
  }

  private _handleClick(e: MouseEvent): void {
    const trigger = e.target as PharosButton;
    const menu: PharosDropdownMenu | null = document.querySelector(
      `pharos-dropdown-menu#${this.actionMenu}`
    );
    menu?.openWithTrigger(trigger);
  }

  private _handleImageHover(event: Event): void {
    this._title['_hover'] = event.type === 'mouseenter';
  }

  private _renderCollectionImage(): TemplateResult {
    return html`<pharos-link
      class="card__link--collection"
      href="${this.link}"
      subtle
      flex
      no-hover
      @mouseenter=${this._handleImageHover}
      @mouseleave=${this._handleImageHover}
      ><svg class="card__svg" role="presentation" viewBox="0 0 4 3"></svg> <slot name="image"></slot
    ></pharos-link>`;
  }

  private _renderLinkContent(): TemplateResult {
    return this.error
      ? html`<div class="card__container--error">
          <pharos-icon name="exclamation-inverse"></pharos-icon>
          <span class="unavailable-text">Preview not available</span>
        </div>`
      : html`<slot name="image"></slot>`;
  }

  private _renderHoverMetadata(): TemplateResult | typeof nothing {
    return this.subtle
      ? html`<div class="card__metadata--hover">
          <strong class="card__title--hover">${this.title}</strong><slot name="metadata"></slot>
        </div>`
      : nothing;
  }

  private _renderBaseImage(): TemplateResult {
    return html`<pharos-link
      class="card__link--image"
      href="${this.link}"
      subtle
      flex
      no-hover
      @mouseenter=${this._handleImageHover}
      @mouseleave=${this._handleImageHover}
      >${this._renderLinkContent()}${this._renderHoverMetadata()}</pharos-link
    >`;
  }

  private _renderImage(): TemplateResult {
    // TODO: Refactor with _renderCollectionImage and _renderBaseImage when Playwright/Webkit is updated
    return this.variant === 'collection' ? this._renderCollectionImage() : this._renderBaseImage();
  }

  protected get renderTitle(): TemplateResult {
    return html`<pharos-link class="card__link--title" href="${this.link}" subtle flex
      ><pharos-heading
        class="card__heading"
        preset="${this.variant === 'collection' ? '2' : '1--bold'}"
        level="3"
        no-margin
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

  private _renderMetadata(): TemplateResult | typeof nothing {
    return this.subtle
      ? nothing
      : html`<div class="card__metadata">
          <slot name="metadata"></slot>
        </div>`;
  }

  protected render(): TemplateResult {
    return html`<div class="card">
      ${this._renderImage()}
      <div class="card__title">${this.renderTitle} ${this._renderActionButton()}</div>
      ${this._renderMetadata()}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-image-card': PharosImageCard;
  }
}
