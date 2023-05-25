import { PharosAlert, PharosLink } from '../../react-components';
import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs, argTypes } from './storyArgs';
import { PharosContext } from '../../utils/PharosContext';

export default {
  title: 'Components/Alert',
  component: PharosAlert,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: {
      page: configureDocsPage('alert'),
    },
  },
  argTypes,
};

const Base = {
  render: ({ status, text, closable }) => (
    <PharosAlert status={status} closable={closable}>
      {text}
    </PharosAlert>
  ),
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
        For more information, <PharosLink href="#">read the documentation</PharosLink>.
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
