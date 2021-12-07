import { html } from 'lit';
import type { TemplateResult, CSSResultArray } from 'lit';
import { inputGroupSelectStyles } from './pharos-input-group-select.css';
import { PharosSelect } from '../select/pharos-select';

/**
 * Pharos input group select component.
 *
 * @tag pharos-input-group-select
 *
 */
export class PharosInputGroupSelect extends PharosSelect {
  public static override get styles(): CSSResultArray {
    return [super.styles, inputGroupSelectStyles];
  }

  protected override render(): TemplateResult {
    return html` ${super.render()} `;
  }
}
