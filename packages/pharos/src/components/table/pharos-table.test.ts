import { fixture, expect } from '@open-wc/testing';
import type { TemplateResult } from 'lit';

import { html } from 'lit/static-html.js';

import type { PharosTable } from './pharos-table';

describe('pharos-table', () => {
  let component: PharosTable;

  beforeEach(async () => {
    const columns = [
      {
        name: 'Item',
        field: 'item',
      },
      {
        name: 'Filename',
        field: 'filename',
      },
    ];
    const rowData = [
      {
        item: 1,
        filename: '12345.jpg',
        expired_date: '2020-1-1',
        created_on: '2010-1-1',
        university: 'University of Michigan',
      },
      {
        item: 2,
        filename: '123456.jpg',
        expired_date: '2020-1-1',
        created_on: '2010-1-1',
        university: 'University of Michigan',
      },
    ];
    component = await fixture(html`
      <test-pharos-table .columns="${columns}" .rowData="${rowData}"> </test-pharos-table>
    `);
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });

  it('has 2 rows', async () => {
    const rows = Array.prototype.slice.call(component.querySelectorAll(`tr`)) as TemplateResult[];

    expect(rows.length).to.be.eq(2);
  });
});
