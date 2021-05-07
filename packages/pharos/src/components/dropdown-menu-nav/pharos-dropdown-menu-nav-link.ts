import { html, property } from 'lit-element';
import type { TemplateResult, CSSResultArray } from 'lit-element';
import { nothing } from 'lit-html';
import { dropdownMenuNavLinkStyles } from './pharos-dropdown-menu-nav-link.css';
import { designTokens } from '../../styles/variables.css';
import { customElement } from '../../utils/decorators';
import { PharosLink } from '../link/pharos-link';
import '../icon/pharos-icon';

import type { LinkTarget } from '../base/anchor-element';

export type { LinkTarget };

/**
 * Pharos dropdown menu nav link component.
 *
 * @element pharos-dropdown-menu-nav-link
 *
 * @slot - Contains the content of the link (the default slot).
 *
 */
@customElement('pharos-dropdown-menu-nav-link')
export class PharosDropdownMenuNavLink extends PharosLink {
  /**
   * Indicates the link is active
   * @attr is-active
   */
  @property({ type: Boolean, reflect: true, attribute: 'is-active' })
  public isActive = false;

  constructor() {
    super();
    this.flex = true;
  }

  public static get styles(): CSSResultArray {
    return [designTokens, super.styles, dropdownMenuNavLinkStyles];
  }

  protected get appendContent(): TemplateResult | typeof nothing {
    if (this.hasAttribute('data-dropdown-menu-id')) {
      return html`<pharos-icon name="chevron-down" class="link__icon"></pharos-icon>`;
    }
    return nothing;
  }

  protected render(): TemplateResult {
    return html`${super.render()}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-dropdown-menu-nav-link': PharosDropdownMenuNavLink;
  }
}
