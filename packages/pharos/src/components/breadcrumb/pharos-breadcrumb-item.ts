import { html } from 'lit';
import { state } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';
import { breadcrumbItemStyles } from './pharos-breadcrumb-item.css';
import { customElement } from '../../utils/decorators';

import { AnchorElement } from '../base/anchor-element';
import type { LinkTarget } from '../base/anchor-element';
import FocusMixin from '../../utils/mixins/focus';

import '../tooltip/pharos-tooltip';
import '../link/pharos-link';

export type { LinkTarget };

const MAX_LENGTH = 40;

/**
 * Pharos breadcrumb item component - Used in tandem with pharos-breadcrumb to
 * create a navigation element which will allow users to visit higher hierarchal
 * content. This component is the "content" for breadcrumbs, which handles the
 * text and tooltip (if the text is truncated) logic and styling.
 *
 *
 * @element pharos-breadcrumb-item
 *
 * @slot - Contains the links and text to convert into breadcrumbs
 *
 */
@customElement('pharos-breadcrumb-item')
export class PharosBreadcrumbItem extends FocusMixin(AnchorElement) {
  @state()
  private _isTruncated = false;

  @state()
  private _displayText = '';

  @state()
  private _fullText = '';

  @state()
  private _last = false;

  public static get styles(): CSSResultArray {
    return [breadcrumbItemStyles];
  }

  private _contentObserver: MutationObserver = new MutationObserver(() => {
    this._setItem();
  });

  protected get content(): HTMLElement | Text {
    return Array.prototype.slice
      .call(this.childNodes)
      ?.find((node) => node.textContent && node.nodeName !== '#comment');
  }

  protected firstUpdated(): void {
    this.setAttribute('role', 'listitem');
    this._setItem();
    this._contentObserver.observe(this.content, {
      subtree: true,
      characterData: true,
    });
  }

  private _setItem(): void {
    this._fullText = this.content.textContent as string;
    this._isTruncated = this._fullText.length > MAX_LENGTH;
    this._displayText = this._isTruncated
      ? `${this._fullText.substr(0, MAX_LENGTH)}...`
      : this._fullText || '';
  }

  protected render(): TemplateResult {
    const classes = {
      [`breadcrumb-item`]: true,
      [`breadcrumb-item--last`]: this._last,
    };

    return html`
      ${this.href
        ? html`<pharos-link
            class=${classMap(classes)}
            href=${ifDefined(this.href)}
            target=${ifDefined(this.target)}
            data-tooltip-id=${ifDefined(this._isTruncated ? 'truncate-tooltip' : undefined)}
            >${this._displayText}</pharos-link
          >`
        : html`<span
            class=${classMap(classes)}
            data-tooltip-id=${ifDefined(this._isTruncated ? 'truncate-tooltip' : undefined)}
            >${this._displayText}</span
          >`}
      ${this._isTruncated
        ? html`<pharos-tooltip id="truncate-tooltip">${this._fullText}</pharos-tooltip>`
        : null}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-breadcrumb-item': PharosBreadcrumbItem;
  }
}
