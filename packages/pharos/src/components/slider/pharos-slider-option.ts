import { html } from 'lit';
import { property } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray } from 'lit';
import { sliderOptionStyles } from './pharos-slider-option.css';

import { PharosElement } from '../base/pharos-element';

/**
 * Pharos slider option component. Defines a stop on its parent slider, displayed below the track.
 *
 * @tag pharos-slider-option
 *
 * @slot - Contains the label of the option.
 * @slot description - Contains supporting text displayed below the label.
 */
export class PharosSliderOption extends PharosElement {
  /**
   * The numeric value of the option. Must fall within the range of its slider, on a step.
   * @attr value
   */
  @property({ type: Number, reflect: true })
  public value?: number;

  /**
   * Indicates the option matches the value of its slider. Set by the parent slider.
   * @attr selected
   */
  @property({ type: Boolean, reflect: true })
  public selected = false;

  public static override get styles(): CSSResultArray {
    return [sliderOptionStyles];
  }

  /**
   * The text of the label, announced when the option is selected.
   * @readonly
   */
  public get label(): string {
    return this._text(
      [...this.childNodes].filter(
        (node) => node.nodeType !== Node.COMMENT_NODE && !(node as Element).slot
      )
    );
  }

  /**
   * The text of the description, announced after the label when the option is selected.
   * @readonly
   */
  public get description(): string {
    return this._text([...this.children].filter((child) => child.slot === 'description'));
  }

  private _text(nodes: Node[]): string {
    return nodes
      .map((node) => node.textContent)
      .join(' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  protected override render(): TemplateResult {
    return html`
      <span class="slider-option__label"><slot></slot></span>
      <span class="slider-option__description"><slot name="description"></slot></span>
    `;
  }
}
