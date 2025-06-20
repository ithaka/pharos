import { html } from 'lit';

import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { defaultArgs, indeterminateArgs, argTypes, type ComponentArgs, type StoryArgs } from './storyArgs';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta = {
  title: 'Components/Progress Bar',
  component: 'pharos-progress-bar',
  parameters: {
    docs: { page: configureDocsPage('progress-bar') },
    options: { selectedPanel: 'addon-controls' },
  },
  argTypes,
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: (args) => html`
    <storybook-pharos-progress-bar value=${args.value}>
      <div slot="title">${args.title}</div>
      <div slot="description">${args.description}</div>
    </storybook-pharos-progress-bar>
  `,
  args: defaultArgs,
};

export const Indeterminate: Story = {
  render: (args) => html`
    <storybook-pharos-progress-bar>
      <div slot="title">${args.title}</div>
      <div slot="description">${args.description}</div>
    </storybook-pharos-progress-bar>
  `,
  args: indeterminateArgs,
  parameters: {
    chromatic: { disable: true },
  },
};

export const Plain: Story = {
  ...Base,
  args: {
    value: 10,
  },
};
