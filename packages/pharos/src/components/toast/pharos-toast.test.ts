import { beforeEach, describe, expect, it, vi } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture, errorFixture } from '../../test/fixture';
import type { PharosToast } from './pharos-toast';
import type { PharosIcon } from '../icon/pharos-icon';

describe('pharos-toast', () => {
  let component: PharosToast;

  beforeEach(async () => {
    component = await fixture(html`
      <test-pharos-toast open>
        The item has moved to your
        <test-pharos-link href="#" is-on-background bold>Workspace</test-pharos-link>.
      </test-pharos-toast>
    `);
  });

  it('is accessible', async () => {
    await expect(component).toBeAccessible();
  });

  it('throws an error for an invalid status value', async () => {
    const error = await errorFixture(html`
      <test-pharos-toast status="fake">I am a toast</test-pharos-toast>
    `);

    expect(error.message).toContain(
      'fake is not a valid status. Valid statuses are: success, error'
    );
  });

  it('closes after 6 seconds upon losing focus', async () => {
    component.focus();
    await component.updateComplete;

    component.dispatchEvent(new FocusEvent('focusout'));
    await vi.waitFor(() => expect(component.open).toBe(false), { timeout: 7000 });
  }, 8000);

  it('remains open after 6 seconds when focused', async () => {
    component.focus();
    await component.updateComplete;

    await new Promise((resolve) => setTimeout(resolve, 6000));
    await component.updateComplete;

    expect(component.open).toBe(true);
  }, 7000);

  it('renders an exclamation icon with error status', async () => {
    component.status = 'error';
    await component.updateComplete;

    const icon = component.renderRoot.querySelector(
      '[data-pharos-component="PharosIcon"]'
    ) as PharosIcon;
    expect(icon?.name).toBe('exclamation-inverse');
  });

  it('renders an exclamation icon with info status', async () => {
    component.status = 'info';
    await component.updateComplete;

    const icon = component.renderRoot.querySelector(
      '[data-pharos-component="PharosIcon"]'
    ) as PharosIcon;
    expect(icon?.name).toBe('exclamation-inverse');
  });

  it('fires a custom event pharos-toast-close after closing', async () => {
    let actualId = '';
    const handleClose = (e: Event): void => {
      actualId = (e as CustomEvent).detail.id;
    };
    component.addEventListener('pharos-toast-close', handleClose);

    component.focus();
    await component.updateComplete;

    component.dispatchEvent(new FocusEvent('focusout'));
    await vi.waitFor(() => expect(actualId).toBe(component.id), { timeout: 7000 });
  }, 8000);
});
