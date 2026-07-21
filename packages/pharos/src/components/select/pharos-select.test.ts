import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture } from '../../test/fixture';
import type { PharosSelect } from './pharos-select';
import createFormData from '../../utils/createFormData';

describe('pharos-select', () => {
  let component: PharosSelect;
  let disabled: PharosSelect;

  afterEach(() => {
    document.body.replaceChildren();
  });

  beforeEach(async () => {
    component = await fixture(
      html`<test-pharos-select>
        <span slot="label">test</span>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3" selected>Option 3</option>
        <option value="4">Option 4</option>
        <option value="5">Option 5</option>
      </test-pharos-select>`
    );

    disabled = await fixture(
      html`<test-pharos-select disabled>
        <span slot="label">test</span>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3" selected>Option 3</option>
        <option value="4">Option 4</option>
        <option value="5">Option 5</option>
      </test-pharos-select>`
    );
  });

  it('is accessible', async () => {
    await expect(component).toBeAccessible();
  });

  it('is accessible when focused', async () => {
    component.dispatchEvent(new Event('focusin'));
    await component.updateComplete;
    await expect(component).toBeAccessible();
  });

  it('is accessible when disabled', async () => {
    await expect(disabled).toBeAccessible();
  });

  it('uses the first option by default', async () => {
    component = await fixture(html`
      <test-pharos-select>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </test-pharos-select>
    `);

    expect(component.value).toBe('1');
  });

  it('fires a change event', async () => {
    let eventSource = null as Element | null;
    const onChange = (event: Event): void => {
      eventSource = event.composedPath()[0] as Element;
    };
    component = await fixture(html`
      <test-pharos-select @change=${onChange}>
        <span slot="label">test</span>
        <option value="1">Option 1</option>
      </test-pharos-select>
    `);

    component.value = '1';
    component['_select'].dispatchEvent(new Event('change'));
    await component.updateComplete;

    expect((eventSource as Element).isSameNode(component)).toBe(true);
  });

  it('updates the value on change', async () => {
    component = await fixture(html`
      <test-pharos-select>
        <span slot="label">test</span>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
      </test-pharos-select>
    `);

    component['_select'].value = '2';
    component['_select'].dispatchEvent(new Event('change'));
    await component.updateComplete;

    expect(component.value).toBe('2');
  });

  it('is able to receive focus', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component['_select'].focus();
    await component.updateComplete;
    expect(activeElement === component['_select']).toBe(true);
    document.removeEventListener('focusin', onFocusIn);
  });

  it('is not able to receive focus when disabled', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    disabled['_select'].focus();
    await disabled.updateComplete;
    expect(activeElement === disabled['_select']).toBe(false);
    expect(document.activeElement === disabled).toBe(false);
    document.removeEventListener('focusin', onFocusIn);
  });

  it('updates the form value', async () => {
    const parentNode = document.createElement('form');
    parentNode.setAttribute('name', 'my-form');
    component = await fixture(
      html`
        <test-pharos-select name="my-select">
          <span slot="label">test</span>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3" selected>Option 3</option>
          <option value="4">Option 4</option>
          <option value="5">Option 5</option>
        </test-pharos-select>
      `,
      { parentNode }
    );

    const form = document.querySelector('form');
    const formdata = createFormData(form as HTMLFormElement);

    expect(formdata.get('my-select')).toBe('3');
  });

  it('does not update the form value when disabled', async () => {
    const parentNode = document.createElement('form');
    parentNode.setAttribute('name', 'my-form');
    component = await fixture(
      html`
        <test-pharos-select name="my-select" disabled>
          <span slot="label">test</span>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3" selected>Option 3</option>
          <option value="4">Option 4</option>
          <option value="5">Option 5</option>
        </test-pharos-select>
      `,
      { parentNode }
    );

    const form = document.querySelector('form');
    const formdata = createFormData(form as HTMLFormElement);

    expect(formdata.get('my-select')).toBeNull();
  });

  it('is able to delegate focus', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component.focus();

    expect(activeElement === component['_select']).toBe(true);
    document.removeEventListener('focusin', onFocusIn);
  });

  it('resets the selected option when the form is reset', async () => {
    const parentNode = document.createElement('form');
    parentNode.setAttribute('name', 'my-form');
    component = await fixture(
      html`
        <test-pharos-select name="my-select">
          <span slot="label">test</span>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3" selected>Option 3</option>
          <option value="4">Option 4</option>
          <option value="5">Option 5</option>
        </test-pharos-select>
      `,
      { parentNode }
    );

    component.value = '2';
    await component.updateComplete;

    const form = document.querySelector('form');
    form?.dispatchEvent(new Event('reset'));
    await component.updateComplete;

    const formdata = createFormData(form as HTMLFormElement);
    expect(formdata.get('my-select')).toBe('3');
  });

  it('renders an additional option when one is added dynamically', async () => {
    const option = document.createElement('option');
    option.textContent = 'I am an option';

    component.appendChild(option);

    await vi.waitFor(() => {
      expect(component.renderRoot.querySelectorAll('option')?.length).toBe(6);
    });
  });

  it('removes an option when one is removed dynamically', async () => {
    const option = component.querySelector('option');

    if (option) {
      component.removeChild(option);
    }

    await vi.waitFor(() => {
      expect(component.renderRoot.querySelectorAll('option')?.length).toBe(4);
    });
  });

  it('sets the selection when a value is initially passed', async () => {
    component = await fixture(
      html`<test-pharos-select value="2">
        <span slot="label">test</span>
        <option value="1">Option 1</option>
        <option value="2">Option 2</option>
        <option value="3">Option 3</option>
        <option value="4">Option 4</option>
        <option value="5">Option 5</option>
      </test-pharos-select>`
    );
    await component.updateComplete;
    expect(component['_select'].value).toBe('2');
  });
});
