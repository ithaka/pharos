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
});
