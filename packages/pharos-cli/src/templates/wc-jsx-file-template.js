const template = ({ titleCaseName, componentName }) => `
import { html } from 'lit';

import { configureDocsPage } from '@config/docsPageConfig';

export default {
  title: 'Components/${titleCaseName}',
  component: 'pharos-${componentName}',
  parameters: {
    docs: {
      page: configureDocsPage('${componentName}'),
    },
    options: { selectedPanel: 'addon-controls' },
  },
};

export const Base = {
  render: (args) =>
    html\`<storybook-pharos-${componentName}></storybook-pharos-${componentName}>\`,
  args: {},
};
`;

module.exports = template;
