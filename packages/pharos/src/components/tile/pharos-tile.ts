import { html, nothing } from 'lit';
import { property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import checkmarkSmall from '../../styles/icons/checkmark-small';
import type { TemplateResult, CSSResultArray, PropertyValues } from 'lit';
import { tileStyles } from './pharos-tile.css';

import { FormElement } from '../base/form-element';
import FormMixin from '../../utils/mixins/form';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { PharosHeading } from '../heading/pharos-heading';
import type { HeadingLevel } from '../heading/pharos-heading';
import { PharosIcon } from '../icon/pharos-icon';
import type { IconName } from '../icon/pharos-icon';
export type { HeadingLevel, IconName };

export type TileSelection = 'single' | 'multiple';

export const TILE_STATE_CHANGE_EVENT = 'pharos-tile-state-change';

const DEFAULT_HEADING_LEVEL = 3 as HeadingLevel;

/**
 * Pharos tile component.
 *
 * A tile is a single click target for either navigation (when `href` is set) or selection
 * (when placed within a `pharos-tile-group`).
 *
 * @tag pharos-tile
 *
 * @slot header - Contains the content of a header row above the title, such as an icon on its own line. The label shares this row, aligned right.
 * @slot label - Contains custom label content, such as an icon, aligned to the top right (renders if label prop is not set).
 * @slot title - Contains the title for the tile (renders if title prop is not set).
 * @slot - Contains the description for the tile (renders if description prop is not set).
 * @slot footer - Contains the footer content of the tile, such as status text.
 *
 * @fires change - Fires when the selected state has changed (selection tiles only)
 */
export class PharosTile extends ScopedRegistryMixin(FormMixin(FormElement)) {
  static elementDefinitions = {
    'pharos-heading': PharosHeading,
    'pharos-icon': PharosIcon,
  };

  /**
   * Indicates the title of the tile.
   * @attr title
   */
  @property({ type: String, reflect: true })
  public override title = '';

  /**
   * Indicates the description of the tile.
   * @attr description
   */
  @property({ type: String, reflect: true })
  public description = '';

  /**
   * Indicates the name of the icon to show in the header.
   * @attr icon
   * @type {IconName | undefined}
   */
  @property({ type: String, reflect: true })
  public icon?: IconName;

  /**
   * Indicates the text of the label, aligned to the top right of the tile.
   * @attr label
   */
  @property({ type: String, reflect: true })
  public label?: string;

  /**
   * The heading level to use for the title.
   * @attr heading-level
   * @type {HeadingLevel | undefined}
   */
  @property({ type: Number, reflect: true, attribute: 'heading-level' })
  public headingLevel?: HeadingLevel;

  /**
   * Indicates the URL the tile navigates to, making it a link tile.
   * @attr href
   */
  @property({ type: String, reflect: true })
  public href?: string;

  /**
   * Indicates where to display the linked URL.
   * @attr target
   */
  @property({ type: String, reflect: true })
  public target?: string;

  /**
   * Indicates the relationship of the linked URL to the current page.
   * @attr rel
   */
  @property({ type: String, reflect: true })
  public rel?: string;

  /**
   * Indicates to save the linked URL instead of navigating to it.
   * @attr download
   */
  @property({ type: String, reflect: true })
  public download?: string;

  /**
   * Hides the trailing arrow or selection indicator. Selection is still shown through the tile border.
   * @attr hide-indicator
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-indicator' })
  public hideIndicator = false;

  /**
   * Indicates the value of the tile when used in a tile group.
   * @attr value
   */
  @property({ type: String, reflect: true })
  public value = '';

  /**
   * Indicates if the tile is selected.
   * @attr selected
   */
  @property({ type: Boolean, reflect: true })
  public selected = false;

  /**
   * Indicates the type of selection. Set by the parent tile group; makes the tile a selection tile.
   * @attr selection
   * @type {TileSelection | undefined}
   */
  @property({ type: String, reflect: true })
  public selection?: TileSelection;

  /**
   * Indicates if the selection input is part of the tab order. Managed by the parent tile group.
   * @attr focusable
   */
  @property({ type: Boolean, attribute: false })
  public focusable = true;

  @query('#tile-input')
  private _input?: HTMLInputElement;

  public static override get styles(): CSSResultArray {
    return [super.styles, tileStyles];
  }

  private _observer?: MutationObserver;

  override connectedCallback(): void {
    super.connectedCallback();

    // Slotted content decides which sections render, so re-render when it changes
    this._observer = new MutationObserver(() => this.requestUpdate());
    this._observer.observe(this, {
      childList: true,
      characterData: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['slot'],
    });
  }

  override disconnectedCallback(): void {
    this._observer?.disconnect();
    super.disconnectedCallback();
  }

  protected override firstUpdated(): void {
    if (this._input) {
      this._input.defaultChecked = this.selected;
    }
  }

  protected override updated(changedProperties: PropertyValues): void {
    super.updated(changedProperties);

    if (changedProperties.has('selection') && this._input) {
      this._input.defaultChecked = this.selected;
    }

    // Lets a parent tile group keep its tab stop and selection in step with direct changes
    if (changedProperties.has('selected') || changedProperties.has('disabled')) {
      this.dispatchEvent(new Event(TILE_STATE_CHANGE_EVENT, { bubbles: true }));
    }
  }

  /**
   * Selects the tile and moves focus to it. Used by the tile group for keyboard navigation.
   */
  public select(): void {
    this._input?.click();
    this._input?.focus();
  }

  private get _isSelectable(): boolean {
    return !!this.selection;
  }

  private get _isLink(): boolean {
    return !this._isSelectable && (!!this.href || (this.disabled && this.hasAttribute('href')));
  }

  private _handleChange(): void {
    if (!this._input) return;
    this.selected = this._input.checked;

    this.dispatchEvent(
      new Event('change', {
        bubbles: true,
        composed: true,
      })
    );
  }

  _handleFormdata(event: CustomEvent): void {
    const { formData } = event;
    if (this._isSelectable && !this.disabled && this.selected && this.name) {
      formData.append(this.name, this.value);
    }
  }

  _handleFormReset(): void {
    if (this._input) {
      this.selected = this._input.defaultChecked;
    }
  }

  private _hasSlot(name?: string): boolean {
    if (name) {
      return [...this.children].some((child) => child.slot === name);
    }
    return [...this.childNodes].some(
      (node) =>
        (node.nodeType === Node.ELEMENT_NODE && !(node as Element).slot) ||
        (node.nodeType === Node.TEXT_NODE && !!node.textContent?.trim())
    );
  }

  private _renderIcon(): TemplateResult | typeof nothing {
    return this.icon
      ? html`<pharos-icon class="tile__icon" name=${this.icon} a11y-hidden="true"></pharos-icon>`
      : nothing;
  }

  private get _hasLabel(): boolean {
    return !!this.label || this._hasSlot('label');
  }

  private _renderLabel(): TemplateResult | typeof nothing {
    return this._hasLabel
      ? html`<span class="tile__label"
          >${this.label ? this.label : html`<slot name="label"></slot>`}</span
        >`
      : nothing;
  }

  // With header slot content the label joins the header row, otherwise it joins the title row.
  private _renderHeader(): TemplateResult | typeof nothing {
    return this._hasSlot('header')
      ? html`<div class="tile__header"><slot name="header"></slot>${this._renderLabel()}</div>`
      : nothing;
  }

  private _renderTitleContent(): TemplateResult {
    return html`${this.title ? this.title : html`<slot name="title"></slot>`}`;
  }

  private _renderTitle(): TemplateResult {
    const content = this._renderTitleContent();

    const heading = html`<pharos-heading
      id="title"
      class="tile__title"
      preset="2"
      level=${this.headingLevel || DEFAULT_HEADING_LEVEL}
      no-margin
      >${
        this._isLink
          ? html`<a
              class="tile__link"
              href=${ifDefined(this.disabled ? undefined : this.href)}
              target=${ifDefined(this.target)}
              rel=${ifDefined(this.rel)}
              download=${ifDefined(this.download)}
              role=${ifDefined(this.disabled ? 'link' : undefined)}
              aria-disabled=${ifDefined(this.disabled ? 'true' : undefined)}
              aria-describedby="description"
              >${content}</a
            >`
          : content
      }</pharos-heading
    >`;

    const showLabel = this._hasLabel && !this._hasSlot('header');

    return this.icon || showLabel
      ? html`<div class="tile__title-row">
          ${this._renderIcon()} ${heading} ${showLabel ? this._renderLabel() : nothing}
        </div>`
      : heading;
  }

  private _renderIndicator(): TemplateResult | typeof nothing {
    if (this.hideIndicator) return nothing;

    if (this._isLink) {
      return html`<pharos-icon
        class="tile__arrow"
        name="arrow-right"
        a11y-hidden="true"
      ></pharos-icon>`;
    }

    if (!this._isSelectable) return nothing;

    return this.selection === 'multiple'
      ? html`<svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          class="tile__indicator tile__indicator--checkbox input__icon"
          role="img"
          aria-hidden="true"
          focusable="false"
        >
          <rect x="3" y="3" width="18" height="18" rx="3" class="focus" />
          <rect x="4" y="4" width="16" height="16" rx="2" class="box" />
          <rect x="5" y="5" width="14" height="14" rx="1" class="hover" />
          <svg x="4" y="4" class="checkmark">${unsafeSVG(atob(checkmarkSmall))}</svg>
        </svg>`
      : html`<svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          class="tile__indicator tile__indicator--radio input__icon"
          role="img"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="50%" cy="50%" r="9" class="focus" />
          <circle cx="50%" cy="50%" r="8" class="outer" />
          <circle cx="50%" cy="50%" r="7" class="hover" />
          <circle cx="50%" cy="50%" r="5" class="inner" />
        </svg>`;
  }

  private _renderFooter(): TemplateResult | typeof nothing {
    const indicator = this._renderIndicator();
    if (indicator === nothing && !this._hasSlot('footer')) return nothing;

    return html`<div class="tile__footer">
      <div class="tile__footer-content"><slot name="footer"></slot></div>
      ${indicator}
    </div>`;
  }

  private _renderInput(): TemplateResult | typeof nothing {
    return this._isSelectable
      ? html`<input
          id="tile-input"
          class="tile__input"
          type=${this.selection === 'multiple' ? 'checkbox' : 'radio'}
          name=${this.name}
          .value=${this.value}
          .checked=${this.selected}
          ?required=${this.required}
          ?disabled=${this.disabled}
          tabindex=${this.focusable ? '0' : '-1'}
          aria-labelledby="title"
          aria-describedby="description"
          @change=${this._handleChange}
        />`
      : nothing;
  }

  protected override render(): TemplateResult {
    return html`
      ${this._renderInput()}
      <div class="tile">
        ${this._renderHeader()} ${this._renderTitle()}
        ${
          this.description || this._hasSlot()
            ? html`<div id="description" class="tile__description">
                ${this.description ? this.description : html`<slot></slot>`}
              </div>`
            : nothing
        }
        ${this._renderFooter()}
      </div>
    `;
  }
}
