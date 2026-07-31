import { beforeEach, describe, expect, it } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture } from '../../test/fixture';
import type { PharosTableBody } from './pharos-table-body';

describe('PharosTableBody', () => {
  let component: PharosTableBody;
  beforeEach(async () => {
    component = await fixture(html` <test-pharos-table-body></test-pharos-table-body> `);
  });

  it('should have the correct role attribute on the custom element', async () => {
    expect(component.getAttribute('role')).toBe('rowgroup');
  });

  it('should have the correct display style on the custom element', async () => {
    const displayValue = window.getComputedStyle(component, null).getPropertyValue('display');
    expect(displayValue).toBe('table-row-group');
  });
});
