import { PharosElement } from '../base/pharos-element';
import { html } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray, PropertyValues } from 'lit';
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import { iconStyles } from './pharos-icon.css';

import type tokens from '../../styles/tokens';

export type IconName = keyof typeof tokens.asset.icon;

const SMALL_ICON_SIZE = 16;
const LARGE_ICON_SIZE = 24;

/**
 * Pharos icon component.
 *
 * @tag pharos-icon
 *
 */
export class PharosIcon extends PharosElement {
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

  @state()
  private _svg = '';

  public static override get styles(): CSSResultArray {
    return [iconStyles];
  }

  protected override async updated(changedProperties: PropertyValues): Promise<void> {
    if (changedProperties.has('name')) {
      try {
        const icon = await import(/* webpackMode: "lazy" */ `../../styles/icons/${this.name}`);
        this._svg = atob(icon.default);
      } catch (e) {
        console.log(e);
        throw new Error(`Could not get icon named "${this.name}"`);
      }
    }
  }

  private _getIconSize(): number {
    return this.name?.endsWith('-small') ? SMALL_ICON_SIZE : LARGE_ICON_SIZE;
  }

  protected override render(): TemplateResult {
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
        ${unsafeSVG(this._svg)}
      </svg>
    `;
  }
}
