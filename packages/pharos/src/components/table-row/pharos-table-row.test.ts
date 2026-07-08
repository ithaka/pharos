import { beforeEach, describe, expect, it } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture } from '../../test/fixture';
import type { PharosTableRow } from './pharos-table-row';

describe('PharosTableRow', () => {
  let component: PharosTableRow;
  beforeEach(async () => {
    component = await fixture(html` <test-pharos-table-row></test-pharos-table-row> `);
  });

  it('should have the correct role attribute on the custom element', async () => {
    expect(component.getAttribute('role')).toBe('row');
  });

  it('should have the correct display style on the custom element', async () => {
    const displayValue = window.getComputedStyle(component, null).getPropertyValue('display');
    expect(displayValue).toBe('table-row');
  });
});
