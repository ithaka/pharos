import type { LitElement } from 'lit';
import registerComponents from '../registerComponents';

/**
 * Registers Pharos classes with the `storybook` prefix, skipping any already defined.
 *
 * Each story module registers the components it renders so Chromatic TurboSnap
 * can trace which stories depend on which component source files.
 *
 * @param classes The Pharos classes to register as custom elements.
 */
const registerStorybookComponents = (classes: (typeof LitElement)[]): void => {
  const toTagName = (theClass: typeof LitElement): string =>
    `storybook-${theClass.name
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .replace(/[\s_]+/g, '-')
      .toLowerCase()}`;

  registerComponents(
    'storybook',
    classes.filter((theClass) => !customElements.get(toTagName(theClass)))
  );
};

export default registerStorybookComponents;
