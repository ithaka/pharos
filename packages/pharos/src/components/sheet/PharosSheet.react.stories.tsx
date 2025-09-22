import { PharosSheet } from '../../react-components/sheet/pharos-sheet';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentArgs, StoryArgs } from './storyArgs';

const meta = {
  title: 'Components/Sheet',
  component: PharosSheet,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: {
      page: configureDocsPage('sheet'),
    },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: () => <PharosSheet />,
  args: {},
};

export const WithClose: Story = {
  render: () => (
    <PharosSheet id="my-sheet" with-close>
      <div>Lorem ipsum dolor sit amet</div>
    </PharosSheet>
  ),
};

export const Expanded: Story = {
  render: () => (
    <PharosSheet id="my-sheet" expanded>
      <div>Lorem ipsum dolor sit amet</div>
    </PharosSheet>
  ),
};

export const LongContent: Story = {
  render: () => (
    <PharosSheet id="my-sheet">
      <div>Lorem ipsum dolor sit amet</div>
      <div>Lorem ipsum dolor sit amet</div>
      <div>Lorem ipsum dolor sit amet</div>
      <div>Lorem ipsum dolor sit amet</div>
      <div>Lorem ipsum dolor sit amet</div>
      <div>Lorem ipsum dolor sit amet</div>
      <div>Lorem ipsum dolor sit amet</div>
      <div>Lorem ipsum dolor sit amet</div>
      <div>Lorem ipsum dolor sit amet</div>
      <div>Lorem ipsum dolor sit amet</div>
      <div>Lorem ipsum dolor sit amet</div>
      <div>Lorem ipsum dolor sit amet</div>
      <div>Lorem ipsum dolor sit amet</div>
      <div>Lorem ipsum dolor sit amet</div>
      <div>Lorem ipsum dolor sit amet</div>
      <div>Lorem ipsum dolor sit amet</div>
      <div>Lorem ipsum dolor sit amet</div>
    </PharosSheet>
  ),
};

export const OmitOverlay: Story = {
  render: () => (
    <PharosSheet id="my-sheet" omit-overlay start-height="100px" expanded-height="500px">
      <div>Lorem ipsum dolor sit amet</div>
    </PharosSheet>
  ),
};

export const Docked: Story = {
  render: () => (
    <div>
      <PharosSheet id="my-sheet" start-height="64" docked={true}>
        <div>Lorem ipsum dolor sit amet</div>
      </PharosSheet>
    </div>
  ),
};