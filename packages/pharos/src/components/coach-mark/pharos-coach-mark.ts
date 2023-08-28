import { PharosElement } from '../base/pharos-element';
import { PharosButton } from '../button/pharos-button';
import { PharosHeading } from '../heading/pharos-heading';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray } from 'lit';
import { coachMarkStyles } from './pharos-coach-mark.css';

export type Side = 'top' | 'right' | 'bottom' | 'left';
export type Alignment = 'start' | 'center' | 'end';

/**
 * Pharos coach-mark component.
 *
 * @tag pharos-coach-mark
 *
 */
export class PharosCoachMark extends PharosElement {
  static elementDefinitions = {
    'pharos-button': PharosButton,
    'pharos-heading': PharosHeading,
  };

  public static override get styles(): CSSResultArray {
    return [coachMarkStyles];
  }

  /**
   * Indicates that the coach mark should not be displayed on the page
   * @attr hide
   */
  @property({ type: Boolean, reflect: true })
  hide = true;

  /**
   * Indicates which side of the base element the coachmark should appear on
   * @attr side
   * @type {Side}
   */
  @property({ reflect: true })
  side: Side = 'bottom';

  /**
   * Indicates which side of the base element the coachmark should appear on
   * @attr alignment
   * @type {Alignment}
   */
  @property({ reflect: true })
  alignment: Alignment = 'center';

  protected override render(): TemplateResult {
    return html`
      <p>coach-mark-position__${this.side}__${this.alignment}</p>
      <div
        class="coach-mark coach-mark-position__${this.side}__${this.alignment}"
        aria-hidden=${this.hide}
      >
        <pharos-button
          id="close-button"
          class="coach-mark__close"
          type="button"
          variant="subtle"
          icon="close"
          label="Close coach mark"
        ></pharos-button>
        <pharos-heading level="2" preset="1">Lorem Ipsum</pharos-heading>
        <p>This is the CoachMark component</p>
      </div>
    `;
  }
}
