import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { PharosSwitch } from './pharos-switch';
import createFormData from '../../utils/createFormData';

describe('pharos-switch', () => {
  let component: PharosSwitch;

  beforeEach(async () => {
    component = await fixture(
      html`<test-pharos-switch><span slot="label">test switch</span></test-pharos-switch>`
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
      html`<test-pharos-switch disabled><span slot="label">test switch</span></test-pharos-switch>`
    );
    await expect(component).to.be.accessible();
  });

  it('has an attribute to set check value', async () => {
    component = await fixture(html`
      <test-pharos-switch checked><span slot="label">test switch</span></test-pharos-switch>
    `);
    await expect(component.checked).to.equal(true);
  });

  it('fires a change event', async () => {
    let eventSource = null as Element | null;
    const onChange = (event: Event): void => {
      eventSource = event.composedPath()[0] as Element;
    };
    component = await fixture(html`
      <test-pharos-switch @change=${onChange}
        ><span slot="label">test switch</span></test-pharos-switch
      >
    `);

    component['_switch'].click();
    await component.updateComplete;

    expect((eventSource as Element).isSameNode(component)).to.be.true;
  });

  it('is able to receive focus', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component['_switch'].focus();
    await component.updateComplete;
    expect(activeElement === component['_switch']).to.be.true;
    document.removeEventListener('focusin', onFocusIn);
  });

  it('is not able to receive focus when disabled', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component = await fixture(
      html`<test-pharos-switch disabled><span slot="label">test switch</span></test-pharos-switch>`
    );

    component['_switch'].focus();
    await component.updateComplete;
    expect(activeElement === component['_switch']).to.be.false;
    expect(document.activeElement === component).to.be.false;
    document.removeEventListener('focusin', onFocusIn);
  });

  it('updates the form value', async () => {
    const parentNode = document.createElement('form');
    parentNode.setAttribute('name', 'my-form');
    component = await fixture(
      html`
        <test-pharos-switch name="my-switch" value="test" checked>
          <span slot="label">test switch</span>
        </test-pharos-switch>
      `,
      { parentNode }
    );

    const form = document.querySelector('form');
    const formdata = createFormData(form as HTMLFormElement);

    expect(formdata.get('my-switch')).to.equal('test');
  });

  it('updates the form value to "on" when no value is passed', async () => {
    const parentNode = document.createElement('form');
    parentNode.setAttribute('name', 'my-form');
    component = await fixture(
      html`
        <test-pharos-switch name="my-switch" checked>
          <span slot="label">test switch</span>
        </test-pharos-switch>
      `,
      { parentNode }
    );

    const form = document.querySelector('form');
    const formdata = createFormData(form as HTMLFormElement);

    expect(formdata.get('my-switch')).to.equal('on');
  });

  it('does not update the form value when disabled', async () => {
    const parentNode = document.createElement('form');
    parentNode.setAttribute('name', 'my-form');
    component = await fixture(
      html`
        <test-pharos-switch name="my-switch" value="test" disabled>
          <span slot="label">test switch</span>
        </test-pharos-switch>
      `,
      { parentNode }
    );

    const form = document.querySelector('form');
    const formdata = createFormData(form as HTMLFormElement);

    expect(formdata.get('my-switch')).to.be.null;
  });

  it('can be clicked when the label is hidden', async () => {
    component = await fixture(html`
      <test-pharos-switch hide-label>
        <span slot="label">test switch</span>
      </test-pharos-switch>
    `);

    const switchElement = component.renderRoot.querySelector('.switch__control') as HTMLSpanElement;
    switchElement.dispatchEvent(new Event('click'));
    await component.updateComplete;

    expect(component.checked).to.be.true;
  });

  it('can be clicked when no label is present', async () => {
    component = await fixture(html` <test-pharos-switch></test-pharos-switch> `);

    const switchElement = component.renderRoot.querySelector('.switch__control') as HTMLSpanElement;
    switchElement.dispatchEvent(new Event('click'));
    await component.updateComplete;

    expect(component.checked).to.be.true;
  });

  it('is able to delegate focus', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component.focus();

    expect(activeElement === component['_switch']).to.be.true;
    document.removeEventListener('focusin', onFocusIn);
  });

  it('allows links in the label to be clicked', async () => {
    component = await fixture(html`
      <test-pharos-switch
        ><span slot="label">test switch with <a href="#">link</a></span></test-pharos-switch
      >
    `);
    const link = component.renderRoot.querySelector('a');
    link?.click();
    await component.updateComplete;

    await expect(component.checked).to.be.false;
  });

  it('fires a single click event when label is clicked', async () => {
    let count = 0;
    const onClick = (): void => {
      count++;
    };
    component = await fixture(html`
      <test-pharos-switch @click=${onClick}
        ><span slot="label">test switch</span></test-pharos-switch
      >
    `);

    const label = component.renderRoot.querySelector('label') as HTMLLabelElement;
    label?.click();
    await component.updateComplete;
    expect(count).to.equal(1);
  });

  it('fires a single click event but does not update if event prevented', async () => {
    const onClick = (event: Event): void => {
      event.preventDefault();
    };
    component = await fixture(html`
      <test-pharos-switch @click=${onClick}
        ><span slot="label">test switch</span></test-pharos-switch
      >
    `);

    const label = component.renderRoot.querySelector('label') as HTMLLabelElement;
    label?.click();
    await component.updateComplete;
    await expect(component.checked).to.be.false;
  });

  it('resets checked when the form is reset', async () => {
    const parentNode = document.createElement('form');
    parentNode.setAttribute('name', 'my-form');
    component = await fixture(
      html`
        <test-pharos-switch name="my-switch" value="test" checked>
          <span slot="label">test switch</span>
        </test-pharos-switch>
      `,
      { parentNode }
    );

    const form = document.querySelector('form');
    const formdataInitial = createFormData(form as HTMLFormElement);
    expect(formdataInitial.get('my-switch')).to.equal('test');

    component.checked = false;
    await component.updateComplete;

    const formdataUnchecked = createFormData(form as HTMLFormElement);
    expect(formdataUnchecked.get('my-switch')).to.equal(null);

    form?.dispatchEvent(new Event('reset'));
    await component.updateComplete;

    const formdataReset = createFormData(form as HTMLFormElement);
    expect(formdataReset.get('my-switch')).to.equal('test');
  });
});
