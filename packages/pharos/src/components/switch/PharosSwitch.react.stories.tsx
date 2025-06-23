import { PharosSwitch } from '../../react-components/switch/pharos-switch';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';
import { action } from 'storybook/actions';
import type { ComponentArgs, StoryArgs } from './storyArgs';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { PharosSwitch as PSType } from './pharos-switch';

const meta = {
  title: 'Forms/Switch',
  component: PharosSwitch,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: {
      page: configureDocsPage('switch'),
    },
    options: { selectedPanel: 'addon-controls' },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: ({ disabled, checked }) => (
    <PharosSwitch
      disabled={disabled}
      checked={checked}
      onChange={(e) => action('Change')((e.target as PSType).checked)}
    >
      <span slot="label">Toggle Switch</span>
    </PharosSwitch>
  ),
  args: {
    disabled: false,
    checked: false,
  },
  parameters: {
    options: { selectedPanel: 'storybook/actions/panel' },
  },
};
