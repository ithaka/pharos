import { html, nothing } from 'lit';
import { property } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray } from 'lit';
import { sidenavLinkStyles } from './pharos-sidenav-link.css';
import { PharosLink } from '../link/pharos-link';

import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { PharosIcon } from '../icon/pharos-icon';

import type { LinkTarget } from '../base/anchor-element';
export type { LinkTarget };

/**
 * Pharos sidenav link component.
 *
 * @slot - Contains the content of the link (the default slot).
 *
 */
export class PharosSidenavLink extends ScopedRegistryMixin(PharosLink) {
  static elementDefinitions = {
    'pharos-icon': PharosIcon,
  };

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

  public static override get styles(): CSSResultArray {
    return [super.styles, sidenavLinkStyles];
  }

  protected override get appendContent(): TemplateResult | typeof nothing {
    if (this.external) {
      return html`<pharos-icon name="link-external" class="link__icon"></pharos-icon>`;
    }
    return nothing;
  }

  protected override render(): TemplateResult {
    return html`${super.render()}`;
  }
}
