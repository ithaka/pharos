import { PharosElement } from '../base/pharos-element';
import { html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray } from 'lit';
import { progressBarStyles } from './pharos-progress-bar.css';
import { styleMap } from 'lit/directives/style-map.js';
import { PharosColorGlacierBlueBase, PharosColorNightBlueBase } from '../../styles/variables';

export type ProgressBarVariant = 'default' | 'indeterminate';

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

    /**
   * Indicates the variant of progress bar.
   * @attr variant
   */
    @property({ type: String, reflect: true })
    public variant: ProgressBarVariant = 'default';

  public static override get styles(): CSSResultArray {
    return [progressBarStyles];
  }

  protected override render(): TemplateResult {
    const progressStyle =
    this.variant === 'default'
      ? styleMap({
          background: `linear-gradient(
            to right,
            ${PharosColorGlacierBlueBase} ${this.value < 35 ? '100%' : 135 - this.value + '%'},
            ${PharosColorNightBlueBase}
          )`,
          width: `${this.value}%`,
        })
      : nothing;

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
          class="${this.variant === 'indeterminate' ? 'progress-bar-indeterminate' : 'progress-bar'}"
          style=${progressStyle}
        ></div>
      </div>
      <div class="progress-bar__description">
        <slot name="description"></slot>
      </div>
    `;
  }
}
