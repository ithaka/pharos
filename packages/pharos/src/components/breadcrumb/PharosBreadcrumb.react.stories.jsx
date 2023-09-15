import { PharosBreadcrumb, PharosBreadcrumbItem } from '../../react-components';
import { configureDocsPage } from '@config/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';

export default {
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
  argTypes: {},
};

export const Base = {
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
  args: {
    firstCrumb: 'Hover to see the full text of long content, which are truncated',
    secondCrumb: 'Short texts will not',
    thirdCrumb: 'Current',
  },
};
