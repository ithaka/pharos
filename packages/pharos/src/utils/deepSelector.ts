/**
 * @param selectors A DOMString containing one or more selectors to match.
 * @param root The node's root.
 * @returns The first element that is a descendant of node that matches the selectors or null.
 */
const deepSelector = (
  selectors: string,
  root: Document | ShadowRoot | null = document
): Element | null => {
  if (!root) return null;

  const inRoot = root.querySelector(selectors);
  if (inRoot) {
    return inRoot;
  } else {
    let inChild = null;
    for (const child of [...root.querySelectorAll('*')].filter((x) => x.shadowRoot)) {
      inChild = deepSelector(selectors, child.shadowRoot);
      if (inChild) break;
    }
    return inChild;
  }
};

export default deepSelector;
