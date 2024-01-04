import { PharosElement } from '../base/pharos-element';
import { html, nothing } from 'lit';
import { property, state, query } from 'lit/decorators.js';
import type { PropertyValues, TemplateResult, CSSResultArray } from 'lit';
import { carouselStyles } from './pharos-carousel.css';

import FocusMixin from '../../utils/mixins/focus';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { PharosButton } from '../button/pharos-button';
import { PharosHeading } from '../heading/pharos-heading';
import { PharosLink } from '../link/pharos-link';

/**
 * Pharos carousel component
 *
 * @tag pharos-carousel
 *
 * @slot item - items for carousel to scroll through
 */
export class PharosCarousel extends ScopedRegistryMixin(FocusMixin(PharosElement)) {
  static elementDefinitions = {
    'pharos-button': PharosButton,
    'pharos-heading': PharosHeading,
    'pharos-link': PharosLink,
  };

  @query('#slider')
  private _slider!: HTMLElement;

  /**
   * Indicates how many items should be shown in carousel at a time
   * @attr perView
   */
  @property({ type: Number, reflect: true, attribute: 'per-view' })
  public perView = 1;

  /**
   * String to render as header
   * @attr header
   */
  @property({ type: String, reflect: true })
  public heading?: string;

  /**
   * String to render as description
   * @attr description
   */
  @property({ type: String, reflect: true })
  public description?: string;

  /**
   * HREF to view all
   * @attr view-all-link
   */
  @property({ type: String, reflect: true })
  public viewAllLink?: string;

  @state()
  public _carouselWidth = 0;

  private get _items(): HTMLElement[] {
    return [...this.children].filter((child) => child.slot === 'item') as HTMLElement[];
  }

  protected override firstUpdated(): void {
    this._carouselWidth = parseInt(window.getComputedStyle(this).getPropertyValue('width'));
    this._items.forEach(
      (item: HTMLElement) => (item.style.flexBasis = `${this._carouselWidth / this.perView}px`)
    );
  }

  public static override get styles(): CSSResultArray {
    return [carouselStyles];
  }

  protected override update(changedProperties: PropertyValues): void {
    super.update && super.update(changedProperties);
  }

  private next(): void {
    this._slider?.scrollBy(this._carouselWidth, 0);
  }
  private previous(): void {
    this._slider?.scrollBy(-this._carouselWidth, 0);
  }

  private _renderViewAll(): TemplateResult | typeof nothing {
    return this.viewAllLink
      ? html` <pharos-link href="${this.viewAllLink}">View all</pharos-link> `
      : nothing;
  }

  private _renderHeading(): TemplateResult | typeof nothing {
    return this.heading
      ? html` <pharos-heading level="2" preset="3">${this.heading}</pharos-heading> `
      : nothing;
  }

  private _renderDescription(): TemplateResult | typeof nothing {
    return this.heading ? html` <span>${this.description}</span> ` : nothing;
  }

  private _renderHeadingDescription(): TemplateResult | typeof nothing {
    if (!this.heading && !this.description) {
      return nothing;
    }

    return html` <div>${this._renderHeading()} ${this._renderDescription()}</div> `;
  }

  protected override render(): TemplateResult {
    return html`
      <div>
        <div class="heading">
          ${this._renderHeadingDescription()}
          <div class="actions">
            ${this._renderViewAll()}
            <pharos-button
              type="button"
              variant="secondary"
              icon="chevron-left"
              label="previous"
              @click=${this.previous}
            ></pharos-button>
            <pharos-button
              type="button"
              variant="secondary"
              icon="chevron-right"
              label="next"
              @click=${this.next}
            ></pharos-button>
          </div>
        </div>
        <div id="slider" class="slider">
          <slot name="item"></slot>
        </div>
      </div>
    `;
  }
}
