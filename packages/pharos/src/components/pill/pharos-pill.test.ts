import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { PharosPill } from './pharos-pill';

let component: PharosPill;
describe('PharosPill', () => {
  beforeEach(async () => {
    component = await fixture(
      html`<test-pharos-icon name="base" a11y-title="base-icon"></test-pharos-icon>`
    );
  });
  describe('Basic Pill', () => {
    it('is accessible', async () => {
      await expect(component).to.be.accessible();
    });

    it('renders the text slot', async () => {
      await expect(component).to.be.accessible();
    });
  });
});
