import { beforeEach, describe, expect, it, vi } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture } from '../../test/fixture';
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
    await expect(component).toBeAccessible();
  });

  it('adjusts its padding when elements are appended to the group', async () => {
    const expectedWidth = 12 + component['_appendGroupWidth'];
    const paddingRight = parseInt(
      window.getComputedStyle(component['_input'], null).getPropertyValue('padding-right'),
      10
    );

    expect(paddingRight).toBe(expectedWidth);
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

    const expectedWidth = 12 + component['_prependGroupWidth'];
    await vi.waitFor(() => {
      const paddingLeft = parseInt(
        window.getComputedStyle(component['_input'], null).getPropertyValue('padding-left'),
        10
      );
      expect(paddingLeft).toBe(expectedWidth);
    });
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

    expect(paddingRight).toBe(expectedPadding);
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

    expect(paddingLeft).toBe(expectedPadding);
  });

  it('adjusts the validated icon position when elements are appended to the group', async () => {
    component.validated = true;
    await component.updateComplete;

    await vi.waitFor(() => {
      expect(component['_inputIcon'].style.right).toBe('24px');
    });
  });

  it('adjusts the validated icon position when elements are dynamically appended to the group', async () => {
    const button = document.createElement('test-pharos-button');
    button.icon = 'close';
    button.a11yLabel = 'close';
    component.appendChild(button);
    component.validated = true;

    await component.updateComplete;

    await vi.waitFor(() => {
      expect(component['_inputIcon'].style.right).toBe('48px');
    });
  });
});
