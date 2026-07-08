import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import type { MockInstance } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture } from '../../test/fixture';
import type { PharosCoachMark } from './pharos-coach-mark';
import type { PharosButton } from '../button/pharos-button';

describe('pharos-coach-mark', () => {
  let component: PharosCoachMark, logSpy: MockInstance;

  beforeEach(async () => {
    component = await fixture(
      html`<test-pharos-coach-mark header="Test Header">Test Description</test-pharos-coach-mark>`
    );
  });

  beforeAll(() => {
    logSpy = vi.spyOn(console, 'error');
  });

  afterAll(() => {
    logSpy.mockRestore();
  });

  it('is accessible', async () => {
    await expect(component).toBeAccessible();
  });

  it('is accessible when opened', async () => {
    component.hide = false;
    await component.updateComplete;
    await expect(component).toBeAccessible();
  });

  it('has an attribute to open the coach mark', async () => {
    component.hide = false;
    await component.updateComplete;
    expect(component.hide).toBe(false);
  });

  it('has an attribute to close the coach mark', async () => {
    component.hide = false;
    await component.updateComplete;

    component.hide = true;
    await component.updateComplete;
    expect(component.hide).toBe(true);
  });

  it('closes when the close button is clicked and emits closed event', async () => {
    let wasFired = false;
    const handleClose = (): void => {
      wasFired = true;
    };
    component.addEventListener('pharos-coach-mark-closed', handleClose);

    component.hide = false;
    await component.updateComplete;

    const closeButton = component.renderRoot.querySelector('#close-button') as PharosButton;
    closeButton.click();
    await component.updateComplete;

    expect(component.hide).toBe(true);
    expect(wasFired).toBe(true);
  });

  it('displays the header set in the element attribute', async () => {
    component = await fixture(
      html`<test-pharos-coach-mark header="Test Header">Test Description</test-pharos-coach-mark>`
    );
    const header = component.renderRoot.querySelector('pharos-heading');
    expect(header).toHaveTextContent('Test Header');
  });

  it('displays content added as a child to the element', async () => {
    component = await fixture(
      html`<test-pharos-coach-mark>Test Description</test-pharos-coach-mark>`
    );
    expect(component).toHaveTextContent('Test Description');
  });
});
