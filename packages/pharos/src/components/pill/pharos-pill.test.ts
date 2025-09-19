import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import sinon from 'sinon';

import type { PharosPill } from './pharos-pill';

let component: PharosPill;
describe('PharosPill', () => {
  beforeEach(async () => {
    component = await fixture(html`<test-pharos-pill>Test Pill</test-pharos-pill>`);
  });
  describe('Basic Pill', () => {
    it('is accessible', async () => {
      await expect(component).to.be.accessible();
    });

    it('renders the text slot', async () => {
      expect(component.innerText?.trim()).to.equal('Test Pill');
    });
  });

  describe('Pill Sizes', () => {
    it('defaults to the base size', async () => {
      expect(component.size).to.equal('base');
    });

    it('renders a smaller pill when size is set to "small"', async () => {
      component = await fixture(
        html`<test-pharos-pill size="small">Some pill text</test-pharos-pill>`
      );
      expect(component.size).to.equal('small');
      const pill = component.renderRoot?.querySelector('.pill') as HTMLDivElement;
      expect(pill?.classList.contains('pill--small')).to.be.true;
    });
  });

  describe('Dismissible Pill', () => {
    it('is not dismissible by default', async () => {
      expect(component.dismissible).to.be.false;
      const dismissButton = component.renderRoot?.querySelector('.pill__dismiss-button');
      expect(dismissButton).to.be.null;
    });

    it('renders as a button when dismissible', async () => {
      component = await fixture(
        html`<test-pharos-pill dismissible>Dismissible Pill</test-pharos-pill>`
      );
      expect(component.dismissible).to.be.true;
      const pill = component.renderRoot?.querySelector('button.pill') as HTMLDivElement;
      expect(pill).to.not.be.null;
      expect(pill?.classList.contains('pill--dismissible')).to.be.true;
    });

    it('renders a close icon in the button', async () => {
      component = await fixture(
        html`<test-pharos-pill dismissible>Base Dismissible Pill</test-pharos-pill>`
      );
      const icon = component.renderRoot?.querySelector('svg') as SVGSVGElement | null;
      expect(icon).to.not.be.null;
      const title = icon?.querySelector('title');
      expect(title).to.not.be.null;
      expect(title?.textContent).to.equal('close');
    });

    it('emits pharos-pill-dismissed event when button is clicked', async () => {
      component = await fixture(
        html`<test-pharos-pill dismissible>Event Test Pill</test-pharos-pill>`
      );

      let eventFired = false;
      const handleDismissed = (): void => {
        eventFired = true;
      };
      component.addEventListener('pharos-pill-dismissed', handleDismissed);

      await component.updateComplete;

      const pill = component.renderRoot?.querySelector('button.pill') as HTMLButtonElement;
      pill.click();

      expect(eventFired).to.be.true;
    });
  });

  describe('Pill Colors', () => {
    it(`should set the pill color variable correctly when a color attribute is set`, async () => {
      component = await fixture(
        html`<test-pharos-pill color="jstor-red">Test Pill</test-pharos-pill>`
      );

      const pill = component.renderRoot?.querySelector('.pill') as HTMLDivElement;
      const pillColor = pill.style.getPropertyValue('--pharos-pill-color');
      expect(pillColor).to.equal(`var(--pharos-color-jstor-red)`);
    });

    it('should use default color values when no color attribute is provided', async () => {
      component = await fixture(html`<test-pharos-pill>Test Pill</test-pharos-pill>`);

      const pill = component.renderRoot?.querySelector('.pill') as HTMLDivElement;
      const pillColor = pill.style.getPropertyValue('--pharos-pill-color');
      expect(pillColor).to.equal(`var(--pharos-color-marble-gray-40)`);
    });
  });
  describe('Pill Variants', () => {
    it('should set the correct class when for the primary variant is set', async () => {
      component = await fixture(
        html`<test-pharos-pill variant="primary">Test Pill</test-pharos-pill>`
      );

      const pill = component.renderRoot?.querySelector('.pill') as HTMLDivElement;
      expect(pill.classList.contains('pill--primary')).to.be.true;
    });
    it('should set the correct class when for the secondary variant is set', async () => {
      component = await fixture(
        html`<test-pharos-pill variant="secondary">Test Pill</test-pharos-pill>`
      );

      const pill = component.renderRoot?.querySelector('.pill') as HTMLDivElement;
      expect(pill.classList.contains('pill--secondary')).to.be.true;
    });
    it('should default to the primary variant when one is not set', async () => {
      component = await fixture(html`<test-pharos-pill>Test Pill</test-pharos-pill>`);

      const pill = component.renderRoot?.querySelector('.pill') as HTMLDivElement;
      expect(pill.classList.contains('pill--primary')).to.be.true;
    });
  });
  describe('Icon Handling', () => {
    it('renders the appropriate svg icon when icon-left is provided', async () => {
      component = await fixture(
        html`<test-pharos-pill icon-left="info-inverse">Test Pill</test-pharos-pill>`
      );
      await component.updateComplete;
      // Wait for icon to load asynchronously with longer timeout for cross-browser stability
      await new Promise((resolve) => setTimeout(resolve, 200));

      const icon = component.renderRoot?.querySelector('svg') as SVGSVGElement | null;
      expect(icon).to.not.be.null;
      expect(icon?.querySelector('title')?.textContent).to.equal('info-inverse');
      expect(icon!.getAttribute('height')).to.equal('16');
      expect(icon!.getAttribute('width')).to.equal('16');
    });

    it('adjusts the size of the icon when the pill size is set to small', async () => {
      component = await fixture(
        html`<test-pharos-pill icon-left="search" size="small">Small Pill</test-pharos-pill>`
      );

      await component.updateComplete;
      // Wait for icon to load asynchronously with longer timeout for cross-browser stability
      await new Promise((resolve) => setTimeout(resolve, 200));

      const icon = component.renderRoot?.querySelector('svg') as SVGSVGElement | null;
      expect(icon).to.not.be.null;
      expect(icon!.getAttribute('height')).to.equal('12');
      expect(icon!.getAttribute('width')).to.equal('12');
    });

    it('should throw an error when an invalid icon is passed in', async () => {
      // Stub console.log to suppress expected error logging in test output
      const consoleStub = sinon.stub(console, 'log');

      let caughtError: Error | null = null;
      component = await fixture(html`<test-pharos-pill>Test Pill</test-pharos-pill>`);

      // Stub the updated lifecycle method to capture the error without throwing
      const originalUpdated = (component as any).updated.bind(component);

      sinon.stub(component as any, 'updated').callsFake(async (changedProperties) => {
        try {
          await originalUpdated(changedProperties);
        } catch (error) {
          caughtError = error as Error;
        }
      });

      try {
        component.iconLeft = 'invalid-icon' as any;
        await component.updateComplete;
        await new Promise((resolve) => setTimeout(resolve, 200));

        // Check that the error was captured with the correct message
        expect(caughtError).to.not.be.null;
        expect(caughtError!.message).to.equal('Could not get icon named "invalid-icon"');
      } finally {
        consoleStub.restore();
      }
    });
  });
});
