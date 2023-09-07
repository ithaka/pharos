import { PharosElement } from '../base/pharos-element';
import { PharosButton } from '../button/pharos-button';
import { PharosHeading } from '../heading/pharos-heading';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray } from 'lit';
import { coachMarkStyles } from './pharos-coach-mark.css';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import debounce from '../../utils/debounce';

export type Side = 'top' | 'right' | 'bottom' | 'left';
export type Alignment = 'start' | 'center' | 'end';
export type Delay = 'none' | 'short' | 'long';
export type Variant = 'light' | 'dark';

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
  public hide = true;

  /**
   * Indicates which side of the base element the coachmark should appear on
   * @attr side
   * @type {Side}
   */
  @property({ reflect: true })
  public side: Side = 'bottom';

  /**
   * Indicates which side of the base element the coachmark should appear on
   * @attr alignment
   * @type {Alignment}
   */
  @property({ reflect: true })
  public alignment: Alignment = 'center';

  /**
   * Dictates how long to wait between coach mark trigger and start of coach mark fade in animation
   * @attr delay
   * @type {Delay}
   */
  @property({ reflect: true })
  public delay: Delay = 'short';

  /**
   * Text content for the modal header
   * @attr header
   * @type {String}
   */
  @property({ reflect: true })
  public header = '';

  /**
   * Style variant
   * @attr variant
   * @type {Variant}
   */
  @property({ reflect: true })
  public variant: Variant = 'light';

  /**
   * Set minimum width of coach mark
   * @attr width
   * @type {number}
   */
  @property({ reflect: true })
  public width = 250;

  constructor() {
    super();
    this.setOffset();
    this.resizeObserver.observe(document.body);
  }

  private resizeObserver = new ResizeObserver(
    debounce((entries) => {
      entries.map((entry: ResizeObserverEntry) => {
        if (entry.target.tagName.toLowerCase() !== 'body') return;
        this.setOffset();
        this.requestUpdate();
      });
    }, 100)
  );

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
        class="coach-mark ${this.delay && this.delay !== 'none' ? `delay-${this.delay}` : ''}"
        aria-hidden=${this.hide}
        role="dialog"
        aria-labelledby="coach-mark-heading"
        style="transform:translate(${this.offsetX}px,${this.offsetY}px)"
      >
        <div class="coach-mark__wrapper coach-mark-side__${this.side}">
          <div
            class="coach-mark__content coach-mark-alignment__${this.alignment}"
            style="min-width:${this.width}px"
          >
            <pharos-button
              id="close-button"
              class="coach-mark__close"
              type="button"
              variant="${this.variant === 'light' ? 'subtle' : 'overlay'}"
              icon="close"
              label="Close"
              @click="${() => (this.hide = true)}"
            ></pharos-button>
            <pharos-heading id="coach-mark-heading" level="2" preset="1--bold"
              >${this.header}</pharos-heading
            >
            <slot></slot>
          </div>
        </div>
      </div>
    `;
  }
}
