import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture } from '../../test/fixture';
import type { PharosRadioButton } from './pharos-radio-button';
import type { PharosLink } from '../link/pharos-link';
import createFormData from '../../utils/createFormData';

describe('pharos-radio-button', () => {
  let component: PharosRadioButton;

  beforeEach(async () => {
    component = await fixture(
      html`<test-pharos-radio-button
        ><span slot="label">test radio</span></test-pharos-radio-button
      >`
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
    component = await fixture(html`
      <test-pharos-radio-button disabled
        ><span slot="label">test radio</span></test-pharos-radio-button
      >
    `);
    await expect(component).toBeAccessible();
  });

  it('has association with validation message', async () => {
    component = await fixture(html`
      <test-pharos-radio-button message="this is a test"
        ><span slot="label">test radio</span></test-pharos-radio-button
      >
    `);
    expect(component.renderRoot.querySelector('input')?.getAttribute('aria-describedby')).toBe(
      'message'
    );
  });

  it('has an attribute to set check value', async () => {
    component = await fixture(html`
      <test-pharos-radio-button checked
        ><span slot="label">test radio</span></test-pharos-radio-button
      >
    `);
    expect(component.checked).toBe(true);
  });

  it('fires a change event', async () => {
    let eventSource = null as Element | null;
    const onChange = (event: Event): void => {
      eventSource = event.composedPath()[0] as Element;
    };
    component = await fixture(html`
      <test-pharos-radio-button value="1" @change=${onChange}
        ><span slot="label">test radio</span></test-pharos-radio-button
      >
    `);
    component['_radio'].click();
    await component.updateComplete;

    expect((eventSource as Element).isSameNode(component)).toBe(true);
  });

  it('is able to receive focus', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component['_radio'].focus();
    await component.updateComplete;
    expect(activeElement === component['_radio']).toBe(true);
    document.removeEventListener('focusin', onFocusIn);
  });

  it('is not able to receive focus when disabled', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component = await fixture(html`
      <test-pharos-radio-button disabled
        ><span slot="label">test radio</span></test-pharos-radio-button
      >
    `);

    component['_radio'].focus();
    await component.updateComplete;
    expect(activeElement === component['_radio']).toBe(false);
    expect(document.activeElement === component).toBe(false);
    document.removeEventListener('focusin', onFocusIn);
  });

  it('updates the form value', async () => {
    const parentNode = document.createElement('form');
    parentNode.setAttribute('name', 'my-form');
    component = await fixture(
      html`
        <test-pharos-radio-button name="my-radio" value="test" checked>
          <span slot="label">test radio</span>
        </test-pharos-radio-button>
      `,
      { parentNode }
    );

    const form = document.querySelector('form');
    const formdata = createFormData(form as HTMLFormElement);

    expect(formdata.get('my-radio')).toBe('test');
  });

  it('does not update the form value when disabled', async () => {
    const parentNode = document.createElement('form');
    parentNode.setAttribute('name', 'my-form');
    component = await fixture(
      html`
        <test-pharos-radio-button name="my-radio" value="test" disabled>
          <span slot="label">test radio</span>
        </test-pharos-radio-button>
      `,
      { parentNode }
    );

    const form = document.querySelector('form');
    const formdata = createFormData(form as HTMLFormElement);

    expect(formdata.get('my-radio')).toBeNull();
  });

  it('can be clicked when the label is hidden', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component = await fixture(html`
      <test-pharos-radio-button hide-label>
        <span slot="label">test radio</span>
      </test-pharos-radio-button>
    `);

    const icon = component.renderRoot.querySelector('svg') as SVGElement;
    icon.dispatchEvent(new Event('click'));
    await component.updateComplete;

    expect(component.checked).toBe(true);
    expect(activeElement === component['_radio']).toBe(true);
    document.removeEventListener('focusin', onFocusIn);
  });

  it('can be clicked when no label is present', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component = await fixture(html` <test-pharos-radio-button></test-pharos-radio-button> `);

    const icon = component.renderRoot.querySelector('svg') as SVGElement;
    icon.dispatchEvent(new Event('click'));
    await component.updateComplete;

    expect(component.checked).toBe(true);
    expect(activeElement === component['_radio']).toBe(true);
    document.removeEventListener('focusin', onFocusIn);
  });

  it('is able to delegate focus', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component.focus();

    expect(activeElement === component['_radio']).toBe(true);
    document.removeEventListener('focusin', onFocusIn);
  });

  it('allows links in the label to be clicked', async () => {
    component = await fixture(html`
      <test-pharos-radio-button
        ><span slot="label">test radio with <a href="#">link</a></span></test-pharos-radio-button
      >
    `);
    const link = component.renderRoot.querySelector('a');
    link?.click();
    await component.updateComplete;

    expect(component.checked).toBe(false);
  });

  it('allows Pharos links in the label to be clicked', async () => {
    component = await fixture(html`
      <test-pharos-radio-button
        ><span slot="label"
          >test radio with <test-pharos-link href="#">link</test-pharos-link></span
        ></test-pharos-radio-button
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
      <test-pharos-radio-button value="1" @click=${onClick}>
        <span slot="label">test radio</span>
      </test-pharos-radio-button>
    `);

    const label = component.renderRoot.querySelector('label') as HTMLLabelElement;
    label?.click();
    await component.updateComplete;
    expect(count).toBe(1);
  });

  it('stretches to fill its container when full-width is set', async () => {
    const parentNode = document.createElement('div');
    parentNode.style.width = '400px';
    component = await fixture(
      html`<test-pharos-radio-button full-width
        ><span slot="label">test radio</span></test-pharos-radio-button
      >`,
      { parentNode }
    );
    expect(getComputedStyle(component).width).toBe('400px');
  });

  it('does not stretch to fill its container by default', async () => {
    const parentNode = document.createElement('div');
    parentNode.style.width = '400px';
    component = await fixture(
      html`<test-pharos-radio-button
        ><span slot="label">test radio</span></test-pharos-radio-button
      >`,
      { parentNode }
    );
    expect(getComputedStyle(component).width).not.toBe('400px');
  });

  it('resets checked when the form is reset', async () => {
    const parentNode = document.createElement('form');
    parentNode.setAttribute('name', 'my-form');
    component = await fixture(
      html`
        <test-pharos-radio-button name="my-radio" value="test" checked>
          <span slot="label">test radio</span>
        </test-pharos-radio-button>
      `,
      { parentNode }
    );

    component.checked = false;
    await component.updateComplete;

    const form = document.querySelector('form');
    form?.dispatchEvent(new Event('reset'));
    await component.updateComplete;

    const formdata = createFormData(form as HTMLFormElement);
    expect(formdata.get('my-radio')).toBe('test');
  });
});
