import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { iconStyles } from './pharos-icon.css';
import { customElement } from '../../utils/decorators';

import * as icons from '../../styles/icons';
import type tokens from '../../styles/tokens';

export type IconName = keyof typeof tokens.asset.icon;

export const iconNames = Object.keys(icons).map((icon) =>
  icon.replace('PHAROS_ASSET_ICON_', '').replace(/_/g, '-').toLowerCase()
);

const SMALL_ICON_SIZE = 16;
const LARGE_ICON_SIZE = 24;

/**
 * Pharos icon component.
 *
 * @element pharos-icon
 */
@customElement('pharos-icon')
export class PharosIcon extends LitElement {
  /**
   * The name of the icon
   * @attr name
   * @type {IconName | undefined}
   */
  @property({ type: String, reflect: true })
  public name?: IconName;

  /**
   * A description of what the icon represents
   * @attr description
   */
  @property({ type: String, reflect: true })
  public description = '';

  public static get styles(): CSSResultArray {
    return [iconStyles];
  }

  private _getIconSize(): number {
    return this.name?.endsWith('-small') ? SMALL_ICON_SIZE : LARGE_ICON_SIZE;
  }

  protected render(): TemplateResult {
    let svg;

    try {
      svg = atob(
        icons[
          `PHAROS_ASSET_ICON_${this.name?.toUpperCase().replace(/-/g, '_')}` as keyof typeof icons
        ]
      );
    } catch (e) {
      throw new Error(`No icon named "${this.name}"`);
    }

    const size = this._getIconSize();

    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 ${size} ${size}"
        class="icon"
        role="img"
        aria-hidden=${this.description === ''}
        aria-label=${this.description || ''}
        height="${size}"
        width="${size}"
        focusable="false"
      >
        ${unsafeSVG(svg)}
      </svg>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-icon': PharosIcon;
  }
}
