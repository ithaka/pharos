import { PharosElement } from './pharos-element';
import { property } from 'lit/decorators.js';
import type { PropertyValues } from 'lit';
import type {
  Side,
  Placement,
  AlignedPlacement,
  Strategy as PositioningStrategy,
} from '@floating-ui/dom/dist/floating-ui.dom';
export {
  arrow,
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
} from '@floating-ui/dom/dist/floating-ui.dom';

export type { Placement, PositioningStrategy, Side };

export const allStrategies = ['absolute', 'fixed'] as PositioningStrategy[];
const SIDES = ['top', 'right', 'bottom', 'left'] as Side[];
export const allPlacements = SIDES.reduce(
  (acc: Placement[], side) =>
    acc.concat(side, `${side}-start` as AlignedPlacement, `${side}-end` as AlignedPlacement),
  []
) as Placement[];

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
  public placement: Placement | 'auto' = 'top'; // 'auto' kept for backward compatibility; remove in next major version

  /**
   * List of placements to try in the order provided when no space is available for the preferred placement.
   */
  @property({ attribute: false })
  public fallbackPlacements?: (Placement | 'auto')[]; // 'auto' kept for backward compatibility; remove in next major version

  /**
   * Describes the positioning strategy to use. If your target element is in a fixed container, use the fixed strategy.
   * @attr strategy
   */
  @property({ reflect: true })
  public strategy: PositioningStrategy = 'absolute';

  protected _filteredFallbackPlacements?: Placement[];

  protected override update(changedProperties: PropertyValues): void {
    super.update && super.update(changedProperties);

    if (changedProperties.has('placement')) {
      if (
        this.placement !== 'auto' && // 'auto' kept for backward compatibility; remove in next major version
        !allPlacements.includes(this.placement)
      ) {
        throw new Error(
          `${this.placement} is not a valid placement. Valid placements are: ${allPlacements.join(
            ', '
          )}`
        );
      }

      if (this.placement === 'auto') {
        console.warn(
          'The auto placement will be removed in the next major version of Pharos, as this is now the default behavior.'
        );
      }
    }
    if (changedProperties.has('fallbackPlacements')) {
      const invalid = this.fallbackPlacements?.filter(
        (fallback) => fallback !== 'auto' && !allPlacements.includes(fallback) // 'auto' kept for backward compatibility; remove in next major version
      );

      if (this.fallbackPlacements?.includes('auto')) {
        console.warn(
          'The auto placement will be removed in the next major version of Pharos, as this is now the default behavior.'
        );
      }
      this._filteredFallbackPlacements = this.fallbackPlacements?.filter(
        (fallback) => fallback !== 'auto'
      ) as Placement[];

      if (invalid?.length) {
        throw new Error(
          `${invalid.join(', ')} are not valid fallbacks. Valid fallbacks are: ${allPlacements.join(
            ', '
          )}`
        );
      }
    }
    if (changedProperties.has('strategy') && !allStrategies.includes(this.strategy)) {
      throw new Error(
        `${
          this.strategy
        } is not a valid positioning strategy. Valid strategies are: ${allStrategies.join(', ')}`
      );
    }
  }
}
