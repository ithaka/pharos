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
import { PharosAlert } from '../../react-components/alert/pharos-alert';
import { PharosLink } from '../../react-components/link/pharos-link';

export default {
  title: 'Components/Alert',
  component: PharosAlert,
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
  return (
    <PharosAlert status={status} closable={closable}>
      {text}
    </PharosAlert>
  );
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
  return (
    <PharosAlert status={status} closable={closable}>
      <p className="alert-example__content">{text}</p>
      <p className="alert-example__content">
        See <PharosLink href="#">how to fix this</PharosLink>.
      </p>
    </PharosAlert>
  );
};

export const Warning = WarningTemplate.bind({});
Warning.args = {
  status: 'warning',
  text: 'Your profile is incomplete.',
};

const ErrorTemplate = ({ status, text, closable }) => {
  return (
    <PharosAlert status={status} closable={closable}>
      <p className="alert-example__content">{text}</p>
      <p className="alert-example__content">
        For more information, <pharos-link href="#">read the documentation</pharos-link>.
      </p>
    </PharosAlert>
  );
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
