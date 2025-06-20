import { Footer } from '../../pages/shared/react/Footer';
import { PharosFooter } from '../../react-components';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentArgs, StoryArgs } from './storyArgs';

const meta = {
  title: 'Organisms/Footer',
  component: PharosFooter,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: { page: configureDocsPage('footer') },
    layout: 'fullscreen',
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: () => <Footer />,
  parameters: {
    chromatic: { viewports: [320, 1024, 1200] },
  },
};
