import { html } from 'lit';

import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { defaultArgs, argTypes, type ComponentArgs, type StoryArgs } from './storyArgs';
import { allPresets } from './pharos-heading';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta = {
  title: 'Components/Heading',
  component: 'pharos-heading',
  parameters: {
    docs: { page: configureDocsPage('heading') },
    options: { selectedPanel: 'addon-controls' },
  },
  argTypes,
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: (args) => html`
    <storybook-pharos-heading level=${args.level} preset=${args.preset} .no-margin=${args.noMargin}>
      ${args.text}<br />second line
    </storybook-pharos-heading>
  `,
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
  render: (args) => html`
    <storybook-pharos-checkbox-group>
      <storybook-pharos-heading slot="legend" level="${args.level}" preset="${args.preset}"
        >${args.text}</storybook-pharos-heading
      >
      <storybook-pharos-checkbox value="1"
        ><span slot="label">Checkbox 1</span></storybook-pharos-checkbox
      >
      <storybook-pharos-checkbox value="2"
        ><span slot="label">Checkbox 2</span></storybook-pharos-checkbox
      >
    </storybook-pharos-checkbox-group>
  `,
  args: {
    ...Base.args,
    text: 'I am legend',
    level: 2,
    preset: 'legend',
  },
};
