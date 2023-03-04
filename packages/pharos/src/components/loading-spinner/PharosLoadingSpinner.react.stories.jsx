import { action } from '@storybook/addon-actions';

import { PharosLoadingSpinner, PharosHeading, PharosButton } from '../../react-components';
import { configureDocsPage } from '@config/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';

export default {
  title: 'Components/Loading Spinner',
  component: PharosLoadingSpinner,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: { page: configureDocsPage('loading-spinner') },
    options: { selectedPanel: 'addon-controls' },
  },
};

export const Base = {
  render: () => (
    <div>
      <PharosLoadingSpinner></PharosLoadingSpinner>
      <PharosHeading level={1} preset={'5'}>
        Loading spinner demonstration
      </PharosHeading>
      <PharosButton onClick={() => action('Click')('Clicked')}>Can&apos;t press me!</PharosButton>
    </div>
  ),
};

export const Scoped = {
  render: () => (
    <div
      style={{
        height: '5rem',
        width: '5rem',
        border: '1px solid black',
        position: 'relative',
      }}
    >
      <PharosLoadingSpinner></PharosLoadingSpinner>
    </div>
  ),
};
