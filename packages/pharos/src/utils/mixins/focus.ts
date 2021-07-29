import { dedupeMixin } from '@open-wc/dedupe-mixin';
import type { Constructor } from '@open-wc/dedupe-mixin';
import focusable from '../focusable';

/**
 * @param Base The base class for the mixin to modify.
 * @returns A mixin to delegate focus to pharos components.
 */
const FocusMixinImplementation = <T extends Constructor<HTMLElement>>(Base: T): T => {
  /**
   * A mixin class to handle focusing pharos components.
   */
  class Focus extends Base {
    public override focus(): void {
      const target = this.shadowRoot?.querySelector(focusable) || this.querySelector(focusable);
      (target as HTMLElement)?.focus();
    }
  }
  return Focus;
};

const FocusMixin = dedupeMixin(FocusMixinImplementation);

export default FocusMixin;
