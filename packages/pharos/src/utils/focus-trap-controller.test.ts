import { fixture, expect, elementUpdated, aTimeout } from '@open-wc/testing';
import { LitElement, html } from 'lit';
import sinon from 'sinon';
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
      await elementUpdated(host);
      await aTimeout(1); // the focus-trap intentionally waits for a microtask to pass before moving focus

      const trapButton = host.renderRoot.querySelector('#trap-button') as HTMLButtonElement;
      expect(activeElement === trapButton).to.be.true;

      document.removeEventListener('focusin', onFocusIn);
    });

    it('should console.warn when the container selector does not match any element', async () => {
      class FocusTrapBadSelectorElement extends FocusTrapTestElement {
        override render() {
          return html`<div class="not-a-focus-trap"><button>button</button></div>`;
        }
      }
      customElements.define('focus-trap-bad-selector-element', FocusTrapBadSelectorElement);

      const warnSpy = sinon.spy(console, 'warn');
      const host = await fixture<FocusTrapBadSelectorElement>(
        html`<focus-trap-bad-selector-element></focus-trap-bad-selector-element>`
      );

      host.open = true;
      await elementUpdated(host);

      expect(warnSpy.calledOnce).to.be.true;
      expect(warnSpy.firstCall.args[0]).to.include(
        'FocusTrapController: Container not found or trap already active.'
      );
    });

    it('does not create a second trap if activate is called while already active', async () => {
      const host = await fixture<FocusTrapTestElement>(
        html`<focus-trap-test-element></focus-trap-test-element>`
      );

      host.open = true;
      await elementUpdated(host);

      const internalTrap = host.focusTrap['_trap'] as FocusTrap;
      const trapActivateSpy = sinon.spy(internalTrap, 'activate');

      host.open = true;
      await elementUpdated(host);

      const currentInternalTrap = host.focusTrap['_trap'] as FocusTrap;

      expect(currentInternalTrap).to.equal(internalTrap);
      expect(trapActivateSpy.callCount).to.equal(0);
      trapActivateSpy.restore();
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
      await elementUpdated(host);
      await aTimeout(1); // the focus-trap intentionally waits for a microtask to pass before moving focus

      const trapButton = host.renderRoot.querySelector('#trap-button') as HTMLButtonElement;
      expect(activeElement === trapButton).to.be.true;

      host.open = false;
      await elementUpdated(host);
      await aTimeout(1);

      expect(activeElement === trigger).to.be.true;
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
      await elementUpdated(host);
      host.open = false;
      await elementUpdated(host);

      activeElement = null;
      host.open = true;
      await elementUpdated(host);
      await aTimeout(1); // the focus-trap intentionally waits for a microtask to pass before moving focus

      const trapButton = host.renderRoot.querySelector('#trap-button') as HTMLButtonElement;
      expect(activeElement === trapButton).to.be.true;

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
      await elementUpdated(host);

      host.remove();
      await elementUpdated(host);

      expect(activeElement === trigger).to.be.true;

      document.removeEventListener('focusin', onFocusIn);
    });
  });

  describe('option management', () => {
    it('passes additional options through to the underlying focus-trap library', async () => {
      const onActivate = sinon.spy();
      const host = await fixture<FocusTrapTestElement>(new FocusTrapTestElement({ onActivate }));

      host.open = true;

      expect(onActivate.calledOnce).to.be.true;
    });
  });
});
