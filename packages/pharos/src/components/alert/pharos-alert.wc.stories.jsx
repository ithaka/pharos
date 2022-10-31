import { html } from 'lit';
import React from 'react';
import {
  Title,
  Subtitle,
  Description,
  Primary,
  ArgsTable,
  Stories,
  PRIMARY_STORY,
} from '@storybook/addon-docs';

import { GuidelineLink } from '@config/GuidelineLink';

export default {
  title: 'Components/Alert',
  component: 'pharos-alert',
  parameters: {
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <GuidelineLink path={'alert'} />
          <Primary />
          <ArgsTable story={PRIMARY_STORY} />
          <Stories />
        </>
      ),
    },
  },
  argTypes: {
    status: {
      options: ['info', 'success', 'warning', 'error'],
      control: { type: 'radio' },
    },
    text: { control: { type: 'text' }, defaultValue: 'Alert message' },
    closable: { control: { type: 'boolean' }, defaultValue: false },
  },
};

const Template = ({ status, text, closable }) => {
  return html`<pharos-alert status=${status} ?closable=${closable}>${text}</pharos-alert>`;
};

export const Info = Template.bind({});
Info.args = {
  status: 'info',
  text: 'There will be maintenance tomorrow.',
};

export const Success = Template.bind({});
Success.args = {
  status: 'success',
  text: 'Success!',
};

const WarningTemplate = ({ status, text, closable }) => {
  return html` <pharos-alert status=${status} ?closable=${closable}>
    <p class="alert-example__content">${text}</p>
    <p class="alert-example__content">See <pharos-link href="#">how to fix this</pharos-link>.</p>
  </pharos-alert>`;
};

export const Warning = WarningTemplate.bind({});
Warning.args = {
  status: 'warning',
  text: 'Your profile is incomplete.',
};

const ErrorTemplate = ({ status, text, closable }) => {
  return html` <pharos-alert status=${status} ?closable=${closable}>
    <p class="alert-example__content">${text}</p>
    <p class="alert-example__content">
      For more information,
      <pharos-link href="#">read the documentation</pharos-link>.
    </p>
  </pharos-alert>`;
};

export const Error = ErrorTemplate.bind({});
Error.args = {
  status: 'error',
  text: "Your password didn't meet the minimum requirements.",
};

export const Closable = ErrorTemplate.bind({});
Closable.args = {
  ...Error.args,
  closable: true,
};
