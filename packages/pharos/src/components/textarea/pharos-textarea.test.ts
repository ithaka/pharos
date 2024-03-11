import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { PharosTextarea } from './pharos-textarea';
import createFormData from '../../utils/createFormData';

describe('pharos-textarea', () => {
  let component: PharosTextarea;

  beforeEach(async () => {
    component = await fixture(
      html`<test-pharos-textarea><span slot="label">I am a label</span></test-pharos-textarea>`
    );
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });

  it('is accessible when focused', async () => {
    component.dispatchEvent(new Event('focusin'));
    await component.updateComplete;
    await expect(component).to.be.accessible();
  });

  it('is accessible when disabled', async () => {
    component = await fixture(
      html`<test-pharos-textarea disabled
        ><span slot="label">I am a label</span></test-pharos-textarea
      >`
    );
    await expect(component).to.be.accessible();
  });

  it('is accessible when readonly', async () => {
    component = await fixture(
      html`<test-pharos-textarea readonly
        ><span slot="label">I am a label</span></test-pharos-textarea
      >`
    );
    await expect(component).to.be.accessible();
  });

  it('sets its default attributes', async () => {
    component = await fixture(html`
      <test-pharos-textarea>
        <span slot="label">I am a label</span>
      </test-pharos-textarea>
    `);
    expect(component).dom.to.equal(
      `<test-pharos-textarea cols="20" data-pharos-component="PharosTextarea" dirname="" message="" name="" placeholder="" resize="both" rows="2" value="" wrap="soft"><span slot="label">I am a label</span></test-pharos-textarea>`
    );
  });

  it('has an attribute to set the placeholder text of the input', async () => {
    component = await fixture(html`
      <test-pharos-textarea placeholder="test"
        ><span slot="label">I am a label</span></test-pharos-textarea
      >
    `);
    expect(component.getAttribute('placeholder')).to.equal('test');
    expect(component['_textarea'].getAttribute('placeholder')).to.equal('test');

    component.placeholder = 'foo';
    await component.updateComplete;
    expect(component.getAttribute('placeholder')).to.equal('foo');
    expect(component['_textarea'].getAttribute('placeholder')).to.equal('foo');
  });

  it('has an attribute to set input value', async () => {
    component = await fixture(html`
      <test-pharos-textarea value="test"
        ><span slot="label">I am a label</span></test-pharos-textarea
      >
    `);
    expect(component.getAttribute('value')).to.equal('test');
    expect(component['_textarea'].value).to.equal('test');
  });

  it('has an attribute to set resize options', async () => {
    component = await fixture(html`
      <test-pharos-textarea resize="none"
        ><span slot="label">I am a label</span></test-pharos-textarea
      >
    `);
    expect(component.getAttribute('resize')).to.equal('none');
  });

  it('throws an error for an invalid resize value', async () => {
    component = await fixture(html`
      <test-pharos-textarea resize="blah"
        ><span slot="label">I am a label</span></test-pharos-textarea
      >
    `).catch((e) => e);
    expect('blah is not a valid resize value. Valid values are: none, vertical, horizontal, both')
      .to.be.thrown;
  });

  it('has an attribute to set wrap options', async () => {
    component = await fixture(html`
      <test-pharos-textarea wrap="hard"
        ><span slot="label">I am a label</span></test-pharos-textarea
      >
    `);
    expect(component.getAttribute('wrap')).to.equal('hard');
  });

  it('throws an error for an invalid wrap value', async () => {
    component = await fixture(html`
      <test-pharos-textarea wrap="blah"
        ><span slot="label">I am a label</span></test-pharos-textarea
      >
    `).catch((e) => e);
    expect('blah is not a valid wrap value. Valid values are: soft, hard').to.be.thrown;
  });

  it('accepts input from the user', async () => {
    component['_textarea'].value = 'test';
    component['_textarea'].dispatchEvent(new Event('input'));

    expect(component.value).to.equal('test');
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

    expect(component.value).to.equal('test');
    expect((eventSource as Element).isSameNode(component)).to.be.true;
  });

  it('is able to receive focus', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component['_textarea'].focus();
    await component.updateComplete;
    expect(activeElement === component['_textarea']).to.be.true;
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
    expect(activeElement === component['_textarea']).to.be.false;
    expect(document.activeElement === component).to.be.false;
    document.removeEventListener('focusin', onFocusIn);
  });

  it('renders a required asterisk and hidden text when input is required', async () => {
    component = await fixture(html`
      <test-pharos-textarea required><span slot="label">I am a label</span></test-pharos-textarea>
    `);
    expect(component).shadowDom.to.equal(`
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
    expect(component).shadowDom.to.equal(`
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

    expect(component.invalidated).to.be.false;
    expect(component.hasAttribute('invalidated')).to.be.false;
  });

  it('removes validated state when invalidated', async () => {
    component = await fixture(html`
      <test-pharos-textarea validated><span slot="label">I am a label</span></test-pharos-textarea>
    `);
    component.invalidated = true;
    await component.updateComplete;

    expect(component.validated).to.be.false;
    expect(component.hasAttribute('validated')).to.be.false;
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

    expect(formdata.get('my-textarea')).to.equal('test');
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

    expect(formdata.get('my-textarea')).to.be.null;
  });

  it('is able to delegate focus', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component.focus();

    expect(activeElement === component['_textarea']).to.be.true;
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
    expect(formdata.get('my-textarea')).to.equal('test');
  });
});
