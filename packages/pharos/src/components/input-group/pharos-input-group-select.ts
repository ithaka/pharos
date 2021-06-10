import { html } from 'lit';
import type { TemplateResult, CSSResultArray } from 'lit';
import { inputGroupSelectStyles } from './pharos-input-group-select.css';
import { customElement } from '../../utils/decorators';
import { PharosSelect } from '../select/pharos-select';

/**
 * Pharos input group select component.
 *
 * @element pharos-input-group-select
 */
@customElement('pharos-input-group-select')
export class PharosInputGroupSelect extends PharosSelect {
  public static get styles(): CSSResultArray {
    return [super.styles, inputGroupSelectStyles];
  }

  protected render(): TemplateResult {
    return html` ${super.render()} `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-input-group-select': PharosInputGroupSelect;
  }
}
