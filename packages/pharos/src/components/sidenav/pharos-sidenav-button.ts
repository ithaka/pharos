import type { CSSResultArray } from 'lit';
import { sidenavButtonStyles } from './pharos-sidenav-button.css';
import { PharosButton } from '../button/pharos-button';
import type { PharosSidenav } from './pharos-sidenav';

import type { LinkTarget } from '../base/anchor-element';
import type {
  ButtonType,
  IconName,
  ButtonVariant,
  PressedState,
  ExpandedState,
  PopupState,
} from '../button/pharos-button';
export type {
  LinkTarget,
  ButtonType,
  IconName,
  ButtonVariant,
  PressedState,
  ExpandedState,
  PopupState,
};

/**
 * Pharos sidenav button component.
 *
 * @tag pharos-sidenav-button
 *
 */
export class PharosSidenavButton extends PharosButton {
  constructor() {
    super();
    this.icon = 'menu';
    this.variant = 'subtle';
    this.a11yLabel = 'Open menu';
  }

  public static override get styles(): CSSResultArray {
    return [super.styles, sidenavButtonStyles];
  }

  protected override firstUpdated(): void {
    this.addEventListener('click', this._handleClickOpen);
  }

  private async _handleClickOpen(): Promise<void> {
    const sidenav: PharosSidenav | null = document.querySelector(
      '[data-pharos-component="PharosSidenav"]'
    );
    if (sidenav) {
      sidenav.slide = true;
      await sidenav.updateComplete;
      sidenav.focus();
    }
  }
}
