import { PharosElement } from '../base/pharos-element';
import { PharosButton } from '../button/pharos-button';
import { PharosHeading } from '../heading/pharos-heading';
import { html } from 'lit';
import { property } from 'lit/decorators.js';
import type { TemplateResult, CSSResultArray } from 'lit';
import { coachMarkStyles } from './pharos-coach-mark.css';
import ScopedRegistryMixin from '../../utils/mixins/scoped-registry';
import type { Placement } from '@floating-ui/dom';
import { autoUpdate, computePosition, flip, offset } from '@floating-ui/dom';

export type Side = 'top' | 'right' | 'bottom' | 'left';
export type Alignment = 'start' | 'center' | 'end';
export type Delay = 'none' | 'short' | 'long';
export type Variant = 'light' | 'dark';

/**
 * Pharos coach mark component.
 *
 * @tag pharos-coach-mark
 *
 */
export class PharosCoachMark extends ScopedRegistryMixin(PharosElement) {
  static elementDefinitions = {
    'pharos-button': PharosButton,
    'pharos-heading': PharosHeading,
  };

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
  public side: Placement = 'bottom';

  /**
   * Indicates how the coach mark carat should be aligned in relation to the coach mark content
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
   * Text content for the coach mark header
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
  public variant: Variant = 'dark';

  /**
   * Set minimum width of coach mark
   * @attr width
   * @type {number}
   */
  @property({ reflect: true })
  public width = 250;

  private computedPosition: Placement = 'bottom';

  override connectedCallback() {
    super.connectedCallback();
    this.setOffset();
  }

  private setOffset() {
    const id: string = this.getAttribute('id') || '';
    const targetElement: Element | null = document.querySelector(`[data-coach-mark="${id}"]`);
    if (!targetElement) return;

    this._cleanup = autoUpdate(targetElement, this, () =>
      computePosition(targetElement, this, {
        placement: this.side,
        middleware: [flip(), offset(20)],
      }).then(({ x, y, placement }) => {
        Object.assign(this.style, {
          left: `${x}px`,
          top: `${y}px`,
        });
        this.computedPosition = placement;
        this.requestUpdate();
      })
    );
  }

  protected override render(): TemplateResult {
    return html`
      <div
        class="coach-mark ${this.delay && this.delay !== 'none' ? `delay-${this.delay}` : ''}"
        aria-hidden=${this.hide}
        role="dialog"
        aria-labelledby="coach-mark-heading"
      >
        <div class="coach-mark__wrapper coach-mark-side__${this.computedPosition}">
          <div
            class="coach-mark__content coach-mark-alignment__${this.alignment}"
            style="min-width:${this.width + 'px'}"
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
