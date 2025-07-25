import { action } from 'storybook/actions';
import { html } from 'lit';

import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { ComponentArgs, StoryArgs } from './storyArgs';

const meta = {
  title: 'Components/Loading Spinner',
  component: 'pharos-loading-spinner',
  parameters: {
    docs: { page: configureDocsPage('loading-spinner') },
    options: { selectedPanel: 'addon-controls' },
    chromatic: { disable: true },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: () => html`
    <storybook-pharos-loading-spinner></storybook-pharos-loading-spinner>
    <storybook-pharos-heading level="1" preset="5"
      >Loading spinner demonstration</storybook-pharos-heading
    >
    <storybook-pharos-button @click="${() => action('Click')('Clicked')}"
      >Can't press me!</storybook-pharos-button
    >
  `,
};

export const Scoped: Story = {
  render: () => html`
    <div style="height: 5rem; width: 5rem; border: 1px solid black; position: relative;">
      <storybook-pharos-loading-spinner></storybook-pharos-loading-spinner>
    </div>
  `,
};

export const OnBackground: Story = {
  render: () => html`
    <div style="height: 5rem; width: 5rem; background: black; position: relative;">
      <storybook-pharos-loading-spinner is-on-background></storybook-pharos-loading-spinner>
    </div>
  `,
};

export const Small: Story = {
  render: () => html`
    <div style="height: 5rem; width: 5rem; position: relative;">
      <storybook-pharos-loading-spinner small></storybook-pharos-loading-spinner>
    </div>
  `,
};

export const SmallOnBackground: Story = {
  render: () => html`
    <div style="height: 5rem; width: 5rem; background: black; position: relative;">
      <storybook-pharos-loading-spinner small is-on-background></storybook-pharos-loading-spinner>
    </div>
  `,
};
