import { html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray } from 'lit';
import { sidenavLinkStyles } from './pharos-sidenav-link.css';
import { customElement } from '../../utils/decorators';
import { PharosLink } from '../link/pharos-link';
import '../icon/pharos-icon';

import type { LinkTarget } from '../base/anchor-element';

export type { LinkTarget };

/**
 * Pharos sidenav link component.
 *
 * @element pharos-sidenav-link
 *
 * @slot - Contains the content of the link (the default slot).
 *
 */
@customElement('pharos-sidenav-link')
export class PharosSidenavLink extends PharosLink {
  /**
   * Indicates the link is active
   * @attr is-active
   */
  @property({ type: Boolean, reflect: true, attribute: 'is-active' })
  public isActive = false;

  /**
   * Indicates the link is external
   * @attr external
   */
  @property({ type: Boolean, reflect: true })
  public external = false;

  /**
   * Indicates the link is a sidenav menu item
   * @attr external
   */
  @property({ type: Boolean, reflect: true, attribute: 'menu-item' })
  public menuItem = false;

  public static get styles(): CSSResultArray {
    return [super.styles, sidenavLinkStyles];
  }

  protected get appendContent(): TemplateResult | typeof nothing {
    if (this.external) {
      return html`<pharos-icon name="link-external" class="link__icon"></pharos-icon>`;
    }
    return nothing;
  }

  protected render(): TemplateResult {
    return html`${super.render()}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-sidenav-link': PharosSidenavLink;
  }
}
