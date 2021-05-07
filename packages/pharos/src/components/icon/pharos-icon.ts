import { LitElement, html, property } from 'lit-element';
import type { TemplateResult, CSSResultArray, PropertyValues } from 'lit-element';
import { unsafeSVG } from 'lit-html/directives/unsafe-svg.js';
import { iconStyles } from './pharos-icon.css';
import { customElement } from '../../utils/decorators';

import * as icons from '../../styles/icons';
import type tokens from '../../styles/tokens';

export type IconName = keyof typeof tokens.asset.icon;

export const iconNames = Object.keys(icons).map((icon) =>
  icon.replace('PHAROS_ASSET_ICON_', '').replace(/_/g, '-').toLowerCase()
);

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
   * The height of the icon
   * @attr height
   */
  @property({ type: Number, reflect: true })
  public height = 24;

  /**
   * The width of the icon
   * @attr width
   */
  @property({ type: Number, reflect: true })
  public width = 24;

  /**
   * A description of what the icon represents
   * @attr description
   */
  @property({ type: String, reflect: true })
  public description = '';

  public static get styles(): CSSResultArray {
    return [iconStyles];
  }

  protected updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('name')) {
      if (this.name?.endsWith('-small')) {
        this.height = 16;
        this.width = 16;
      } else {
        this.height = 24;
        this.width = 24;
      }
    }
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

    return html`
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 ${this.width} ${this.height}"
        class="icon"
        role="img"
        aria-hidden=${this.description === ''}
        aria-label=${this.description || ''}
        height="${this.height}"
        width="${this.width}"
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
