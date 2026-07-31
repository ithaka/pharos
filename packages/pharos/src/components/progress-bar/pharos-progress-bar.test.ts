import { beforeEach, describe, expect, it } from 'vitest';
import { html } from 'lit/static-html.js';

import { fixture } from '../../test/fixture';
import type { PharosProgressBar } from './pharos-progress-bar';

describe('pharos-progress-bar', () => {
  let component: PharosProgressBar;

  beforeEach(async () => {
    component = await fixture(html`
      <test-pharos-progress-bar><div slot="title">Title.xls</div></test-pharos-progress-bar>
    `);
  });

  it('is accessible', async () => {
    await expect(component).toBeAccessible();
  });

  it('sets its default attributes', async () => {
    component = await fixture(html`
      <test-pharos-progress-bar>
        <div slot="title">Click.xls</div>
        <div slot="description">Processing headers</div>
      </test-pharos-progress-bar>
    `);
    expect(component).toEqualDom(
      `<test-pharos-progress-bar data-pharos-component="PharosProgressBar">
        <div slot="title">Click.xls</div>
        <div slot="description">Processing headers</div>
      </test-pharos-progress-bar>`
    );
  });

  it('renders the progress bar with the inserted value and the correct width', async () => {
    component = await fixture(html`
      <test-pharos-progress-bar value="20"></test-pharos-progress-bar>
    `);
    const internalBar = component.renderRoot.querySelector('.progress-bar') as HTMLDivElement;
    expect(internalBar?.style.width).toBe('20%');
  });

  it('renders the progress bar with the correct gradient percentage', async () => {
    component = await fixture(html`
      <test-pharos-progress-bar value="40"></test-pharos-progress-bar>
    `);
    const internalBar = component.renderRoot.querySelector('.progress-bar') as HTMLDivElement;
    const slicedBackgroundColor = internalBar?.style.background;

    expect(
      slicedBackgroundColor.includes(
        'linear-gradient(to right, rgb(39, 202, 225) 95%, rgb(13, 48, 113))'
      )
    ).toBe(true);
  });
});
