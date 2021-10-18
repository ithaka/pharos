const originalCustomElements = window.customElements;

// Apply the polyfill
require('@webcomponents/scoped-custom-element-registry');
const scopedCustomElements = window.customElements;

// Restore the original JSDOM instance
window.customElements = originalCustomElements;

const classMethodsOf = (instance) => {
  const prototype = Object.getPrototypeOf(instance);
  const descriptors = Object.getOwnPropertyDescriptors(prototype);

  return Object.entries(descriptors)
    .filter(([, /**/ { value }]) => typeof value === 'function')
    .map((entry) => entry[0]);
};

const overrideOn = (registry) => {
  // as some methods (currently only the define) check the current registry against the window.customElements
  // need to temporarily swap out the registry to make them work correctly, then back goes the original
  return (prop) =>
    (registry[prop] = (...args) => {
      window.customElements = scopedCustomElements;
      const result = scopedCustomElements[prop](...args);
      window.customElements = registry;
      return result;
    });
};

// Swap out all the methods on the original customElements
classMethodsOf(scopedCustomElements).forEach(overrideOn(originalCustomElements));
