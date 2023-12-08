import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { PharosIcon } from './pharos-icon';

describe('pharos-icon', () => {
  let component: PharosIcon;

  beforeEach(async () => {
    component = await fixture(html`<test-pharos-icon name="base"></test-pharos-icon>`);
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });

  it('throws an error for an invalid icon name', async () => {
    component = await fixture(html` <test-pharos-icon name="fake"></test-pharos-icon> `).catch(
      (e) => e
    );
    expect('Could not get icon named "fake"').to.be.thrown;
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

  it('sets the svg aria-hidden property when a11y-hidden is set', async () => {
    component.a11yHidden = 'true';
    await component.updateComplete;
    const svg = component.renderRoot.querySelector('svg');
    expect(svg?.getAttribute('aria-hidden')).to.equal('true');
  });

  it('adds aria-hidden when a11y-hidden is not provided and there is no title or description', async () => {
    await component.updateComplete;
    const svg = component.renderRoot.querySelector('svg');
    expect(svg?.getAttribute('aria-hidden')).to.equal('true');
  });

  it('does not add aria-hidden if there is a title', async () => {
    component.a11yTitle = 'some-label';
    await component.updateComplete;
    const svg = component.renderRoot.querySelector('svg');
    expect(svg?.getAttribute('aria-hidden')).not.to.exist;
  });

  it('does not add aria-hidden if there is a description', async () => {
    component.description = 'some-label';
    await component.updateComplete;
    const svg = component.renderRoot.querySelector('svg');
    expect(svg?.getAttribute('aria-hidden')).not.to.exist;
  });

  it('sets the svg title properly when a11y-title is set', async () => {
    const labelText = 'This is a test title';
    component.a11yTitle = labelText;
    await component.updateComplete;
    const title = component.renderRoot.querySelector('svg>title');
    expect(title).to.contain.text(labelText);
  });

  it('sets the svg title properly when description is set', async () => {
    const labelText = 'This is a test title';
    component.description = labelText;
    await component.updateComplete;
    const title = component.renderRoot.querySelector('svg>title');
    expect(title).to.contain.text(labelText);
  });
});
