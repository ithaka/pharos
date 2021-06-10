import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import type { PropertyValues, TemplateResult, CSSResultArray } from 'lit';
import { headingStyles } from './pharos-heading.css';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement } from '../../utils/decorators';

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

export type HeadingPreset =
  | '1'
  | '1--bold'
  | '2'
  | '2--bold'
  | '3'
  | '3--bold'
  | '4'
  | '4--bold'
  | '5'
  | '5--bold'
  | '6'
  | '6--bold'
  | '7'
  | '7--bold'
  | 'legend';

const LEVELS = [1, 2, 3, 4, 5, 6];

const PRESETS = [
  '1',
  '1--bold',
  '2',
  '2--bold',
  '3',
  '3--bold',
  '4',
  '4--bold',
  '5',
  '5--bold',
  '6',
  '6--bold',
  '7',
  '7--bold',
  'legend',
];

/**
 * Pharos heading component.
 *
 * @element pharos-heading
 *
 * @slot - Contains the heading text (the default slot).
 */
@customElement('pharos-heading')
export class PharosHeading extends LitElement {
  /**
   * Indicates the heading tag level.
   * @attr level
   */
  @property({ type: Number, reflect: true })
  public level: HeadingLevel = 1;

  /**
   * Indicates the visual styling preset to use.
   * @attr preset
   */
  @property({ type: String, reflect: true })
  public preset!: HeadingPreset;

  /**
   * Indicates if the heading should not have a margin applied.
   * @attr no-margin
   */
  @property({ type: Boolean, reflect: true, attribute: 'no-margin' })
  public noMargin = false;

  public static get styles(): CSSResultArray {
    return [headingStyles];
  }

  protected update(changedProperties: PropertyValues): void {
    super.update && super.update(changedProperties);

    if (changedProperties.has('level') && !LEVELS.includes(this.level)) {
      throw new Error(
        `${this.level} is not a valid heading level. Valid levels are: ${LEVELS.join(', ')}`
      );
    }
    if (changedProperties.has('preset') && !PRESETS.includes(this.preset)) {
      throw new Error(
        `${this.preset} is not a valid preset.
        Available presets are ${PRESETS.join(', ')}.`
      );
    }
  }

  protected render(): TemplateResult {
    const template = `
      <h${this.level} class="heading">
        <slot></slot>
      </h${this.level}>
    `;
    return html`${unsafeHTML(template)}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-heading': PharosHeading;
  }
}
