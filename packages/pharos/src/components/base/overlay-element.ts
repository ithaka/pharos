import { PharosElement } from './pharos-element';
import { property } from 'lit/decorators.js';
import type { PropertyValues } from 'lit';
import deepSelector from '../../utils/deepSelector';
import { placements } from '../../utils/popper';
import type { Instance, Options, Placement, PositioningStrategy } from '../../utils/popper';

export type { Placement, PositioningStrategy };

const STRATEGIES = ['absolute', 'fixed'];

/**
 * The base overlay element class to house shared properties, styles, and methods.
 *
 */
export class OverlayElement extends PharosElement {
  /**
   * Indicates if the overlay is open.
   * @attr open
   */
  @property({ type: Boolean, reflect: true })
  public open = false;

  /**
   * Describes the preferred placement of the overlay.
   * @attr placement
   */
  @property({ reflect: true })
  public placement: Placement = 'top';

  /**
   * List of placements for popper to try in the order provided when no space is available for the preferred placement.
   */
  @property({ attribute: false })
  public fallbackPlacements?: Placement[];

  /**
   * Describes the positioning strategy to use. If your target element is in a fixed container, use the fixed strategy.
   * @attr strategy
   */
  @property({ reflect: true })
  public strategy: PositioningStrategy = 'absolute';

  protected _popper?: Instance;
  protected _options?: Options;

  protected override update(changedProperties: PropertyValues): void {
    super.update && super.update(changedProperties);

    if (changedProperties.has('placement') && !placements.includes(this.placement)) {
      throw new Error(
        `${this.placement} is not a valid placement. Valid placements are: ${placements.join(', ')}`
      );
    }
    if (changedProperties.has('fallbackPlacements')) {
      const invalid = this.fallbackPlacements?.filter((fallback) => !placements.includes(fallback));
      if (invalid?.length) {
        throw new Error(
          `${invalid.join(', ')} are not valid fallbacks. Valid fallbacks are: ${placements.join(
            ', '
          )}`
        );
      }
    }
    if (changedProperties.has('strategy') && !STRATEGIES.includes(this.strategy)) {
      throw new Error(
        `${
          this.strategy
        } is not a valid positioning strategy. Valid strategies are: ${STRATEGIES.join(', ')}`
      );
    }
  }

  protected override updated(changedProperties: PropertyValues): void {
    if (
      changedProperties.has('placement') ||
      changedProperties.has('fallbackPlacements') ||
      changedProperties.has('strategy') ||
      changedProperties.has('boundary')
    ) {
      if (this._options) {
        this._options.placement = this.placement;
        this._options.strategy = this.strategy;

        const flip = this._options.modifiers.find(({ name }) => name === 'flip');
        if (flip?.options) {
          flip.options.fallbackPlacements = this.fallbackPlacements;
        }

        const preventOverflow = this._options.modifiers.find(
          ({ name }) => name === 'preventOverflow'
        );
        if (preventOverflow?.options) {
          preventOverflow.options.boundary =
            this.boundary === 'clippingParents' ? this.boundary : deepSelector(`#${this.boundary}`);
        }

        this._popper?.setOptions(this._options);
      }
    }
  }

  protected _setPopperListeners(): void {
    // Enable listeners when open and disable them when closed
    if (this._options) {
      const listeners = this._options.modifiers.pop();

      if (listeners?.options) {
        listeners.options.scroll = this.open;
        listeners.options.resize = this.open;
      }

      this._options.modifiers.push(listeners || {});
      this._popper?.setOptions(this._options);
    }
  }
}
