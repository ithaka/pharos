import { html } from 'lit';
import type { TemplateResult, CSSResultArray } from 'lit';
import { pillStyles } from './pill.css';

import { PharosElement } from '../base/pharos-element';
import { property } from 'lit/decorators.js';
/**
 * Pharos pill component.
 *
 * @tag pharos-pill
 *
 **/

export class PharosPill extends PharosElement {
  /**
   * The size of the pill
   * @attr size
   */
  @property({
    type: String,
    reflect: true,
    useDefault: false,
  })
  public size: string = 'base';

  public static override get styles(): CSSResultArray {
    return [pillStyles];
  }

  protected override render(): TemplateResult {
    const classes = ['pill'];
    if (this.size === 'small') {
      classes.push('pill--small');
    }

    return html`<div class="${classes.join(' ')}">
      <slot></slot>
    </div>`;
  }
}
