import { PharosElement } from '../base/pharos-element';
import { PharosButton } from '../button/pharos-button';
import { PharosHeading } from '../heading/pharos-heading';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray } from 'lit';
import { coachMarkStyles } from './pharos-coach-mark.css';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';

export type Side = 'top' | 'right' | 'bottom' | 'left';
export type Alignment = 'start' | 'center' | 'end';

/**
 * Pharos coach-mark component.
 *
 * @tag pharos-coach-mark
 *
 */
export class PharosCoachMark extends ScopedRegistryMixin(PharosElement) {
  static elementDefinitions = {
    'pharos-button': PharosButton,
    'pharos-heading': PharosHeading,
  };

  private offsetX = 0;
  private offsetY = 0;
  private margin = 20;

  public static override get styles(): CSSResultArray {
    return [coachMarkStyles];
  }

  /**
   * Indicates that the coach mark should not be displayed on the page
   * @attr hide
   */
  @property({ type: Boolean, reflect: true })
  hide = true;

  /**
   * Indicates which side of the base element the coachmark should appear on
   * @attr side
   * @type {Side}
   */
  @property({ reflect: true })
  side: Side = 'bottom';

  /**
   * Indicates which side of the base element the coachmark should appear on
   * @attr alignment
   * @type {Alignment}
   */
  @property({ reflect: true })
  alignment: Alignment = 'center';

  constructor() {
    super();
    this.setOffset();
  }

  private setOffset() {
    const id: string = this.getAttribute('id') || '';
    const targetElement: Element | null = document.querySelector(`[data-coach-mark="${id}"]`);
    if (!targetElement) return;
    const thisRect = this.getBoundingClientRect();
    const targetRect = targetElement.getBoundingClientRect();

    switch (this.side) {
      case 'top':
        this.offsetX = (targetRect.left + targetRect.right) / 2 - thisRect.x;
        this.offsetY = targetRect.top - thisRect.bottom - this.margin;
        break;
      case 'right':
        this.offsetX = targetRect.right - thisRect.left + this.margin;
        this.offsetY = (targetRect.top + targetRect.bottom) / 2 - thisRect.y;
        break;
      case 'left':
        this.offsetY = (targetRect.top + targetRect.bottom) / 2 - thisRect.y;
        this.offsetX = targetRect.left - thisRect.right - this.margin;
        break;
      default: // bottom
        this.offsetX = (targetRect.left + targetRect.right) / 2 - thisRect.x;
        this.offsetY = targetRect.bottom - thisRect.top + this.margin;
    }
  }

  protected override render(): TemplateResult {
    this.setOffset();
    return html`
      <div
        class="coach-mark"
        aria-hidden=${this.hide}
        style="transform:translate(${this.offsetX}px,${this.offsetY}px)"
      >
        <div
          class="coach-mark__content coach-mark-side__${this.side} coach-mark-alignment__${this
            .alignment}"
        >
          <pharos-button
            id="close-button"
            class="coach-mark__close"
            type="button"
            variant="subtle"
            icon="close"
            label="Close coach mark"
            @click="${() => (this.hide = true)}"
          ></pharos-button>
          <pharos-heading level="2" preset="1">Lorem Ipsum</pharos-heading>
          <p>This is an example Coach Mark</p>
        </div>
      </div>
    `;
  }
}
