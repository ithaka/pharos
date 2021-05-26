import type { CSSResultArray } from 'lit-element';
import { sidenavButtonStyles } from './pharos-sidenav-button.css';
import { customElement } from '../../utils/decorators';
import { PharosButton } from '../button/pharos-button';

import type { LinkTarget } from '../base/anchor-element';
import type { ButtonType, IconName } from '../button/pharos-button';

export type { LinkTarget, ButtonType, IconName };

/**
 * Pharos sidenav button component.
 *
 * @element pharos-sidenav-button
 *
 */
@customElement('pharos-sidenav-button')
export class PharosSidenavButton extends PharosButton {
  constructor() {
    super();
    this.icon = 'menu';
    this.variant = 'subtle';
    this.label = 'Open menu';
  }

  public static get styles(): CSSResultArray {
    return [super.styles, sidenavButtonStyles];
  }

  protected firstUpdated(): void {
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

declare global {
  interface HTMLElementTagNameMap {
    'pharos-sidenav-button': PharosSidenavButton;
  }
}
