import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './pharos-toggle-button';
import type { PharosToggleButton } from './pharos-toggle-button';
import { PharosColorWhite } from '../../styles/variables';

describe('pharos-toggle-button', () => {
  let component: PharosToggleButton;

  beforeEach(async () => {
    component = await fixture(html` <pharos-toggle-button></pharos-toggle-button> `);
  });

  it('is accessible on a AA compliant background', async () => {
    const parentNode = document.createElement('div');
    parentNode.style.backgroundColor = PharosColorWhite;

    component = await fixture(html`<pharos-toggle-button>I am a button</pharos-toggle-button>`, {
      parentNode,
    });
    await expect(component).to.be.accessible();
  });

  it('throws an error when an invalid property is set', async () => {
    component = await fixture(
      html` <pharos-toggle-button href="www.truedelta.com"></pharos-toggle-button> `
    ).catch((e) => e);
    expect(
      'The toggle button component does not support these properties: href, hreflang, ping, rel, and target.'
    ).to.be.thrown;
  });
});
