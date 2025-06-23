import type { Meta, StoryObj } from '@storybook/react-vite';
import { PharosAlert, PharosLink } from '../../react-components';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { defaultArgs, argTypes, type ComponentArgs, type StoryArgs } from './storyArgs';
import { PharosContext } from '../../utils/PharosContext';

const meta = {
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
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

const Base: Story = {
  render: ({ status, text, closable }) => (
    <PharosAlert status={status} closable={closable}>
      {text}
    </PharosAlert>
  ),
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

export const Error: Story = {
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

export const Closable: Story = {
  ...Error,
  args: {
    ...Error.args,
    closable: true,
  },
};
