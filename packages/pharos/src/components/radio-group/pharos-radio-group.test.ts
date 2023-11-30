import { fixture, expect, nextFrame } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import sinon from 'sinon';
import type { SinonSpy } from 'sinon';

import type { PharosRadioGroup } from './pharos-radio-group';
import type { PharosRadioButton } from '../radio-button/pharos-radio-button';

describe('pharos-radio-group', () => {
  let component: PharosRadioGroup;

  beforeEach(async () => {
    component = await fixture(html`
      <test-pharos-radio-group name="radio-group">
        <span slot="legend">Radio Group Header</span>
        <test-pharos-radio-button value="1"
          ><span slot="label">Radio Button 1</span></test-pharos-radio-button
        >
        <test-pharos-radio-button value="2"
          ><span slot="label">Radio Button 2</span></test-pharos-radio-button
        >
      </test-pharos-radio-group>
    `);
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });

  it('is accessible when focused', async () => {
    component.dispatchEvent(new Event('focusin'));
    await component.updateComplete;
    await expect(component).to.be.accessible();
  });

  it('updates value when a child radio is checked', async () => {
    component = await fixture(html`
      <test-pharos-radio-group>
        <test-pharos-radio-button value="1"
          ><span slot="label">Radio Button 1</span></test-pharos-radio-button
        >
        <test-pharos-radio-button value="2" checked
          ><span slot="label">Radio Button 2</span></test-pharos-radio-button
        >
      </test-pharos-radio-group>
    `);
    expect(component.value).to.equal('2');
  });

  it('has an attribute to set orientation', async () => {
    component = await fixture(html`
      <test-pharos-radio-group horizontal>
        <test-pharos-radio-button value="1"
          ><span slot="label">Radio Button 1</span></test-pharos-radio-button
        >
        <test-pharos-radio-button value="2" checked
          ><span slot="label">Radio Button 2</span></test-pharos-radio-button
        >
      </test-pharos-radio-group>
    `);
    const fieldset = component.renderRoot.querySelector('fieldset') as HTMLElement;
    expect(fieldset.classList.contains('radio-group--horizontal')).to.be.true;
  });

  it('fires a change event', async () => {
    let eventSource = null as Element | null;
    const onChange = (event: Event): void => {
      eventSource = event.composedPath()[0] as Element;
    };
    component = await fixture(html`
      <test-pharos-radio-group @change=${onChange}>
        <test-pharos-radio-button value="1"
          ><span slot="label">Radio Button 1</span></test-pharos-radio-button
        >
        <test-pharos-radio-button value="2"
          ><span slot="label">Radio Button 2</span></test-pharos-radio-button
        >
      </test-pharos-radio-group>
    `);
    const radio = component.querySelector(
      'test-pharos-radio-button[value="2"]'
    ) as PharosRadioButton;
    radio['_radio'].click();
    await component.updateComplete;

    expect((eventSource as Element).isSameNode(component)).to.be.true;
  });

  it('sets the name for each radio in the group', async () => {
    component = await fixture(html`
      <test-pharos-radio-group name="group1">
        <test-pharos-radio-button value="1"
          ><span slot="label">Radio Button 1</span></test-pharos-radio-button
        >
        <test-pharos-radio-button value="2"
          ><span slot="label">Radio Button 2</span></test-pharos-radio-button
        >
      </test-pharos-radio-group>
    `);
    const buttons = component.querySelectorAll(
      'test-pharos-radio-button'
    ) as NodeListOf<PharosRadioButton>;
    buttons.forEach((button) => {
      expect(button.name).to.equal('group1');
    });
  });

  it('changes selection forward when down arrow key is pressed', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component = await fixture(html`
      <test-pharos-radio-group name="group1">
        <test-pharos-radio-button value="1"
          ><span slot="label">Radio Button 1</span></test-pharos-radio-button
        >
        <test-pharos-radio-button value="2"
          ><span slot="label">Radio Button 2</span></test-pharos-radio-button
        >
        <test-pharos-radio-button value="3"
          ><span slot="label">Radio Button 3</span></test-pharos-radio-button
        >
      </test-pharos-radio-group>
    `);
    const radio = component.querySelector(
      'test-pharos-radio-button[value="2"]'
    ) as PharosRadioButton;
    radio['_radio'].click();
    await component.updateComplete;

    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    await component.updateComplete;

    const checkedRadio = component.querySelector(
      'test-pharos-radio-button[checked]'
    ) as PharosRadioButton;

    expect(checkedRadio.checked).to.equal(true);
    expect(checkedRadio.value).to.equal('3');
    expect(activeElement === checkedRadio['_radio']).to.be.true;
    document.removeEventListener('focusin', onFocusIn);
  });

  it('changes selection backward when up arrow key is pressed', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component = await fixture(html`
      <test-pharos-radio-group name="group1">
        <test-pharos-radio-button value="1"
          ><span slot="label">Radio Button 1</span></test-pharos-radio-button
        >
        <test-pharos-radio-button value="2"
          ><span slot="label">Radio Button 2</span></test-pharos-radio-button
        >
        <test-pharos-radio-button value="3"
          ><span slot="label">Radio Button 3</span></test-pharos-radio-button
        >
      </test-pharos-radio-group>
    `);
    const radio = component.querySelector(
      'test-pharos-radio-button[value="2"]'
    ) as PharosRadioButton;
    radio['_radio'].click();
    await component.updateComplete;

    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    await component.updateComplete;

    const checkedRadio = component.querySelector(
      'test-pharos-radio-button[checked]'
    ) as PharosRadioButton;

    expect(checkedRadio.checked).to.equal(true);
    expect(checkedRadio.value).to.equal('1');
    expect(activeElement === checkedRadio['_radio']).to.be.true;
    document.removeEventListener('focusin', onFocusIn);
  });

  it('selects the first radio when moving forward from the last one', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component = await fixture(html`
      <test-pharos-radio-group name="group1">
        <test-pharos-radio-button value="1"
          ><span slot="label">Radio Button 1</span></test-pharos-radio-button
        >
        <test-pharos-radio-button value="2"
          ><span slot="label">Radio Button 2</span></test-pharos-radio-button
        >
        <test-pharos-radio-button value="3"
          ><span slot="label">Radio Button 3</span></test-pharos-radio-button
        >
      </test-pharos-radio-group>
    `);
    const radio = component.querySelector(
      'test-pharos-radio-button[value="3"]'
    ) as PharosRadioButton;
    radio['_radio'].click();
    await component.updateComplete;

    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Down' }));
    await component.updateComplete;

    const checkedRadio = component.querySelector(
      'test-pharos-radio-button[checked]'
    ) as PharosRadioButton;

    expect(checkedRadio.checked).to.equal(true);
    expect(checkedRadio.value).to.equal('1');
    expect(activeElement === checkedRadio['_radio']).to.be.true;
    document.removeEventListener('focusin', onFocusIn);
  });

  it('selects the last radio when moving backward from the first one', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component = await fixture(html`
      <test-pharos-radio-group name="group1">
        <test-pharos-radio-button value="1"
          ><span slot="label">Radio Button 1</span></test-pharos-radio-button
        >
        <test-pharos-radio-button value="2"
          ><span slot="label">Radio Button 2</span></test-pharos-radio-button
        >
        <test-pharos-radio-button value="3"
          ><span slot="label">Radio Button 3</span></test-pharos-radio-button
        >
      </test-pharos-radio-group>
    `);
    const radio = component.querySelector(
      'test-pharos-radio-button[value="1"]'
    ) as PharosRadioButton;
    radio['_radio'].click();
    await component.updateComplete;

    component.dispatchEvent(new KeyboardEvent('keydown', { key: 'Up' }));
    await component.updateComplete;

    const checkedRadio = component.querySelector(
      'test-pharos-radio-button[checked]'
    ) as PharosRadioButton;

    expect(checkedRadio.checked).to.equal(true);
    expect(checkedRadio.value).to.equal('3');
    expect(activeElement === checkedRadio['_radio']).to.be.true;
    document.removeEventListener('focusin', onFocusIn);
  });

  it('sets focus on the selected radio', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component = await fixture(html`
      <test-pharos-radio-group name="group1">
        <test-pharos-radio-button value="1"
          ><span slot="label">Radio Button 1</span></test-pharos-radio-button
        >
        <test-pharos-radio-button value="2"
          ><span slot="label">Radio Button 2</span></test-pharos-radio-button
        >
        <test-pharos-radio-button value="3"
          ><span slot="label">Radio Button 3</span></test-pharos-radio-button
        >
      </test-pharos-radio-group>
    `);
    const radio = component.querySelector(
      'test-pharos-radio-button[value="2"]'
    ) as PharosRadioButton;
    radio['_radio'].click();
    await component.updateComplete;

    const checkedRadio = component.querySelector(
      'test-pharos-radio-button[checked]'
    ) as PharosRadioButton;

    expect(activeElement === checkedRadio['_radio']).to.be.true;
    document.removeEventListener('focusin', onFocusIn);
  });

  it('is able to delegate focus', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);
    const radio = component.querySelector('test-pharos-radio-button') as PharosRadioButton;

    component.focus();

    expect(activeElement === radio?.['_radio']).to.be.true;
    document.removeEventListener('focusin', onFocusIn);
  });

  it('renders a provided message', async () => {
    const text = 'Please make a selection';
    component = await fixture(
      html`
        <test-pharos-radio-group message="${text}">
          <span slot="legend">Radio Group Header</span>
          <test-pharos-radio-button value="1"
            ><span slot="label">Radio 1</span></test-pharos-radio-button
          >
          <test-pharos-radio-button value="2"
            ><span slot="label">Radio 2</span></test-pharos-radio-button
          >
        </test-pharos-radio-group>
      `
    );
    const message = component.renderRoot.querySelector('.input-message__text');
    expect(message?.textContent).to.equal(text);
  });

  it('renders the provided message as the groups accessible description', async () => {
    const text = 'Please make a selection';
    component = await fixture(
      html`
        <test-pharos-radio-group message="${text}">
          <span slot="legend">Radio Group Header</span>
          <test-pharos-radio-button value="1"
            ><span slot="label">Radio 1</span></test-pharos-radio-button
          >
          <test-pharos-radio-button value="2"
            ><span slot="label">Radio 2</span></test-pharos-radio-button
          >
        </test-pharos-radio-group>
      `
    );
    const groupDescID = component.renderRoot
      .querySelector('fieldset')
      ?.getAttribute('aria-describedby');

    expect(component.renderRoot.querySelector('#' + groupDescID)?.textContent)?.to.equal(text);
  });

  it("stops propagation of its child's change event", async () => {
    const event = new Event('change');
    const changeSpy: SinonSpy = sinon.spy(event, 'stopPropagation');

    const radio = component.querySelector(
      'test-pharos-radio-button[value="2"]'
    ) as PharosRadioButton;
    radio.dispatchEvent(event);
    await component.updateComplete;

    expect(changeSpy.callCount).to.equal(1);
  });

  it('updates the state of its children', async () => {
    const radios = component.querySelectorAll(
      'test-pharos-radio-button'
    ) as NodeListOf<PharosRadioButton>;
    component.disabled = true;
    await component.updateComplete;
    radios.forEach((radio) => {
      expect(radio.disabled).to.be.true;
    });
    component.invalidated = true;
    await component.updateComplete;
    radios.forEach((radio) => {
      expect(radio.invalidated).to.be.true;
    });
    component.validated = true;
    await component.updateComplete;
    radios.forEach((radio) => {
      expect(radio.validated).to.be.true;
    });
  });

  it('focuses the checked radio when focus enters the group', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component = await fixture(html`
      <test-pharos-radio-group>
        <test-pharos-radio-button value="1"
          ><span slot="label">Radio Button 1</span></test-pharos-radio-button
        >
        <test-pharos-radio-button value="2" checked
          ><span slot="label">Radio Button 2</span></test-pharos-radio-button
        >
      </test-pharos-radio-group>
    `);

    const firstRadio = component.querySelector(
      'test-pharos-radio-button[value="1"]'
    ) as PharosRadioButton;
    firstRadio.dispatchEvent(new Event('focusin'));
    await nextFrame();

    const checkedRadio = component.querySelector(
      'test-pharos-radio-button[checked]'
    ) as PharosRadioButton;

    expect(activeElement === checkedRadio['_radio']).to.be.true;
    document.removeEventListener('focusin', onFocusIn);
  });
});
