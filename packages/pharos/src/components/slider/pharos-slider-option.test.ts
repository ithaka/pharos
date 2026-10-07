import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture } from '../../test/fixture';
import type { PharosSliderOption } from './pharos-slider-option';

describe('pharos-slider-option', () => {
  let component: PharosSliderOption;

  beforeEach(async () => {
    component = await fixture(html`
      <test-pharos-slider-option value="10">
        Small
        <span slot="description">Fewer results</span>
      </test-pharos-slider-option>
    `);
  });

  afterEach(() => document.body.replaceChildren());

  it('is accessible', async () => {
    await expect(component).toBeAccessible();
  });

  it('reads its value from the value attribute', async () => {
    expect(component.value).toBe(10);
  });

  it('has no value when the value attribute is missing', async () => {
    component = await fixture(html` <test-pharos-slider-option>Small</test-pharos-slider-option> `);
    expect(component.value).toBeUndefined();
  });

  it('reads its label from the default slot', async () => {
    expect(component.label).toBe('Small');
  });

  it('reads its description from the description slot', async () => {
    expect(component.description).toBe('Fewer results');
  });

  it('has an empty description when none is provided', async () => {
    component = await fixture(html`
      <test-pharos-slider-option value="10">Small</test-pharos-slider-option>
    `);
    expect(component.description).toBe('');
  });

  it('renders the label and description slots', async () => {
    const slots = component.renderRoot.querySelectorAll('slot');
    expect([...slots].map((slot) => slot.name)).toEqual(['', 'description']);
  });
});
