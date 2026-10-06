import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { LitElement, html } from 'lit';
import { fixture } from '../../test/fixture';
import ObserveChildrenMixin from './observe-children';

// Minimal component that uses ObserveChildrenMixin and counts its updates
class ObserveChildrenTestElement extends ObserveChildrenMixin(LitElement) {
  public updateCount = 0;

  protected override updated(): void {
    this.updateCount++;
  }
}
customElements.define('observe-children-test-element', ObserveChildrenTestElement);

// Narrows the observed mutations to text edits and the value attribute
class ObserveChildrenOptionsTestElement extends ObserveChildrenTestElement {
  protected override get _childrenObserverOptions(): MutationObserverInit {
    return {
      childList: true,
      subtree: true,
      characterData: true,
      attributeFilter: ['value'],
    };
  }
}
customElements.define('observe-children-options-test-element', ObserveChildrenOptionsTestElement);

// Waits for the mutation observer callback and any update it requests
const settle = async (element: ObserveChildrenTestElement): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve));
  await element.updateComplete;
};

describe('ObserveChildrenMixin', () => {
  let component: ObserveChildrenTestElement;

  afterEach(() => document.body.replaceChildren());

  describe('with the default options', () => {
    beforeEach(async () => {
      component = await fixture(
        html`<observe-children-test-element><span>text</span></observe-children-test-element>`
      );
      component.updateCount = 0;
    });

    it('updates when a child is added', async () => {
      component.appendChild(document.createElement('span'));
      await settle(component);
      expect(component.updateCount).toBe(1);
    });

    it('updates when a child is removed', async () => {
      component.querySelector('span')?.remove();
      await settle(component);
      expect(component.updateCount).toBe(1);
    });

    it('updates when an attribute on a descendant changes', async () => {
      component.querySelector('span')?.setAttribute('data-test', 'changed');
      await settle(component);
      expect(component.updateCount).toBe(1);
    });

    it('does not update when the text of a descendant changes', async () => {
      (component.querySelector('span')?.firstChild as Text).data = 'changed';
      await settle(component);
      expect(component.updateCount).toBe(0);
    });

    it('does not update again for mutations made before a pending update', async () => {
      component.requestUpdate();
      component.querySelector('span')?.setAttribute('data-test', 'changed');
      await settle(component);
      expect(component.updateCount).toBe(1);
    });
  });

  describe('with overridden options', () => {
    beforeEach(async () => {
      component = await fixture(
        html`<observe-children-options-test-element
          ><span>text</span></observe-children-options-test-element
        >`
      );
      component.updateCount = 0;
    });

    it('updates when the text of a descendant changes', async () => {
      (component.querySelector('span')?.firstChild as Text).data = 'changed';
      await settle(component);
      expect(component.updateCount).toBe(1);
    });

    it('updates when a filtered attribute on a descendant changes', async () => {
      component.querySelector('span')?.setAttribute('value', '1');
      await settle(component);
      expect(component.updateCount).toBe(1);
    });

    it('does not update when an unfiltered attribute on a descendant changes', async () => {
      component.querySelector('span')?.setAttribute('data-test', 'changed');
      await settle(component);
      expect(component.updateCount).toBe(0);
    });
  });
});
