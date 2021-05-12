import { html, fixture, expect } from '@open-wc/testing';
import './pharos-grid';
import type { PharosGrid } from './pharos-grid';

describe('pharos-grid', () => {
  let component: PharosGrid;

  beforeEach(async () => {
    component = await fixture(html`<pharos-grid> Shell Grid </pharos-grid>`);
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });
});
