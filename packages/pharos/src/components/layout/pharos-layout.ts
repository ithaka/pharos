import { PharosElement } from '../base/pharos-element';
import { html } from 'lit';
import { property, query } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray, PropertyValues } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { layoutStyles } from './pharos-layout.css';
import { PharosSpacingThreeAndAHalfX } from '../../styles/variables';

export type LayoutPreset = '1-col' | '1-col--sidenav' | '1-col--sidenav-comfy' | '2-col';

const PRESETS = ['1-col', '1-col--sidenav', '1-col--sidenav-comfy', '2-col'];

/**
 * Pharos layout component.
 *
 * @slot top - Content to be shown above the inner grid.
 * @slot - Content to be shown within the inner grid (the default slot).
 *
 */
export class PharosLayout extends PharosElement {
  componentName = 'PharosLayout';

  /**
   * Indicates the type of layout to use.
   * @attr preset
   */
  @property({ type: String, reflect: true })
  public preset: LayoutPreset = '1-col';

  /**
   * Indicates the areas to use for the inner grid.
   * @attr areas
   */
  @property({ type: String, reflect: true })
  public areas = '';

  /**
   * Indicates the rows to use for the inner grid.
   * @attr rows
   */
  @property({ type: String, reflect: true })
  public rows = '';

  /**
   * Indicates the row gap to use for the inner grid.
   * @attr row-gap
   * @type {string}
   */
  @property({ type: String, reflect: true, attribute: 'row-gap' })
  public rowGap = PharosSpacingThreeAndAHalfX;

  /**
   * Indicates the HTML tag to use for the inner grid.
   * @attr tag
   */
  @property({ type: String, reflect: true })
  public tag = 'div';

  @query('.layout')
  private _layout!: HTMLElement;

  public static override get styles(): CSSResultArray {
    return [layoutStyles];
  }

  protected override update(changedProperties: PropertyValues): void {
    super.update && super.update(changedProperties);

    if (changedProperties.has('preset') && !PRESETS.includes(this.preset)) {
      throw new Error(
        `${this.preset} is not a valid preset.
        Available presets are ${PRESETS.join(', ')}.`
      );
    }
  }

  protected override updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('areas')) {
      this._layout.style.gridTemplateAreas = this.areas;
    }
    if (changedProperties.has('rows')) {
      this._layout.style.gridTemplateRows = this.rows;
    }
    if (changedProperties.has('rowGap')) {
      this._layout.style.rowGap = this.rowGap;
    }
  }

  protected override render(): TemplateResult {
    const template = `<slot name="top"></slot><${this.tag} id="layout-container" class="layout"><slot></slot></${this.tag}>`;
    return html`${unsafeHTML(template)}`;
  }
}
