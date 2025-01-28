import { expect } from 'chai';
import { fixture, html } from '@open-wc/testing';
import { PharosTableBody } from './pharos-table-body';

describe('PharosTableBody', () => {
  let component: PharosTableBody;
  beforeEach(async () => {
    component = await fixture(html` <test-pharos-table-body></test-pharos-table-body> `);
  });

  it('should have the correct role attribute on the custom element', async () => {
    expect(component.getAttribute('role')).to.equal('rowgroup');
  });

  it('should have the correct display style on the custom element', async () => {
    const displayValue = window.getComputedStyle(component, null).getPropertyValue('display');
    expect(displayValue).to.equal('table-row-group');
  });
});
