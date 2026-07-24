import { beforeEach, describe, expect, it } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture, errorFixture } from '../../test/fixture';
import type { PharosLayout } from './pharos-layout';

describe('pharos-layout', () => {
  let component: PharosLayout;

  beforeEach(async () => {
    component = await fixture(html`
      <test-pharos-layout>
        <div slot="top">Top Content</div>
        <div>Body Content</div>
      </test-pharos-layout>
    `);
  });

  it('is accessible', async () => {
    await expect(component).toBeAccessible();
  });

  it('has an attribute to set the inner grid areas', async () => {
    component.areas = "'top' 'body'";
    await component.updateComplete;

    expect(component['_layout'].style.gridTemplateAreas).toBe('"top" "body"');
  });

  it('has an attribute to set the inner grid rows', async () => {
    component.rows = 'max-content 1fr';
    await component.updateComplete;

    expect(component['_layout'].style.gridTemplateRows).toBe('max-content 1fr');
  });

  it('has an attribute to set the inner grid row gap', async () => {
    component.rowGap = '1rem';
    await component.updateComplete;

    expect(component['_layout'].style.rowGap).toBe('1rem');
  });

  it('has an attribute to set the HTML tag of the inner grid', async () => {
    component.tag = 'ol';
    await component.updateComplete;

    expect(component['_layout'].tagName).toBe('OL');
  });

  it('throws an error for an invalid preset value', async () => {
    const error = await errorFixture(html`
      <test-pharos-layout preset="fake-col"></test-pharos-layout>
    `);

    expect(error.message).toContain('fake-col is not a valid preset.');
  });
});
