import { html, property, state } from 'lit-element';
import type { TemplateResult, CSSResultArray } from 'lit-element';
import { nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { classMap } from 'lit-html/directives/class-map.js';
import { linkStyles } from './pharos-link.css';
import { designTokens } from '../../styles/variables.css';
import { customElement } from '../../utils/decorators';
import type { PharosAlert } from '../alert/pharos-alert';

import { AnchorElement } from '../base/anchor-element';
import type { LinkTarget } from '../base/anchor-element';
import FocusMixin from '../../utils/mixins/focus';

export type { LinkTarget };

/**
 * Pharos link component.
 *
 * @element pharos-link
 *
 * @slot - Contains the content of the link (the default slot).
 *
 */
@customElement('pharos-link')
export class PharosLink extends FocusMixin(AnchorElement) {
  /**
   * Indicates the MIME type of the target.
   * @attr type
   */
  @property({ type: String, reflect: true })
  public type?: string;

  /**
   * Indicates the link should not have text decoration by default.
   * @attr subtle
   */
  @property({ type: Boolean, reflect: true })
  public subtle = false;

  /**
   * Indicates the link is on a AA compliant background.
   * @attr on-background
   */
  @property({ type: Boolean, reflect: true, attribute: 'on-background' })
  public onBackground = false;

  /**
   * Indicates the aria label to apply to the link.
   * @attr label
   */
  @property({ type: String, reflect: true })
  public label?: string;

  /**
   * Indicates if the link should be bold.
   * @attr bold
   */
  @property({ type: Boolean, reflect: true })
  public bold = false;

  /**
   * Indicates if the link should display as a flex container.
   * @attr flex
   */
  @property({ type: Boolean, reflect: true })
  public flex = false;

  /**
   * Indicates the link is hidden until focused.
   * @attr skip
   */
  @property({ type: Boolean, reflect: true })
  public skip = false;

  @state()
  private _alert!: PharosAlert;

  @state()
  private _hover = false;

  public static get styles(): CSSResultArray {
    return [designTokens, linkStyles];
  }

  protected firstUpdated(): void {
    this._alert = this.closest('pharos-alert') as PharosAlert;
  }

  protected get appendContent(): TemplateResult | typeof nothing {
    return nothing;
  }

  protected render(): TemplateResult {
    return html`<a
      id="link-element"
      class="${classMap({
        [`link--alert`]: this._alert && this._alert.status !== 'error',
        [`link--hover`]: this._hover,
      })}"
      download=${ifDefined(this.download)}
      href=${ifDefined(this.href)}
      hreflang=${ifDefined(this.hreflang)}
      ping=${ifDefined(this.ping)}
      rel=${ifDefined(this.rel)}
      target=${ifDefined(this.target)}
      type=${ifDefined(this.type)}
      aria-label=${ifDefined(this.label)}
      ><slot></slot>${this.appendContent}</a
    >`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-link': PharosLink;
  }
}
