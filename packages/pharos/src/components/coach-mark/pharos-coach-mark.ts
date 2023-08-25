import { PharosElement } from '../base/pharos-element';
import { PharosButton } from '../button/pharos-button';
import { PharosHeading } from '../heading/pharos-heading';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { html } from 'lit';
import type { TemplateResult, CSSResultArray } from 'lit';
import { coachMarkStyles } from './pharos-coach-mark.css';

/**
 * Pharos coach-mark component.
 *
 * @tag pharos-coach-mark
 *
 */
export class PharosCoachMark extends ScopedRegistryMixin(PharosElement) {
  static elementDefinitions = {
    'pharos-button': PharosButton,
    'pharos-heading': PharosHeading,
  };

  public static override get styles(): CSSResultArray {
    return [coachMarkStyles];
  }

  protected override render(): TemplateResult {
    return html`
      <div class="coach-mark">
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
