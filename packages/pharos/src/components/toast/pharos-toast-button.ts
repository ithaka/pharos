import type { CSSResultArray } from 'lit-element';
import { toastButtonStyles } from './pharos-toast-button.css';
import { designTokens } from '../../styles/variables.css';
import { customElement } from '../../utils/decorators';
import { PharosButton } from '../button/pharos-button';

import type { LinkTarget } from '../base/anchor-element';
import type { ButtonType, IconName } from '../button/pharos-button';

export type { LinkTarget, ButtonType, IconName };

/**
 * Pharos toast button component.
 *
 * @element pharos-toast-button
 *
 */
@customElement('pharos-toast-button')
export class PharosToastButton extends PharosButton {
  constructor() {
    super();
    this.icon = 'close';
    this.variant = 'subtle';
    this.label = 'Dismiss';
    this.onBackground = true;
    this.iconCondensed = true;
  }

  public static get styles(): CSSResultArray {
    return [designTokens, super.styles, toastButtonStyles];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-toast-button': PharosToastButton;
  }
}
