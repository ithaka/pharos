import type { CSSResultArray } from 'lit-element';
import { toggleButtonStyles } from './pharos-toggle-button.css';
import { designTokens } from '../../styles/variables.css';
import { customElement } from '../../utils/decorators';
import { PharosButton } from '../button/pharos-button';

import type { LinkTarget } from '../base/anchor-element';
import type { ButtonType, IconName } from '../button/pharos-button';

export type { LinkTarget, ButtonType, IconName };

/**
 * Pharos toggle button component.
 *
 * @element pharos-toggle-button
 *
 */
@customElement('pharos-toast-button')
export class PharosToggleButton extends PharosButton {
  constructor() {
    super();
    this.icon = 'close';
    this.variant = 'subtle';
    this.label = 'Dismiss';
    this.onBackground = true;
    this.iconCondensed = true;
  }

  public static get styles(): CSSResultArray {
    return [designTokens, super.styles, toggleButtonStyles];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-toggle-button': PharosToggleButton;
  }
}
