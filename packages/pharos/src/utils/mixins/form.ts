import { dedupeMixin } from '@open-wc/dedupe-mixin';
import type { Constructor } from '@open-wc/dedupe-mixin';

/**
 * @param Base The base class for the mixin to modify.
 * @returns A mixin to handle the `formdata` event on the containing form.
 */
const FormMixinImplementation = <T extends Constructor<HTMLElement>>(Base: T): T => {
  /**
   * A mixin class to handle the `formdata` event on the containing form.
   */
  abstract class Form extends Base {
    /**
     * Handles the `formdata` event.
     * @param event The event.
     */
    abstract _handleFormdata(event: Event): void;

    /**
     * Handles the `reset` event.
     */
    abstract _handleFormReset(): void;

    /* eslint-disable @typescript-eslint/no-explicit-any */
    constructor(...args: any[]) {
      super(...args);
      this._handleFormdata = this._handleFormdata.bind(this);
      this._handleFormReset = this._handleFormReset.bind(this);
    }

    override connectedCallback(): void {
      super.connectedCallback && super.connectedCallback();
      const form = this.closest('form');
      if (form) {
        form.addEventListener('formdata', this._handleFormdata);
        form.addEventListener('reset', this._handleFormReset);
      }
    }

    override disconnectedCallback(): void {
      const form = this.closest('form');
      if (form) {
        form.removeEventListener('formdata', this._handleFormdata);
        form.removeEventListener('reset', this._handleFormReset);
      }
      super.disconnectedCallback && super.disconnectedCallback();
    }
  }

  return Form;
};

const FormMixin = dedupeMixin(FormMixinImplementation);

export default FormMixin;
