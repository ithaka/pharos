import { html, fixture, expect } from '@open-wc/testing';
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
});
