import { html } from 'lit';
import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs, argTypes } from './storyArgs';

export default {
  title: 'Components/Alert',
  component: 'storybook-pharos-alert',
  parameters: {
    docs: {
      page: configureDocsPage('alert'),
    },
  },
  argTypes,
};

const Base = {
  render: ({ status, text, closable }) =>
    html`<storybook-pharos-alert status=${status} closable=${closable}
      >${text}</storybook-pharos-alert
    >`,
  args: defaultArgs,
};

export const Info = {
  ...Base,
  args: {
    status: 'info',
    text: 'There will be maintenance tomorrow.',
  },
};

export const Success = {
  ...Base,
  args: {
    status: 'success',
    text: 'Success!',
  },
};

export const Warning = {
  render: ({ status, text, closable }) =>
    html` <storybook-pharos-alert status=${status} closable=${closable}>
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

export const Error = {
  render: ({ status, text, closable }) =>
    html` <storybook-pharos-alert status=${status} closable=${closable}>
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

export const Closable = {
  ...Error,
  args: {
    ...Error.args,
    closable: true,
  },
};
