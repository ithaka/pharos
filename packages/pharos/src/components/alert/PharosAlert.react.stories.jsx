import { PharosAlert, PharosLink } from '../../react-components';
import { configureDocsPage } from '@config/docsPageConfig';

export default {
  title: 'Components/Alert',
  component: PharosAlert,
  parameters: {
    docs: {
      page: configureDocsPage('alert'),
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

const Base = {
  render: ({ status, text, closable }) => (
    <PharosAlert status={status} closable={closable}>
      {text}
    </PharosAlert>
  ),
  args: {
    status: 'base',
    text: 'I am an alert.',
  },
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
  render: ({ status, text, closable }) => (
    <PharosAlert status={status} closable={closable}>
      <p className="alert-example__content">{text}</p>
      <p className="alert-example__content">
        See <PharosLink href="#">how to fix this</PharosLink>.
      </p>
    </PharosAlert>
  ),
  args: {
    status: 'warning',
    text: 'Your profile is incomplete.',
  },
};

export const Error = {
  render: ({ status, text, closable }) => (
    <PharosAlert status={status} closable={closable}>
      <p className="alert-example__content">{text}</p>
      <p className="alert-example__content">
        For more information, <pharos-link href="#">read the documentation</pharos-link>.
      </p>
    </PharosAlert>
  ),
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
