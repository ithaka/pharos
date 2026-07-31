import { beforeEach, describe, expect, it } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture, errorFixture } from '../../test/fixture';
import type { PharosToggleButton } from './pharos-toggle-button';
import { PharosColorWhite } from '../../styles/variables';

describe('pharos-toggle-button', () => {
  let component: PharosToggleButton;

  beforeEach(async () => {
    component = await fixture(html` <test-pharos-toggle-button></test-pharos-toggle-button> `);
  });

  it('is accessible on a AA compliant background', async () => {
    const parentNode = document.createElement('div');
    parentNode.style.backgroundColor = PharosColorWhite;

    component = await fixture(
      html`<test-pharos-toggle-button>I am a button</test-pharos-toggle-button>`,
      {
        parentNode,
      }
    );
    await expect(component).toBeAccessible();
  });

  it('throws an error when an invalid property is set', async () => {
    const error = await errorFixture(html`
      <test-pharos-toggle-button href="www.truedelta.com"></test-pharos-toggle-button>
    `);

    expect(error.message).toContain(
      'The toggle button component does not support these properties: href, hreflang, ping, rel, and target.'
    );
  });
});
