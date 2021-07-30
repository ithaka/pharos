import { dedupeMixin } from '@open-wc/dedupe-mixin';
import type { Constructor } from '@open-wc/dedupe-mixin';
import type { LitElement } from 'lit';

/**
 * @param Base The base class for the mixin to modify.
 * @returns A mixin to observe changes to children passed to a component without a slot.
 */
const ObserveChildrenMixinImplementation = <T extends Constructor<LitElement>>(Base: T): T => {
  /**
   * A mixin class to handle observing changes to children.
   */
  class ObserveChildren extends Base {
    private _childrenObserver: MutationObserver | null = null;

    private _handleMutation = (): void => {
      this.requestUpdate();
    };

    override connectedCallback(): void {
      super.connectedCallback && super.connectedCallback();
      this._childrenObserver = new MutationObserver(this._handleMutation);
      this._childrenObserver?.observe(this, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    }

    override disconnectedCallback(): void {
      if (this._childrenObserver) {
        this._childrenObserver.disconnect();
        this._childrenObserver = null;
      }
      super.disconnectedCallback && super.disconnectedCallback();
    }
  }
  return ObserveChildren;
};

const ObserveChildrenMixin = dedupeMixin(ObserveChildrenMixinImplementation);

export default ObserveChildrenMixin;
