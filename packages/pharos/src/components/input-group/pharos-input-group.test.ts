import { fixture, expect, nextFrame } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { PharosInputGroup } from './pharos-input-group';

describe('pharos-input-group', () => {
  let component: PharosInputGroup;

  beforeEach(async () => {
    component = await fixture(html`
      <test-pharos-input-group>
        <span slot="label">Search</span>
        <test-pharos-button icon="search" variant="subtle" a11y-label="search"></test-pharos-button>
      </test-pharos-input-group>
    `);
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });

  it('adjusts its padding when elements are appended to the group', async () => {
    const expectedWidth = 12 + component['_appendGroupWidth'];
    const paddingRight = parseInt(
      window.getComputedStyle(component['_input'], null).getPropertyValue('padding-right'),
      10
    );

    expect(paddingRight).to.equal(expectedWidth);
  });

  it('adjusts its padding when elements are prepended to the group', async () => {
    component = await fixture(html`
      <test-pharos-input-group>
        <span slot="label">I am a label</span>
        <test-pharos-button
          slot="prepend"
          icon="search"
          variant="subtle"
          a11y-label="search"
        ></test-pharos-button>
      </test-pharos-input-group>
    `);
    await nextFrame();

    const expectedWidth = 12 + component['_prependGroupWidth'];
    const paddingLeft = parseInt(
      window.getComputedStyle(component['_input'], null).getPropertyValue('padding-left'),
      10
    );

    expect(paddingLeft).to.equal(expectedWidth);
  });

  it('adjusts its padding when focused', async () => {
    const expectedPadding =
      parseInt(
        window.getComputedStyle(component['_input'], null).getPropertyValue('padding-right'),
        10
      ) - 1;

    component.focus();
    await component.updateComplete;

    const paddingRight = parseInt(
      window.getComputedStyle(component['_input'], null).getPropertyValue('padding-right'),
      10
    );

    expect(paddingRight).to.equal(expectedPadding);
  });

  it('resets its padding when blurred', async () => {
    const expectedPadding = parseInt(
      window.getComputedStyle(component['_input'], null).getPropertyValue('padding-left'),
      10
    );

    component.dispatchEvent(new FocusEvent('focus'));
    await component.updateComplete;
    component.dispatchEvent(new FocusEvent('blur'));
    await component.updateComplete;

    const paddingLeft = parseInt(
      window.getComputedStyle(component['_input'], null).getPropertyValue('padding-left'),
      10
    );

    expect(paddingLeft).to.equal(expectedPadding);
  });

  it('adjusts the validated icon position when elements are appended to the group', async () => {
    component.validated = true;
    await component.updateComplete;
    await nextFrame();
    expect(component['_inputIcon'].style.right).to.equal('24px');
  });

  it('adjusts the validated icon position when elements are dynamically appended to the group', async () => {
    const button = document.createElement('test-pharos-button');
    button.icon = 'close';
    button.a11yLabel = 'close';
    component.appendChild(button);
    component.validated = true;

    await component.updateComplete;
    await nextFrame();
    expect(component['_inputIcon'].style.right).to.equal('48px');
  });
});
