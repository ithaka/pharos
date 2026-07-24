import { beforeEach, describe, expect, it } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture } from '../../test/fixture';
import type { PharosTableHead } from './pharos-table-head';

describe('PharosTableHead', () => {
  let component: PharosTableHead;
  beforeEach(async () => {
    component = await fixture(html` <test-pharos-table-head></test-pharos-table-head> `);
  });

  it('should have the correct role attribute on the custom element', async () => {
    expect(component.getAttribute('role')).toBe('rowgroup');
  });

  it('should have the correct display style on the custom element', async () => {
    const displayValue = window.getComputedStyle(component, null).getPropertyValue('display');
    expect(displayValue).toBe('table-row-group');
  });
});
