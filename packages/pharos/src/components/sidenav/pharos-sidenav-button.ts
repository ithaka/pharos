import type { CSSResultArray } from 'lit';
import { sidenavButtonStyles } from './pharos-sidenav-button.css';
import { PharosButton } from '../button/pharos-button';

import type { LinkTarget } from '../base/anchor-element';
import type { ButtonType, IconName, ButtonVariant } from '../button/pharos-button';

export type { LinkTarget, ButtonType, IconName, ButtonVariant };

/**
 * Pharos sidenav button component.
 */
export class PharosSidenavButton extends PharosButton {
  constructor() {
    super();
    this.icon = 'menu';
    this.variant = 'subtle';
    this.label = 'Open menu';
  }

  public static override get styles(): CSSResultArray {
    return [super.styles, sidenavButtonStyles];
  }

  protected override firstUpdated(): void {
    this.addEventListener('click', this._handleClickOpen);
  }

  private async _handleClickOpen(): Promise<void> {
    const sidenav = document.querySelector('pharos-sidenav');
    if (sidenav) {
      sidenav.slide = true;
      await sidenav.updateComplete;
      sidenav.focus();
    }
  }
}
