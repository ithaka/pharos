import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { PharosTextInput } from './pharos-text-input';
import createFormData from '../../utils/createFormData';

declare global {
  interface Window {
    FormDataEvent: FormData | undefined;
  }
}

describe('pharos-text-input', () => {
  let component: PharosTextInput;

  beforeEach(async () => {
    component = await fixture(
      html`<test-pharos-text-input><span slot="label">I am a label</span></test-pharos-text-input>`
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
      html`<test-pharos-text-input disabled
        ><span slot="label">I am a label</span></test-pharos-text-input
      >`
    );
    await expect(component).to.be.accessible();
  });

  it('is accessible when readonly', async () => {
    component = await fixture(
      html`<test-pharos-text-input readonly
        ><span slot="label">I am a label</span></test-pharos-text-input
      >`
    );
    await expect(component).to.be.accessible();
  });

  it('sets its default attributes', async () => {
    component = await fixture(html`
      <test-pharos-text-input>
        <span slot="label">I am a label</span>
      </test-pharos-text-input>
    `);
    expect(component).dom.to.equal(
      `<test-pharos-text-input data-pharos-component="PharosTextInput" message="" name="" placeholder="" type="text" value="" variant="primary"><span slot="label">I am a label</span></test-pharos-text-input>`
    );
  });

  it('has an attribute to set the placeholder text of the input', async () => {
    component = await fixture(html`
      <test-pharos-text-input placeholder="test"
        ><span slot="label">I am a label</span></test-pharos-text-input
      >
    `);
    expect(component.getAttribute('placeholder')).to.equal('test');
    expect(component['_input'].getAttribute('placeholder')).to.equal('test');

    component.placeholder = 'foo';
    await component.updateComplete;
    expect(component.getAttribute('placeholder')).to.equal('foo');
    expect(component['_input'].getAttribute('placeholder')).to.equal('foo');
  });

  it('has an attribute to set autocomplete', async () => {
    component = await fixture(html`
      <test-pharos-text-input autocomplete="on"
        ><span slot="label">I am a label</span></test-pharos-text-input
      >
    `);
    expect(component['_input'].getAttribute('autocomplete')).to.equal('on');
  });

  it('has an attribute to set input value', async () => {
    component = await fixture(html`
      <test-pharos-text-input value="test"
        ><span slot="label">I am a label</span></test-pharos-text-input
      >
    `);
    expect(component.getAttribute('value')).to.equal('test');
    expect(component['_input'].value).to.equal('test');
  });

  it('has an attribute to set input type', async () => {
    component = await fixture(html`
      <test-pharos-text-input type="number"
        ><span slot="label">I am a label</span></test-pharos-text-input
      >
    `);
    expect(component.getAttribute('type')).to.equal('number');
    expect(component['_input'].type).to.equal('number');
  });

  it('accepts input from the user', async () => {
    component['_input'].value = 'test';
    component['_input'].dispatchEvent(new Event('input'));

    expect(component.value).to.equal('test');
  });

  it('fires a change event', async () => {
    let eventSource = null as Element | null;
    const onChange = (event: Event): void => {
      eventSource = event.composedPath()[0] as Element;
    };
    component = await fixture(html`
      <test-pharos-text-input @change=${onChange}
        ><span slot="label">I am a label</span></test-pharos-text-input
      >
    `);

    component['_input'].value = 'test';
    component['_input'].dispatchEvent(new Event('input'));
    component['_input'].dispatchEvent(new Event('change'));

    expect(component.value).to.equal('test');
    expect((eventSource as Element).isSameNode(component)).to.be.true;
  });

  it('is able to receive focus', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component['_input'].focus();
    await component.updateComplete;
    expect(activeElement === component['_input']).to.be.true;
    document.removeEventListener('focusin', onFocusIn);
  });

  it('is not able to receive focus when disabled', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component = await fixture(
      html`<test-pharos-text-input disabled
        ><span slot="label">I am a label</span></test-pharos-text-input
      >`
    );

    component['_input'].focus();
    await component.updateComplete;
    expect(activeElement === component['_input']).to.be.false;
    expect(document.activeElement === component).to.be.false;
    document.removeEventListener('focusin', onFocusIn);
  });

  it('throws an error for invalid type values', async () => {
    component = await fixture(html`
      <test-pharos-text-input type="fake"
        ><span slot="label">I am a label</span></test-pharos-text-input
      >
    `).catch((e) => e);
    expect(
      'fake is not a valid text input type. Valid types are: email, hidden, number, password, search, tel, text, url'
    ).to.be.thrown;
  });

  it('renders an exclamation icon when the input is invalidated', async () => {
    component = await fixture(html`
      <test-pharos-text-input invalidated
        ><span slot="label">I am a label</span></test-pharos-text-input
      >
    `);
    expect(component).shadowDom.to.equal(`
      <label for="input-element">
        <slot name="label">
        </slot>
       </label>
      <div class="input-wrapper">
        <input
          aria-invalid="true"
          aria-required="false"
          id="input-element"
          name=""
          placeholder=""
          type="text"
          value=""
        >
        <pharos-icon
          class="input__icon"
          data-pharos-component="PharosIcon"
          a11y-hidden="true"
          name="exclamation"
        >
        </pharos-icon>
      </div>
      `);
  });

  it('renders a checkmark icon when the input is validated', async () => {
    component = await fixture(html`
      <test-pharos-text-input validated
        ><span slot="label">I am a label</span></test-pharos-text-input
      >
    `);
    expect(component).shadowDom.to.equal(`
      <label for="input-element">
        <slot name="label">
        </slot>
       </label>
      <div class="input-wrapper">
        <input
          aria-invalid="false"
          aria-required="false"
          id="input-element"
          name=""
          placeholder=""
          type="text"
          value=""
        >
        <pharos-icon
          class="input__icon"
          data-pharos-component="PharosIcon"
          a11y-hidden="true"
          name="checkmark"
        >
        </pharos-icon>
      </div>
      `);
  });

  it('renders a required asterisk and hidden text when input is required', async () => {
    component = await fixture(html`
      <test-pharos-text-input required
        ><span slot="label">I am a label</span></test-pharos-text-input
      >
    `);
    expect(component).shadowDom.to.equal(`
      <label for="input-element">
        <slot name="label">
        </slot>
        <span class="required-indicator">
          *
          <span class="required-indicator__text">
            required
          </span>
        </span>
       </label>
      <div class="input-wrapper">
        <input
          aria-invalid="false"
          aria-required="true"
          id="input-element"
          name=""
          placeholder=""
          type="text"
          value=""
          required=""
        >
      </div>
      `);
  });

  it('renders a provided message', async () => {
    component = await fixture(html`
      <test-pharos-text-input message="I am invalid"
        ><span slot="label">I am a label</span></test-pharos-text-input
      >
    `);
    expect(component).shadowDom.to.equal(`
      <label for="input-element">
        <slot name="label">
        </slot>
       </label>
      <div class="input-wrapper">
        <input
          aria-describedby="message"
          aria-invalid="false"
          aria-required="false"
          id="input-element"
          name=""
          placeholder=""
          type="text"
          value=""
        >
      </div>
      <div id="message" class="input-message">
        <div class="input-message__text">I am invalid</div>
        <slot name="message">
        </slot>
      </div>
      `);
  });

  it('removes invalidated state when validated', async () => {
    component = await fixture(html`
      <test-pharos-text-input invalidated
        ><span slot="label">I am a label</span></test-pharos-text-input
      >
    `);
    component.validated = true;
    await component.updateComplete;

    expect(component.invalidated).to.be.false;
    expect(component.hasAttribute('invalidated')).to.be.false;
  });

  it('removes validated state when invalidated', async () => {
    component = await fixture(html`
      <test-pharos-text-input validated
        ><span slot="label">I am a label</span></test-pharos-text-input
      >
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
        <test-pharos-text-input name="my-input" value="test">
          <span slot="label">I am a label</span>
        </test-pharos-text-input>
      `,
      { parentNode }
    );

    const form = document.querySelector('form');
    const formdata = createFormData(form as HTMLFormElement);

    expect(formdata.get('my-input')).to.equal('test');
  });

  it('does not update the form value when disabled', async () => {
    const parentNode = document.createElement('form');
    parentNode.setAttribute('name', 'my-form');
    component = await fixture(
      html`
        <test-pharos-text-input name="my-input" value="test" disabled>
          <span slot="label">I am a label</span>
        </test-pharos-text-input>
      `,
      { parentNode }
    );

    const form = document.querySelector('form');
    const formdata = createFormData(form as HTMLFormElement);

    expect(formdata.get('my-input')).to.be.null;
  });

  it('is able to delegate focus', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component.focus();

    expect(activeElement === component['_input']).to.be.true;
    document.removeEventListener('focusin', onFocusIn);
  });

  it('implicitly submits the form when the Enter key is pressed and a submit button is present', async () => {
    const parentNode = document.createElement('form');
    parentNode.setAttribute('name', 'my-form');
    let formdata = new FormData();

    component = await fixture(
      html`
        <test-pharos-text-input name="my-input" value="test">
          <span slot="label">I am a label</span>
        </test-pharos-text-input>
      `,
      { parentNode }
    );

    const form = document.querySelector('form');
    const submitButton = document.createElement('button');
    submitButton.setAttribute('type', 'submit');
    submitButton.addEventListener('click', (event) => {
      event.preventDefault();
      formdata = createFormData(form as HTMLFormElement);
    });
    form?.appendChild(submitButton);

    component['_input'].dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await component.updateComplete;

    expect(formdata.get('my-input')).to.equal('test');
  });

  it('updates the form value when FormDataEvent is undefined and creates hidden inputs', async () => {
    (window as Window).FormDataEvent = undefined;
    const parentNode = document.createElement('form');
    parentNode.setAttribute('name', 'my-form');
    component = await fixture(
      html`
        <test-pharos-text-input name="my-input" value="test">
          <span slot="label">I am a label</span>
        </test-pharos-text-input>
      `,
      { parentNode }
    );

    const form = document.querySelector('form');
    const formdata = createFormData(form as HTMLFormElement);
    const hiddenInput = form?.querySelector('input[type="hidden"]');

    expect(formdata.get('my-input')).to.equal('test');
    expect(hiddenInput?.getAttribute('name')).to.equal('my-input');
  });

  it('resets its value when the form is reset', async () => {
    const parentNode = document.createElement('form');
    parentNode.setAttribute('name', 'my-form');
    component = await fixture(
      html`
        <test-pharos-text-input name="my-input" value="test">
          <span slot="label">I am a label</span>
        </test-pharos-text-input>
      `,
      { parentNode }
    );

    component.value = 'otherValue';
    await component.updateComplete;

    const form = document.querySelector('form');
    form?.dispatchEvent(new Event('reset'));
    await component.updateComplete;

    const formdata = createFormData(form as HTMLFormElement);
    expect(formdata.get('my-input')).to.equal('test');
  });
});
