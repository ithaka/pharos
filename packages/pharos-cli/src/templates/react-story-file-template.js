const template = ({ componentName, titleCaseName }) => `
import { Pharos${titleCaseName} } from '../../react-components/${componentName}/pharos-${componentName}';
import { configureDocsPage } from '../../utils/_storybook/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentArgs, StoryArgs } from './storyArgs';

const meta = {
  title: 'Components/${titleCaseName}',
  component: Pharos${titleCaseName},
  decorators: [
    (Story) => (
      <PharosContext.Provider value={{ prefix: 'storybook' }}>
        <Story />
      </PharosContext.Provider>
    ),
  ],
  parameters: {
    docs: {
      page: configureDocsPage('${componentName}'),
    },
  },
} satisfies Meta<ComponentArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Base: Story = {
  render: (args) => (
    <Pharos${titleCaseName} />
  ),
  args: {},
};
`;

module.exports = template;
