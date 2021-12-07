import { PharosElement } from '../base/pharos-element';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray } from 'lit';
import { progressBarStyles } from './pharos-progress-bar.css';
import { styleMap } from 'lit/directives/style-map.js';
import { PharosColorGlacierBlueBase, PharosColorNightBlueBase } from '../../styles/variables';

/**
 * Pharos progress bar component.
 *
 * @tag pharos-progress-bar
 *
 * @slot title - Contains the title of what the progress bar pertains to.
 * @slot description - Contains additional text content to display below the bar.
 *
 */
export class PharosProgressBar extends PharosElement {
  /**
   * Indicates the value for the progress bar.
   * @attr value
   */
  @property({ type: Number, reflect: true })
  public value = 0;

  public static override get styles(): CSSResultArray {
    return [progressBarStyles];
  }

  protected override render(): TemplateResult {
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
