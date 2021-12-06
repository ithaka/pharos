import type { LitElement } from 'lit';
import PharosComponentMixin from './mixins/pharos-component';

/**
 * @param prefix The prefix to use in the tag name.
 * @param classes The Pharos classes to register as custom elements.
 */
const registerComponents = (prefix: string, classes: typeof LitElement[]): void => {
  classes.forEach((clazz) => {
    const kebab = clazz.name
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase();

    // Define with a trivial subclass to ensure uniqueness and use Pharos component mixin to ensure base class name is used on attribute
    customElements.define(
      `${prefix ? prefix + '-' : ''}${kebab}`,
      class extends PharosComponentMixin(clazz) {}
    );
  });
};

export default registerComponents;
