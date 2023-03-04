import { PharosProgressBar } from '../../react-components';
import { configureDocsPage } from '@config/docsPageConfig';
import { defaultArgs, argTypes } from './storyArgs';
import { PharosContext } from '../../utils/PharosContext';

export default {
  title: 'Components/Progress Bar',
  component: PharosProgressBar,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: { page: configureDocsPage('progress-bar') },
    options: { selectedPanel: 'addon-controls' },
  },
  argTypes,
};

export const Base = {
  render: (args) => (
    <PharosProgressBar value={args.value}>
      <div slot="title">{args.title}</div>
      <div slot="description">{args.description}</div>
    </PharosProgressBar>
  ),
  args: defaultArgs,
};

export const Plain = {
  ...Base,
  args: {
    value: 10,
  },
};
