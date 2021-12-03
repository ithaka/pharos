import { html, nothing } from 'lit';
import { property, state } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import { linkStyles } from './pharos-link.css';
import deepSelector from '../../utils/deepSelector';

import { AnchorElement } from '../base/anchor-element';
import type { LinkTarget } from '../base/anchor-element';
import FocusMixin from '../../utils/mixins/focus';

export type { LinkTarget };

/**
 * Pharos link component.
 *
 * @slot - Contains the content of the link (the default slot).
 *
 */
export class PharosLink extends FocusMixin(AnchorElement) {
  componentName = 'PharosLink';

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
   * Indicates the link is hidden until focused and skips to another element when clicked.
   * @attr skip
   */
  @property({ type: Boolean, reflect: true })
  public skip = false;

  /**
   * Indicates the link should not have a hover state.
   * @attr no-hover
   */
  @property({ type: Boolean, reflect: true, attribute: 'no-hover' })
  public noHover = false;

  @state()
  private _alert = false;

  @state()
  private _hover = false;

  public static override get styles(): CSSResultArray {
    return [linkStyles];
  }

  private async _handleClick(): Promise<void> {
    if (this.skip && this.href) {
      const target = deepSelector(this.href) as HTMLElement;
      await new Promise((resolve) => requestAnimationFrame(resolve));
      target?.focus && target?.focus();
    }
  }

  protected get appendContent(): TemplateResult | typeof nothing {
    return nothing;
  }

  protected override render(): TemplateResult {
    return html`<a
      id="link-element"
      class="${classMap({
        [`link--alert`]: this._alert,
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
      @click=${this._handleClick}
      ><slot></slot>${this.appendContent}</a
    >`;
  }
}
