import { html, LitElement, property } from 'lit-element';
import type { TemplateResult, CSSResultArray } from 'lit-element';
import { imageCardStyles } from './pharos-image-card.css';
import { designTokens } from '../../styles/variables.css';
import { customElement } from '../../utils/decorators';

import '../heading/pharos-heading';
import '../link/pharos-link';

@customElement('pharos-image-card')
export class PharosImageCard extends LitElement {
  /**
   * Indicates the title of the item presented in the card.
   * @attr title
   */
  @property({ type: String, reflect: true })
  public title = '';

  /**
   * Indicates the link to apply to the title and image.
   * @attr link
   */
  @property({ type: String, reflect: true })
  public link = '';

  public static get styles(): CSSResultArray {
    return [designTokens, imageCardStyles];
  }

  protected render(): TemplateResult {
    return html`<div>
      <slot name="image"></slot>
      <pharos-link href="${this.link}" subtle flex
        ><pharos-heading preset="1--bold" level="3" no-margin
          >${this.title}</pharos-heading
        ></pharos-link
      ><slot name="metadata"></slot>
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-image-card': PharosImageCard;
  }
}
