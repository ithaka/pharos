import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { PharosCarousel } from './pharos-carousel';

describe('pharos-carousel', () => {
  let component: PharosCarousel;

  beforeEach(async () => {
    component = await fixture(html` <pharos-carousel> It worked! </pharos-carousel> `);
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });
});
