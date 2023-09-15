import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { PharosLoadingSpinner } from './pharos-loading-spinner';

describe('pharos-loading-spinner', () => {
  let component: PharosLoadingSpinner;

  beforeEach(async () => {
    component = await fixture(html` <pharos-loading-spinner></pharos-loading-spinner> `);
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });

  it('renders the base spinner', async () => {
    expect(component).shadowDom.to.equal(`
      <div class="loading-spinner__wrapper" role="alert" aria-live="assertive" aria-label="Content is loading..." tabindex="0">
        <svg
          class="loading-spinner__icon"
          viewBox="25 25 50 50"
          height="56"
          width="56"
          focusable="false"
        >
          <circle
            class="loading-spinner__animation"
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke-width="3"
            stroke-miterlimit="10"
          />
        </svg>
      </div>
    `);
  });

  it('prevents user interaction with the page content', async () => {
    let count = 0;
    const onClick = () => {
      count += 1;
    };
    component = await fixture(
      html`
        <button @click="${onClick}">Can't press me!</button>
        <pharos-loading-spinner></pharos-loading-spinner>
      `
    );
    const button = component.querySelector('button');
    button?.click();
    expect(count).to.equal(0);
  });
});
