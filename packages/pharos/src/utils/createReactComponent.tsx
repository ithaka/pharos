import {
  useLayoutEffect,
  useRef,
  createElement,
  forwardRef,
  useImperativeHandle,
  useContext,
} from 'react';
import type { RefObject, FC, Ref, DetailedHTMLProps, HTMLAttributes } from 'react';
import { PharosContext } from './PharosContext';

/**
 * Converts React event name to its web component counterpart.
 *
 * @param key The React event name.
 * @return Web component event name.
 * @example
 * onChange => change
 */
const toEventName = (key: string): string => {
  return key.replace(/^(on)/, '').toLowerCase();
};

/**
 * Converts React prop name in camel case to web component attribute in kebab case.
 *
 * @param prop The React prop.
 * @return Web component attribute.
 * @example
 * hideLabel => hide-label
 */
const camelToKebab = (prop: string): string => {
  return prop.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
};

/**
 * Creates a React component that updates to changes in the web component's props and events.
 *
 * @param name The tag name of the web component.
 * @returns A React component working as a wrapper for the web component.
 */
const createReactComponent = (name: string): FC => {
  return forwardRef(
    (props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>, ref: Ref<HTMLElement>) => {
      const elementRef: RefObject<HTMLElement> = useRef<HTMLElement>(null);

      useLayoutEffect(() => {
        const { current } = elementRef;

        Object.entries(props).forEach(([prop, value]) => {
          if (prop === 'children' || prop === 'style' || current === null || prop == 'prefix') {
            return;
          } else if (prop === 'className' || prop === 'tabIndex') {
            current[prop as string] = value;
          } else if (typeof value === 'function' && prop.match(/^on[A-Z]/)) {
            current.addEventListener(toEventName(prop), value as EventListener);
          } else if (typeof value === 'string' || typeof value === 'number') {
            current.setAttribute(camelToKebab(prop), value as string);
          } else if (typeof value === 'boolean') {
            const attr = camelToKebab(prop);
            if (value) {
              current.setAttribute(attr, '');
            } else {
              current.removeAttribute(attr);
            }
          } else {
            current[prop] = value;
          }
        });

        return (): void => {
          Object.entries(props).forEach(([prop, value]) => {
            if (typeof value === 'function' && prop.match(/^on[A-Z]/)) {
              current?.removeEventListener(toEventName(prop), value as EventListener);
            }
          });
        };
      });

      useImperativeHandle(ref, () => elementRef.current as HTMLElement);

      const { children, style } = props;
      const context = useContext(PharosContext);

      const prefix = props.prefix || context?.prefix;
      const tagName = prefix ? `${prefix}-${name}` : name;
      return createElement(tagName, { ref: elementRef, style }, children);
    }
  );
};

export default createReactComponent;
