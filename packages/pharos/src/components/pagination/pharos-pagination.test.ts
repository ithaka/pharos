import { beforeEach, describe, expect, it } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture, errorFixture } from '../../test/fixture';
import type { PharosPagination } from './pharos-pagination';

describe('pharos-pagination', () => {
  let component: PharosPagination;

  beforeEach(async () => {
    component = await fixture(html` <test-pharos-pagination></test-pharos-pagination> `);
  });

  it('is accessible', async () => {
    await expect(component).toBeAccessible();
  });

  it('is accessible when using the input variant', async () => {
    component = await fixture(html`
      <test-pharos-pagination
        current-page="2"
        total-results="50"
        page-size="10"
        variant="input"
      ></test-pharos-pagination>
    `);

    await expect(component).toBeAccessible();
  });

  it('is accessible when simple with the default variant', async () => {
    component = await fixture(html`
      <test-pharos-pagination
        current-page="2"
        total-results="50"
        page-size="10"
        simple
      ></test-pharos-pagination>
    `);

    await expect(component).toBeAccessible();
  });

  it('is accessible when simple with the input variant', async () => {
    component = await fixture(html`
      <test-pharos-pagination
        current-page="2"
        total-results="50"
        page-size="10"
        variant="input"
        simple
      ></test-pharos-pagination>
    `);

    await expect(component).toBeAccessible();
  });

  it('sets its default attributes', async () => {
    component = await fixture(html` <test-pharos-pagination></test-pharos-pagination> `);
    expect(component.getAttribute('current-page')).toBe('1');
    expect(component.getAttribute('total-results')).toBe('0');
    expect(component.getAttribute('page-size')).toBe('25');
    expect(component.getAttribute('variant')).toBe('default');
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
    expect(prevLink).toBeNull();

    component = await fixture(html`
      <test-pharos-pagination
        current-page="2"
        total-results="0"
        page-size="25"
      ></test-pharos-pagination>
    `);
    prevLink = component.renderRoot.querySelector('.prev') as HTMLElement;
    expect(prevLink).not.toBeNull();
  });

  it('shows/hides first page link correctly for input variant', async () => {
    component = await fixture(html`
      <test-pharos-pagination
        current-page="1"
        total-results="112"
        page-size="25"
        variant="input"
      ></test-pharos-pagination>
    `);
    let firstLink = component.renderRoot.querySelector('.first') as HTMLElement;
    expect(firstLink).toBeNull();

    component = await fixture(html`
      <test-pharos-pagination
        current-page="2"
        total-results="112"
        page-size="25"
        variant="input"
      ></test-pharos-pagination>
    `);
    firstLink = component.renderRoot.querySelector('.first') as HTMLElement;
    expect(firstLink).not.toBeNull();
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
    expect(nextLink).not.toBeNull();

    component = await fixture(html`
      <test-pharos-pagination
        current-page="5"
        total-results="112"
        page-size="25"
      ></test-pharos-pagination>
    `);
    nextLink = component.renderRoot.querySelector('.next') as HTMLElement;
    expect(nextLink).toBeNull();
  });

  it('shows/hides last page link correctly for input variant', async () => {
    component = await fixture(html`
      <test-pharos-pagination
        current-page="1"
        total-results="112"
        page-size="25"
        variant="input"
      ></test-pharos-pagination>
    `);
    let lastLink = component.renderRoot.querySelector('.last') as HTMLElement;
    expect(lastLink).not.toBeNull();

    component = await fixture(html`
      <test-pharos-pagination
        current-page="5"
        total-results="112"
        page-size="25"
        variant="input"
      ></test-pharos-pagination>
    `);
    lastLink = component.renderRoot.querySelector('.last') as HTMLElement;
    expect(lastLink).toBeNull();
  });

  it('does not render first/last links for default variant', async () => {
    component = await fixture(html`
      <test-pharos-pagination
        current-page="2"
        total-results="112"
        page-size="25"
      ></test-pharos-pagination>
    `);

    expect(component.renderRoot.querySelector('.first')).toBeNull();
    expect(component.renderRoot.querySelector('.last')).toBeNull();
  });

  it('hides first/last links when simple with the input variant', async () => {
    component = await fixture(html`
      <test-pharos-pagination
        current-page="2"
        total-results="112"
        page-size="25"
        variant="input"
        simple
      ></test-pharos-pagination>
    `);

    expect(component.renderRoot.querySelector('.first')).toBeNull();
    expect(component.renderRoot.querySelector('.last')).toBeNull();
  });

  it('still hides first/last links when simple with the default variant', async () => {
    component = await fixture(html`
      <test-pharos-pagination
        current-page="2"
        total-results="112"
        page-size="25"
        simple
      ></test-pharos-pagination>
    `);

    expect(component.renderRoot.querySelector('.first')).toBeNull();
    expect(component.renderRoot.querySelector('.last')).toBeNull();
  });

  it('hides "Previous"/"Next" text when simple with the input variant', async () => {
    component = await fixture(html`
      <test-pharos-pagination
        current-page="3"
        total-results="112"
        page-size="25"
        variant="input"
        simple
      ></test-pharos-pagination>
    `);

    const prevLink = component.renderRoot.querySelector('.prev') as HTMLElement;
    const nextLink = component.renderRoot.querySelector('.next') as HTMLElement;
    expect(prevLink.textContent?.trim()).toBe('Previous');
    expect(nextLink.textContent?.trim()).toBe('Next');
    expect(prevLink.querySelector('.pagination__visually-hidden')).not.toBeNull();
    expect(nextLink.querySelector('.pagination__visually-hidden')).not.toBeNull();
  });

  it('hides "Previous"/"Next" text when simple with the default variant', async () => {
    component = await fixture(html`
      <test-pharos-pagination
        current-page="3"
        total-results="112"
        page-size="25"
        simple
      ></test-pharos-pagination>
    `);

    const prevLink = component.renderRoot.querySelector('.prev') as HTMLElement;
    const nextLink = component.renderRoot.querySelector('.next') as HTMLElement;
    expect(prevLink.textContent?.trim()).toBe('Previous');
    expect(nextLink.textContent?.trim()).toBe('Next');
    expect(prevLink.querySelector('.pagination__visually-hidden')).not.toBeNull();
    expect(nextLink.querySelector('.pagination__visually-hidden')).not.toBeNull();
  });

  it('shows "Previous"/"Next" text when not simple with the default variant', async () => {
    component = await fixture(html`
      <test-pharos-pagination
        current-page="3"
        total-results="112"
        page-size="25"
      ></test-pharos-pagination>
    `);

    const prevLink = component.renderRoot.querySelector('.prev') as HTMLElement;
    const nextLink = component.renderRoot.querySelector('.next') as HTMLElement;
    expect(prevLink.textContent?.trim()).toBe('Previous');
    expect(nextLink.textContent?.trim()).toBe('Next');
    expect(prevLink.querySelector('.pagination__visually-hidden')).toBeNull();
    expect(nextLink.querySelector('.pagination__visually-hidden')).toBeNull();
  });

  it('shows "Previous"/"Next" text when not simple with the input variant', async () => {
    component = await fixture(html`
      <test-pharos-pagination
        current-page="3"
        total-results="112"
        page-size="25"
        variant="input"
      ></test-pharos-pagination>
    `);

    const prevLink = component.renderRoot.querySelector('.prev') as HTMLElement;
    const nextLink = component.renderRoot.querySelector('.next') as HTMLElement;
    expect(prevLink.textContent?.trim()).toBe('Previous');
    expect(nextLink.textContent?.trim()).toBe('Next');
    expect(prevLink.querySelector('.pagination__visually-hidden')).toBeNull();
    expect(nextLink.querySelector('.pagination__visually-hidden')).toBeNull();
  });

  it('fires navigation events properly in input variant', async () => {
    let prevPageCount = 0;
    let nextPageCount = 0;
    let firstPageCount = 0;
    let lastPageCount = 0;
    const onFirstClick = (): void => {
      firstPageCount++;
    };
    const onPrevClick = (): void => {
      prevPageCount++;
    };
    const onNextClick = (): void => {
      nextPageCount++;
    };
    const onLastClick = (): void => {
      lastPageCount++;
    };
    component = await fixture(html`
      <test-pharos-pagination
        current-page="3"
        total-results="112"
        page-size="25"
        variant="input"
        @first-page=${onFirstClick}
        @prev-page=${onPrevClick}
        @next-page=${onNextClick}
        @last-page=${onLastClick}
      ></test-pharos-pagination>
    `);

    const firstLink = component.renderRoot.querySelector('.first') as HTMLElement;
    firstLink.click();
    await component.updateComplete;

    const prevLink = component.renderRoot.querySelector('.prev') as HTMLElement;
    prevLink.click();
    await component.updateComplete;

    const nextLink = component.renderRoot.querySelector('.next') as HTMLElement;
    nextLink.click();
    await component.updateComplete;

    const lastLink = component.renderRoot.querySelector('.last') as HTMLElement;
    lastLink.click();
    await component.updateComplete;

    expect(firstPageCount).toBe(1);
    expect(prevPageCount).toBe(1);
    expect(nextPageCount).toBe(1);
    expect(lastPageCount).toBe(1);
  });

  it('fires navigation events when child element clicked in input variant', async () => {
    let prevPageCount = 0;
    let nextPageCount = 0;
    let firstPageCount = 0;
    let lastPageCount = 0;
    const onFirstClick = (): void => {
      firstPageCount++;
    };
    const onPrevClick = (): void => {
      prevPageCount++;
    };
    const onNextClick = (): void => {
      nextPageCount++;
    };
    const onLastClick = (): void => {
      lastPageCount++;
    };
    component = await fixture(html`
      <test-pharos-pagination
        current-page="3"
        total-results="112"
        page-size="25"
        variant="input"
        @first-page=${onFirstClick}
        @prev-page=${onPrevClick}
        @next-page=${onNextClick}
        @last-page=${onLastClick}
      ></test-pharos-pagination>
    `);

    const firstLinkChildElement = component.renderRoot.querySelector('.first')
      ?.firstElementChild as HTMLElement;
    firstLinkChildElement.click();
    await component.updateComplete;

    const prevLinkChildElement = component.renderRoot.querySelector('.prev')
      ?.firstElementChild as HTMLElement;
    prevLinkChildElement.click();
    await component.updateComplete;

    const nextLinkChildElement = component.renderRoot.querySelector('.next')
      ?.firstElementChild as HTMLElement;
    nextLinkChildElement.click();
    await component.updateComplete;

    const lastLinkChildElement = component.renderRoot.querySelector('.last')
      ?.firstElementChild as HTMLElement;
    lastLinkChildElement.click();
    await component.updateComplete;

    expect(firstPageCount).toBe(1);
    expect(prevPageCount).toBe(1);
    expect(nextPageCount).toBe(1);
    expect(lastPageCount).toBe(1);
  });

  it('fires prev-page and next-page events when simple', async () => {
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
        variant="input"
        simple
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

    expect(prevPageCount).toBe(1);
    expect(nextPageCount).toBe(1);
  });

  it('renders the page input for simple input variant', async () => {
    component = await fixture(html`
      <test-pharos-pagination
        current-page="3"
        total-results="112"
        page-size="25"
        variant="input"
        simple
      ></test-pharos-pagination>
    `);

    const pageInput = component.renderRoot.querySelector('.pagination__input');
    expect(pageInput).not.toBeNull();
    expect(pageInput?.getAttribute('type')).toBe('number');
  });

  it('throws an error for an invalid total results value', async () => {
    const error = await errorFixture(html`
      <test-pharos-pagination total-results="-1"></test-pharos-pagination>
    `);

    expect(error.message).toContain(
      "totalResults value '-1' is invalid. Can only be a number greater than or equal to 0"
    );
  });

  it('throws an error for an invalid page size value', async () => {
    const error = await errorFixture(html`
      <test-pharos-pagination page-size="1.5"></test-pharos-pagination>
    `);

    expect(error.message).toContain(
      "pageSize value '1.5' is invalid. Can only be a number greater than or equal to 1"
    );
  });

  it('throws an error for an invalid current page value', async () => {
    const error = await errorFixture(html`
      <test-pharos-pagination current-page="0"></test-pharos-pagination>
    `);

    expect(error.message).toContain(
      "currentPage value '0' is invalid. Can only be a number greater than or equal to 1"
    );
  });

  it('throws an error for an invalid variant value', async () => {
    const error = await errorFixture(html`
      <test-pharos-pagination variant="fake"></test-pharos-pagination>
    `);

    expect(error.message).toContain(
      'fake is not a valid Pharos pagination variant. Valid variants are: default, input'
    );
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
    expect(pageInput).not.toBeNull();
    expect(pageInput?.getAttribute('type')).toBe('number');
  });

  it('fires page-input event with input number exceeding the total page number', async () => {
    component = await fixture(html`
      <test-pharos-pagination
        current-page="2"
        total-results="112"
        page-size="25"
        variant="input"
      ></test-pharos-pagination>
    `);

    let receivedPage = 0;
    const onPageInput = (event: Event): void => {
      receivedPage = (event as CustomEvent<{ page: number }>).detail.page;
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

    expect(receivedPage).toBe(5);
  });

  it('does not fire page-input on non-enter key press', async () => {
    component = await fixture(html`
      <test-pharos-pagination
        current-page="2"
        total-results="112"
        page-size="25"
        variant="input"
      ></test-pharos-pagination>
    `);

    let eventCount = 0;
    const onPageInput = (): void => {
      eventCount += 1;
    };
    component.addEventListener('page-input', onPageInput);

    const pageInput = component.renderRoot.querySelector('.pagination__input') as HTMLElement & {
      value: string;
    };
    pageInput.value = '3';
    pageInput.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, composed: true })
    );
    await component.updateComplete;

    expect(eventCount).toBe(0);
  });

  it('clamps page-input to the minimum page', async () => {
    component = await fixture(html`
      <test-pharos-pagination
        current-page="2"
        total-results="112"
        page-size="25"
        variant="input"
      ></test-pharos-pagination>
    `);

    let receivedPage = 0;
    const onPageInput = (event: Event): void => {
      receivedPage = (event as CustomEvent<{ page: number }>).detail.page;
    };
    component.addEventListener('page-input', onPageInput);

    const pageInput = component.renderRoot.querySelector('.pagination__input') as HTMLElement & {
      value: string;
    };
    pageInput.value = '0';
    pageInput.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true })
    );
    await component.updateComplete;

    expect(receivedPage).toBe(1);
  });

  it('adjusts page-input width based on user entry', async () => {
    component = await fixture(html`
      <test-pharos-pagination
        current-page="2"
        total-results="112"
        page-size="25"
        variant="input"
      ></test-pharos-pagination>
    `);

    const pageInput = component.renderRoot.querySelector('.pagination__input') as HTMLElement & {
      value: string;
    };
    pageInput.value = '10';
    pageInput.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await component.updateComplete;

    const expectedWidth = String(pageInput.value).length + 2;
    expect(pageInput.getAttribute('style')).toContain(`width: ${expectedWidth}ch`);
  });
});
