import { html } from 'lit';
import { property, queryAssignedNodes, query, state } from 'lit/decorators.js';
import type { PropertyValues, TemplateResult, CSSResultArray } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { styleMap } from 'lit/directives/style-map.js';
import { createPopper } from '../../utils/popper';
import debounce from '../../utils/debounce';
import observeResize from '../../utils/observeResize';
import deepSelector from '../../utils/deepSelector';
import { tooltipStyles } from './pharos-tooltip.css';
import { customElement } from '../../utils/decorators';

import { OverlayElement } from '../base/overlay-element';
import type { Placement, PositioningStrategy } from '../base/overlay-element';
export type { Placement, PositioningStrategy };

/**
 * Pharos tooltip component.
 *
 * @element pharos-tooltip
 *
 * @slot - Content inside the tooltip (the default slot).
 *
 * @cssprop {Length} --pharos-tooltip-size-text-base - Tooltip font size.
 * @cssprop {Color} --pharos-tooltip-color-background-base - Font color for the bubble.
 * @cssprop {Color} --pharos-tooltip-color-text-base - Font color for the text.
 */
@customElement('pharos-tooltip')
export class PharosTooltip extends OverlayElement {
  /**
   * Indicates if the tooltip width should equal its target's width.
   * @attr full-width
   */
  @property({ type: Boolean, reflect: true, attribute: 'full-width' })
  public fullWidth = false;

  /**
   * The custom boundary that the tooltip should stay within.
   * @attr boundary
   */
  @property({ type: String, reflect: true })
  public boundary = 'clippingParents';

  @queryAssignedNodes()
  private _contentNodes!: NodeListOf<HTMLElement>;

  @query('.tooltip__caret')
  private _caret!: HTMLSpanElement;

  @query('.tooltip__bubble')
  private _bubble!: HTMLSpanElement;

  @state()
  private _textLength = 0;

  @state()
  private _targetWidth = 0;

  private _hasHover = false;
  private _hasFocus = false;
  private _observeResizeTrigger: Handle | null = null;
  private _triggers!: HTMLElement[];
  private _currentTrigger: Element | null = null;

  private _resizeObserver: ResizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
    const { offsetWidth } = entries[0].target as HTMLElement;
    const paddingLeft = parseInt(
      window.getComputedStyle(this._bubble, null).getPropertyValue('padding-left'),
      10
    );
    const paddingRight = parseInt(
      window.getComputedStyle(this._bubble, null).getPropertyValue('padding-right'),
      10
    );
    this._targetWidth = offsetWidth - (paddingLeft + paddingRight);
    this._popper?.update();
  });

  private _contentObserver: MutationObserver = new MutationObserver(
    (mutationsList: MutationRecord[]) => {
      this._textLength = (mutationsList[0].target as CharacterData).length;
      this._popper?.update();
    }
  );

  protected get content(): HTMLElement | Text {
    return Array.prototype.slice
      .call(this._contentNodes)
      ?.find((node) => node.textContent && node.nodeName === '#text');
  }

  constructor() {
    super();
    this._handleKeydown = this._handleKeydown.bind(this);
    this._handleHover = this._handleHover.bind(this);
    this._handleFocus = this._handleFocus.bind(this);
    this._handleClose = this._handleClose.bind(this);
  }

  public static get styles(): CSSResultArray {
    return [tooltipStyles];
  }

  protected firstUpdated(): void {
    this._setTextLength();

    this.addEventListener('mouseenter', this._handleBubbleHover);
    this.addEventListener('mouseleave', this._handleBubbleHover);
    this._addTriggerListeners();

    this._contentObserver.observe(this.content, {
      subtree: true,
      characterData: true,
    });
  }

  protected update(changedProperties: PropertyValues): void {
    super.update && super.update(changedProperties);
  }

  private _isTextLong() {
    return this._textLength > 30;
  }

  protected updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('open')) {
      if (
        this.open &&
        (!this._popper || this._popper?.state.elements.reference !== this._currentTrigger)
      ) {
        this._setup();
      }

      if (!this.open) {
        this._currentTrigger = null;
      }

      this._setPopperListeners();
      this._setupResizeObserver();
    }

    if (changedProperties.has('boundary')) {
      const boundaryElement = document.querySelector(`#${this.boundary}`);
      if (boundaryElement) {
        const boundaryElementWidth = boundaryElement.clientWidth;
        const padding = this._isTextLong() ? 16 : 8;
        this._targetWidth = boundaryElementWidth - padding * 2 - 16 * 2;
      }
    }

    super.updated(changedProperties);
  }

  connectedCallback(): void {
    super.connectedCallback && super.connectedCallback();
    document.addEventListener('keydown', this._handleKeydown);
    document.addEventListener('pharos-tooltip-close', this._handleClose as EventListener);

    this._addTriggerListeners();
  }

  disconnectedCallback(): void {
    document.removeEventListener('keydown', this._handleKeydown);
    document.removeEventListener('pharos-tooltip-close', this._handleClose as EventListener);

    this._triggers.forEach((trigger) => {
      trigger.removeEventListener('mouseenter', this._handleHover);
      trigger.removeEventListener('mouseleave', this._handleHover);
      trigger.removeEventListener('focusin', this._handleFocus);
      trigger.removeEventListener('focusout', this._handleFocus);
      trigger.removeAttribute('aria-describedby');
    });

    this._releaseObserver();
    this._contentObserver.disconnect();
    super.disconnectedCallback && super.disconnectedCallback();
  }

  private _addTriggerListeners(): void {
    const id = this.getAttribute('id') || '';
    // To support triggers within other ShadowRoots such as the tooltip for comboboxes
    const root = this.getRootNode() as Document | ShadowRoot;

    this._triggers = Array.prototype.slice.call(root.querySelectorAll(`[data-tooltip-id="${id}"]`));
    this._triggers.forEach((trigger) => {
      trigger.addEventListener('mouseenter', this._handleHover);
      trigger.addEventListener('mouseleave', this._handleHover);
      trigger.addEventListener('focusin', this._handleFocus);
      trigger.addEventListener('focusout', this._handleFocus);
      trigger.setAttribute('aria-describedby', id);
    });
  }

  private _setup(): void {
    this._findSingleTrigger();

    if (this._currentTrigger && this._bubble) {
      this._options = {
        placement: this.placement,
        modifiers: [
          {
            name: 'flip',
            options: {
              fallbackPlacements: this.fallbackPlacements,
            },
          },
          {
            name: 'arrow',
            options: {
              element: this._caret,
              padding: 8,
            },
          },
          {
            name: 'offset',
            options: {
              offset: [0, 10],
            },
          },
          {
            name: 'eventListeners',
            options: {
              scroll: this.open,
              resize: this.open,
            },
          },
          {
            name: 'preventOverflow',
            options: {
              boundary:
                this.boundary === 'clippingParents'
                  ? this.boundary
                  : deepSelector(`#${this.boundary}`),
            },
          },
        ],
        strategy: this.strategy,
      };

      this._popper = createPopper(this._currentTrigger, this, this._options);
    }
  }

  private _setOpen(): void {
    if (this._hasHover || this._hasFocus) {
      this._closeOpenTooltips();
      this.open = true;
    } else {
      this.open = false;
    }
  }

  private async _handleFocus(event: FocusEvent): Promise<void> {
    if (event.type === 'focusin') {
      await this._setTrigger(event.target as Element);
      this._hasFocus = true;
    } else if (event.type === 'focusout') {
      this._hasFocus = false;
    }

    // Allow CSS transitions to finish for tooltips with multiple triggers
    if (this._triggers.length > 1) {
      await new Promise((r) => setTimeout(r, 100));
    }
    this._setOpen();
  }

  private async _handleHover(event: Event): Promise<void> {
    if (event.type === 'mouseenter') {
      await this._setTrigger(event.target as Element);
      this._hasHover = true;
    } else if (event.type === 'mouseleave') {
      this._hasHover = false;
    }
    debounce(() => {
      this._setOpen();
    }, 100)();
  }

  private async _setTrigger(target: Element): Promise<void> {
    const otherTriggerActive = this._currentTrigger && this._currentTrigger !== target;
    this._currentTrigger = target;

    if (otherTriggerActive) {
      this._hasFocus = false;
      this._hasHover = false;
      this.open = false;
      await this.updateComplete;
      this._currentTrigger = target;
    }
  }

  private _handleBubbleHover(event: Event): void {
    if (event.type === 'mouseenter') {
      this._hasHover = true;
    } else if (event.type === 'mouseleave') {
      this._hasHover = false;
    }
    debounce(() => {
      this._setOpen();
    }, 100)();
  }

  private _handleKeydown(event: KeyboardEvent): void {
    if ((event.key === 'Escape' || event.key === 'Esc') && this.open) {
      event.stopPropagation();
      this.open = false;
    }
  }

  private _setTextLength(): void {
    this._textLength = this.content?.textContent?.trim().length || 0;
  }

  private _closeOpenTooltips(): void {
    const details = {
      bubbles: true,
      composed: true,
      detail: this,
    };
    this.dispatchEvent(new CustomEvent('pharos-tooltip-close', details));
  }

  private _handleClose(event: CustomEvent): void {
    if (event.detail !== this) {
      this.open = false;
    }
  }

  private _setupResizeObserver(): void {
    if (this.open && this.fullWidth && this._currentTrigger) {
      this._releaseObserver();
      this._observeResizeTrigger = observeResize(
        this._resizeObserver,
        this._currentTrigger as Element
      );
    } else {
      this._releaseObserver();
    }
  }

  private _releaseObserver(): void {
    if (this._observeResizeTrigger) {
      this._observeResizeTrigger = this._observeResizeTrigger.release();
    }
  }

  private _findSingleTrigger(): void {
    if (!this._currentTrigger && this._triggers.length === 1) {
      this._currentTrigger = this._triggers[0];
    }
  }

  protected render(): TemplateResult {
    return html`
      <div class="tooltip__body" role="tooltip" aria-hidden="${!this.open}">
        <span
          class=${classMap({
            [`tooltip__bubble`]: true,
            [`tooltip__bubble--text-wrap`]: this._isTextLong(),
          })}
          style=${styleMap(this._targetWidth ? { width: `${this._targetWidth}px` } : {})}
        >
          <slot></slot>
        </span>
        <div class="tooltip__caret"></div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pharos-tooltip': PharosTooltip;
  }
}
