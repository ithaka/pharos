import { expect } from 'chai';
import { fixture, html } from '@open-wc/testing';
import { PharosTableRow } from './pharos-table-row';

describe('PharosTableRow', () => {
  let component: PharosTableRow;
  beforeEach(async () => {
    component = await fixture(html` <test-pharos-table-row></test-pharos-table-row> `);
  });

  it('should have the correct role attribute on the custom element', async () => {
    expect(component.getAttribute('role')).to.equal('row');
  });

  it('should have the correct display style on the custom element', async () => {
    const displayValue = window.getComputedStyle(component, null).getPropertyValue('display');
    expect(displayValue).to.equal('table-row');
  });
});
