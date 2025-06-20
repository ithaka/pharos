const template = ({ titleCaseName, componentName }) => `
import { html } from 'lit';

import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { ComponentArgs, StoryArgs } from './storyArgs';

const meta = {
  title: 'Components/${titleCaseName}',
  component: 'pharos-${componentName}',
  parameters: {
    docs: {
      page: configureDocsPage('${componentName}'),
    },
    options: { selectedPanel: 'addon-controls' },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: (args) =>
    html\`<storybook-pharos-${componentName}></storybook-pharos-${componentName}>\`,
  args: {},
};
`;

module.exports = template;
