import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { defaultArgs, type StoryArgs } from './storyArgs';

const meta = {
  title: 'Components/Breadcrumb',
  component: 'pharos-breadcrumb',
  parameters: {
    docs: {
      page: configureDocsPage('breadcrumb'),
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
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
  args: defaultArgs,
};
