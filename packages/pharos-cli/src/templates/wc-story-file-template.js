const template = ({ titleCaseName, componentName }) => `
import { html } from 'lit';

import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import registerStorybookComponents from '../../utils/_storybook/registerStorybookComponents';
import type { Meta, StoryObj } from '@storybook/web-components';
import type { ComponentArgs, StoryArgs } from './storyArgs';
import { Pharos${titleCaseName} } from './pharos-${componentName}';

registerStorybookComponents([Pharos${titleCaseName}]);

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
