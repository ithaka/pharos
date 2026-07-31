import { beforeEach, describe, expect, it } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture, errorFixture } from '../../test/fixture';
import type { PharosHeading } from './pharos-heading';

describe('pharos-heading', () => {
  let component: PharosHeading;

  beforeEach(async () => {
    component = await fixture(html`
      <test-pharos-heading level="1"> This is a heading </test-pharos-heading>
    `);
  });

  it('is accessible', async () => {
    await expect(component).toBeAccessible();
  });

  it('sets its default attributes', async () => {
    component = await fixture(html`
      <test-pharos-heading level="1" preset="1"> This is a heading </test-pharos-heading>
    `);
    expect(component).toEqualDom(
      `<test-pharos-heading data-pharos-component="PharosHeading" level="1" preset="1">This is a heading</test-pharos-heading>`
    );
  });

  it('renders the correct heading level', async () => {
    component = await fixture(html`
      <test-pharos-heading level="2" preset="1"> This is a heading </test-pharos-heading>
    `);
    expect(component).toEqualShadowDom(`
      <h2 class="heading">
        <slot></slot>
      </h2>
    `);
  });

  it('throws an error for a missing level value', async () => {
    const error = await errorFixture(html`
      <test-pharos-heading> This is a heading </test-pharos-heading>
    `);
    expect(error.message).toContain('level is a required attribute.');
  });

  it('throws an error for an invalid level value', async () => {
    const error = await errorFixture(html`
      <test-pharos-heading level="7"> This is a heading </test-pharos-heading>
    `);
    expect(error.message).toContain(
      '7 is not a valid heading level. Valid levels are: 1, 2, 3, 4, 5, 6'
    );
  });

  it('throws an error for an invalid preset value', async () => {
    const error = await errorFixture(html`
      <test-pharos-heading level="1" preset="9"> This is a heading </test-pharos-heading>
    `);
    expect(error.message).toContain(
      `9 is not a valid preset.
        Available presets are 1, 1--bold, 2, 2--bold, 3, 3--bold, 4, 4--bold, 5, 5--bold, 6, 6--bold, 7, 7--bold, legend.`
    );
  });
});
