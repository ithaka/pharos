import { action } from 'storybook/actions';

import { PharosTabs, PharosTab, PharosTabPanel } from '../../react-components';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentArgs, StoryArgs } from './storyArgs';
import type { PharosTabs as PTType } from './pharos-tabs';

const meta = {
  title: 'Components/Tabs',
  component: PharosTabs,
  subcomponents: { PharosTab, PharosTabPanel },
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: { page: configureDocsPage('tabs') },
    options: { selectedPanel: 'addon-controls' },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: () => (
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
        <PharosTabs>
          <PharosTab id="tab-2-1" data-panel-id="panel-2-1">
            Nested tab 1
          </PharosTab>
          <PharosTab id="tab-2-2" data-panel-id="panel-2-2">
            Nested tab 2
          </PharosTab>
          <PharosTabPanel id="panel-2-1" slot="panel">
            Nested panel 1
          </PharosTabPanel>
          <PharosTabPanel id="panel-2-2" slot="panel">
            Nested panel 2
          </PharosTabPanel>
        </PharosTabs>
      </PharosTabPanel>
      <PharosTabPanel id="panel-3" slot="panel">
        Panel 3
      </PharosTabPanel>
    </PharosTabs>
  ),
};

export const Events: Story = {
  render: () => (
    <PharosTabs
      onPharos-Tab-Selected={(e: CustomEvent) => action('Select')((e.target as PTType).id)}
    >
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
  parameters: { options: { selectedPanel: 'storybook/actions/panel' } },
};

export const PanelOrder: Story = {
  render: () => (
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

export const PanelSeparator: Story = {
  render: () => (
    <PharosTabs panelSeparator style={{ width: '100%' }}>
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

export const HorizontalScrolling: Story = {
  render: () => (
    <PharosTabs panelSeparator style={{ width: '100%' }}>
      <PharosTab id="tab-1" data-panel-id="panel-1">
        Tab 1
      </PharosTab>
      <PharosTab id="tab-2" data-panel-id="panel-2">
        Tab 2
      </PharosTab>
      <PharosTab id="tab-3" data-panel-id="panel-3">
        Tab 3
      </PharosTab>
      <PharosTab id="tab-4" data-panel-id="panel-4">
        Tab 4
      </PharosTab>
      <PharosTab id="tab-5" data-panel-id="panel-5">
        Tab 5
      </PharosTab>
      <PharosTab id="tab-6" data-panel-id="panel-6">
        Tab 6
      </PharosTab>
      <PharosTab id="tab-7" data-panel-id="panel-7" selected>
        Tab 7
      </PharosTab>
      <PharosTab id="tab-8" data-panel-id="panel-8">
        Tab 8
      </PharosTab>
      <PharosTab id="tab-9" data-panel-id="panel-9">
        Tab 9
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
      <PharosTabPanel id="panel-4" slot="panel">
        Panel 4 with a panel separator
      </PharosTabPanel>
      <PharosTabPanel id="panel-5" slot="panel">
        Panel 5 with a panel separator
      </PharosTabPanel>
      <PharosTabPanel id="panel-6" slot="panel">
        Panel 6 with a panel separator
      </PharosTabPanel>
      <PharosTabPanel id="panel-7" slot="panel">
        Panel 7 with a panel separator
      </PharosTabPanel>
      <PharosTabPanel id="panel-8" slot="panel">
        Panel 8 with a panel separator
      </PharosTabPanel>
      <PharosTabPanel id="panel-9" slot="panel">
        Panel 9 with a panel separator
      </PharosTabPanel>
    </PharosTabs>
  ),
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
    chromatic: { viewports: [320, 1200] },
  },
};
