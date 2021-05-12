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
   * Indicates the grid areas to use for the content grid.
   * @attr areas
   */
  @property({ type: String, reflect: true })
  public areas = '';

  /**
   * Indicates the layout to use.
   * @attr layout
   */
  @property({ type: String, reflect: true })
  public layout: GridLayout = '1-col';

  public static get styles(): CSSResultArray {
    return [designTokens, gridStyles];
  }

  protected render(): TemplateResult {
    return html`<slot name="top"></slot>
      <div class="grid" style=${styleMap(this.areas ? { gridTemplateAreas: `${this.areas}` } : {})}>
        <slot></slot>
      </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-grid': PharosGrid;
  }
}
