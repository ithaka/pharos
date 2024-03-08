import type { CSSResultArray } from 'lit';
import { toastButtonStyles } from './pharos-toast-button.css';
import { PharosButton } from '../button/pharos-button';

import type { LinkTarget } from '../base/anchor-element';
import type { ButtonType, IconName, ButtonVariant } from '../button/pharos-button';

export type { LinkTarget, ButtonType, IconName, ButtonVariant };

/**
 * Pharos toast button component.
 *
 * @tag pharos-toast-button
 *
 */
export class PharosToastButton extends PharosButton {
  constructor() {
    super();
    this.icon = 'close';
    this.variant = 'subtle';
    this.a11yLabel = 'Dismiss';
    this.isOnBackground = true;
    this.iconCondensed = true;
  }

  public static override get styles(): CSSResultArray {
    return [super.styles, toastButtonStyles];
  }
}
