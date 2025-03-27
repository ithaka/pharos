import { expect } from 'chai';
import { fixture, html } from '@open-wc/testing';
import { PharosTableHead } from './pharos-table-head';

describe('PharosTableHead', () => {
  let component: PharosTableHead;
  beforeEach(async () => {
    component = await fixture(html` <test-pharos-table-head></test-pharos-table-head> `);
  });

  it('should have the correct role attribute on the custom element', async () => {
    expect(component.getAttribute('role')).to.equal('rowgroup');
  });

  it('should have the correct display style on the custom element', async () => {
    const displayValue = window.getComputedStyle(component, null).getPropertyValue('display');
    expect(displayValue).to.equal('table-row-group');
  });
});
