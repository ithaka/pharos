import { action } from 'storybook/actions';

import { PharosLoadingSpinner, PharosHeading, PharosButton } from '../../react-components';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentArgs, StoryArgs } from './storyArgs';

const meta = {
  title: 'Components/Loading Spinner',
  component: PharosLoadingSpinner,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: { page: configureDocsPage('loading-spinner') },
    options: { selectedPanel: 'addon-controls' },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: () => (
    <div>
      <PharosLoadingSpinner></PharosLoadingSpinner>
      <PharosHeading level={1} preset={'5'}>
        Loading spinner demonstration
      </PharosHeading>
      <PharosButton onClick={() => action('Click')('Clicked')}>Can&apos;t press me!</PharosButton>
    </div>
  ),
};

export const Scoped: Story = {
  render: () => (
    <div
      style={{
        height: '5rem',
        width: '5rem',
        border: '1px solid black',
        position: 'relative',
      }}
    >
      <PharosLoadingSpinner></PharosLoadingSpinner>
    </div>
  ),
};

export const OnBackground: Story = {
  render: () => (
    <div style={{height: "5rem", width: "5rem", background: "black", position: "relative"}}>
      <PharosLoadingSpinner is-on-background></PharosLoadingSpinner>
    </div>
  ),
};

export const Small: Story = {
  render: () => (
    <div style={{height: "5rem", width: "5rem", position: "relative"}}>
      <PharosLoadingSpinner small></PharosLoadingSpinner>
    </div>
  ),
};

export const SmallOnBackground: Story = {
  render: () => (
    <div style={{height: "5rem", width: "5rem", background: "black", position: "relative"}}>
      <PharosLoadingSpinner small is-on-background></PharosLoadingSpinner>
    </div>
  ),
};
