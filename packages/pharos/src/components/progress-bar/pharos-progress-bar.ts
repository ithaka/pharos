import { html, LitElement, property } from 'lit-element';
import type { TemplateResult, CSSResultArray } from 'lit-element';
import { progressBarStyles } from './pharos-progress-bar.css';
import { customElement } from '../../utils/decorators';
import { styleMap } from 'lit-html/directives/style-map.js';
import { PharosColorGlacierBlueBase, PharosColorNightBlueBase } from '../../styles/variables';

/**
 * Pharos progress bar component.
 *
 * @element pharos-progress-bar
 *
 * @slot title - Contains the title of what the progress bar pertains to.
 * @slot description - Contains additional text content to display below the bar.
 *
 */
@customElement('pharos-progress-bar')
export class PharosProgressBar extends LitElement {
  /**
   * Indicates the value for the progress bar.
   * @attr value
   */
  @property({ type: Number, reflect: true })
  public value = 0;

  public static get styles(): CSSResultArray {
    return [progressBarStyles];
  }

  protected render(): TemplateResult {
    return html`
      <div id="title" class="progress-bar__title"><slot name="title"></slot></div>
      <div
        role="progressbar"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow=${this.value}
        aria-labelledby="title"
        class="progress-bar__wrapper"
      >
        <div
          class="progress-bar"
          style=${styleMap({
            background: `linear-gradient(
              to right,
              ${PharosColorGlacierBlueBase} ${this.value < 35 ? '100%' : 135 - this.value + '%'},
              ${PharosColorNightBlueBase}
            )`,
            width: `${this.value}%`,
          })}
        ></div>
      </div>
      <div class="progress-bar__description">
        <slot name="description"></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-progress-bar': PharosProgressBar;
  }
}
