/**
 * @param observer The observer used to report changes to the content box of the element.
 * @param element The element to be observed.
 * @returns A handle with a release method to stop observing resize changes.
 */
const observeResize = (observer: ResizeObserver, element: Element): Handle => {
  observer.observe(element);
  return {
    release() {
      observer.unobserve(element);
      return null;
    },
  } as Handle;
};

export default observeResize;
