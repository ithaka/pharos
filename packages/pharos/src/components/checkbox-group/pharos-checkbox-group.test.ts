import { beforeEach, describe, expect, it, vi } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture } from '../../test/fixture';
import type { PharosCheckboxGroup } from './pharos-checkbox-group';
import type { PharosCheckbox } from '../checkbox/pharos-checkbox';

describe('pharos-checkbox-group', () => {
  let component: PharosCheckboxGroup;

  beforeEach(async () => {
    component = await fixture(html`
      <test-pharos-checkbox-group name="checkbox-group">
        <span slot="legend">Checkbox Group Header</span>
        <test-pharos-checkbox value="1"><span slot="label">Checkbox 1</span></test-pharos-checkbox>
        <test-pharos-checkbox value="2"><span slot="label">Checkbox 2</span></test-pharos-checkbox>
      </test-pharos-checkbox-group>
    `);
  });

  it('is accessible', async () => {
    await expect(component).toBeAccessible();
  });

  it('is accessible when focused', async () => {
    component.dispatchEvent(new Event('focusin'));
    await component.updateComplete;
    await expect(component).toBeAccessible();
  });

  it('has an attribute to set orientation', async () => {
    component = await fixture(html`
      <test-pharos-checkbox-group horizontal>
        <test-pharos-checkbox value="1"><span slot="label">Checkbox 1</span></test-pharos-checkbox>
        <test-pharos-checkbox value="2" checked
          ><span slot="label">Checkbox 2</span></test-pharos-checkbox
        >
      </test-pharos-checkbox-group>
    `);
    const fieldset = component.renderRoot.querySelector('fieldset') as HTMLElement;
    expect(fieldset.classList.contains('checkbox-group--horizontal')).toBe(true);
  });

  it('fires a change event', async () => {
    let eventSource = null as Element | null;
    const onChange = (event: Event): void => {
      eventSource = event.composedPath()[0] as Element;
    };
    component = await fixture(html`
      <test-pharos-checkbox-group @change=${onChange}>
        <test-pharos-checkbox value="1"><span slot="label">Checkbox 1</span></test-pharos-checkbox>
        <test-pharos-checkbox value="2"><span slot="label">Checkbox 2</span></test-pharos-checkbox>
      </test-pharos-checkbox-group>
    `);

    const box = component.querySelector('test-pharos-checkbox[value="2"]') as PharosCheckbox;
    box['_checkbox'].click();
    await component.updateComplete;

    expect((eventSource as Element).isSameNode(component)).toBe(true);
  });

  it('sets the name for each checkbox in the group', async () => {
    component = await fixture(html`
      <test-pharos-checkbox-group name="group1">
        <test-pharos-checkbox value="1"><span slot="label">Checkbox 1</span></test-pharos-checkbox>
        <test-pharos-checkbox value="2"><span slot="label">Checkbox 2</span></test-pharos-checkbox>
      </test-pharos-checkbox-group>
    `);
    const boxes = component.querySelectorAll('test-pharos-checkbox') as NodeListOf<PharosCheckbox>;
    boxes.forEach((box) => {
      expect(box.name).toBe('group1');
    });
  });

  it('sets value if a single checkbox is checked', async () => {
    component = await fixture(html`
      <test-pharos-checkbox-group name="group1">
        <test-pharos-checkbox value="1"><span slot="label">Checkbox 1</span></test-pharos-checkbox>
        <test-pharos-checkbox value="2" checked
          ><span slot="label">Checkbox 2</span></test-pharos-checkbox
        >
        <test-pharos-checkbox value="3"><span slot="label">Checkbox 3</span></test-pharos-checkbox>
      </test-pharos-checkbox-group>
    `);
    expect(component.value).toEqual(['2']);
  });

  it('sets value if multiple checkboxes are checked', async () => {
    component = await fixture(html`
      <test-pharos-checkbox-group name="group1">
        <test-pharos-checkbox value="1" checked
          ><span slot="label">Checkbox 1</span></test-pharos-checkbox
        >
        <test-pharos-checkbox value="2"><span slot="label">Checkbox 2</span></test-pharos-checkbox>
        <test-pharos-checkbox value="3" checked
          ><span slot="label">Checkbox 3</span></test-pharos-checkbox
        >
      </test-pharos-checkbox-group>
    `);
    expect(component.value).toEqual(['1', '3']);
  });

  it('is able to delegate focus', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);
    const checkbox = component.querySelector('test-pharos-checkbox') as PharosCheckbox;

    component.focus();

    expect(activeElement === checkbox?.['_checkbox']).toBe(true);
    document.removeEventListener('focusin', onFocusIn);
  });

  it('renders a provided message', async () => {
    const text = 'Please make a selection';
    component = await fixture(html`
      <test-pharos-checkbox-group message=${text}>
        <span slot="legend">Checkbox Group Header</span>
        <test-pharos-checkbox value="1"><span slot="label">Checkbox 1</span></test-pharos-checkbox>
        <test-pharos-checkbox value="2"><span slot="label">Checkbox 2</span></test-pharos-checkbox>
      </test-pharos-checkbox-group>
    `);
    const message = component.renderRoot.querySelector('.input-message__text');
    expect(message?.textContent).toBe(text);
  });

  it('renders the provided message as the groups accessible description', async () => {
    const text = 'Please make a selection';
    component = await fixture(html`
      <test-pharos-checkbox-group message=${text}>
        <span slot="legend">Checkbox Group Header</span>
        <test-pharos-checkbox value="1"><span slot="label">Checkbox 1</span></test-pharos-checkbox>
        <test-pharos-checkbox value="2"><span slot="label">Checkbox 2</span></test-pharos-checkbox>
      </test-pharos-checkbox-group>
    `);
    const groupDescID = component.renderRoot
      .querySelector('fieldset')
      ?.getAttribute('aria-describedby');

    expect(component.renderRoot.querySelector(`#${groupDescID}`)?.textContent?.trim()).toBe(text);
  });

  it('updates the state of its children', async () => {
    const boxes = component.querySelectorAll('test-pharos-checkbox') as NodeListOf<PharosCheckbox>;
    component.disabled = true;
    await component.updateComplete;
    boxes.forEach((box) => {
      expect(box.disabled).toBe(true);
    });
    component.invalidated = true;
    await component.updateComplete;
    boxes.forEach((box) => {
      expect(box.invalidated).toBe(true);
    });
    component.validated = true;
    await component.updateComplete;
    boxes.forEach((box) => {
      expect(box.validated).toBe(true);
    });
  });

  it("stops propagation of its child's change event", async () => {
    const event = new Event('change');
    const changeSpy = vi.spyOn(event, 'stopPropagation');

    const box = component.querySelector('test-pharos-checkbox[value="2"]') as PharosCheckbox;
    box.dispatchEvent(event);
    await component.updateComplete;

    expect(changeSpy).toHaveBeenCalledTimes(1);
  });
});
