import { PharosBreadcrumb } from '../../react-components/breadcrumb/pharos-breadcrumb';
import { PharosBreadcrumbItem } from '../../react-components/breadcrumb/pharos-breadcrumb-item';
import { configureDocsPage } from '@config/docsPageConfig';

export default {
  title: 'Components/Breadcrumb',
  component: PharosBreadcrumb,
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
