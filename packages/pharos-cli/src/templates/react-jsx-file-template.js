const template = ({ componentName, titleCaseName }) => `
import { Pharos${titleCaseName} } from '../../react-components/${componentName}/pharos-${componentName}';
import { configureDocsPage } from '@config/docsPageConfig';
import { PharosContext } from '../../utils/PharosContext';

export default {
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
};

export const Base = {
  render: (args) => (
    <Pharos${titleCaseName} />
  ),
  args: {},
};
`;

module.exports = template;
