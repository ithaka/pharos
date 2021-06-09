import { html, LitElement, queryAssignedNodes } from 'lit-element';
import type { TemplateResult, CSSResultArray } from 'lit-element';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { footerStyles } from './pharos-footer.css';
import { customElement } from '../../utils/decorators';

import ObserveChildrenMixin from '../../utils/mixins/observe-children';
import '../heading/pharos-heading';
import '../icon/pharos-icon';

/**
 * Pharos footer component.
 *
 * @element pharos-footer
 *
 * @slot links-group - One or more lists of links to show in the middle of the footer.
 * @slot button-links - List of button links to show in the middle of the footer.
 * @slot social-links - List of social media related links to show on the right side of the footer.
 * @slot mission-statement - Contains the content of the mission statement.
 * @slot copyright-statement - Contains the content of the copyright statement.
 * @slot legal-links - List of legal related links to show on the bottom of the footer.
 * @slot google-widget - Contains the Google translate widget.
 *
 */
@customElement('pharos-footer')
export class PharosFooter extends ObserveChildrenMixin(LitElement) {
  @queryAssignedNodes('google-widget', false, '#google_translate_element')
  private _widgetNodes!: NodeListOf<HTMLElement>;

  public static get styles(): CSSResultArray {
    return [footerStyles];
  }

  private _widgetObserver: MutationObserver = new MutationObserver(
    (mutationsList: MutationRecord[]) => {
      const widgetContainer = mutationsList[0].addedNodes[0] as HTMLDivElement;
      const widgetButton = widgetContainer?.querySelector(
        '.goog-te-gadget-simple'
      ) as HTMLDivElement;
      const googleImg = widgetButton?.querySelector('.goog-te-gadget-icon') as HTMLImageElement;
      const googleIcon = document.createElement('pharos-icon');
      const chevronIcon = document.createElement('pharos-icon');

      googleIcon.name = 'google';
      chevronIcon.name = 'chevron-down';
      chevronIcon.style.marginLeft = '0';

      widgetButton?.appendChild(chevronIcon);
      widgetButton?.replaceChild(googleIcon, googleImg);
    }
  );

  protected firstUpdated(): void {
    if (this._widgetNodes.length) {
      this._widgetObserver.observe(this._widgetNodes[0], {
        childList: true,
      });
    }
  }

  disconnectedCallback(): void {
    this._widgetObserver.disconnect();
    super.disconnectedCallback && super.disconnectedCallback();
  }

  protected render(): TemplateResult {
    return html`
      <footer id="footer-element">
        <div class="footer__content">
          <div class="footer__row footer__row--top">
            <pharos-heading level="2" preset="5--bold">Explore JSTOR</pharos-heading>
          </div>
          <div class="footer__row footer__row--main">
            ${[...this.children]
              .filter((child) => child.slot === 'links-group')
              .map((list) => {
                return html`
                  <div>
                    <ul class="footer__list">
                      ${unsafeHTML(list.innerHTML)}
                    </ul>
                  </div>
                `;
              })}
            <div>
              <ul class="footer__list">
                ${[...this.children]
                  .filter((child) => child.slot === 'button-links')
                  .map((list) => {
                    return html`${unsafeHTML(list.innerHTML)}`;
                  })}
              </ul>
            </div>
            <div>
              <ul class="footer__list--social">
                ${[...this.children]
                  .filter((child) => child.slot === 'social-links')
                  .map((list) => {
                    return html`${unsafeHTML(list.innerHTML)}`;
                  })}
              </ul>
              <p class="footer__statement">
                <slot name="mission-statement"></slot>
              </p>
              <p class="footer__statement">
                <slot name="copyright-statement"></slot>
              </p>
            </div>
          </div>
          <div class="footer__row footer__row--bottom">
            <ul class="footer__list--inline">
              ${[...this.children]
                .filter((child) => child.slot === 'legal-links')
                .map((list) => {
                  return html`${unsafeHTML(list.innerHTML)}`;
                })}
            </ul>
            <slot name="google-widget"></slot>
          </div>
        </div>
      </footer>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-footer': PharosFooter;
  }
}
