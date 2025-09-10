import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

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
      expect(title?.textContent).to.equal('Close Icon');
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
});
