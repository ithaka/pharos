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
    html` <storybook-pharos-breadcrumb>
      <storybook-pharos-breadcrumb-item href="#" id="firstBreadcrumb"
        >${firstCrumb}</storybook-pharos-breadcrumb-item
      >
      <storybook-pharos-breadcrumb-item href="#" id="secondBreadcrumb"
        >${secondCrumb}</storybook-pharos-breadcrumb-item
      >
      <storybook-pharos-breadcrumb-item id="thirdBreadcrumb"
        >${thirdCrumb}</storybook-pharos-breadcrumb-item
      >
    </storybook-pharos-breadcrumb>`,
  args: {
    firstCrumb: 'Hover to see the full text of long content, which are truncated',
    secondCrumb: 'Short texts will not',
    thirdCrumb: 'Current',
  },
};
