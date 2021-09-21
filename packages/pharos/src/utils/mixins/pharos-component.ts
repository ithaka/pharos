import { dedupeMixin } from '@open-wc/dedupe-mixin';
import type { Constructor } from '@open-wc/dedupe-mixin';
import type { LitElement } from 'lit';

/**
 * @param Base The base class for the mixin to modify.
 * @returns A mixin to set a data attribute with the component class name.
 */
const PharosComponentImplementation = <T extends Constructor<LitElement>>(Base: T): T => {
  /**
   * A mixin class to handle focusing pharos components.
   */
  class PharosComponent extends Base {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    constructor(...args: any[]) {
      super(...args);
      this.dataset.pharosComponent = this.constructor.name;
    }
  }
  return PharosComponent;
};

const PharosComponentMixin = dedupeMixin(PharosComponentImplementation);

export default PharosComponentMixin;
