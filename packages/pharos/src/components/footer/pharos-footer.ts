import { PharosElement } from '../base/pharos-element';
import { html } from 'lit';
import type { TemplateResult, CSSResultArray } from 'lit';
import { footerStyles } from './pharos-footer.css';

import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import { PharosHeading } from '../heading/pharos-heading';

/**
 * Pharos footer component.
 *
 * @tag pharos-footer
 *
 * @slot links-group - One or more lists of links to show in the middle of the footer.
 * @slot button-links - List of button links to show in the middle of the footer.
 * @slot social-links - List of social media related links to show on the right side of the footer.
 * @slot mission-statement - Contains the content of the mission statement.
 * @slot copyright-statement - Contains the content of the copyright statement.
 * @slot legal-links - List of legal related links to show on the bottom of the footer.
 *
 */
export class PharosFooter extends ScopedRegistryMixin(PharosElement) {
  static elementDefinitions = {
    'pharos-heading': PharosHeading,
  };

  public static override get styles(): CSSResultArray {
    return [footerStyles];
  }

  protected override render(): TemplateResult {
    return html`
      <footer id="footer-element">
        <div class="footer__content">
          <div class="footer__row footer__row--top">
            <pharos-heading level="2" preset="5--bold">Explore JSTOR</pharos-heading>
          </div>
          <div class="footer__row footer__row--main">
            <slot name="links-group"></slot>
            <div>
              <slot name="button-links"></slot>
            </div>
            <div>
              <slot name="social-links"></slot>
              <p class="footer__statement">
                <slot name="mission-statement"></slot>
              </p>
              <p class="footer__statement">
                <slot name="copyright-statement"></slot>
              </p>
            </div>
          </div>
          <div class="footer__row footer__row--bottom">
            <slot name="legal-links"></slot>
          </div>
        </div>
      </footer>
    `;
  }
}
