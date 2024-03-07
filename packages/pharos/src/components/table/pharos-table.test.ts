import { fixture, expect } from '@open-wc/testing';
import type { TemplateResult } from 'lit';

import { html } from 'lit/static-html.js';

import type { PharosTable } from './pharos-table';
import type { PharosLink } from '../link/pharos-link';
import type { PharosPagination } from '../pagination/pharos-pagination';
import type { PharosSelect } from '../select/pharos-select';

describe('pharos-table', () => {
  let component: PharosTable, componentWithPagination: PharosTable;
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

  beforeEach(async () => {
    component = await fixture(html`
      <test-pharos-table .columns="${columns}" .rowData="${rowData}" .totalResults="${2}">
      </test-pharos-table>
    `);

    componentWithPagination = await fixture(html`
      <test-pharos-table
        .columns="${columns}"
        .rowData="${rowData}"
        .hidePagination="${false}"
        .totalResults="${2}"
        .pageSizeOptions="${[1, 2]}"
      >
      </test-pharos-table>
    `);
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });

  it('is accessible with pagination', async () => {
    await expect(componentWithPagination).to.be.accessible();
  });

  it('has the correct number of rows', async () => {
    const rows = Array.prototype.slice.call(
      component.renderRoot.querySelectorAll(`tr`)
    ) as TemplateResult[];
    expect(rows.length).to.be.eq(3);
  });

  it('renders rows according to page size', async () => {
    const rows = Array.prototype.slice.call(
      componentWithPagination.renderRoot.querySelectorAll(`tr`)
    ) as TemplateResult[];
    expect(rows.length).to.be.eq(2);
  });

  it('shows correct page start number according to page size', async () => {
    let pageNumber = componentWithPagination.renderRoot.querySelector(`.page-number-display`);
    expect(pageNumber?.innerHTML).contains('1-');
    expect(pageNumber?.innerHTML).contains('1 of');

    const selectDropdown = componentWithPagination.renderRoot.querySelector(
      `pharos-select`
    ) as PharosSelect;
    selectDropdown['_select'].value = '2';
    selectDropdown['_select'].dispatchEvent(new Event('change'));

    await componentWithPagination.updateComplete;

    pageNumber = componentWithPagination.renderRoot.querySelector(`.page-number-display`);
    expect(pageNumber?.innerHTML).contains('1-');
    expect(pageNumber?.innerHTML).contains('2 of');
  });

  it('updates correctly after page size selection', async () => {
    let rows = Array.prototype.slice.call(
      componentWithPagination.renderRoot.querySelectorAll(`tr`)
    ) as TemplateResult[];
    expect(rows.length).to.be.eq(2);

    const selectDropdown = componentWithPagination.renderRoot.querySelector(
      `pharos-select`
    ) as PharosSelect;
    selectDropdown['_select'].value = '2';
    selectDropdown['_select'].dispatchEvent(new Event('change'));

    await componentWithPagination.updateComplete;

    rows = Array.prototype.slice.call(
      componentWithPagination.renderRoot.querySelectorAll(`tr`)
    ) as TemplateResult[];
    expect(rows.length).to.be.eq(3);
  });

  it('fires a custom event pwhen go to prev and next page', async () => {
    let prevWasFired = false;
    let nextWasFired = false;
    const handlePrevPage = (): void => {
      prevWasFired = true;
    };
    const handleNextPage = (): void => {
      nextWasFired = true;
    };
    componentWithPagination.addEventListener('pharos-table-prev-page', handlePrevPage);
    componentWithPagination.addEventListener('pharos-table-next-page', handleNextPage);

    const pagination = componentWithPagination.renderRoot.querySelector(
      `pharos-pagination`
    ) as PharosPagination;
    const nextPageLink = pagination.renderRoot.querySelector(`.next`) as PharosLink;
    nextPageLink.click();
    await componentWithPagination.updateComplete;

    expect(nextWasFired).to.be.true;

    const prevPageLink = pagination.renderRoot.querySelector(`.prev`) as PharosLink;
    prevPageLink.click();
    await componentWithPagination.updateComplete;

    expect(prevWasFired).to.be.true;
  });
});
