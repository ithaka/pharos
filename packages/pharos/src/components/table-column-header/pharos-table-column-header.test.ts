import { expect } from 'chai';
import { fixture, html } from '@open-wc/testing';
import { PharosTableColumnHeader } from './pharos-table-column-header';

describe('PharosTableColumnHeader', () => {
  let component: PharosTableColumnHeader;
  beforeEach(async () => {
    component = await fixture(html`
      <test-pharos-table-column-header></test-pharos-table-column-header>
    `);
  });

  it('should have the correct role attribute on the custom element', async () => {
    expect(component.getAttribute('role')).to.equal('columnheader');
  });

  it('should have the correct display style on the custom element', async () => {
    const displayValue = window.getComputedStyle(component, null).getPropertyValue('display');
    expect(displayValue).to.equal('table-cell');
  });
});
