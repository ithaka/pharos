import type { Meta, StoryObj } from '@storybook/react-vite';
import { PharosBreadcrumb, PharosBreadcrumbItem } from '../../react-components';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';
import { defaultArgs, type ComponentArgs, type StoryArgs } from './storyArgs';

const meta = {
  title: 'Components/Breadcrumb',
  component: PharosBreadcrumb,
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: {
      page: configureDocsPage('breadcrumb'),
    },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: ({ firstCrumb, secondCrumb, thirdCrumb }) => (
    <PharosBreadcrumb>
      <PharosBreadcrumbItem href="#" id="firstBreadcrumb">
        {firstCrumb}
      </PharosBreadcrumbItem>
      <PharosBreadcrumbItem href="#" id="secondBreadcrumb">
        {secondCrumb}
      </PharosBreadcrumbItem>
      <PharosBreadcrumbItem id="thirdBreadcrumb">{thirdCrumb}</PharosBreadcrumbItem>
    </PharosBreadcrumb>
  ),
  args: defaultArgs,
};
