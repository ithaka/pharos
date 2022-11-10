import { html } from 'lit';
import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs, argTypes } from './storyArgs';

export default {
  title: 'Components/Alert',
  component: 'pharos-alert',
  parameters: {
    docs: {
      page: configureDocsPage('alert'),
    },
  },
  argTypes,
};

const Base = {
  render: ({ status, text, closable }) =>
    html`<pharos-alert status=${status} ?closable=${closable}>${text}</pharos-alert>`,
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
    html` <pharos-alert status=${status} ?closable=${closable}>
      <p class="alert-example__content">${text}</p>
      <p class="alert-example__content">See <pharos-link href="#">how to fix this</pharos-link>.</p>
    </pharos-alert>`,
  args: {
    status: 'warning',
    text: 'Your profile is incomplete.',
  },
};

export const Error = {
  render: ({ status, text, closable }) =>
    html` <pharos-alert status=${status} ?closable=${closable}>
      <p class="alert-example__content">${text}</p>
      <p class="alert-example__content">
        For more information,
        <pharos-link href="#">read the documentation</pharos-link>.
      </p>
    </pharos-alert>`,
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
