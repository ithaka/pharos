import { beforeEach, describe, expect, it } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture, errorFixture } from '../../test/fixture';
import type { PharosAlert } from './pharos-alert';
import type { PharosButton } from '../button/pharos-button';
import type { PharosLink } from '../link/pharos-link';

describe('pharos-alert', () => {
  let component: PharosAlert;

  beforeEach(async () => {
    component = await fixture(html`
      <test-pharos-alert status="success">It worked!</test-pharos-alert>
    `);
  });

  it('is accessible', async () => {
    await expect(component).toBeAccessible();
  });

  it('throws an error for a missing status attribute', async () => {
    const error = await errorFixture(html` <test-pharos-alert>It worked!</test-pharos-alert> `);

    expect(error.message).toContain('status is a required attribute.');
  });

  it('renders the alert when a status is provided', async () => {
    const alert = await fixture<PharosAlert>(html`
      <test-pharos-alert status="info">It worked!</test-pharos-alert>
    `);

    expect(alert).toEqualShadowDom(`
      <div
        class="alert alert--info"
        role="alert"
      >
        <pharos-icon
          class="alert__icon"
          data-pharos-component="PharosIcon"
          a11y-hidden="true"
          name="info-inverse"
        >
        </pharos-icon>
        <div class="alert__body">
          <slot>
          </slot>
        </div>
      </div>
    `);
    expect(alert).toHaveTextContent('It worked!');
  });
  it('throws an error for an invalid status value', async () => {
    const error = await errorFixture(html`
      <test-pharos-alert status="fake">It worked!</test-pharos-alert>
    `);

    expect(error.message).toContain(
      'fake is not a valid status. Valid statuses are: info, success, warning, error'
    );
  });
  it('adds a class to slotted links', async () => {
    const link = document.createElement('test-pharos-link') as PharosLink;

    component.appendChild(link);
    await component.updateComplete;
    const anchor = link.renderRoot.querySelector('#link-element');

    expect(anchor?.classList.contains('link--alert')).toBe(true);
  });

  it('is closable', async () => {
    const alert = await fixture<PharosAlert>(html`
      <test-pharos-alert status="success" closable id="closable-alert">
        It worked!
      </test-pharos-alert>
    `);

    const closeButton = alert.renderRoot.querySelector('.alert__button') as HTMLElement;
    closeButton.click();

    expect(document.getElementById('closable-alert')).toBeNull();
  });

  it('fires a custom event pharos-alert-closed when closed by user interaction', async () => {
    const alert = await fixture<PharosAlert>(html`
      <test-pharos-alert status="success" closable id="closable-alert">
        It worked!
      </test-pharos-alert>
    `);

    let wasFired = false;
    alert.addEventListener('pharos-alert-closed', () => {
      wasFired = true;
    });

    const closeButton = alert.renderRoot.querySelector('.alert__button') as PharosButton;
    closeButton.click();

    expect(wasFired).toBe(true);
  });
});
