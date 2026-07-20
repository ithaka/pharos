import { beforeEach, describe, expect, it } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture } from '../../test/fixture';
import type { PharosToastButton } from './pharos-toast-button';
import { PharosColorMarbleGray10 } from '../../styles/variables';

describe('pharos-toast-button', () => {
  let component: PharosToastButton;

  beforeEach(async () => {
    component = await fixture(html` <test-pharos-toast-button></test-pharos-toast-button> `);
  });

  it('is accessible on a AA compliant background', async () => {
    const parentNode = document.createElement('div');
    parentNode.style.backgroundColor = PharosColorMarbleGray10;

    component = await fixture(
      html`<test-pharos-toast-button>I am a button</test-pharos-toast-button>`,
      {
        parentNode,
      }
    );
    await expect(component).toBeAccessible();
  });
});
