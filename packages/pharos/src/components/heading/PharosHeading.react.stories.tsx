import { PharosHeading, PharosCheckboxGroup, PharosCheckbox } from '../../react-components';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { defaultArgs, argTypes, type ComponentArgs, type StoryArgs } from './storyArgs';
import { allPresets } from './pharos-heading';
import { PharosContext } from '../../utils/PharosContext';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Heading',
  component: PharosHeading,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: { page: configureDocsPage('heading') },
    options: { selectedPanel: 'addon-controls' },
  },
  argTypes,
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: (args) => (
    <PharosHeading level={args.level} preset={args.preset} noMargin={args.noMargin}>
      {args.text}
      <br />
      second line
    </PharosHeading>
  ),
  args: defaultArgs,
  argTypes: {
    ...argTypes,
    preset: {
      options: allPresets.filter((preset) => !preset.includes('--bold')),
      control: { type: 'inline-radio' },
    },
  },
};

export const Bold: Story = {
  ...Base,
  args: {
    ...Base.args,
    preset: '5--bold',
  },
  argTypes: {
    ...argTypes,
    preset: {
      options: allPresets.filter((preset) => preset.includes('--bold')),
      control: { type: 'inline-radio' },
    },
  },
};

export const Legend: Story = {
  render: (args) => (
    <PharosCheckboxGroup>
      <PharosHeading slot="legend" level={args.level} preset={args.preset}>
        {args.text}
      </PharosHeading>
      <PharosCheckbox value="1">
        <span slot="label">Checkbox 1</span>
      </PharosCheckbox>
      <PharosCheckbox value="2">
        <span slot="label">Checkbox 2</span>
      </PharosCheckbox>
    </PharosCheckboxGroup>
  ),
  args: {
    ...Base.args,
    text: 'I am legend',
    level: 2,
    preset: 'legend',
  },
};
