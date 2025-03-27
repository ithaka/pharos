import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { PharosAlert } from './pharos-alert';
import type { PharosButton } from '../button/pharos-button';
import type { PharosLink } from '../link/pharos-link';

describe('pharos-alert', () => {
  let component: PharosAlert;

  beforeEach(async () => {
    component = await fixture(html`
      <test-pharos-alert status="success"> It worked! </test-pharos-alert>
    `);
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });

  it('throws an error for missing status attribute', async () => {
    component = await fixture(html` <test-pharos-alert> It worked! </test-pharos-alert> `).catch(
      (e) => e
    );
    expect('status is a required attribute.').to.be.thrown;
  });

  it('renders the alert when a status is provided', async () => {
    component = await fixture(html`
      <test-pharos-alert status="info"> It worked! </test-pharos-alert>
    `);
    expect(component).shadowDom.to.equal(`
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
  });

  it('throws an error for an invalid status value', async () => {
    component = await fixture(html`
      <test-pharos-alert status="fake"> It worked! </test-pharos-alert>
    `).catch((e) => e);
    expect('fake is not a valid status. Valid statuses are: info, success, warning, error').to.be
      .thrown;
  });

  it('adds a class to slotted links', async () => {
    const link = document.createElement('test-pharos-link') as PharosLink;

    component.appendChild(link);
    await component.updateComplete;
    const anchor = link.renderRoot.querySelector('#link-element');

    expect(anchor).to.have.class('link--alert');
  });

  it('is closable', async () => {
    component = await fixture(html`
      <test-pharos-alert status="success" closable id="closable-alert">
        It worked!
      </test-pharos-alert>
    `);

    await component.updateComplete;

    const closeButton = component.renderRoot.querySelector('.alert__button') as PharosButton;
    closeButton.click();

    expect(document.getElementById('closable-alert')).to.be.null;
  });

  it('fires a custom event pharos-alert-closed when closed by user interaction', async () => {
    component = await fixture(html`
      <test-pharos-alert status="success" closable id="closable-alert">
        It worked!
      </test-pharos-alert>
    `);
    let wasFired = false;
    const handleClose = (): void => {
      wasFired = true;
    };
    component.addEventListener('pharos-alert-closed', handleClose);
    await component.updateComplete;

    const closeButton = component.renderRoot.querySelector('.alert__button') as PharosButton;
    closeButton.click();

    expect(wasFired).to.be.true;
  });
});
