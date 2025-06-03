import { action } from 'storybook/actions';
import { html } from 'lit';

import { configureDocsPage } from '@config/docsPageConfig';

export default {
  title: 'Components/Tabs',
  component: 'pharos-tabs',
  subcomponents: { PharosTab: 'pharos-tab', PharosTabPanel: 'pharos-tab-panel' },
  parameters: {
    docs: { page: configureDocsPage('tabs') },
    options: { selectedPanel: 'addon-controls' },
  },
};

export const Base = {
  render: () => html`
    <storybook-pharos-tabs>
      <storybook-pharos-tab id="tab-1" data-panel-id="panel-1">Tab 1</storybook-pharos-tab>
      <storybook-pharos-tab id="tab-2" data-panel-id="panel-2">Tab 2</storybook-pharos-tab>
      <storybook-pharos-tab id="tab-3" data-panel-id="panel-3">Tab 3</storybook-pharos-tab>
      <storybook-pharos-tab-panel id="panel-1" slot="panel">Panel 1</storybook-pharos-tab-panel>
      <storybook-pharos-tab-panel id="panel-2" slot="panel">
        <storybook-pharos-tabs>
          <storybook-pharos-tab id="tab-2-1" data-panel-id="panel-2-1"
            >Nested tab 1</storybook-pharos-tab
          >
          <storybook-pharos-tab id="tab-2-2" data-panel-id="panel-2-2"
            >Nested tab 2</storybook-pharos-tab
          >
          <storybook-pharos-tab-panel id="panel-2-1" slot="panel"
            >Nested panel 1</storybook-pharos-tab-panel
          >
          <storybook-pharos-tab-panel id="panel-2-2" slot="panel"
            >Nested panel 2</storybook-pharos-tab-panel
          >
        </storybook-pharos-tabs>
      </storybook-pharos-tab-panel>
      <storybook-pharos-tab-panel id="panel-3" slot="panel">Panel 3</storybook-pharos-tab-panel>
    </storybook-pharos-tabs>
  `,
};

export const Events = {
  render: () => html`
    <storybook-pharos-tabs
      selected-tab="2"
      @pharos-tab-selected="${(e) => action('Selected')(e.target.id)}"
    >
      <storybook-pharos-tab id="tab-1" data-panel-id="panel-1">Tab 1</storybook-pharos-tab>
      <storybook-pharos-tab id="tab-2" data-panel-id="panel-2">Tab 2</storybook-pharos-tab>
      <storybook-pharos-tab id="tab-3" data-panel-id="panel-3">Tab 3</storybook-pharos-tab>
      <storybook-pharos-tab-panel id="panel-1" slot="panel">Panel 1</storybook-pharos-tab-panel>
      <storybook-pharos-tab-panel id="panel-2" slot="panel">Panel 2</storybook-pharos-tab-panel>
      <storybook-pharos-tab-panel id="panel-3" slot="panel">Panel 3</storybook-pharos-tab-panel>
    </storybook-pharos-tabs>
  `,
  parameters: { options: { selectedPanel: 'addon-controls' } },
};

export const PanelOrder = {
  render: () => html`
    <storybook-pharos-tabs>
      <storybook-pharos-tab id="tab-1" data-panel-id="panel-1">Tab 1</storybook-pharos-tab>
      <storybook-pharos-tab id="tab-2" data-panel-id="panel-2">Tab 2</storybook-pharos-tab>
      <storybook-pharos-tab id="tab-3" data-panel-id="panel-3">Tab 3</storybook-pharos-tab>
      <storybook-pharos-tab-panel id="panel-2" slot="panel"
        >I am the panel for tab 2 but listed 1st in the DOM</storybook-pharos-tab-panel
      >
      <storybook-pharos-tab-panel id="panel-3" slot="panel"
        >I am the panel for tab 3 but listed 2nd in the DOM</storybook-pharos-tab-panel
      >
      <storybook-pharos-tab-panel id="panel-1" slot="panel"
        >I am the panel for tab 1 but listed 3rd in the DOM</storybook-pharos-tab-panel
      >
    </storybook-pharos-tabs>
  `,
};

export const PanelSeparator = {
  render: () => html`
    <storybook-pharos-tabs panel-separator style="width: 100%">
      <storybook-pharos-tab id="tab-1" data-panel-id="panel-1">Tab 1</storybook-pharos-tab>
      <storybook-pharos-tab id="tab-2" data-panel-id="panel-2">Tab 2</storybook-pharos-tab>
      <storybook-pharos-tab id="tab-3" data-panel-id="panel-3">Tab 3</storybook-pharos-tab>
      <storybook-pharos-tab-panel id="panel-1" slot="panel"
        >Panel 1 with a panel separator</storybook-pharos-tab-panel
      >
      <storybook-pharos-tab-panel id="panel-2" slot="panel"
        >Panel 2 with a panel separator</storybook-pharos-tab-panel
      >
      <storybook-pharos-tab-panel id="panel-3" slot="panel"
        >Panel 3 with a panel separator</storybook-pharos-tab-panel
      >
    </storybook-pharos-tabs>
  `,
};

export const HorizontalScrolling = {
  render: () => html`
    <storybook-pharos-tabs selected-tab="6" panel-separator style="width: 100%">
      <storybook-pharos-tab id="tab-1" data-panel-id="panel-1">Tab 1</storybook-pharos-tab>
      <storybook-pharos-tab id="tab-2" data-panel-id="panel-2">Tab 2</storybook-pharos-tab>
      <storybook-pharos-tab id="tab-3" data-panel-id="panel-3">Tab 3</storybook-pharos-tab>
      <storybook-pharos-tab id="tab-4" data-panel-id="panel-4">Tab 4</storybook-pharos-tab>
      <storybook-pharos-tab id="tab-5" data-panel-id="panel-5">Tab 5</storybook-pharos-tab>
      <storybook-pharos-tab id="tab-6" data-panel-id="panel-6">Tab 6</storybook-pharos-tab>
      <storybook-pharos-tab id="tab-7" data-panel-id="panel-7">Tab 7</storybook-pharos-tab>
      <storybook-pharos-tab id="tab-8" data-panel-id="panel-8">Tab 8</storybook-pharos-tab>
      <storybook-pharos-tab id="tab-9" data-panel-id="panel-9">Tab 9</storybook-pharos-tab>
      <storybook-pharos-tab-panel id="panel-1" slot="panel"
        >Panel 1 with a panel separator</storybook-pharos-tab-panel
      >
      <storybook-pharos-tab-panel id="panel-2" slot="panel"
        >Panel 2 with a panel separator</storybook-pharos-tab-panel
      >
      <storybook-pharos-tab-panel id="panel-3" slot="panel"
        >Panel 3 with a panel separator</storybook-pharos-tab-panel
      >
      <storybook-pharos-tab-panel id="panel-4" slot="panel"
        >Panel 4 with a panel separator</storybook-pharos-tab-panel
      >
      <storybook-pharos-tab-panel id="panel-5" slot="panel"
        >Panel 5 with a panel separator</storybook-pharos-tab-panel
      >
      <storybook-pharos-tab-panel id="panel-6" slot="panel"
        >Panel 6 with a panel separator</storybook-pharos-tab-panel
      >
      <storybook-pharos-tab-panel id="panel-7" slot="panel"
        >Panel 7 with a panel separator</storybook-pharos-tab-panel
      >
      <storybook-pharos-tab-panel id="panel-8" slot="panel"
        >Panel 8 with a panel separator</storybook-pharos-tab-panel
      >
      <storybook-pharos-tab-panel id="panel-9" slot="panel"
        >Panel 9 with a panel separator</storybook-pharos-tab-panel
      >
    </storybook-pharos-tabs>
  `,
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    chromatic: { viewports: [320, 1200] },
  },
};
