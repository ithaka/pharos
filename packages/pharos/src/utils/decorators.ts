/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

export type Constructor<T> = {
  // tslint:disable-next-line:no-any
  new (...args: any[]): T;
};

// From the TC39 Decorators proposal
interface ClassDescriptor {
  kind: 'class';
  elements: ClassElement[];
  finisher?: <T>(clazz: Constructor<T>) => undefined | Constructor<T>;
}

// From the TC39 Decorators proposal
interface ClassElement {
  kind: 'field' | 'method';
  key: PropertyKey;
  placement: 'static' | 'prototype' | 'own';
  initializer?: Function;
  extras?: ClassElement[];
  finisher?: <T>(clazz: Constructor<T>) => undefined | Constructor<T>;
  descriptor?: PropertyDescriptor;
}

const attemptCustomElementDefinition = (tagName: string, clazz: Constructor<HTMLElement>) => {
  if (!window.customElements.get(tagName)) {
    window.customElements.define(tagName, clazz);
  } else {
    console.warn(
      `DUPLICATE WEB COMPONENT DEFINITION`,
      `\n<${tagName}> would be redefined, but is being skipped.`,
      `\nMultiple components may depend on <${tagName}>, or it was imported multiple times.`,
      `\nConsider moving the <${tagName}> import to a more common location for this page.`
    );
  }
};

const legacyCustomElement = (tagName: string, clazz: Constructor<HTMLElement>) => {
  attemptCustomElementDefinition(tagName, clazz);
  // Cast as any because TS doesn't recognize the return type as being a
  // subtype of the decorated class when clazz is typed as
  // `Constructor<HTMLElement>` for some reason.
  // `Constructor<HTMLElement>` is helpful to make sure the decorator is
  // applied to elements however.
  // tslint:disable-next-line:no-any
  return clazz as any;
};

const standardCustomElement = (tagName: string, descriptor: ClassDescriptor) => {
  const { kind, elements } = descriptor;
  return {
    kind,
    elements,
    // This callback is called once the class is otherwise fully defined
    finisher(clazz: Constructor<HTMLElement>) {
      attemptCustomElementDefinition(tagName, clazz);
    },
  };
};

/**
 * Class decorator factory that defines the decorated class as a custom element.
 *
 * ```
 * @customElement('my-element')
 * class MyElement {
 *   render() {
 *     return html``;
 *   }
 * }
 * ```
 * @category Decorator
 * @param tagName The name of the custom element to define.
 */
export const customElement =
  (tagName: string) => (classOrDescriptor: Constructor<HTMLElement> | ClassDescriptor) =>
    typeof classOrDescriptor === 'function'
      ? legacyCustomElement(tagName, classOrDescriptor)
      : standardCustomElement(tagName, classOrDescriptor);
