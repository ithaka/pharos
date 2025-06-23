import type { Meta, StoryObj } from '@storybook/web-components';
import { Footer } from '../../pages/shared/wc/footer';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import type { ComponentArgs, StoryArgs } from './storyArgs';

const meta = {
  title: 'Organisms/Footer',
  component: 'pharos-footer',
  parameters: {
    docs: { page: configureDocsPage('footer') },
    layout: 'fullscreen',
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: () => Footer(),
  parameters: {
    chromatic: { viewports: [320, 1024, 1200] },
  },
};
