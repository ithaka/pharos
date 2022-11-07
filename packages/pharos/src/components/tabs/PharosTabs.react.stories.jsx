import { action } from '@storybook/addon-actions';

import { PharosTabs, PharosTab, PharosTabPanel } from '../../react-components';
import { configureDocsPage } from '@config/docsPageConfig';

export default {
  title: 'Components/Tabs',
  component: PharosTabs,
  subcomponents: { PharosTab, PharosTabPanel },
  parameters: {
    docs: { page: configureDocsPage('tabs') },
    options: { selectedPanel: 'addon-controls' },
  },
};

export const Base = {
  render: (_) => (
    <PharosTabs>
      <PharosTab id="tab-1" data-panel-id="panel-1">
        Tab 1
      </PharosTab>
      <PharosTab id="tab-2" data-panel-id="panel-2">
        Tab 2
      </PharosTab>
      <PharosTab id="tab-3" data-panel-id="panel-3">
        Tab 3
      </PharosTab>
      <PharosTabPanel id="panel-1" slot="panel">
        Panel 1
      </PharosTabPanel>
      <PharosTabPanel id="panel-2" slot="panel">
        Panel 2
      </PharosTabPanel>
      <PharosTabPanel id="panel-3" slot="panel">
        Panel 3
      </PharosTabPanel>
    </PharosTabs>
  ),
};

export const Events = {
  render: (_) => (
    <PharosTabs onPharos-Tab-Selected={(e) => action('Select')(e.target.id)}>
      <PharosTab id="tab-1" data-panel-id="panel-1">
        Tab 1
      </PharosTab>
      <PharosTab id="tab-2" data-panel-id="panel-2">
        Tab 2
      </PharosTab>
      <PharosTab id="tab-3" data-panel-id="panel-3" selected>
        Tab 3
      </PharosTab>
      <PharosTabPanel id="panel-1" slot="panel">
        Panel 1
      </PharosTabPanel>
      <PharosTabPanel id="panel-2" slot="panel">
        Panel 2
      </PharosTabPanel>
      <PharosTabPanel id="panel-3" slot="panel">
        Panel 3
      </PharosTabPanel>
    </PharosTabs>
  ),
  parameters: { options: { selectedPanel: 'addon-actions' } },
};

export const PanelOrder = {
  render: (_) => (
    <PharosTabs>
      <PharosTab id="tab-1" data-panel-id="panel-1">
        Tab 1
      </PharosTab>
      <PharosTab id="tab-2" data-panel-id="panel-2">
        Tab 2
      </PharosTab>
      <PharosTab id="tab-3" data-panel-id="panel-3">
        Tab 3
      </PharosTab>
      <PharosTabPanel id="panel-2" slot="panel">
        I am the panel for tab 2 but listed 1st in the DOM
      </PharosTabPanel>
      <PharosTabPanel id="panel-3" slot="panel">
        I am the panel for tab 3 but listed 2nd in the DOM
      </PharosTabPanel>
      <PharosTabPanel id="panel-1" slot="panel">
        I am the panel for tab 1 but listed 3rd in the DOM
      </PharosTabPanel>
    </PharosTabs>
  ),
};

export const PanelSeparator = {
  render: (_) => (
    <PharosTabs panel-separator style="width: 100%">
      <PharosTab id="tab-1" data-panel-id="panel-1">
        Tab 1
      </PharosTab>
      <PharosTab id="tab-2" data-panel-id="panel-2">
        Tab 2
      </PharosTab>
      <PharosTab id="tab-3" data-panel-id="panel-3">
        Tab 3
      </PharosTab>
      <PharosTabPanel id="panel-1" slot="panel">
        Panel 1 with a panel separator
      </PharosTabPanel>
      <PharosTabPanel id="panel-2" slot="panel">
        Panel 2 with a panel separator
      </PharosTabPanel>
      <PharosTabPanel id="panel-3" slot="panel">
        Panel 3 with a panel separator
      </PharosTabPanel>
    </PharosTabs>
  ),
};
