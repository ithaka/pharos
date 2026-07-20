import { afterEach, describe, expect, it, vi } from 'vitest';
import { LitElement, html } from 'lit';
import { fixture } from '../test/fixture';
import { FocusTrapController } from './focus-trap-controller';
import type { FocusTrap } from 'focus-trap';

// Minimal component that uses FocusTrapController for testing
class FocusTrapTestElement extends LitElement {
  readonly focusTrap: FocusTrapController;

  constructor(options?: ConstructorParameters<typeof FocusTrapController>[2]) {
    super();
    this.focusTrap = new FocusTrapController(this, '.focus-trap', options);
  }

  set open(value: boolean) {
    if (value) {
      this.focusTrap.activate();
    } else {
      this.focusTrap.deactivate();
    }
  }

  override render() {
    return html`
      <div class="focus-trap">
        <button id="trap-button">Trapped button</button>
      </div>
    `;
  }
}
customElements.define('focus-trap-test-element', FocusTrapTestElement);

describe('FocusTrapController', () => {
  afterEach(() => document.body.replaceChildren());

  describe('activate()', () => {
    it('traps focus inside the container when activated', async () => {
      let activeElement: EventTarget | null = null;

      const onFocusIn = (event: Event) => {
        activeElement = event.composedPath()[0];
      };

      document.addEventListener('focusin', onFocusIn);

      const host = await fixture<FocusTrapTestElement>(
        html`<focus-trap-test-element></focus-trap-test-element>`
      );

      host.open = true;
      await host.updateComplete;
      await new Promise((resolve) => setTimeout(resolve, 1)); // the focus-trap intentionally waits for a microtask to pass before moving focus

      const trapButton = host.renderRoot.querySelector('#trap-button') as HTMLButtonElement;
      expect(activeElement === trapButton).toBe(true);

      document.removeEventListener('focusin', onFocusIn);
    });

    it('should console.warn when the container selector does not match any element', async () => {
      class FocusTrapBadSelectorElement extends FocusTrapTestElement {
        override render() {
          return html`<div class="not-a-focus-trap"><button>button</button></div>`;
        }
      }
      customElements.define('focus-trap-bad-selector-element', FocusTrapBadSelectorElement);

      const warnSpy = vi.spyOn(console, 'warn');
      const host = await fixture<FocusTrapBadSelectorElement>(
        html`<focus-trap-bad-selector-element></focus-trap-bad-selector-element>`
      );

      host.open = true;
      await host.updateComplete;

      expect(warnSpy).toHaveBeenCalledOnce();
      expect(warnSpy.mock.calls[0][0]).toContain(
        'FocusTrapController: Container not found or trap already active.'
      );
    });

    it('does not create a second trap if activate is called while already active', async () => {
      const host = await fixture<FocusTrapTestElement>(
        html`<focus-trap-test-element></focus-trap-test-element>`
      );

      host.open = true;
      await host.updateComplete;

      const internalTrap = host.focusTrap['_trap'] as FocusTrap;
      const trapActivateSpy = vi.spyOn(internalTrap, 'activate');

      host.open = true;
      await host.updateComplete;

      const currentInternalTrap = host.focusTrap['_trap'] as FocusTrap;

      expect(currentInternalTrap).toBe(internalTrap);
      expect(trapActivateSpy).not.toHaveBeenCalled();
      trapActivateSpy.mockRestore();
    });
  });

  describe('deactivate()', () => {
    it('returns focus to the previously focused element on deactivate by default', async () => {
      let activeElement: EventTarget | null = null;
      const onFocusIn = (event: Event) => {
        activeElement = event.composedPath()[0];
      };
      document.addEventListener('focusin', onFocusIn);

      const trigger = document.createElement('button');
      trigger.id = 'focus-trap-trigger';
      document.body.appendChild(trigger);
      trigger.focus();

      const host = await fixture<FocusTrapTestElement>(
        html`<focus-trap-test-element></focus-trap-test-element>`
      );
      host.open = true;
      await host.updateComplete;
      await new Promise((resolve) => setTimeout(resolve, 1)); // the focus-trap intentionally waits for a microtask to pass before moving focus

      const trapButton = host.renderRoot.querySelector('#trap-button') as HTMLButtonElement;
      expect(activeElement === trapButton).toBe(true);

      host.open = false;
      await host.updateComplete;
      await new Promise((resolve) => setTimeout(resolve, 1));

      expect(activeElement === trigger).toBe(true);
    });

    it('allows the trap to be reactivated after deactivation', async () => {
      let activeElement: EventTarget | null = null;
      const onFocusIn = (event: Event) => {
        activeElement = event.composedPath()[0];
      };
      document.addEventListener('focusin', onFocusIn);

      const host = await fixture<FocusTrapTestElement>(
        html`<focus-trap-test-element></focus-trap-test-element>`
      );
      host.open = true;
      await host.updateComplete;
      host.open = false;
      await host.updateComplete;

      activeElement = null;
      host.open = true;
      await host.updateComplete;
      await new Promise((resolve) => setTimeout(resolve, 1)); // the focus-trap intentionally waits for a microtask to pass before moving focus

      const trapButton = host.renderRoot.querySelector('#trap-button') as HTMLButtonElement;
      expect(activeElement === trapButton).toBe(true);

      document.removeEventListener('focusin', onFocusIn);
    });
  });

  describe('hostDisconnected()', () => {
    it('deactivates the trap when the host element is removed from the DOM', async () => {
      const trigger = document.createElement('button');
      trigger.id = 'disconnect-trigger';
      document.body.appendChild(trigger);

      let activeElement: EventTarget | null = null;
      const onFocusIn = (event: Event) => {
        activeElement = event.composedPath()[0];
      };
      document.addEventListener('focusin', onFocusIn);

      trigger.focus();

      const host = await fixture<FocusTrapTestElement>(
        html`<focus-trap-test-element></focus-trap-test-element>`
      );
      host.open = true;
      await host.updateComplete;

      host.remove();
      await host.updateComplete;

      expect(activeElement === trigger).toBe(true);

      document.removeEventListener('focusin', onFocusIn);
    });
  });

  describe('option management', () => {
    it('passes additional options through to the underlying focus-trap library', async () => {
      const onActivate = vi.fn();
      const host = new FocusTrapTestElement({ onActivate });
      document.body.appendChild(host);
      await host.updateComplete;

      host.open = true;

      expect(onActivate).toHaveBeenCalledOnce();
    });
  });
});
