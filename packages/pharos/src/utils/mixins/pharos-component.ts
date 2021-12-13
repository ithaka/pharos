import { dedupeMixin } from '@open-wc/dedupe-mixin';
import type { Constructor } from '@open-wc/dedupe-mixin';
import type { LitElement } from 'lit';

/**
 * @param Base The base class for the mixin to modify.
 * @returns A mixin to set a data attribute with the component class name.
 */
const PharosComponentImplementation = <T extends Constructor<LitElement>>(Base: T): T => {
  /**
   * A mixin class to handle pharos-specific logic.
   */
  class PharosComponent extends Base {
    override connectedCallback(): void {
      super.connectedCallback && super.connectedCallback();

      // Use the base class name to apply on the trivial subclass
      this.dataset.pharosComponent = Base.name;
    }
  }
  return PharosComponent;
};

const PharosComponentMixin = dedupeMixin(PharosComponentImplementation);

export default PharosComponentMixin;
