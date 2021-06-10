import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit/static-html.js';
import './pharos-tab';
import './pharos-tabs';
import './pharos-tab-panel';
import type { PharosTab } from './pharos-tab';

describe('pharos-tab', () => {
  let component: PharosTab;

  beforeEach(async () => {
    component = await fixture(html` <pharos-tab>I am a tab</pharos-tab> `);
  });

  it('is accessible', async () => {
    const parentNode = document.createElement('pharos-tabs');
    component = await fixture(
      html`
        <pharos-tab id="tab-1" data-panel-id="panel-1">I am an tab</pharos-tab>
        <pharos-tab-panel id="panel-1" slot="panel">Panel 1</pharos-tab-panel>
      `,
      { parentNode }
    );
    await expect(component).to.be.accessible();
  });

  it('updates selected state when clicked', async () => {
    component.click();
    await component.updateComplete;
    expect(component.selected).to.be.true;
  });

  it('fires a custom event pharos-tab-selected when clicked', async () => {
    let selected = null;
    const handleSelected = (e: Event): void => {
      selected = (e as CustomEvent).target;
    };
    component.addEventListener('pharos-tab-selected', handleSelected);

    component.click();
    await component.updateComplete;

    expect(selected === component).to.be.true;
  });
});
