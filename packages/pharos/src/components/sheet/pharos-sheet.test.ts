import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture } from '../../test/fixture';
import type { PharosSheet } from './pharos-sheet';
import type { PharosButton } from '../button/pharos-button';

describe('pharos-sheet', () => {
  let component: PharosSheet, logSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(async () => {
    component = await fixture(html`
      <test-pharos-sheet id="my-sheet" a11y-label="Test sheet" has-close>
        My Sheet
      </test-pharos-sheet>
    `);
  });

  beforeAll(() => {
    logSpy = vi.spyOn(console, 'error');
  });

  afterAll(() => {
    logSpy.mockRestore();
  });

  afterEach(() => document.body.replaceChildren());

  const getSimpleSheet = () => {
    return html`
      <test-pharos-sheet id="my-sheet" a11y-label="Test sheet">
        <div>I am sheet contents</div>
      </test-pharos-sheet>
    `;
  };

  it('is accessible', async () => {
    await expect(component).toBeAccessible();
  });

  it('is accessible when open', async () => {
    component.open = true;
    await component.updateComplete;

    await expect(component).toBeAccessible();
  });

  it('opens when the element with matching attribute data-sheet-id is clicked', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-sheet-id', 'my-sheet');
    document.body.appendChild(trigger);

    component = await fixture(getSimpleSheet());

    trigger.click();
    await component.updateComplete;
    expect(component.open).toBe(true);
  });

  it('closes when the close button is pressed', async () => {
    component.open = true;
    await component.updateComplete;

    const closeButton = component.renderRoot.querySelector('#close-button') as PharosButton;
    closeButton?.click();

    await component.updateComplete;
    expect(component.open).toBe(false);
  });

  it('closes when the overlay is clicked without triggering propagation', async () => {
    component.open = true;
    await component.updateComplete;

    const mockHandler = vi.fn();
    document.addEventListener('click', mockHandler);

    const overlay = component.shadowRoot?.querySelector('.sheet__overlay') as HTMLElement;
    overlay?.click();

    await component.updateComplete;

    expect(component.open).toBe(false);
    expect(mockHandler).not.toHaveBeenCalled();
  });

  it('applies an opaque overlay when opened', async () => {
    const sheet = await fixture<PharosSheet>(getSimpleSheet());
    sheet.open = true;
    await sheet.updateComplete;

    const overlay = sheet.shadowRoot?.querySelector('.sheet__overlay') as HTMLElement;
    const styles = getComputedStyle(overlay);

    expect(styles.backgroundColor).toBe('rgba(0, 0, 0, 0.5)');
    expect(styles.pointerEvents).toBe('auto');
  });

  it('omits the box shadow when omit-overlay is set and sheet is closed', async () => {
    const sheet = await fixture<PharosSheet>(
      html`<test-pharos-sheet omit-overlay>
        <div>I am sheet contents</div>
      </test-pharos-sheet>`
    );
    await sheet.updateComplete;

    const content = sheet.shadowRoot?.querySelector('.sheet__content') as HTMLElement;
    expect(getComputedStyle(content).boxShadow).toBe('none');
  });

  it('focus moves to the sheet after opening and returns back to the trigger element when closed', async () => {
    let activeElement: EventTarget | null = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-sheet-id', 'focus-sheet');
    document.body.appendChild(trigger);

    const sheet = await fixture<PharosSheet>(html`
      <test-pharos-sheet id="focus-sheet" a11y-label="Test sheet">
        <div>I am sheet contents</div>
      </test-pharos-sheet>
    `);

    trigger.focus();
    trigger.click();
    await sheet.updateComplete;

    const sheetHandle = sheet.shadowRoot?.querySelector('.sheet__handle') as HTMLDivElement;
    await vi.waitFor(() => expect(activeElement === sheetHandle).toBe(true));

    sheet.open = false;
    await sheet.updateComplete;

    await vi.waitFor(() => expect(activeElement === trigger).toBe(true));

    document.removeEventListener('focusin', onFocusIn);
  });

  it('fires a custom event pharos-sheet-opened when opened', async () => {
    component = await fixture(getSimpleSheet());

    let wasFired = false;
    const handleOpened = (): void => {
      wasFired = true;
    };
    component.addEventListener('pharos-sheet-opened', handleOpened);
    component.open = true;
    await component.updateComplete;

    expect(wasFired).toBe(true);
  });

  it('fires a custom event pharos-sheet-closed when closed', async () => {
    component = await fixture(getSimpleSheet());

    let wasFired = false;
    const handleClosed = (): void => {
      wasFired = true;
    };
    component.addEventListener('pharos-sheet-closed', handleClosed);
    component.open = true;
    await component.updateComplete;

    component.open = false;
    await component.updateComplete;
    expect(wasFired).toBe(true);
  });
});
