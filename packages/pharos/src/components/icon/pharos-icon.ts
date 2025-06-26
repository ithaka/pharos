import { PharosElement } from '../base/pharos-element';
import { html, nothing } from 'lit';
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
   * Indicates the title to apply as the accessible name of the icon.
   * @attr a11y-title
   */
  @property({ type: String, reflect: true, attribute: 'a11y-title' })
  public a11yTitle?: string;

  /**
   * Indicates whether the icon should be hidden from assistive technology.
   * @attr a11y-hidden
   * @type {AriaHiddenState}
   */
  @property({ type: String, reflect: true, attribute: 'a11y-hidden' })
  public a11yHidden?: AriaHiddenState;

  @state()
  private _svg = '';

  protected override update(changedProperties: PropertyValues): void {
    super.update && super.update(changedProperties);

    if (!this.a11yHidden && !this.a11yTitle) {
      throw new Error(
        `All icons must have an accessible title (a11y-title) or be marked as hidden to assistive technology (a11y-hidden).`
      );
    }
  }

  public static override get styles(): CSSResultArray {
    return [iconStyles];
  }

  protected override async updated(changedProperties: PropertyValues): Promise<void> {
    if (changedProperties.has('name')) {
      try {
        const icon = await import(`../../styles/icons/${this.name}.svg`);
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
        aria-hidden=${this.a11yHidden || nothing}
        height=${size}
        width=${size}
        focusable="false"
      >
        <title>${this.a11yTitle}</title>
        ${unsafeSVG(this._svg)}
      </svg>
    `;
  }
}
