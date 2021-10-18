import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { PharosIcon } from './pharos-icon';

describe('pharos-icon', () => {
  let component: PharosIcon;

  beforeEach(async () => {
    component = await fixture(html`<pharos-icon name="base"></pharos-icon>`);
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });

  it('throws an error for an invalid icon name', async () => {
    component = await fixture(html` <pharos-icon name="fake"></pharos-icon> `).catch((e) => e);
    expect('No icon named "fake"').to.be.thrown;
  });

  it('uses dimensions 24x24 when the icon name does not end in "-small"', async () => {
    component.name = 'checkmark';
    await component.updateComplete;
    const svg = component.renderRoot.querySelector('svg');
    expect(svg?.getAttribute('viewBox')).to.equal('0 0 24 24');
    expect(svg?.getAttribute('height')).to.equal('24');
    expect(svg?.getAttribute('width')).to.equal('24');
  });

  it('updates its dimensions to 16x16 when the icon name ends with "-small"', async () => {
    component.name = 'checkmark-small';
    await component.updateComplete;
    const svg = component.renderRoot.querySelector('svg');
    expect(svg?.getAttribute('viewBox')).to.equal('0 0 16 16');
    expect(svg?.getAttribute('height')).to.equal('16');
    expect(svg?.getAttribute('width')).to.equal('16');
  });
});
