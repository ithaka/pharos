import { render } from 'lit';
import type { TemplateResult } from 'lit';

interface FixtureOptions {
  /**
   * Render the template into this element instead of a fresh wrapper, and
   * attach the element itself to the document.
   */
  parentNode?: HTMLElement;
}

const hasUpdateComplete = (value: unknown): value is { updateComplete: Promise<unknown> } => {
  const update = (value as { updateComplete?: { then?: unknown } } | null)?.updateComplete;
  return typeof update?.then === 'function';
};

const mount = (template: TemplateResult, parentNode?: HTMLElement): Element => {
  // Clear the document body to ensure there are no elements left from earlier tests in the same file.
  document.body.replaceChildren();

  const container = parentNode ?? document.createElement('div');
  document.body.appendChild(container);

  render(template, container);

  return container.firstElementChild as Element;
};

/**
 * Render a Lit template into a container attached to the document and
 * resolve once the first element has finished its initial update.
 */
export async function fixture<T extends Element>(
  template: TemplateResult,
  options: FixtureOptions = {}
): Promise<T> {
  const element = mount(template, options.parentNode) as T;
  // This ensures the shadow DOM  is ready for testing before returning the element.
  if (hasUpdateComplete(element)) await element.updateComplete;
  return element;
}

/**
 * Mounts a Lit template but expects the element's first
 * update to *reject* — returns the thrown error instead of letting it surface
 * as an unhandled rejection.
 */
export async function errorFixture(
  template: TemplateResult,
  options: FixtureOptions = {}
): Promise<Error> {
  const element = mount(template, options.parentNode);
  if (!hasUpdateComplete(element)) {
    throw new Error('fixtureError: element has no updateComplete to reject');
  }
  try {
    await element.updateComplete;
  } catch (error) {
    return error as Error;
  }
  throw new Error('fixtureError: expected the element update to reject, but it resolved');
}
