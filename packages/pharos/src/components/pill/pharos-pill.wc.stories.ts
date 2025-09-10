import { html } from 'lit';

import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { defaultArgs, type ComponentArgs, type StoryArgs } from './storyArgs';
import type { Meta, StoryObj } from '@storybook/web-components';

const meta = {
  title: 'Components/Pill',
  component: 'pharos-pill',
  parameters: {
    docs: { page: configureDocsPage('pill') },
    options: { selectedPanel: 'addon-controls' },
    controls: { expanded: true },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: () => html` <storybook-pharos-pill>Some content</storybook-pharos-pill> `,
  args: defaultArgs,
};

export const Sizes: Story = {
  render: () => html`
    <div style="display: grid; grid-gap: 2rem; grid-template-columns: repeat(3, 200px);">
      <storybook-pharos-pill>Normal Pill</storybook-pharos-pill>
      <storybook-pharos-pill size="small">Small Pill</storybook-pharos-pill>
    </div>
  `,
};

export const Dismissible: Story = {
  render: () => html`<storybook-pharos-pill dismissible>Dismissible Pill</storybook-pharos-pill> `,
};
