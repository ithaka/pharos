import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import sinon from 'sinon';
import type { SinonSpy } from 'sinon';
import './pharos-checkbox';
import '../checkbox-group/pharos-checkbox-group';
import '../link/pharos-link';
import type { PharosCheckbox } from './pharos-checkbox';
import createFormData from '../../utils/createFormData';

describe('pharos-checkbox', () => {
  let component: PharosCheckbox;

  beforeEach(async () => {
    component = await fixture(
      html`<pharos-checkbox><span slot="label">test checkbox</span></pharos-checkbox>`
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
      html`<pharos-checkbox disabled><span slot="label">test checkbox</span></pharos-checkbox>`
    );
    await expect(component).to.be.accessible();
  });

  it('has an attribute to set check value', async () => {
    component = await fixture(html`
      <pharos-checkbox ?checked=${true}><span slot="label">test checkbox</span></pharos-checkbox>
    `);
    await expect(component.checked).to.equal(true);
  });

  it('fires a change event', async () => {
    let eventSource = null as Element | null;
    const onChange = (event: Event): void => {
      eventSource = event.composedPath()[0] as Element;
    };
    component = await fixture(html`
      <pharos-checkbox @change=${onChange}><span slot="label">test checkbox</span></pharos-checkbox>
    `);

    component['_checkbox'].click();
    await component.updateComplete;

    expect((eventSource as Element).isSameNode(component)).to.be.true;
  });

  it('is able to receive focus', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component['_checkbox'].focus();
    await component.updateComplete;
    expect(activeElement === component['_checkbox']).to.be.true;
    document.removeEventListener('focusin', onFocusIn);
  });

  it('is not able to receive focus when disabled', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component = await fixture(
      html`<pharos-checkbox disabled><span slot="label">test checkbox</span></pharos-checkbox>`
    );

    component['_checkbox'].focus();
    await component.updateComplete;
    expect(activeElement === component['_checkbox']).to.be.false;
    expect(document.activeElement === component).to.be.false;
    document.removeEventListener('focusin', onFocusIn);
  });

  it('updates the form value', async () => {
    const parentNode = document.createElement('form');
    parentNode.setAttribute('name', 'my-form');
    component = await fixture(
      html`
        <pharos-checkbox name="my-checkbox" value="test" checked>
          <span slot="label">test checkbox</span>
        </pharos-checkbox>
      `,
      { parentNode }
    );

    const form = document.querySelector('form');
    const formdata = createFormData(form as HTMLFormElement);

    expect(formdata.get('my-checkbox')).to.equal('test');
  });

  it('updates the form value to "on" when no value is passed', async () => {
    const parentNode = document.createElement('form');
    parentNode.setAttribute('name', 'my-form');
    component = await fixture(
      html`
        <pharos-checkbox name="my-checkbox" checked>
          <span slot="label">test checkbox</span>
        </pharos-checkbox>
      `,
      { parentNode }
    );

    const form = document.querySelector('form');
    const formdata = createFormData(form as HTMLFormElement);

    expect(formdata.get('my-checkbox')).to.equal('on');
  });

  it('does not update the form value when disabled', async () => {
    const parentNode = document.createElement('form');
    parentNode.setAttribute('name', 'my-form');
    component = await fixture(
      html`
        <pharos-checkbox name="my-checkbox" value="test" disabled>
          <span slot="label">test checkbox</span>
        </pharos-checkbox>
      `,
      { parentNode }
    );

    const form = document.querySelector('form');
    const formdata = createFormData(form as HTMLFormElement);

    expect(formdata.get('my-checkbox')).to.be.null;
  });

  it('can be clicked when the label is hidden', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component = await fixture(html`
      <pharos-checkbox hide-label>
        <span slot="label">test checkbox</span>
      </pharos-checkbox>
    `);

    const icon = component.renderRoot.querySelector('svg') as SVGElement;
    icon.dispatchEvent(new Event('click'));
    await component.updateComplete;

    expect(component.checked).to.be.true;
    expect(activeElement === component['_checkbox']).to.be.true;
    document.removeEventListener('focusin', onFocusIn);
  });

  it('can be clicked when no label is present', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component = await fixture(html` <pharos-checkbox></pharos-checkbox> `);

    const icon = component.renderRoot.querySelector('svg') as SVGElement;
    icon.dispatchEvent(new Event('click'));
    await component.updateComplete;

    expect(component.checked).to.be.true;
    expect(activeElement === component['_checkbox']).to.be.true;
    document.removeEventListener('focusin', onFocusIn);
  });

  it('is able to delegate focus', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component.focus();

    expect(activeElement === component['_checkbox']).to.be.true;
    document.removeEventListener('focusin', onFocusIn);
  });

  it('allows links in the label to be clicked', async () => {
    component = await fixture(html`
      <pharos-checkbox
        ><span slot="label">test checkbox with <a href="#">link</a></span></pharos-checkbox
      >
    `);
    const link = component.renderRoot.querySelector('a');
    link?.click();
    await component.updateComplete;

    await expect(component.checked).to.be.false;
  });

  it('allows Pharos links in the label to be clicked', async () => {
    component = await fixture(html`
      <pharos-checkbox
        ><span slot="label"
          >test checkbox with <pharos-link href="#">link</pharos-link></span
        ></pharos-checkbox
      >
    `);
    const link = component.querySelector('pharos-link');
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
      <pharos-checkbox @click=${onClick}><span slot="label">test checkbox</span></pharos-checkbox>
    `);

    const label = component.renderRoot.querySelector('label') as HTMLLabelElement;
    label?.click();
    await component.updateComplete;
    expect(count).to.equal(1);
  });

  it('is checked when clicked from indeterminate state', async () => {
    component = await fixture(html`
      <pharos-checkbox indeterminate><span slot="label">test checkbox</span></pharos-checkbox>
    `);

    const label = component.renderRoot.querySelector('label') as HTMLLabelElement;
    label?.click();
    await component.updateComplete;
    expect(component.indeterminate).to.be.false;
    expect(component.checked).to.be.true;
  });

  it('prevents hover styles on mousedown', async () => {
    const event = new MouseEvent('mousedown');
    const clickSpy: SinonSpy = sinon.spy(event, 'preventDefault');

    const icon = component.renderRoot.querySelector('svg') as SVGElement;
    icon.dispatchEvent(event);
    expect(clickSpy.callCount).to.equal(1);
  });

  it('resets checked when the form is reset', async () => {
    const parentNode = document.createElement('form');
    parentNode.setAttribute('name', 'my-form');
    component = await fixture(
      html`
        <pharos-checkbox name="my-checkbox" value="test" checked>
          <span slot="label">test checkbox</span>
        </pharos-checkbox>
      `,
      { parentNode }
    );

    component.checked = false;
    await component.updateComplete;

    const form = document.querySelector('form');
    form?.dispatchEvent(new Event('reset'));
    await component.updateComplete;

    const formdata = createFormData(form as HTMLFormElement);
    expect(formdata.get('my-checkbox')).to.equal('test');
  });
});
