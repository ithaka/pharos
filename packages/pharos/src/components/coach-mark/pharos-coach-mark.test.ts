import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import sinon from 'sinon';
import type { SinonSpy } from 'sinon';
import type { PharosCoachMark } from './pharos-coach-mark';
import type { PharosButton } from '../button/pharos-button';

describe('pharos-coach-mark', () => {
  let component: PharosCoachMark, logSpy: SinonSpy;

  beforeEach(async () => {
    component = await fixture(
      html`<test-pharos-coach-mark header="Test Header">Test Description</test-pharos-coach-mark>`
    );
  });

  before(() => {
    logSpy = sinon.spy(console, 'error');
  });

  after(() => {
    logSpy.restore();
  });

  it('is accessible', async () => {
    expect(component).to.be.accessible();
  });

  it('is accessible when opened', async () => {
    component.hide = false;
    await component.updateComplete;
    expect(component).to.be.accessible();
  });

  it('has an attribute to open the coach mark', async () => {
    component.hide = false;
    await component.updateComplete;
    expect(component.hide).to.be.false;
  });

  it('has an attribute to close the coach mark', async () => {
    component.hide = false;
    await component.updateComplete;

    component.hide = true;
    await component.updateComplete;
    expect(component.hide).to.be.true;
  });

  it('closes when the close button is clicked', async () => {
    component.hide = false;
    await component.updateComplete;

    const closeButton = component.renderRoot.querySelector('#close-button') as PharosButton;
    closeButton.click();
    await component.updateComplete;

    expect(component.hide).to.be.true;
  });

  it('displays the header set in the element attribute', async () => {
    component = await fixture(
      html`<test-pharos-coach-mark header="Test Header">Test Description</test-pharos-coach-mark>`
    );
    const header = component.renderRoot.querySelector('pharos-heading');
    expect(header).to.have.text('Test Header');
  });

  it('displays content added as a child to the element', async () => {
    component = await fixture(
      html`<test-pharos-coach-mark>Test Description</test-pharos-coach-mark>`
    );
    expect(component).to.have.text('Test Description');
  });
});
