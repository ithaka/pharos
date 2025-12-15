import { action } from 'storybook/actions';

import { PharosPagination } from '../../react-components';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { defaultArgs, type ComponentArgs, type StoryArgs } from './storyArgs';
import { PharosContext } from '../../utils/PharosContext';
import type { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Components/Pagination',
  component: PharosPagination,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: { page: configureDocsPage('pagination') },
    options: { selectedPanel: 'addon-controls' },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: (args) => (
    <PharosPagination
      totalResults={args.totalResults}
      pageSize={args.pageSize}
      currentPage={args.currentPage}
      variant={args.variant}
      onPrev-Page={(e: CustomEvent) => action('Prev Page')(JSON.stringify(e))}
      onNext-Page={(e: CustomEvent) => action('Next Page')(JSON.stringify(e))}
    />
  ),
  args: defaultArgs,
};

export const Events: Story = {
  ...Base,
  parameters: { options: { selectedPanel: 'storybook/actions/panel' } },
};

export const Input: Story = {
  render: (args) => (
    <PharosPagination
      totalResults={args.totalResults}
      pageSize={args.pageSize}
      currentPage={args.currentPage}
      variant={args.variant}
      onPrev-Page={(e: CustomEvent) => action('Prev Page')(JSON.stringify(e))}
      onNext-Page={(e: CustomEvent) => action('Next Page')(JSON.stringify(e))}
      onPage-Input={(e: CustomEvent) => action('Page Input')(JSON.stringify(e.detail))}
    />
  ),
  args: { ...defaultArgs, variant: 'input' },
};
