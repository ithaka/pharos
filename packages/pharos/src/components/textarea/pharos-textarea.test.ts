import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture, errorFixture } from '../../test/fixture';
import type { PharosTextarea } from './pharos-textarea';
import createFormData from '../../utils/createFormData';

describe('pharos-textarea', () => {
  let component: PharosTextarea;

  beforeEach(async () => {
    component = await fixture(
      html`<test-pharos-textarea><span slot="label">I am a label</span></test-pharos-textarea>`
    );
  });

  afterEach(() => {
    document.body.replaceChildren();
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
    component = await fixture(
      html`<test-pharos-textarea disabled
        ><span slot="label">I am a label</span></test-pharos-textarea
      >`
    );
    await expect(component).toBeAccessible();
  });

  it('is accessible when readonly', async () => {
    component = await fixture(
      html`<test-pharos-textarea readonly
        ><span slot="label">I am a label</span></test-pharos-textarea
      >`
    );
    await expect(component).toBeAccessible();
  });

  it('sets its default attributes', async () => {
    component = await fixture(html`
      <test-pharos-textarea>
        <span slot="label">I am a label</span>
      </test-pharos-textarea>
    `);
    expect(component).toEqualDom(
      `<test-pharos-textarea cols="20" data-pharos-component="PharosTextarea" dirname="" message="" name="" placeholder="" resize="both" rows="2" value="" wrap="soft"><span slot="label">I am a label</span></test-pharos-textarea>`
    );
  });

  it('has an attribute to set the placeholder text of the input', async () => {
    component = await fixture(html`
      <test-pharos-textarea placeholder="test"
        ><span slot="label">I am a label</span></test-pharos-textarea
      >
    `);
    expect(component.getAttribute('placeholder')).toBe('test');
    expect(component['_textarea'].getAttribute('placeholder')).toBe('test');

    component.placeholder = 'foo';
    await component.updateComplete;
    expect(component.getAttribute('placeholder')).toBe('foo');
    expect(component['_textarea'].getAttribute('placeholder')).toBe('foo');
  });

  it('has an attribute to set input value', async () => {
    component = await fixture(html`
      <test-pharos-textarea value="test"
        ><span slot="label">I am a label</span></test-pharos-textarea
      >
    `);
    expect(component.getAttribute('value')).toBe('test');
    expect(component['_textarea'].value).toBe('test');
  });

  it('has an attribute to set resize options', async () => {
    component = await fixture(html`
      <test-pharos-textarea resize="none"
        ><span slot="label">I am a label</span></test-pharos-textarea
      >
    `);
    expect(component.getAttribute('resize')).toBe('none');
  });

  it('throws an error for an invalid resize value', async () => {
    const error = await errorFixture(html`
      <test-pharos-textarea resize="blah"
        ><span slot="label">I am a label</span></test-pharos-textarea
      >
    `);
    expect(error.message).toContain(
      'blah is not a valid resize value. Valid values are: none, vertical, horizontal, both'
    );
  });

  it('has an attribute to set wrap options', async () => {
    component = await fixture(html`
      <test-pharos-textarea wrap="hard"
        ><span slot="label">I am a label</span></test-pharos-textarea
      >
    `);
    expect(component.getAttribute('wrap')).toBe('hard');
  });

  it('throws an error for an invalid wrap value', async () => {
    const error = await errorFixture(html`
      <test-pharos-textarea wrap="blah"
        ><span slot="label">I am a label</span></test-pharos-textarea
      >
    `);
    expect(error.message).toContain('blah is not a valid wrap value. Valid values are: soft, hard');
  });

  it('accepts input from the user', async () => {
    component['_textarea'].value = 'test';
    component['_textarea'].dispatchEvent(new Event('input'));

    expect(component.value).toBe('test');
  });

  it('fires a change event', async () => {
    let eventSource = null as Element | null;
    const onChange = (event: Event): void => {
      eventSource = event.composedPath()[0] as Element;
    };
    component = await fixture(html`
      <test-pharos-textarea @change=${onChange}
        ><span slot="label">I am a label</span></test-pharos-textarea
      >
    `);

    component['_textarea'].value = 'test';
    component['_textarea'].dispatchEvent(new Event('input'));
    component['_textarea'].dispatchEvent(new Event('change'));

    expect(component.value).toBe('test');
    expect((eventSource as Element).isSameNode(component)).toBe(true);
  });

  it('is able to receive focus', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component['_textarea'].focus();
    await component.updateComplete;
    expect(activeElement === component['_textarea']).toBe(true);
    document.removeEventListener('focusin', onFocusIn);
  });

  it('is not able to receive focus when disabled', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component = await fixture(
      html`<test-pharos-textarea disabled
        ><span slot="label">I am a label</span></test-pharos-textarea
      >`
    );

    component['_textarea'].focus();
    await component.updateComplete;
    expect(activeElement === component['_textarea']).toBe(false);
    expect(document.activeElement === component).toBe(false);
    document.removeEventListener('focusin', onFocusIn);
  });

  it('renders a required asterisk and hidden text when input is required', async () => {
    component = await fixture(html`
      <test-pharos-textarea required><span slot="label">I am a label</span></test-pharos-textarea>
    `);
    expect(component).toEqualShadowDom(`
      <label for="textarea-element">
        <slot name="label">
        </slot>
        <span class="required-indicator">
          *
          <span class="required-indicator__text">
            required
          </span>
        </span>
       </label>
      <div class="textarea-wrapper">
        <textarea
          class="textarea textarea--resize-both"
          cols="20"
          dirname=""
          aria-invalid="false"
          aria-required="true"
          id="textarea-element"
          name=""
          placeholder=""
          required=""
          rows="2"
          wrap="soft"
        >
        </textarea>
      </div>
      `);
  });

  it('renders a provided message', async () => {
    component = await fixture(html`
      <test-pharos-textarea message="I am invalid"
        ><span slot="label">I am a label</span></test-pharos-textarea
      >
    `);
    expect(component).toEqualShadowDom(`
      <label for="textarea-element">
        <slot name="label">
        </slot>
       </label>
      <div class="textarea-wrapper">
        <textarea
          aria-describedby="message"
          class="textarea textarea--resize-both"
          cols="20"
          dirname=""
          aria-invalid="false"
          aria-required="false"
          id="textarea-element"
          name=""
          placeholder=""
          rows="2"
          wrap="soft"
        >
        </textarea>
      </div>
      <div
        class="input-message"
        id="message"
      >
        <div class="input-message__text">
          I am invalid
        </div>
        <slot name="message">
        </slot>
      </div>
      `);
  });

  it('removes invalidated state when validated', async () => {
    component = await fixture(html`
      <test-pharos-textarea invalidated
        ><span slot="label">I am a label</span></test-pharos-textarea
      >
    `);
    component.validated = true;
    await component.updateComplete;

    expect(component.invalidated).toBe(false);
    expect(component.hasAttribute('invalidated')).toBe(false);
  });

  it('removes validated state when invalidated', async () => {
    component = await fixture(html`
      <test-pharos-textarea validated><span slot="label">I am a label</span></test-pharos-textarea>
    `);
    component.invalidated = true;
    await component.updateComplete;

    expect(component.validated).toBe(false);
    expect(component.hasAttribute('validated')).toBe(false);
  });

  it('updates the form value', async () => {
    const parentNode = document.createElement('form');
    parentNode.setAttribute('name', 'my-form');
    component = await fixture(
      html`
        <test-pharos-textarea name="my-textarea" value="test">
          <span slot="label">I am a label</span>
        </test-pharos-textarea>
      `,
      { parentNode }
    );

    const form = document.querySelector('form');
    const formdata = createFormData(form as HTMLFormElement);

    expect(formdata.get('my-textarea')).toBe('test');
  });

  it('does not update the form value when disabled', async () => {
    const parentNode = document.createElement('form');
    parentNode.setAttribute('name', 'my-form');
    component = await fixture(
      html`
        <test-pharos-textarea name="my-textarea" value="test" disabled>
          <span slot="label">I am a label</span>
        </test-pharos-textarea>
      `,
      { parentNode }
    );

    const form = document.querySelector('form');
    const formdata = createFormData(form as HTMLFormElement);

    expect(formdata.get('my-textarea')).toBeNull();
  });

  it('is able to delegate focus', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component.focus();

    expect(activeElement === component['_textarea']).toBe(true);
    document.removeEventListener('focusin', onFocusIn);
  });

  it('resets its value when the form is reset', async () => {
    const parentNode = document.createElement('form');
    parentNode.setAttribute('name', 'my-form');
    component = await fixture(
      html`
        <test-pharos-textarea name="my-textarea" value="test">
          <span slot="label">I am a label</span>
        </test-pharos-textarea>
      `,
      { parentNode }
    );

    component.value = 'otherValue';
    await component.updateComplete;

    const form = document.querySelector('form');
    form?.dispatchEvent(new Event('reset'));
    await component.updateComplete;

    const formdata = createFormData(form as HTMLFormElement);
    expect(formdata.get('my-textarea')).toBe('test');
  });
});
