import { html, LitElement, property } from 'lit-element';
import type { TemplateResult, CSSResultArray } from 'lit-element';
import { styleMap } from 'lit-html/directives/style-map.js';
import { gridStyles } from './pharos-grid.css';
import { designTokens } from '../../styles/variables.css';
import { customElement } from '../../utils/decorators';

export type GridLayout = '1-col' | '1-col--sidenav' | '2-col';

/**
 * Pharos grid component.
 *
 * @element pharos-grid
 *
 * @slot top - Content to be shown above the grid.
 * @slot - Content to be shown within the grid (the default slot).
 *
 */
@customElement('pharos-grid')
export class PharosGrid extends LitElement {
  /**
   * Indicates the layout to use.
   * @attr layout
   */
  @property({ type: String, reflect: true })
  public layout: GridLayout = '1-col';

  /**
   * Indicates the grid areas to use for the grid.
   * @attr areas
   */
  @property({ type: String, reflect: true })
  public areas = '';

  /**
   * Indicates the grid rows to use for the grid.
   * @attr rows
   */
  @property({ type: String, reflect: true })
  public rows = '';

  public static get styles(): CSSResultArray {
    return [designTokens, gridStyles];
  }

  protected render(): TemplateResult {
    return html`<slot name="top"></slot>
      <div
        class="grid"
        style=${styleMap({
          gridTemplateAreas: this.areas,
          gridTemplateRows: this.rows,
        })}
      >
        <slot></slot>
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-grid': PharosGrid;
  }
}
