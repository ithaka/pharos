import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture } from '../../test/fixture';
import type { PharosCheckbox } from './pharos-checkbox';
import type { PharosLink } from '../link/pharos-link';
import createFormData from '../../utils/createFormData';

describe('pharos-checkbox', () => {
  let component: PharosCheckbox;

  beforeEach(async () => {
    component = await fixture(
      html`<test-pharos-checkbox><span slot="label">test checkbox</span></test-pharos-checkbox>`
    );
  });

  afterEach(() => document.body.replaceChildren());

  it('is accessible', async () => {
    await expect(component).toBeAccessible();
  });

  it('is accessible when focused', async () => {
    component.dispatchEvent(new Event('focusin'));
    await component.updateComplete;
    await expect(component).toBeAccessible();
  });

  it('is accessible when disabled', async () => {
    component = await fixture(
      html`<test-pharos-checkbox disabled
        ><span slot="label">test checkbox</span></test-pharos-checkbox
      >`
    );
    await expect(component).toBeAccessible();
  });

  it('has an attribute to set check value', async () => {
    component = await fixture(html`
      <test-pharos-checkbox checked><span slot="label">test checkbox</span></test-pharos-checkbox>
    `);
    expect(component.checked).toBe(true);
  });

  it('fires a change event', async () => {
    let eventSource = null as Element | null;
    const onChange = (event: Event): void => {
      eventSource = event.composedPath()[0] as Element;
    };
    component = await fixture(html`
      <test-pharos-checkbox @change=${onChange}
        ><span slot="label">test checkbox</span></test-pharos-checkbox
      >
    `);

    component['_checkbox'].click();
    await component.updateComplete;

    expect((eventSource as Element).isSameNode(component)).toBe(true);
  });

  it('is able to receive focus', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component['_checkbox'].focus();
    await component.updateComplete;
    expect(activeElement === component['_checkbox']).toBe(true);
    document.removeEventListener('focusin', onFocusIn);
  });

  it('is not able to receive focus when disabled', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component = await fixture(
      html`<test-pharos-checkbox disabled
        ><span slot="label">test checkbox</span></test-pharos-checkbox
      >`
    );

    component['_checkbox'].focus();
    await component.updateComplete;
    expect(activeElement === component['_checkbox']).toBe(false);
    expect(document.activeElement === component).toBe(false);
    document.removeEventListener('focusin', onFocusIn);
  });

  it('updates the form value', async () => {
    const parentNode = document.createElement('form');
    parentNode.setAttribute('name', 'my-form');
    component = await fixture(
      html`
        <test-pharos-checkbox name="my-checkbox" value="test" checked>
          <span slot="label">test checkbox</span>
        </test-pharos-checkbox>
      `,
      { parentNode }
    );

    const form = document.querySelector('form');
    const formdata = createFormData(form as HTMLFormElement);

    expect(formdata.get('my-checkbox')).toBe('test');
  });

  it('updates the form value to "on" when no value is passed', async () => {
    const parentNode = document.createElement('form');
    parentNode.setAttribute('name', 'my-form');
    component = await fixture(
      html`
        <test-pharos-checkbox name="my-checkbox" checked>
          <span slot="label">test checkbox</span>
        </test-pharos-checkbox>
      `,
      { parentNode }
    );

    const form = document.querySelector('form');
    const formdata = createFormData(form as HTMLFormElement);

    expect(formdata.get('my-checkbox')).toBe('on');
  });

  it('does not update the form value when disabled', async () => {
    const parentNode = document.createElement('form');
    parentNode.setAttribute('name', 'my-form');
    component = await fixture(
      html`
        <test-pharos-checkbox name="my-checkbox" value="test" disabled>
          <span slot="label">test checkbox</span>
        </test-pharos-checkbox>
      `,
      { parentNode }
    );

    const form = document.querySelector('form');
    const formdata = createFormData(form as HTMLFormElement);

    expect(formdata.get('my-checkbox')).toBeNull();
  });

  it('can be clicked when the label is hidden', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component = await fixture(html`
      <test-pharos-checkbox hide-label>
        <span slot="label">test checkbox</span>
      </test-pharos-checkbox>
    `);

    const icon = component.renderRoot.querySelector('svg') as SVGElement;
    icon.dispatchEvent(new Event('click'));
    await component.updateComplete;

    expect(component.checked).toBe(true);
    expect(activeElement === component['_checkbox']).toBe(true);
    document.removeEventListener('focusin', onFocusIn);
  });

  it('can be clicked when no label is present', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component = await fixture(html` <test-pharos-checkbox></test-pharos-checkbox> `);

    const icon = component.renderRoot.querySelector('svg') as SVGElement;
    icon.dispatchEvent(new Event('click'));
    await component.updateComplete;

    expect(component.checked).toBe(true);
    expect(activeElement === component['_checkbox']).toBe(true);
    document.removeEventListener('focusin', onFocusIn);
  });

  it('is able to delegate focus', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component.focus();

    expect(activeElement === component['_checkbox']).toBe(true);
    document.removeEventListener('focusin', onFocusIn);
  });

  it('allows links in the label to be clicked', async () => {
    component = await fixture(html`
      <test-pharos-checkbox
        ><span slot="label">test checkbox with <a href="#">link</a></span></test-pharos-checkbox
      >
    `);
    const link = component.renderRoot.querySelector('a');
    link?.click();
    await component.updateComplete;

    expect(component.checked).toBe(false);
  });

  it('allows Pharos links in the label to be clicked', async () => {
    component = await fixture(html`
      <test-pharos-checkbox
        ><span slot="label"
          >test checkbox with <test-pharos-link href="#">link</test-pharos-link></span
        ></test-pharos-checkbox
      >
    `);
    const link = component.querySelector('test-pharos-link') as PharosLink;
    const anchor = link?.renderRoot.querySelector('#link-element') as HTMLAnchorElement;
    anchor.click();
    await component.updateComplete;

    expect(component.checked).toBe(false);
  });

  it('fires a single click event', async () => {
    let count = 0;
    const onClick = (): void => {
      count++;
    };
    component = await fixture(html`
      <test-pharos-checkbox @click=${onClick}
        ><span slot="label">test checkbox</span></test-pharos-checkbox
      >
    `);

    const label = component.renderRoot.querySelector('label') as HTMLLabelElement;
    label?.click();
    await component.updateComplete;
    expect(count).toBe(1);
  });

  it('fires a single click event but does not update if event prevented', async () => {
    const onClick = (event: Event): void => {
      event.preventDefault();
    };
    component = await fixture(html`
      <test-pharos-checkbox @click=${onClick}
        ><span slot="label">test checkbox</span></test-pharos-checkbox
      >
    `);

    const label = component.renderRoot.querySelector('label') as HTMLLabelElement;
    label?.click();
    await component.updateComplete;
    expect(component.checked).toBe(false);
  });

  it('is checked when clicked from indeterminate state', async () => {
    component = await fixture(html`
      <test-pharos-checkbox indeterminate
        ><span slot="label">test checkbox</span></test-pharos-checkbox
      >
    `);

    const label = component.renderRoot.querySelector('label') as HTMLLabelElement;
    label?.click();
    await component.updateComplete;
    expect(component.indeterminate).toBe(false);
    expect(component.checked).toBe(true);
  });

  it('prevents hover styles on mousedown', async () => {
    const event = new MouseEvent('mousedown');
    const clickSpy = vi.spyOn(event, 'preventDefault');

    const icon = component.renderRoot.querySelector('svg') as SVGElement;
    icon.dispatchEvent(event);
    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it('stretches to fill its container when full-width is set', async () => {
    const parentNode = document.createElement('div');
    parentNode.style.width = '400px';
    component = await fixture(
      html`<test-pharos-checkbox full-width
        ><span slot="label">test checkbox</span></test-pharos-checkbox
      >`,
      { parentNode }
    );
    expect(getComputedStyle(component).width).toBe('400px');
  });

  it('does not stretch to fill its container by default', async () => {
    const parentNode = document.createElement('div');
    parentNode.style.width = '400px';
    component = await fixture(
      html`<test-pharos-checkbox><span slot="label">test checkbox</span></test-pharos-checkbox>`,
      { parentNode }
    );
    expect(getComputedStyle(component).width).not.toBe('400px');
  });

  it('keeps the native input in sync when checked is set programmatically after a click', async () => {
    component['_checkbox'].click();
    await component.updateComplete;
    expect(component.checked).toBe(true);

    component.checked = false;
    await component.updateComplete;
    expect(component['_checkbox'].checked).toBe(false);
  });

  it('re-checks on the next click after being unchecked programmatically', async () => {
    let lastChecked: boolean | null = null;
    component.addEventListener('change', () => {
      lastChecked = component.checked;
    });

    component['_checkbox'].click();
    await component.updateComplete;
    expect(component.checked).toBe(true);

    component.checked = false;
    await component.updateComplete;

    component['_checkbox'].click();
    await component.updateComplete;

    expect(component.checked).toBe(true);
    expect(lastChecked).toBe(true);
  });

  it('resets checked when the form is reset', async () => {
    const parentNode = document.createElement('form');
    parentNode.setAttribute('name', 'my-form');
    component = await fixture(
      html`
        <test-pharos-checkbox name="my-checkbox" value="test" checked>
          <span slot="label">test checkbox</span>
        </test-pharos-checkbox>
      `,
      { parentNode }
    );

    const form = document.querySelector('form');
    const formdataInitial = createFormData(form as HTMLFormElement);
    expect(formdataInitial.get('my-checkbox')).toBe('test');

    component.checked = false;
    await component.updateComplete;

    const formdataUnchecked = createFormData(form as HTMLFormElement);
    expect(formdataUnchecked.get('my-checkbox')).toBe(null);

    form?.dispatchEvent(new Event('reset'));
    await component.updateComplete;

    const formdataReset = createFormData(form as HTMLFormElement);
    expect(formdataReset.get('my-checkbox')).toBe('test');
  });
});
