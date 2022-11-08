import { action } from '@storybook/addon-actions';
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
  render: () =>
    html`
      <pharos-tabs>
        <pharos-tab id="tab-1" data-panel-id="panel-1">Tab 1</pharos-tab>
        <pharos-tab id="tab-2" data-panel-id="panel-2">Tab 2</pharos-tab>
        <pharos-tab id="tab-3" data-panel-id="panel-3">Tab 3</pharos-tab>
        <pharos-tab-panel id="panel-1" slot="panel">Panel 1</pharos-tab-panel>
        <pharos-tab-panel id="panel-2" slot="panel">Panel 2</pharos-tab-panel>
        <pharos-tab-panel id="panel-3" slot="panel">Panel 3</pharos-tab-panel>
      </pharos-tabs>
    `,
};

export const Events = {
  render: () =>
    html`
      <pharos-tabs @pharos-tab-selected="${(e) => action('Selected')(e.target.id)}">
        <pharos-tab id="tab-1" data-panel-id="panel-1">Tab 1</pharos-tab>
        <pharos-tab id="tab-2" data-panel-id="panel-2">Tab 2</pharos-tab>
        <pharos-tab id="tab-3" data-panel-id="panel-3" selected>Tab 3</pharos-tab>
        <pharos-tab-panel id="panel-1" slot="panel">Panel 1</pharos-tab-panel>
        <pharos-tab-panel id="panel-2" slot="panel">Panel 2</pharos-tab-panel>
        <pharos-tab-panel id="panel-3" slot="panel">Panel 3</pharos-tab-panel>
      </pharos-tabs>
    `,
  parameters: { options: { selectedPanel: 'addon-controls' } },
};

export const PanelOrder = {
  render: () =>
    html`
      <pharos-tabs>
        <pharos-tab id="tab-1" data-panel-id="panel-1">Tab 1</pharos-tab>
        <pharos-tab id="tab-2" data-panel-id="panel-2">Tab 2</pharos-tab>
        <pharos-tab id="tab-3" data-panel-id="panel-3">Tab 3</pharos-tab>
        <pharos-tab-panel id="panel-2" slot="panel"
          >I am the panel for tab 2 but listed 1st in the DOM</pharos-tab-panel
        >
        <pharos-tab-panel id="panel-3" slot="panel"
          >I am the panel for tab 3 but listed 2nd in the DOM</pharos-tab-panel
        >
        <pharos-tab-panel id="panel-1" slot="panel"
          >I am the panel for tab 1 but listed 3rd in the DOM</pharos-tab-panel
        >
      </pharos-tabs>
    `,
};

export const PanelSeparator = {
  render: () =>
    html`
      <pharos-tabs panel-separator style="width: 100%">
        <pharos-tab id="tab-1" data-panel-id="panel-1">Tab 1</pharos-tab>
        <pharos-tab id="tab-2" data-panel-id="panel-2">Tab 2</pharos-tab>
        <pharos-tab id="tab-3" data-panel-id="panel-3">Tab 3</pharos-tab>
        <pharos-tab-panel id="panel-1" slot="panel"
          >Panel 1 with a panel separator</pharos-tab-panel
        >
        <pharos-tab-panel id="panel-2" slot="panel"
          >Panel 2 with a panel separator</pharos-tab-panel
        >
        <pharos-tab-panel id="panel-3" slot="panel"
          >Panel 3 with a panel separator</pharos-tab-panel
        >
      </pharos-tabs>
    `,
};
