import { html, fixture, expect } from '@open-wc/testing';
import './pharos-link';
import '../alert/pharos-alert';
import type { PharosLink } from './pharos-link';
import { PharosColorBlack } from '../../styles/variables';

describe('pharos-link', () => {
  let component: PharosLink;

  beforeEach(async () => {
    component = await fixture(html`<pharos-link href="#">I am a link</pharos-link>`);
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });

  it('is accessible in the subtle state', async () => {
    component.subtle = true;
    await component.updateComplete;
    await expect(component).to.be.accessible();
  });

  it('is accessible on a AA compliant background', async () => {
    const parentNode = document.createElement('div');
    parentNode.style.backgroundColor = PharosColorBlack;

    component = await fixture(html`<pharos-link href="#" on-background>I am a link</pharos-link>`, {
      parentNode,
    });
    await expect(component).to.be.accessible();
  });

  it('is able to delegate focus', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component.focus();
    const link = component.renderRoot.querySelector('#link-element');

    expect(activeElement === link).to.be.true;
    document.removeEventListener('focusin', onFocusIn);
  });

  it('throws an error for an invalid target value', async () => {
    component = await fixture(html`
      <pharos-link href="#" target="fake">I am a link</pharos-link>
    `).catch((e) => e);
    expect('fake is not a valid target. Valid targets are: _blank, _parent, _self, _top').to.be
      .thrown;
  });

  it('adds a class to update its styles when in an alert', async () => {
    const parentNode = document.createElement('pharos-alert');

    component = await fixture(html`<pharos-link href="#">I am a link</pharos-link>`, {
      parentNode,
    });
    const link = component.renderRoot.querySelector('#link-element');

    expect(link).to.have.class('link--alert');
  });
});
