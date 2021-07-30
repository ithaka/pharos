import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';
import type { PropertyValues } from 'lit';

export type LinkTarget = '_blank' | '_parent' | '_self' | '_top';

const TARGETS = ['_blank', '_parent', '_self', '_top'];

/**
 * The base anchor element class to house shared properties, styles, and methods.
 *
 */
export class AnchorElement extends LitElement {
  /**
   * Indicates to save the linked URL instead of navigating to it.
   * @attr download
   */
  @property({ type: String, reflect: true })
  public download?: string;

  /**
   * Indicates the URL that the hyperlink points to.
   * @attr href
   */
  @property({ type: String, reflect: true })
  public href?: string;

  /**
   * Indicates the language of the linked URL.
   * @attr hreflang
   */
  @property({ type: String, reflect: true })
  public hreflang?: string;

  /**
   * Indicates the URLs to ping.
   * @attr ping
   */
  @property({ type: String, reflect: true })
  public ping?: string;

  /**
   * Indicates the type of link.
   * @attr rel
   */
  @property({ type: String, reflect: true })
  public rel?: string;

  /**
   * Indicates where to display the linked URL.
   * @attr target
   * @type {LinkTarget | undefined}
   */
  @property({ type: String, reflect: true })
  public target?: LinkTarget;

  protected override update(changedProperties: PropertyValues): void {
    super.update && super.update(changedProperties);

    if (changedProperties.has('target') && this.target && !TARGETS.includes(this.target)) {
      throw new Error(
        `${this.target} is not a valid target. Valid targets are: ${TARGETS.join(', ')}`
      );
    }
  }
}
