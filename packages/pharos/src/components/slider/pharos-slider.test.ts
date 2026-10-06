import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture, errorFixture } from '../../test/fixture';
import type { PharosSlider } from './pharos-slider';
import { PharosSliderOption } from './pharos-slider-option';
import createFormData from '../../utils/createFormData';
import registerComponents from '../../utils/registerComponents';

describe('pharos-slider', () => {
  let component: PharosSlider;

  const getInput = (slider: PharosSlider): HTMLInputElement =>
    slider.renderRoot.querySelector('#input-element') as HTMLInputElement;

  const getOptions = (slider: PharosSlider): PharosSliderOption[] => [
    ...slider.querySelectorAll<PharosSliderOption>('test-pharos-slider-option'),
  ];

  beforeEach(async () => {
    component = await fixture(html`
      <test-pharos-slider name="size" min="10" max="30" step="10" value="10">
        <span slot="label">Result size</span>
        <test-pharos-slider-option value="10"
          >Small<span slot="description">Fewer results</span></test-pharos-slider-option
        >
        <test-pharos-slider-option value="20"
          >Medium<span slot="description">Default</span></test-pharos-slider-option
        >
        <test-pharos-slider-option value="30"
          >Large<span slot="description">More results</span></test-pharos-slider-option
        >
      </test-pharos-slider>
    `);
  });

  afterEach(() => {
    vi.restoreAllMocks();
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
    component.disabled = true;
    await component.updateComplete;
    await expect(component).toBeAccessible();
  });

  it('renders a native range input', async () => {
    expect(getInput(component).type).toBe('range');
  });

  it('passes the range to the native range input', async () => {
    const input = getInput(component);
    expect(input.min).toBe('10');
    expect(input.max).toBe('30');
    expect(input.step).toBe('10');
  });

  it('positions options registered after it renders', async () => {
    component = await fixture(html`
      <test-pharos-slider min="10" max="30" step="10">
        <span slot="label">Result size</span>
        <late-pharos-slider-option value="10">Small</late-pharos-slider-option>
        <late-pharos-slider-option value="30">Large</late-pharos-slider-option>
      </test-pharos-slider>
    `);
    registerComponents('late', [PharosSliderOption]);

    await vi.waitFor(() => {
      const positions = [
        ...component.querySelectorAll<PharosSliderOption>('late-pharos-slider-option'),
      ].map((option) => option.style.getPropertyValue('--pharos-slider-option-position'));
      expect(positions).toEqual(['0', '1']);
    });
  });

  it('keeps the value attribute when options are registered after it renders', async () => {
    component = await fixture(html`
      <test-pharos-slider min="5" max="25" step="10" value="15">
        <span slot="label">Result size</span>
        <late-value-pharos-slider-option value="5">Small</late-value-pharos-slider-option>
        <late-value-pharos-slider-option value="15">Medium</late-value-pharos-slider-option>
        <late-value-pharos-slider-option value="25">Large</late-value-pharos-slider-option>
      </test-pharos-slider>
    `);
    registerComponents('late-value', [PharosSliderOption]);

    await vi.waitFor(() => expect(component.value).toBe(15));
  });

  it('resets to the value attribute when options are registered after it renders', async () => {
    const parentNode = document.createElement('form');
    component = await fixture(
      html`
        <test-pharos-slider min="5" max="25" step="10" value="15">
          <span slot="label">Result size</span>
          <late-reset-pharos-slider-option value="5">Small</late-reset-pharos-slider-option>
          <late-reset-pharos-slider-option value="15">Medium</late-reset-pharos-slider-option>
          <late-reset-pharos-slider-option value="25">Large</late-reset-pharos-slider-option>
        </test-pharos-slider>
      `,
      { parentNode }
    );
    registerComponents('late-reset', [PharosSliderOption]);
    await vi.waitFor(() =>
      expect(
        component.querySelector<PharosSliderOption>('late-reset-pharos-slider-option[value="15"]')
          ?.selected
      ).toBe(true)
    );

    component.value = 25;
    await component.updateComplete;

    parentNode.dispatchEvent(new Event('reset'));
    await component.updateComplete;

    expect(component.value).toBe(15);
  });

  it('labels the range input with the label slot', async () => {
    const label = component.renderRoot.querySelector('label') as HTMLLabelElement;
    expect(label.htmlFor).toBe(getInput(component).id);
  });

  it('renders a required asterisk and hidden text in the label when required', async () => {
    component.required = true;
    await component.updateComplete;
    const indicator = component.renderRoot.querySelector('label .required-indicator');
    expect(indicator?.textContent).toBe('*required');
  });

  it('does not render a required indicator when not required', async () => {
    expect(component.renderRoot.querySelector('.required-indicator')).toBeNull();
  });

  it('hides the option labels from assistive technology', async () => {
    const options = component.renderRoot.querySelector('.slider__options') as HTMLElement;
    expect(options.getAttribute('aria-hidden')).toBe('true');
  });

  it('defaults the value to the midpoint of the range', async () => {
    component = await fixture(html`
      <test-pharos-slider min="10" max="30" step="10">
        <span slot="label">Result size</span>
        <test-pharos-slider-option value="10">Small</test-pharos-slider-option>
        <test-pharos-slider-option value="20">Medium</test-pharos-slider-option>
        <test-pharos-slider-option value="30">Large</test-pharos-slider-option>
      </test-pharos-slider>
    `);
    expect(component.value).toBe(20);
  });

  it('rounds a midpoint between steps up to the next step', async () => {
    component = await fixture(html`
      <test-pharos-slider min="1" max="4" step="1">
        <span slot="label">Result size</span>
      </test-pharos-slider>
    `);
    expect(component.value).toBe(3);
  });

  it('sets the value from the value attribute', async () => {
    component = await fixture(html`
      <test-pharos-slider min="10" max="30" step="10" value="20">
        <span slot="label">Result size</span>
        <test-pharos-slider-option value="10">Small</test-pharos-slider-option>
        <test-pharos-slider-option value="20">Medium</test-pharos-slider-option>
        <test-pharos-slider-option value="30">Large</test-pharos-slider-option>
      </test-pharos-slider>
    `);
    expect(getInput(component).value).toBe('20');
  });

  it('snaps a value between steps to the nearest step', async () => {
    component.value = 24;
    await component.updateComplete;
    expect(component.value).toBe(20);
  });

  it('clamps a value above the max to the max', async () => {
    component.value = 50;
    await component.updateComplete;
    expect(component.value).toBe(30);
  });

  it('clamps a value below the min to the min', async () => {
    component.value = -10;
    await component.updateComplete;
    expect(component.value).toBe(10);
  });

  it('keeps the value attribute as the starting value when the value changes', async () => {
    component.value = 20;
    await component.updateComplete;
    expect(component.getAttribute('value')).toBe('10');
  });

  it('snaps to steps without floating point error', async () => {
    component = await fixture(html`
      <test-pharos-slider min="0" max="1" step="0.1" value="0.3">
        <span slot="label">Opacity</span>
      </test-pharos-slider>
    `);
    expect(component.value).toBe(0.3);
  });

  it('renders the options inside the hidden option row', async () => {
    const slot = component.renderRoot.querySelector('.slider__options slot') as HTMLSlotElement;
    expect(slot.assignedElements()).toEqual(getOptions(component));
  });

  it('positions each option at its stop on the track', async () => {
    const positions = getOptions(component).map((option) =>
      option.style.getPropertyValue('--pharos-slider-option-position')
    );
    expect(positions).toEqual(['0', '0.5', '1']);
  });

  it('lines up the options at the ends of the track with its edges', async () => {
    const anchors = getOptions(component).map((option) =>
      option.style.getPropertyValue('--pharos-slider-option-anchor')
    );
    expect(anchors).toEqual(['0', '0.5', '1']);
  });

  it('sets the number of options on the option row', async () => {
    const options = component.renderRoot.querySelector('.slider__options') as HTMLElement;
    expect(options.style.getPropertyValue('--pharos-slider-option-count')).toBe('3');
  });

  it('centers options that are not at the ends of the track', async () => {
    component = await fixture(html`
      <test-pharos-slider min="0" max="100" step="10">
        <span slot="label">Volume</span>
        <test-pharos-slider-option value="20">Quiet</test-pharos-slider-option>
        <test-pharos-slider-option value="80">Loud</test-pharos-slider-option>
      </test-pharos-slider>
    `);
    const anchors = getOptions(component).map((option) =>
      option.style.getPropertyValue('--pharos-slider-option-anchor')
    );
    expect(anchors).toEqual(['0.5', '0.5']);
  });

  it('positions options by value regardless of their order', async () => {
    component = await fixture(html`
      <test-pharos-slider min="10" max="30" step="10">
        <span slot="label">Result size</span>
        <test-pharos-slider-option value="30">Large</test-pharos-slider-option>
        <test-pharos-slider-option value="10">Small</test-pharos-slider-option>
        <test-pharos-slider-option value="20">Medium</test-pharos-slider-option>
      </test-pharos-slider>
    `);
    const positions = getOptions(component).map((option) =>
      option.style.getPropertyValue('--pharos-slider-option-position')
    );
    expect(positions).toEqual(['1', '0', '0.5']);
  });

  it('marks the option matching the value as selected', async () => {
    component.value = 20;
    await component.updateComplete;
    expect(getOptions(component)[1].selected).toBe(true);
  });

  it('does not mark options that do not match the value as selected', async () => {
    component.value = 20;
    await component.updateComplete;
    expect(getOptions(component)[0].selected).toBe(false);
  });

  it('announces the selected label and description as the value text', async () => {
    component.value = 20;
    await component.updateComplete;
    expect(getInput(component).getAttribute('aria-valuetext')).toBe('Medium, Default');
  });

  it('announces only the label as the value text when there is no description', async () => {
    getOptions(component)[0].querySelector('[slot="description"]')?.remove();
    await vi.waitFor(() =>
      expect(getInput(component).getAttribute('aria-valuetext')).toBe('Small')
    );
  });

  it('announces the formatted value when the value does not match an option', async () => {
    component = await fixture(html`
      <test-pharos-slider min="0" max="100" step="10" value="50">
        <span slot="label">Volume</span>
        <test-pharos-slider-option value="0">Mute</test-pharos-slider-option>
      </test-pharos-slider>
    `);
    component.valueFormatter = (value) => `${value} percent`;
    await component.updateComplete;
    expect(getInput(component).getAttribute('aria-valuetext')).toBe('50 percent');
  });

  it('announces the option label over the formatted value when the value matches an option', async () => {
    component.valueFormatter = (value) => `${value} results`;
    await component.updateComplete;
    expect(getInput(component).getAttribute('aria-valuetext')).toBe('Small, Fewer results');
  });

  it('does not set the value text when the value does not match an option and there is no formatter', async () => {
    component = await fixture(html`
      <test-pharos-slider min="0" max="100" step="10" value="50">
        <span slot="label">Volume</span>
      </test-pharos-slider>
    `);
    expect(getInput(component).hasAttribute('aria-valuetext')).toBe(false);
  });

  it('announces the updated label when an option label changes', async () => {
    (getOptions(component)[0].firstChild as Text).data = 'Compact';
    await vi.waitFor(() =>
      expect(getInput(component).getAttribute('aria-valuetext')).toBe('Compact, Fewer results')
    );
  });

  it('announces the updated description when an option description changes', async () => {
    const description = getOptions(component)[0].querySelector('[slot="description"]');
    (description as HTMLElement).textContent = 'Fastest';
    await vi.waitFor(() =>
      expect(getInput(component).getAttribute('aria-valuetext')).toBe('Small, Fastest')
    );
  });

  it('updates the value when the range input changes', async () => {
    const input = getInput(component);
    input.stepUp();
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    await component.updateComplete;

    expect(component.value).toBe(20);
  });

  it('fires a change event from the host', async () => {
    let eventSource = null as Element | null;
    component.addEventListener('change', (event: Event) => {
      eventSource = event.composedPath()[0] as Element;
    });

    const input = getInput(component);
    input.stepUp();
    input.dispatchEvent(new Event('change'));
    await component.updateComplete;

    expect((eventSource as Element).isSameNode(component)).toBe(true);
  });

  it('reverts the value when the change event is prevented', async () => {
    component.addEventListener('change', (event: Event) => event.preventDefault());

    const input = getInput(component);
    input.stepUp();
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
    input.dispatchEvent(new Event('change'));
    await component.updateComplete;

    expect(component.value).toBe(10);
  });

  it('sets the value when an option is clicked', async () => {
    getOptions(component)[2].click();
    await component.updateComplete;
    expect(component.value).toBe(30);
  });

  it('sets the value when an option description is clicked', async () => {
    (getOptions(component)[2].querySelector('[slot="description"]') as HTMLElement).click();
    await component.updateComplete;
    expect(component.value).toBe(30);
  });

  it('ignores clicks in the option row outside of an option', async () => {
    (component.renderRoot.querySelector('.slider__options') as HTMLElement).click();
    await component.updateComplete;
    expect(component.value).toBe(10);
  });

  it('fires input and change events when an option is clicked', async () => {
    const events: string[] = [];
    component.addEventListener('input', () => events.push('input'));
    component.addEventListener('change', () => events.push('change'));

    getOptions(component)[1].click();
    await component.updateComplete;

    expect(events).toEqual(['input', 'change']);
  });

  it('does not fire a change event when the selected option is clicked', async () => {
    let changed = false;
    component.addEventListener('change', () => (changed = true));

    getOptions(component)[0].click();
    await component.updateComplete;

    expect(changed).toBe(false);
  });

  it('focuses the range input when an option is clicked', async () => {
    getOptions(component)[1].click();
    await component.updateComplete;
    expect(component.shadowRoot?.activeElement).toBe(getInput(component));
  });

  it('does not set the value when an option is clicked while disabled', async () => {
    component.disabled = true;
    await component.updateComplete;

    getOptions(component)[2].click();
    await component.updateComplete;

    expect(component.value).toBe(10);
  });

  it('is able to delegate focus', async () => {
    let activeElement = null;
    const onFocusIn = (event: Event): void => {
      activeElement = event.composedPath()[0];
    };
    document.addEventListener('focusin', onFocusIn);

    component.focus();

    expect(activeElement === getInput(component)).toBe(true);
    document.removeEventListener('focusin', onFocusIn);
  });

  it('updates the form value', async () => {
    const parentNode = document.createElement('form');
    component = await fixture(
      html`
        <test-pharos-slider name="size" step="10" value="30">
          <span slot="label">Result size</span>
          <test-pharos-slider-option value="10">Small</test-pharos-slider-option>
          <test-pharos-slider-option value="20">Medium</test-pharos-slider-option>
          <test-pharos-slider-option value="30">Large</test-pharos-slider-option>
        </test-pharos-slider>
      `,
      { parentNode }
    );

    const formdata = createFormData(parentNode as HTMLFormElement);
    expect(formdata.get('size')).toBe('30');
  });

  it('does not update the form value when disabled', async () => {
    const parentNode = document.createElement('form');
    component = await fixture(
      html`
        <test-pharos-slider name="size" step="10" value="30" disabled>
          <span slot="label">Result size</span>
          <test-pharos-slider-option value="10">Small</test-pharos-slider-option>
          <test-pharos-slider-option value="20">Medium</test-pharos-slider-option>
          <test-pharos-slider-option value="30">Large</test-pharos-slider-option>
        </test-pharos-slider>
      `,
      { parentNode }
    );

    const formdata = createFormData(parentNode as HTMLFormElement);
    expect(formdata.get('size')).toBeNull();
  });

  it('resets the value when the form is reset', async () => {
    const parentNode = document.createElement('form');
    component = await fixture(
      html`
        <test-pharos-slider name="size" step="10" value="20">
          <span slot="label">Result size</span>
          <test-pharos-slider-option value="10">Small</test-pharos-slider-option>
          <test-pharos-slider-option value="20">Medium</test-pharos-slider-option>
          <test-pharos-slider-option value="30">Large</test-pharos-slider-option>
        </test-pharos-slider>
      `,
      { parentNode }
    );

    component.value = 30;
    await component.updateComplete;

    parentNode.dispatchEvent(new Event('reset'));
    await component.updateComplete;

    expect(component.value).toBe(20);
  });

  it('defaults to the native range when there are no options', async () => {
    component = await fixture(html`
      <test-pharos-slider step="1"><span slot="label">Volume</span></test-pharos-slider>
    `);
    const input = getInput(component);
    expect([input.min, input.max, component.value]).toEqual(['0', '100', 50]);
  });

  it('hides the option row when there are no options', async () => {
    component = await fixture(html`
      <test-pharos-slider step="1"><span slot="label">Volume</span></test-pharos-slider>
    `);
    const options = component.renderRoot.querySelector('.slider__options') as HTMLElement;
    expect(options.offsetHeight).toBe(0);
  });

  it('does not hide the option row when there are options', async () => {
    const options = component.renderRoot.querySelector('.slider__options') as HTMLElement;
    expect(options.offsetHeight).toBeGreaterThan(0);
  });

  it('defaults to the native step when there is no step', async () => {
    component = await fixture(html`
      <test-pharos-slider value="42"><span slot="label">Volume</span></test-pharos-slider>
    `);
    expect(component.value).toBe(42);
  });

  it('throws an error when an option is outside of the range', async () => {
    const error = await errorFixture(html`
      <test-pharos-slider min="0" max="100" step="10">
        <span slot="label">Volume</span>
        <test-pharos-slider-option value="110">Too loud</test-pharos-slider-option>
      </test-pharos-slider>
    `);
    expect(error.message).toBe(
      '110 is not a valid option value. Option values must fall on a step of 10 between the min (0) and max (100).'
    );
  });

  it('throws an error when an option is not on a step', async () => {
    const error = await errorFixture(html`
      <test-pharos-slider min="0" max="100" step="10">
        <span slot="label">Volume</span>
        <test-pharos-slider-option value="15">Quiet</test-pharos-slider-option>
      </test-pharos-slider>
    `);
    expect(error.message).toBe(
      '15 is not a valid option value. Option values must fall on a step of 10 between the min (0) and max (100).'
    );
  });

  it('does not throw an error when an option is on a decimal step', async () => {
    component = await fixture(html`
      <test-pharos-slider min="0" max="1" step="0.1">
        <span slot="label">Opacity</span>
        <test-pharos-slider-option value="0.3">Faint</test-pharos-slider-option>
      </test-pharos-slider>
    `);
    expect(getOptions(component)[0].style.getPropertyValue('--pharos-slider-option-position')).toBe(
      '0.3'
    );
  });

  it('throws an error when an option is missing its value', async () => {
    const error = await errorFixture(html`
      <test-pharos-slider min="0" max="100" step="10">
        <span slot="label">Volume</span>
        <test-pharos-slider-option>Quiet</test-pharos-slider-option>
      </test-pharos-slider>
    `);
    expect(error.message).toBe('pharos-slider-option is missing its required value attribute.');
  });

  it('throws an error when two options have the same value', async () => {
    const error = await errorFixture(html`
      <test-pharos-slider min="0" max="100" step="10">
        <span slot="label">Volume</span>
        <test-pharos-slider-option value="50">Medium</test-pharos-slider-option>
        <test-pharos-slider-option value="50">Also medium</test-pharos-slider-option>
      </test-pharos-slider>
    `);
    expect(error.message).toBe(
      '50 is not a valid option value. Each option must have a unique value.'
    );
  });
});
