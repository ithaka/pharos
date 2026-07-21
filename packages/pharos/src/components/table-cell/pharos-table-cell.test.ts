import { beforeEach, describe, expect, it } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture } from '../../test/fixture';
import type { PharosTableCell } from './pharos-table-cell';

describe('PharosTableCell', () => {
  let component: PharosTableCell;
  beforeEach(async () => {
    component = await fixture(html` <test-pharos-table-cell></test-pharos-table-cell> `);
  });

  it('should have the correct role attribute on the custom element', async () => {
    expect(component.getAttribute('role')).toBe('cell');
  });

  it('should have the correct display style on the custom element', async () => {
    const displayValue = window.getComputedStyle(component, null).getPropertyValue('display');
    expect(displayValue).toBe('table-cell');
  });
});
