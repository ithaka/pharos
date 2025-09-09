import { html } from 'lit';
import type { TemplateResult, CSSResultArray } from 'lit';
import { pillStyles } from './pill.css';

import { PharosElement } from '../base/pharos-element';
/**
 * Pharos pill component.
 *
 * @tag pharos-pill
 *
 **/

export class PharosPill extends PharosElement {
  public static override get styles(): CSSResultArray {
    return [pillStyles];
  }
  protected override render(): TemplateResult {
    return html` <div class="pill">
      <slot></slot>
    </div>`;
  }
}
