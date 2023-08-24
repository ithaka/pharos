import { PharosElement } from '../base/pharos-element';
import { html } from 'lit';
import type { TemplateResult, CSSResultArray } from 'lit';
import { coachMarkStyles } from './pharos-coach-mark.css';

/**
 * Pharos coach-mark component.
 *
 * @tag pharos-coach-mark
 *
 */
export class PharosCoachMark extends PharosElement {
  public static override get styles(): CSSResultArray {
    return [coachMarkStyles];
  }

  protected override render(): TemplateResult {
    return html` <span>This is the CoachMark component!</span> `;
  }
}
