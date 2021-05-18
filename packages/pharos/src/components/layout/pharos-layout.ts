import { html, LitElement, property } from 'lit-element';
import type { TemplateResult, CSSResultArray, PropertyValues } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map.js';
import { layoutStyles } from './pharos-layout.css';
import { designTokens } from '../../styles/variables.css';
import { customElement } from '../../utils/decorators';
import { PharosSpacingThreeAndAHalfX } from '../../styles/variables';

export type LayoutPreset = '1-col' | '1-col--sidenav' | '2-col';

const PRESETS = ['1-col', '1-col--sidenav', '2-col'];

/**
 * Pharos layout component.
 *
 * @element pharos-layout
 *
 * @slot top - Content to be shown above the inner grid.
 * @slot - Content to be shown within the inner grid (the default slot).
 *
 */
@customElement('pharos-layout')
export class PharosLayout extends LitElement {
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
   */
  @property({ type: String, reflect: true, attribute: 'row-gap' })
  public rowGap = PharosSpacingThreeAndAHalfX;

  public static get styles(): CSSResultArray {
    return [designTokens, layoutStyles];
  }

  protected update(changedProperties: PropertyValues): void {
    super.update && super.update(changedProperties);

    if (changedProperties.has('preset') && !PRESETS.includes(this.preset)) {
      throw new Error(
        `${this.preset} is not a valid preset.
        Available presets are ${PRESETS.join(', ')}.`
      );
    }
  }

  protected render(): TemplateResult {
    return html`<slot name="top"></slot>
      <div
        class="layout"
        style=${styleMap({
          gridTemplateAreas: this.areas,
          gridTemplateRows: this.rows,
          rowGap: this.rowGap,
        })}
      >
        <slot></slot>
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-layout': PharosLayout;
  }
}
