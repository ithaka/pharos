import { html, fixture, expect } from '@open-wc/testing';
import './pharos-image-card';
import type { PharosImageCard } from './pharos-image-card';

describe('pharos-image-card', () => {
  let component: PharosImageCard;

  beforeEach(async () => {
    component = await fixture(html` <pharos-image-card> Shell ImageCard </pharos-image-card> `);
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });
});
