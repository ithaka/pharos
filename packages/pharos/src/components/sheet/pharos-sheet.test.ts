import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import sinon from 'sinon';
import type { SinonSpy } from 'sinon';
import type { PharosSheet } from './pharos-sheet';
import type { PharosButton } from '../button/pharos-button';

describe('pharos-sheet', () => {
  let component: PharosSheet, logSpy: SinonSpy;

  beforeEach(async () => {
    component = await fixture(html`
      <test-pharos-sheet id="my-sheet" a11y-label="Test sheet" has-close>
        My Sheet
      </test-pharos-sheet>
    `);
  });

  before(() => {
    logSpy = sinon.spy(console, 'error');
  });

  after(() => {
    logSpy.restore();
  });

  const getSimpleSheet = () => {
    return html`
      <test-pharos-sheet id="my-sheet" a11y-label="Test sheet">
        <div>I am sheet contents</div>
      </test-pharos-sheet>
    `;
  };

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });

  it('is accessible when open', async () => {
    component.open = true;
    await component.updateComplete;

    await expect(component).to.be.accessible();
  });

  it('opens when the element with matching attribute data-sheet-id is clicked', async () => {
    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-sheet-id', 'my-sheet');
    document.body.appendChild(trigger);

    component = await fixture(getSimpleSheet());

    trigger.click();
    await component.updateComplete;
    expect(component.open).to.be.true;
  });

  it('closes when the close button is pressed', async () => {
    component.open = true;
    await component.updateComplete;

    const closeButton = component.renderRoot.querySelector('#close-button') as PharosButton;
    closeButton?.click();

    await component.updateComplete;
    expect(component.open).to.be.false;
  });

  it('closes when the overlay is clicked without triggering propagation', async () => {
    component.open = true;
    await component.updateComplete;

    const mockHandler = sinon.spy();
    document.addEventListener('click', mockHandler);

    const overlay = component?.shadowRoot?.querySelector('.sheet__overlay') as HTMLElement;
    overlay?.click();

    await component.updateComplete;

    expect(component.open).to.be.false;
    expect(mockHandler.called).to.be.false;
  });

  it('returns focus back to the trigger element when close', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    const trigger = document.createElement('button');
    trigger.setAttribute('id', 'trigger');
    trigger.setAttribute('data-sheet-id', 'my-sheet');
    document.body.appendChild(trigger);

    const button = document.querySelector('#trigger') as HTMLButtonElement;
    button.click();
    button.focus();
    await component.updateComplete;

    component.open = false;
    await component.updateComplete;

    expect(activeElement === button).to.be.true;
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

    expect(wasFired).to.be.true;
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
    expect(wasFired).to.be.true;
  });
});
