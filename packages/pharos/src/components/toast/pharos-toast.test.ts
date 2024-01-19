import { fixture, expect, aTimeout } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
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
    await expect(component).to.be.accessible();
  });

  it('throws an error for an invalid status value', async () => {
    component = await fixture(html`
      <test-pharos-toast status="fake">I am a toast</test-pharos-toast>
    `).catch((e) => e);
    expect('fake is not a valid status. Valid statuses are: success, error').to.be.thrown;
  });

  it('closes after 6 seconds upon losing focus', async () => {
    component.focus();
    await component.updateComplete;

    component.dispatchEvent(new FocusEvent('focusout'));
    await aTimeout(7000);
    await component.updateComplete;

    expect(component.open).to.be.false;
  });

  it('remains open after 6 seconds when focused', async () => {
    component.focus();
    await component.updateComplete;
    await aTimeout(6000);
    await component.updateComplete;

    expect(component.open).to.be.true;
  });

  it('renders an exclamation icon with error status', async () => {
    component.status = 'error';
    await component.updateComplete;

    const icon = component.renderRoot.querySelector(
      '[data-pharos-component="PharosIcon"]'
    ) as PharosIcon;
    expect(icon?.name).to.equal('exclamation-inverse');
  });

  it('renders an exclamation icon with info status', async () => {
    component.status = 'info';
    await component.updateComplete;

    const icon = component.renderRoot.querySelector(
      '[data-pharos-component="PharosIcon"]'
    ) as PharosIcon;
    expect(icon?.name).to.equal('exclamation-inverse');
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
    await aTimeout(6000);
    await component.updateComplete;
    await aTimeout(500);

    expect(actualId === component.id).to.be.true;
  });
});
