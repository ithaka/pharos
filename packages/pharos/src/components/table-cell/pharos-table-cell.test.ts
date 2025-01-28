import { expect } from 'chai';
import { fixture, html } from '@open-wc/testing';
import { PharosTableCell } from './pharos-table-cell';

describe('PharosTableCell', () => {
  let component: PharosTableCell;
  beforeEach(async () => {
    component = await fixture(html` <test-pharos-table-cell></test-pharos-table-cell> `);
  });

  it('should have the correct role attribute on the custom element', async () => {
    expect(component.getAttribute('role')).to.equal('cell');
  });

  it('should have the correct display style on the custom element', async () => {
    const displayValue = window.getComputedStyle(component, null).getPropertyValue('display');
    expect(displayValue).to.equal('table-cell');
  });
});
