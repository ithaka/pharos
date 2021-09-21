import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';

import type { PharosRadioButton } from './pharos-radio-button';
import type { PharosLink } from '../link/pharos-link';
import createFormData from '../../utils/createFormData';

describe('pharos-radio-button', () => {
  let component: PharosRadioButton;

  beforeEach(async () => {
    component = await fixture(
      html`<pharos-radio-button><span slot="label">test radio</span></pharos-radio-button>`
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
    component = await fixture(html`
      <pharos-radio-button disabled><span slot="label">test radio</span></pharos-radio-button>
    `);
    await expect(component).to.be.accessible();
  });

  it('has an attribute to set check value', async () => {
    component = await fixture(html`
      <pharos-radio-button ?checked=${true}
        ><span slot="label">test radio</span></pharos-radio-button
      >
    `);
    await expect(component.checked).to.equal(true);
  });

  it('fires a change event', async () => {
    let eventSource = null as Element | null;
    const onChange = (event: Event): void => {
      eventSource = event.composedPath()[0] as Element;
    };
    component = await fixture(html`
      <pharos-radio-button value="1" @change=${onChange}
        ><span slot="label">test radio</span></pharos-radio-button
      >
    `);
    component['_radio'].click();
    await component.updateComplete;

    expect((eventSource as Element).isSameNode(component)).to.be.true;
  });

  it('is able to receive focus', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component['_radio'].focus();
    await component.updateComplete;
    expect(activeElement === component['_radio']).to.be.true;
    document.removeEventListener('focusin', onFocusIn);
  });

  it('is not able to receive focus when disabled', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component = await fixture(html`
      <pharos-radio-button disabled><span slot="label">test radio</span></pharos-radio-button>
    `);

    component['_radio'].focus();
    await component.updateComplete;
    expect(activeElement === component['_radio']).to.be.false;
    expect(document.activeElement === component).to.be.false;
    document.removeEventListener('focusin', onFocusIn);
  });

  it('updates the form value', async () => {
    const parentNode = document.createElement('form');
    parentNode.setAttribute('name', 'my-form');
    component = await fixture(
      html`
        <pharos-radio-button name="my-radio" value="test" checked>
          <span slot="label">test radio</span>
        </pharos-radio-button>
      `,
      { parentNode }
    );

    const form = document.querySelector('form');
    const formdata = createFormData(form as HTMLFormElement);

    expect(formdata.get('my-radio')).to.equal('test');
  });

  it('does not update the form value when disabled', async () => {
    const parentNode = document.createElement('form');
    parentNode.setAttribute('name', 'my-form');
    component = await fixture(
      html`
        <pharos-radio-button name="my-radio" value="test" disabled>
          <span slot="label">test radio</span>
        </pharos-radio-button>
      `,
      { parentNode }
    );

    const form = document.querySelector('form');
    const formdata = createFormData(form as HTMLFormElement);

    expect(formdata.get('my-radio')).to.be.null;
  });

  it('can be clicked when the label is hidden', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component = await fixture(html`
      <pharos-radio-button hide-label>
        <span slot="label">test radio</span>
      </pharos-radio-button>
    `);

    const icon = component.renderRoot.querySelector('svg') as SVGElement;
    icon.dispatchEvent(new Event('click'));
    await component.updateComplete;

    expect(component.checked).to.be.true;
    expect(activeElement === component['_radio']).to.be.true;
    document.removeEventListener('focusin', onFocusIn);
  });

  it('can be clicked when no label is present', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component = await fixture(html` <pharos-radio-button></pharos-radio-button> `);

    const icon = component.renderRoot.querySelector('svg') as SVGElement;
    icon.dispatchEvent(new Event('click'));
    await component.updateComplete;

    expect(component.checked).to.be.true;
    expect(activeElement === component['_radio']).to.be.true;
    document.removeEventListener('focusin', onFocusIn);
  });

  it('is able to delegate focus', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component.focus();

    expect(activeElement === component['_radio']).to.be.true;
    document.removeEventListener('focusin', onFocusIn);
  });

  it('allows links in the label to be clicked', async () => {
    component = await fixture(html`
      <pharos-radio-button
        ><span slot="label">test radio with <a href="#">link</a></span></pharos-radio-button
      >
    `);
    const link = component.renderRoot.querySelector('a');
    link?.click();
    await component.updateComplete;

    await expect(component.checked).to.be.false;
  });

  it('allows Pharos links in the label to be clicked', async () => {
    component = await fixture(html`
      <pharos-radio-button
        ><span slot="label"
          >test radio with <pharos-link href="#">link</pharos-link></span
        ></pharos-radio-button
      >
    `);
    const link = component.querySelector('pharos-link') as PharosLink;
    const anchor = link?.renderRoot.querySelector('#link-element') as HTMLAnchorElement;
    anchor.click();
    await component.updateComplete;

    await expect(component.checked).to.be.false;
  });

  it('fires a single click event', async () => {
    let count = 0;
    const onClick = (): void => {
      count++;
    };
    component = await fixture(html`
      <pharos-radio-button value="1" @click=${onClick}>
        <span slot="label">test radio</span>
      </pharos-radio-button>
    `);

    const label = component.renderRoot.querySelector('label') as HTMLLabelElement;
    label?.click();
    await component.updateComplete;
    expect(count).to.equal(1);
  });

  it('resets checked when the form is reset', async () => {
    const parentNode = document.createElement('form');
    parentNode.setAttribute('name', 'my-form');
    component = await fixture(
      html`
        <pharos-radio-button name="my-radio" value="test" checked>
          <span slot="label">test radio</span>
        </pharos-radio-button>
      `,
      { parentNode }
    );

    component.checked = false;
    await component.updateComplete;

    const form = document.querySelector('form');
    form?.dispatchEvent(new Event('reset'));
    await component.updateComplete;

    const formdata = createFormData(form as HTMLFormElement);
    expect(formdata.get('my-radio')).to.equal('test');
  });
});
