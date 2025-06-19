import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { defaultArgs, argTypes } from './storyArgs';
import type { ComponentArgs, StoryArgs } from './storyArgs';

const meta = {
  title: 'Components/Alert',
  component: 'storybook-pharos-alert',
  parameters: {
    docs: {
      page: configureDocsPage('alert'),
    },
  },
  argTypes,
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

const Base: Story = {
  render: ({ status, closable, text }) =>
    html`<storybook-pharos-alert status=${status} .closable=${closable}
      >${text}</storybook-pharos-alert
    >`,
  args: defaultArgs,
};

export const Info: Story = {
  ...Base,
  args: {
    status: 'info',
    text: 'There will be maintenance tomorrow.',
  },
};

export const Success: Story = {
  ...Base,
  args: {
    status: 'success',
    text: 'Success!',
  },
};

export const Warning: Story = {
  render: ({ status, text, closable }) =>
    html` <storybook-pharos-alert status=${status} .closable=${closable}>
      <p class="alert-example__content">${text}</p>
      <p class="alert-example__content">
        See <storybook-pharos-link href="#">how to fix this</storybook-pharos-link>.
      </p>
    </storybook-pharos-alert>`,
  args: {
    status: 'warning',
    text: 'Your profile is incomplete.',
  },
};

export const Error: Story = {
  render: ({ status, text, closable }) =>
    html` <storybook-pharos-alert status=${status} .closable=${closable}>
      <p class="alert-example__content">${text}</p>
      <p class="alert-example__content">
        For more information,
        <storybook-pharos-link href="#">read the documentation</storybook-pharos-link>.
      </p>
    </storybook-pharos-alert>`,
  args: {
    status: 'error',
    text: "Your password didn't meet the minimum requirements.",
  },
};

export const Closable: Story = {
  ...Error,
  args: {
    ...Error.args,
    closable: true,
  },
};
