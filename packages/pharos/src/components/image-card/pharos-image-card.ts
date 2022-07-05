import { PharosElement } from '../base/pharos-element';
import { html, nothing } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { state } from 'lit/decorators.js';
import { property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import type { TemplateResult, CSSResultArray, PropertyValues } from 'lit';
import { imageCardStyles } from './pharos-image-card.css';
import type { PharosDropdownMenu } from '../dropdown-menu/pharos-dropdown-menu';

import type { HeadingLevel, HeadingPreset } from '../heading/pharos-heading';
export type { HeadingLevel };

import FocusMixin from '../../utils/mixins/focus';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { PharosHeading } from '../heading/pharos-heading';
import { PharosLink } from '../link/pharos-link';
import { PharosIcon } from '../icon/pharos-icon';
import { PharosButton } from '../button/pharos-button';
import { PharosCheckbox } from '../checkbox/pharos-checkbox';

export type ImageCardVariant =
  | 'base'
  | 'collection'
  | 'promotional'
  | 'selectable'
  | 'selectable-collection';

const VARIANTS = ['base', 'collection', 'promotional', 'selectable', 'selectable-collection'];

const DEFAULT_HEADING_LEVEL = 3;

/**
 * Pharos image card component.
 *
 * @tag pharos-image-card
 *
 * @slot image - Contains the image to display on the card.
 * @slot metadata - Contains the metadata for the item.
 * @slot title - Contains the title for the item (renders if title prop is not set).
 * @slot action-button - Contains the action-button for the item (renders if action-menu prop is not set).
 *
 */
export class PharosImageCard extends ScopedRegistryMixin(FocusMixin(PharosElement)) {
  static elementDefinitions = {
    'pharos-heading': PharosHeading,
    'pharos-link': PharosLink,
    'pharos-icon': PharosIcon,
    'pharos-button': PharosButton,
    'pharos-checkbox': PharosCheckbox,
  };

  /**
   * Indicates the title of the item presented in the card.
   * @attr title
   */
  @property({ type: String, reflect: true })
  public override title = '';

  /**
   * Indicates the item type of the source content represented by the card.
   * @attr source-type
   */
  @property({ type: String, reflect: true, attribute: 'source-type' })
  public sourceType?: string;

  /**
   * Indicates the link to apply to the title and image.
   * @attr link
   */
  @property({ type: String, reflect: true })
  public link = '';

  /**
   * Indicates the label to apply to the image link.
   * @attr image-link-label
   */
  @property({ type: String, reflect: true, attribute: 'image-link-label' })
  public imageLinkLabel?: string;

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

  /**
   * The heading level to use for the card title when using the title property.
   * @attr heading-level
   * @type {HeadingLevel | undefined}
   */
  @property({ type: Number, reflect: true, attribute: 'heading-level' })
  public headingLevel?: HeadingLevel;

  /**
   * Indicates subtler styling for the selectable card variant and that the card is only selectable by click on the checkbox.
   * @attr subtle-select
   */
  @property({ type: Boolean, reflect: true, attribute: 'subtle-select' })
  public subtleSelect?: boolean;

  /**
   * Indicates if the image card is selected
   * @attr selected
   */
  @property({ type: Boolean, reflect: true, attribute: 'selected' })
  public _isSelected = false;

  @state()
  private _isHovered = false;

  @query('.card__link--title')
  private _title!: PharosLink;

  public static override get styles(): CSSResultArray {
    return [imageCardStyles];
  }

  protected override update(changedProperties: PropertyValues): void {
    super.update && super.update(changedProperties);

    if (changedProperties.has('variant') && this.variant && !VARIANTS.includes(this.variant)) {
      throw new Error(
        `${this.variant} is not a valid variant. Valid variants are: ${VARIANTS.join(', ')}`
      );
    }

    if (
      changedProperties.has('subtleSelect') &&
      this.subtleSelect &&
      !this.variant.includes('selectable')
    ) {
      throw new Error(
        `${this.variant} is not a valid variant to use with subtle-select. Only the selectable variant can be used with subtle-select.}`
      );
    }

    if (this.selected && this.variant !== 'selectable') {
      throw new Error(
        `Image card with variant type ${
          this.variant ? this.variant : 'base'
        } cannot be selected. Only the selectable variant can be selected.}`
      );
    }
  }

  private _handleClick(e: MouseEvent): void {
    const trigger = e.target as PharosButton;
    const menu: PharosDropdownMenu | null = document.querySelector(
      `[data-pharos-component="PharosDropdownMenu"]#${this.actionMenu}`
    );
    menu?.openWithTrigger(trigger);
  }

  private _handleImageMouseEnter(): void {
    this._title['_hover'] = true;
    this._handleMouseEnterSelectable();

    const mouseEvent = new CustomEvent('pharos-image-card-image-mouseenter');
    this.dispatchEvent(mouseEvent);
  }

  private _handleImageMouseLeave(): void {
    this._title['_hover'] = false;
    this._handleMouseLeaveSelectable();

    const mouseEvent = new CustomEvent('pharos-image-card-image-mouseleave');
    this.dispatchEvent(mouseEvent);
    this._renderCheckbox();
  }

  private _handleMouseEnterSelectable(): void {
    this._isHovered = true;
  }

  private _handleMouseLeaveSelectable(): void {
    this._isHovered = false;
  }

  private _renderCollectionImage(): TemplateResult {
    return html`<pharos-link
      class=${classMap({
        [`card__link--collection`]: true,
        [`card__selectable`]: this._isSubtleSelectHover() || this._isSelectableViaCard(),
        [`card__selected`]: this._isSelected,
        [`card__selectable-card-hover`]: this._isSelectableCardHover(),
      })}
      href="${this.link}"
      label="${ifDefined(this.imageLinkLabel)}"
      subtle
      flex
      no-hover
      @mouseenter=${this._handleImageMouseEnter}
      @mouseleave=${this._handleImageMouseLeave}
      @click=${this._cardToggleSelect}
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
      class=${classMap({
        [`card__link--image`]: true,
        [`card__selectable`]: this._isSubtleSelectHover() || this._isSelectableViaCard(),
        [`card__selected`]: this._isSelected,
        [`card__selectable-card-hover`]: this._isSelectableCardHover(),
      })}
      href="${this.link}"
      label=${ifDefined(this.imageLinkLabel)}
      subtle
      flex
      no-hover
      @mouseenter=${this._handleImageMouseEnter}
      @mouseleave=${this._handleImageMouseLeave}
      @click=${this._cardToggleSelect}
      >${this._renderLinkContent()}${this._renderHoverMetadata()} <slot name="overlay"></slot
    ></pharos-link>`;
  }

  private _renderImage(): TemplateResult {
    // TODO: Refactor with _renderCollectionImage and _renderBaseImage when Playwright/Webkit is updated
    return this.variant.includes('collection')
      ? this._renderCollectionImage()
      : this._renderBaseImage();
  }

  private _chooseHeadingPreset(): HeadingPreset {
    return {
      collection: '2',
      'selectable-collection': '2',
      promotional: '4',
      base: '1--bold',
      selectable: '1--bold',
    }[this.variant] as HeadingPreset;
  }

  protected get renderTitle(): TemplateResult {
    return html`<pharos-link
      class="card__link--title"
      href="${this.link}"
      @click=${this._cardToggleSelect}
      subtle
      flex
      >${this.title
        ? html`<pharos-heading
            class="card__heading"
            preset="${this._chooseHeadingPreset()}"
            level="${this.headingLevel || DEFAULT_HEADING_LEVEL}"
            no-margin
            >${this.title}</pharos-heading
          >`
        : html`<slot name="title"></slot>`}
    </pharos-link>`;
  }

  private _renderActionButton(): TemplateResult {
    return this.actionMenu
      ? html`<pharos-button
          class="card__action-button"
          icon="ellipses-vertical"
          variant="subtle"
          icon-condensed
          label="More actions"
          @click=${this._handleClick}
        ></pharos-button>`
      : html`<slot name="action-button"></slot>`;
  }

  private _renderSourceType(): TemplateResult | typeof nothing {
    return this.sourceType
      ? html`<div class="card__source-type">${this.sourceType}</div>`
      : nothing;
  }

  private _renderMetadata(): TemplateResult | typeof nothing {
    return this.subtle
      ? nothing
      : html`<div class="card__metadata">
          <slot name="metadata"></slot>
        </div>`;
  }

  protected override render(): TemplateResult {
    return html`<div class="card">
      ${this._renderCheckbox()} ${this._renderImage()} ${this._renderSourceType()}
      <div
        class="card__title"
        @mouseenter=${this._handleMouseEnterSelectable}
        @mouseleave=${this._handleMouseLeaveSelectable}
      >
        ${this.renderTitle} ${this._renderActionButton()}
      </div>
      ${this._renderMetadata()}
    </div>`;
  }

  private _cardToggleSelect(event: Event): void {
    if (this._isSelectableViaCard() || (event.target as Element)?.nodeName == 'PHAROS-CHECKBOX') {
      // this is required to prevent navigation on the link click
      event.preventDefault();
      this._isSelected = !this._isSelected;
      this.dispatchEvent(
        new CustomEvent('pharos-image-card-selected', {
          bubbles: true,
          composed: true,
          detail: {
            event,
            cardSelected: this._isSelected,
          },
        })
      );
    }
  }

  private _isSubtleSelectHover(): boolean {
    return Boolean(this.variant.includes('selectable') && this._isHovered && this.subtleSelect);
  }

  private _isSelectableCardHover(): boolean {
    return Boolean(this._isSelectableViaCard() && this._isHovered);
  }

  private _isSelectableViaCard(): boolean {
    return Boolean(this.variant == 'selectable' && !this.subtleSelect);
  }

  private _renderCheckbox(): TemplateResult | typeof nothing {
    return this._isSubtleSelectHover() || this._isSelectableViaCard()
      ? html`<pharos-checkbox
          class="card__selector"
          ?checked=${this._isSelected}
          @mouseenter=${this._handleMouseEnterSelectable}
          @mouseleave=${this._handleMouseLeaveSelectable}
          @click="${this._cardToggleSelect}"
        ></pharos-checkbox>`
      : nothing;
  }
}
