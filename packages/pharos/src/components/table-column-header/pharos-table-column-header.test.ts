import { beforeEach, describe, expect, it } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture } from '../../test/fixture';
import type { PharosTableColumnHeader } from './pharos-table-column-header';

describe('PharosTableColumnHeader', () => {
  let component: PharosTableColumnHeader;
  beforeEach(async () => {
    component = await fixture(html`
      <test-pharos-table-column-header></test-pharos-table-column-header>
    `);
  });

  it('should have the correct role attribute on the custom element', async () => {
    expect(component.getAttribute('role')).toBe('columnheader');
  });

  it('should have the correct display style on the custom element', async () => {
    const displayValue = window.getComputedStyle(component, null).getPropertyValue('display');
    expect(displayValue).toBe('table-cell');
  });
});
