import { beforeEach, describe, expect, it } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture } from '../../test/fixture';
import type { PharosBreadcrumb } from './pharos-breadcrumb';

describe('pharos-breadcrumb', () => {
  let component: PharosBreadcrumb;

  beforeEach(async () => {
    component = await fixture(html`
      <test-pharos-breadcrumb>
        <test-pharos-breadcrumb-item href="#first">
          The First Link That is Too Long of Text to Fit inside any reasonable amount of space
        </test-pharos-breadcrumb-item>
        <test-pharos-breadcrumb-item href="#second">
          A link that's better
        </test-pharos-breadcrumb-item>
        <test-pharos-breadcrumb-item href="#third">
          The Second Link That is Too Long of Text to Fit inside any reasonable amount of space
        </test-pharos-breadcrumb-item>
        <test-pharos-breadcrumb-item>
          Where we are right now is a long way from where we used to be
        </test-pharos-breadcrumb-item>
      </test-pharos-breadcrumb>
    `);
  });

  it('is accessible', async () => {
    await expect(component).toBeAccessible();
  });
});
