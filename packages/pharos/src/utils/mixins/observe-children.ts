import { dedupeMixin } from '@open-wc/dedupe-mixin';
import type { Constructor } from '@open-wc/dedupe-mixin';
import type { LitElement } from 'lit';

// Describes the members a component can override, so overrides are type-checked
export declare class ObserveChildrenInterface {
  protected get _childrenObserverOptions(): MutationObserverInit;
}

/**
 * @param Base The base class for the mixin to modify.
 * @returns A mixin to observe changes to children passed to a component without a slot.
 */
const ObserveChildrenMixinImplementation = <T extends Constructor<LitElement>>(
  Base: T
): T & Constructor<ObserveChildrenInterface> => {
  /**
   * A mixin class to handle observing changes to children.
   */
  class ObserveChildren extends Base {
    private _childrenObserver: MutationObserver | null = null;

    private _handleMutation = (): void => {
      this.requestUpdate();
    };

    /**
     * The mutation types that will trigger an update.
     * Overridable by subclasses to customize which mutations trigger an update.
     */
    protected get _childrenObserverOptions(): MutationObserverInit {
      return {
        attributes: true,
        childList: true,
        subtree: true,
      };
    }

    override connectedCallback(): void {
      super.connectedCallback && super.connectedCallback();
      this._childrenObserver = new MutationObserver(this._handleMutation);
      this._childrenObserver?.observe(this, this._childrenObserverOptions);
    }

    /**
     * Clears any child mutations queued before the update that performUpdate is about to run,
     * since the update already reflects them. Done in performUpdate so it runs even
     * if a subclass's update throws.
     */
    protected override performUpdate(): void {
      this._childrenObserver?.takeRecords();
      super.performUpdate();
    }

    override disconnectedCallback(): void {
      if (this._childrenObserver) {
        this._childrenObserver.disconnect();
        this._childrenObserver = null;
      }
      super.disconnectedCallback && super.disconnectedCallback();
    }
  }
  return ObserveChildren as unknown as T & Constructor<ObserveChildrenInterface>;
};

const ObserveChildrenMixin = dedupeMixin(ObserveChildrenMixinImplementation);

export default ObserveChildrenMixin;
