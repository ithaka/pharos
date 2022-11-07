import { html } from 'lit';
import { configureDocsPage } from '@config/docsPageConfig';

export default {
  title: 'Components/Breadcrumb',
  component: 'pharos-breadcrumb',
  parameters: {
    docs: {
      page: configureDocsPage('breadcrumb'),
    },
  },
};

export const Base = {
  render: ({ firstCrumb, secondCrumb, thirdCrumb }) =>
    html` <pharos-breadcrumb>
      <pharos-breadcrumb-item href="#" id="firstBreadcrumb">${firstCrumb}</pharos-breadcrumb-item>
      <pharos-breadcrumb-item href="#" id="secondBreadcrumb">${secondCrumb}</pharos-breadcrumb-item>
      <pharos-breadcrumb-item id="thirdBreadcrumb">${thirdCrumb}</pharos-breadcrumb-item>
    </pharos-breadcrumb>`,
  args: {
    firstCrumb: 'Hover to see the full text of long content, which are truncated',
    secondCrumb: 'Short texts will not',
    thirdCrumb: 'Current',
  },
};
