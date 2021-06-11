import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './pharos-heading';
import type { PharosHeading } from './pharos-heading';

describe('pharos-heading', () => {
  let component: PharosHeading;

  beforeEach(async () => {
    component = await fixture(
      html` <pharos-heading level="1"> This is a heading </pharos-heading> `
    );
  });

  it('is accessible', async () => {
    await expect(component).to.be.accessible();
  });

  it('sets its default attributes', async () => {
    component = await fixture(
      html` <pharos-heading level="1" preset="1"> This is a heading </pharos-heading> `
    );
    expect(component).dom.to.equal(
      `<pharos-heading level="1" preset="1">This is a heading</pharos-heading>`
    );
  });

  it('renders the correct heading level', async () => {
    component = await fixture(html`
      <pharos-heading level="2" preset="1"> This is a heading </pharos-heading>
    `);
    expect(component).shadowDom.to.equal(`
      <h2 class="heading">
        <slot></slot>
      </h2>
    `);
  });

  it('throws an error for a missing level value', async () => {
    component = await fixture(html` <pharos-heading> This is a heading </pharos-heading> `).catch(
      (e) => e
    );
    expect('level is a required attribute.').to.be.thrown;
  });

  it('throws an error for an invalid level value', async () => {
    component = await fixture(html`
      <pharos-heading level="7"> This is a heading </pharos-heading>
    `).catch((e) => e);
    expect('7 is not a valid heading level. Valid levels are: 1, 2, 3, 4, 5, 6').to.be.thrown;
  });

  it('throws an error for an invalid preset value', async () => {
    component = await fixture(html`
      <pharos-heading level="1" preset="9"> This is a heading </pharos-heading>
    `).catch((e) => e);
    expect(
      '9 is not a valid preset. Available presets are 1, 1--bold, 2, 2--bold, 3, 3--bold, 4, 4--bold, 5, 5--bold, 6, 6--bold, 7, 7--bold, legend.'
    ).to.be.thrown;
  });
});
