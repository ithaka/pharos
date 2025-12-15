import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { PharosPagination } from './pharos-pagination';

describe('pharos-pagination', () => {
  let component: PharosPagination;

  beforeEach(async () => {
    component = await fixture(html` <test-pharos-pagination></test-pharos-pagination> `);
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });

  it('sets its default attributes', async () => {
    component = await fixture(html` <test-pharos-pagination></test-pharos-pagination> `);
    expect(component.getAttribute('current-page')).to.equal('1');
    expect(component.getAttribute('total-results')).to.equal('0');
    expect(component.getAttribute('page-size')).to.equal('25');
    expect(component.getAttribute('variant')).to.equal('default');
  });

  it('shows/hides previous page link correctly', async () => {
    component = await fixture(html`
      <test-pharos-pagination
        current-page="1"
        total-results="0"
        page-size="25"
      ></test-pharos-pagination>
    `);
    let prevLink = component.renderRoot.querySelector('.prev') as HTMLElement;
    expect(prevLink).not.to.exist;

    component = await fixture(html`
      <test-pharos-pagination
        current-page="2"
        total-results="0"
        page-size="25"
      ></test-pharos-pagination>
    `);
    prevLink = component.renderRoot.querySelector('.prev') as HTMLElement;
    expect(prevLink).to.exist;
  });

  it('shows/hides next page link correctly', async () => {
    component = await fixture(html`
      <test-pharos-pagination
        current-page="1"
        total-results="112"
        page-size="25"
      ></test-pharos-pagination>
    `);
    let nextLink = component.renderRoot.querySelector('.next') as HTMLElement;
    expect(nextLink).to.exist;

    component = await fixture(html`
      <test-pharos-pagination
        current-page="5"
        total-results="112"
        page-size="25"
      ></test-pharos-pagination>
    `);
    nextLink = component.renderRoot.querySelector('.next') as HTMLElement;
    expect(nextLink).not.to.exist;
  });

  it('fires prev-page and next-page events properly', async () => {
    let prevPageCount = 0;
    let nextPageCount = 0;
    const onPrevClick = (): void => {
      prevPageCount++;
    };
    const onNextClick = (): void => {
      nextPageCount++;
    };
    component = await fixture(html`
      <test-pharos-pagination
        current-page="3"
        total-results="112"
        page-size="25"
        @prev-page=${onPrevClick}
        @next-page=${onNextClick}
      ></test-pharos-pagination>
    `);

    const prevLink = component.renderRoot.querySelector('.prev') as HTMLElement;
    prevLink.click();
    await component.updateComplete;

    const nextLink = component.renderRoot.querySelector('.next') as HTMLElement;
    nextLink.click();
    await component.updateComplete;

    expect(prevPageCount).to.equal(1);
    expect(nextPageCount).to.equal(1);
  });

  it('fires prev-page and next-page events when child element clicked', async () => {
    let prevPageCount = 0;
    let nextPageCount = 0;
    const onPrevClick = (): void => {
      prevPageCount++;
    };
    const onNextClick = (): void => {
      nextPageCount++;
    };
    component = await fixture(html`
      <test-pharos-pagination
        current-page="3"
        total-results="112"
        page-size="25"
        @prev-page=${onPrevClick}
        @next-page=${onNextClick}
      ></test-pharos-pagination>
    `);

    const prevLinkChildElement = component.renderRoot.querySelector('.prev')
      ?.firstElementChild as HTMLElement;
    prevLinkChildElement.click();
    await component.updateComplete;

    const nextLinkChildElement = component.renderRoot.querySelector('.next')
      ?.firstElementChild as HTMLElement;
    nextLinkChildElement.click();
    await component.updateComplete;

    expect(prevPageCount).to.equal(1);
    expect(nextPageCount).to.equal(1);
  });

  it('throws an error for an invalid total results value', async () => {
    component = await fixture(html`
      <test-pharos-pagination total-results="-1"></test-pharos-pagination>
    `).catch((e) => e);
    expect("totalResults value '-1' is invalid. Can only be a number greater than or equal to 0").to
      .be.thrown;
  });

  it('throws an error for an invalid page size value', async () => {
    component = await fixture(html`
      <test-pharos-pagination page-size="1.5"></test-pharos-pagination>
    `).catch((e) => e);
    expect("pageSize value '1.5' is invalid. Can only be a number greater than or equal to 1").to.be
      .thrown;
  });

  it('throws an error for an invalid current page value', async () => {
    component = await fixture(html`
      <test-pharos-pagination current-page="0"></test-pharos-pagination>
    `).catch((e) => e);
    expect("currentPage value '0' is invalid. Can only be a number greater than or equal to 1").to
      .be.thrown;
  });

  it('throws an error for an invalid variant value', async () => {
    component = await fixture(html`
      <test-pharos-pagination variant="fake"></test-pharos-pagination>
    `).catch((e) => e);
    expect('fake is not a valid variant. Valid variants are: default, input').to.be.thrown;
  });

  it('renders the page input variant', async () => {
    component = await fixture(html`
      <test-pharos-pagination
        current-page="3"
        total-results="112"
        page-size="25"
        variant="input"
      ></test-pharos-pagination>
    `);

    const pageInput = component.renderRoot.querySelector('.pagination__input');
    expect(pageInput).to.exist;
  });

  it('fires page-input event with clamped value on change', async () => {
    component = await fixture(html`
      <test-pharos-pagination
        current-page="2"
        total-results="112"
        page-size="25"
        variant="input"
      ></test-pharos-pagination>
    `);

    let receivedPage = 0;
    const onPageInput = (event: CustomEvent): void => {
      receivedPage = (event.detail as { page: number }).page;
    };
    component.addEventListener('page-input', onPageInput);

    const pageInput = component.renderRoot.querySelector('.pagination__input') as HTMLElement & {
      value: string;
    };
    pageInput.value = '10';
    pageInput.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true })
    );
    await component.updateComplete;

    expect(receivedPage).to.equal(5);
  });
});
