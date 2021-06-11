import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './pharos-alert';
import '../link/pharos-link';
import type { PharosAlert } from './pharos-alert';

describe('pharos-alert', () => {
  let component: PharosAlert;

  beforeEach(async () => {
    component = await fixture(html` <pharos-alert status="success"> It worked! </pharos-alert> `);
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });

  it('throws an error for missing status attribute', async () => {
    component = await fixture(html` <pharos-alert> It worked! </pharos-alert> `).catch((e) => e);
    expect('status is a required attribute.').to.be.thrown;
  });

  it('renders the alert when a status is provided', async () => {
    component = await fixture(html` <pharos-alert status="info"> It worked! </pharos-alert> `);
    expect(component).shadowDom.to.equal(`
      <div
        class="alert alert--info"
        role="alert"
        tabindex="0"
      >
        <pharos-icon
          class="alert__icon"
          description=""
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
      <pharos-alert status="fake"> It worked! </pharos-alert>
    `).catch((e) => e);
    expect('fake is not a valid status. Valid statuses are: info, success, warning, error').to.be
      .thrown;
  });

  it('is able to delegate focus', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);
    const alert = component.renderRoot.querySelector('.alert');

    component.focus();

    expect(activeElement === alert).to.be.true;
    document.removeEventListener('focusin', onFocusIn);
  });

  it('adds a class to slotted links', async () => {
    const link = document.createElement('pharos-link');

    component.appendChild(link);
    await component.updateComplete;
    const anchor = link.renderRoot.querySelector('#link-element');

    expect(anchor).to.have.class('link--alert');
  });
});
