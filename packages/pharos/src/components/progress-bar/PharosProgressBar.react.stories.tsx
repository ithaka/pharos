import { PharosProgressBar } from '../../react-components';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import {
  defaultArgs,
  indeterminateArgs,
  argTypes,
  type StoryArgs,
  type ComponentArgs,
} from './storyArgs';
import { PharosContext } from '../../utils/PharosContext';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Progress Bar',
  component: PharosProgressBar,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: { page: configureDocsPage('progress-bar') },
    options: { selectedPanel: 'addon-controls' },
  },
  argTypes,
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: (args) => (
    <PharosProgressBar value={args.value}>
      <div slot="title">{args.title}</div>
      <div slot="description">{args.description}</div>
    </PharosProgressBar>
  ),
  args: defaultArgs,
};

export const Indeterminate: Story = {
  render: (args) => (
    <PharosProgressBar>
      <div slot="title">{args.title}</div>
      <div slot="description">{args.description}</div>
    </PharosProgressBar>
  ),
  args: indeterminateArgs,
};

export const Plain: Story = {
  ...Base,
  args: {
    value: 10,
  },
};
